import json
from fastapi import APIRouter, UploadFile, File, HTTPException

from .process_services import pdf_to_base64_images
import anthropic
import os
from dotenv import load_dotenv
from typing import BinaryIO
from pydantic import BaseModel
from typing import List

load_dotenv()

router = APIRouter(prefix="/process")


MODEL = "claude-3-5-sonnet-20241022"

anthropic_client = anthropic.Client(api_key=os.environ.get("ANTHROPIC_API_KEY"))
# openai_client = openai.OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))


MAX_PAGES = 100


async def extract_all_epa_data():
    directory = "data/epa_petition_decisions"
    for filename in os.listdir(directory):
        file_path = os.path.join(directory, filename)
        raw_fname = filename.rsplit(".", 1)[0]
        with open(file_path, "rb") as file:
            await extract_data_helper(file, raw_fname, save=True)


async def extract_all_mtnview_data(start_index=0, end_index=7):  # inclusive
    directory = "data/mtnview_petition_decisions"
    index = 0
    for filename in os.listdir(directory):
        if index < start_index or (end_index and index > end_index):
            index += 1
            continue
        file_path = os.path.join(directory, filename)
        raw_fname = filename.rsplit(".", 1)[0]
        with open(file_path, "rb") as file:
            await extract_data_helper(file, raw_fname, save=True)
        print(f"Processed and saved: {raw_fname}")
        index += 1


# rewrites the entry if it exists, otherwise creates a new one
@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=415, detail="Unsupported file type")

    base_fname = (
        file.filename.rsplit(".", 1)[0]
        if file.filename.endswith(".pdf")
        else file.filename
    )

    try:
        results = await extract_data_helper(file.file, base_fname, save=False)
        output_path = "data/all_decisions.json"

        print(f"Saving to {output_path}")

        # Ensure directory exists
        os.makedirs(os.path.dirname(output_path), exist_ok=True)

        data = {"petitions": []}
        if os.path.exists(output_path):
            try:
                with open(output_path, "r") as f:
                    file_content = f.read()
                    if file_content:  # Check if file is not empty
                        data = json.loads(file_content)
            except json.JSONDecodeError as e:
                print(f"Error reading existing JSON: {str(e)}")

        # Add sourceFile field to each petition before appending
        for petition in results["petitions"]:
            petition["sourceFile"] = file.filename
            data["petitions"] = [petition] + data["petitions"]

        with open(output_path, "w") as f:
            json.dump(data, f, indent=2)

        return {"message": "File processed and saved successfully", "results": results}
    except Exception as e:
        print(f"Error in upload_file: {str(e)}")  # Add detailed logging
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")


@router.post("/extract-pdf")
async def extract_data(file: UploadFile = File(...), fname="results"):
    """Takes in a PDF file, breaks it into page images, and extracts the item data from each page."""
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=415, detail="Unsupported file type")

    base_fname = fname.rsplit(".", 1)[0] if fname.endswith(".pdf") else fname
    return await extract_data_helper(file.file, base_fname, save=False)


async def extract_data_helper(file: BinaryIO, filename: str = "", save: bool = False):
    print(f"Extracting data for {filename}")
    base64_images = pdf_to_base64_images(file, max_pages=MAX_PAGES)
    results = await extract_housing_case_data(base64_images, MODEL)
    if save:
        os.makedirs("data/all_decisions_processed", exist_ok=True)
        output_path = os.path.join("data/all_decisions_processed", f"{filename}.json")
        with open(output_path, "w") as f:
            json.dump(results, f, indent=2)
    return results


async def extract_housing_case_data(image_datas, model):
    match (model):
        case "claude-3-5-sonnet-20241022":
            return await extract_housing_case_data_with_claude(image_datas)
        case "gpt":
            return await extract_housing_case_data_with_openai(image_datas)
        case _:
            raise HTTPException(status_code=400, detail="Invalid model")


async def extract_housing_case_data_with_claude(image_datas):
    img_messages = []
    for i, image in enumerate(image_datas):
        img_messages.append(
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": f"Image {i}:"},
                    {
                        "type": "image",
                        "source": {
                            "type": "base64",
                            "media_type": "image/png",
                            "data": image,
                        },
                    },
                ],
            }
        )
    img_messages.append(
        {"role": "assistant", "content": [{"type": "text", "text": "{"}]}
    )

    try:
        message = anthropic_client.messages.create(
            model="claude-3-5-sonnet-20241022",
            system=SYSTEM_PROMPT,
            max_tokens=1024,
            messages=img_messages,
        )
    except Exception as e:
        print(e)
        return "Error processing images"

    response = message.content[0].text
    response_json = "{" + response[: response.rfind("}") + 1]
    return json.loads(response_json)


class ArgumentAndDecision(BaseModel):
    complaintSummary: str
    violatedCode: str
    reimbursement: str
    complaintTiming: str
    respondentHadNotice: str
    evidenceAssessment: str
    impactAssessment: str


class Petition(BaseModel):
    caseInfo: str
    city: str
    issueTypeNumber: str
    argumentsAndDecisions: List[ArgumentAndDecision]
    rentAdjustment: str
    respondent: str
    hearingOfficer: str
    hearingDate: str
    filedOnDate: str
    decisionDate: str
    reimbursementJustified: str


class QualityRating(BaseModel):
    reasoning: str
    score: int


class PetitionResponse(BaseModel):
    petitions: List[Petition]


EXAMPLE_OUTPUT = PetitionResponse(
    petitions=[
        Petition(
            caseInfo="Petition: 2023-0001/0002",
            city="East Palo Alto",
            issueTypeNumber="2",
            argumentsAndDecisions=[
                ArgumentAndDecision(
                    complaintSummary="Failure to maintain rental unit in habitable condition",
                    violatedCode="CA Civil Code § 1941.1",
                    reimbursement="$398.76",
                    complaintTiming="10+ months",
                    respondentHadNotice="Yes, notices provided in July & August 2023",
                    evidenceAssessment="No visual evidence of repairs during May 2024 inspection, despite repair invoice",
                    impactAssessment="Not a habitability violation but exceeds minor maintenance deficiency",
                )
            ],
            reimbursementJustified="somewhat",
            rentAdjustment="Yes (5%)",
            respondent="Woodland Park Communities",
            hearingOfficer="Michael H. Roush",
            hearingDate="2024-05-17",
            filedOnDate="2023-11-03",
            decisionDate="2024-05-22",
        )
    ]
)


SYSTEM_PROMPT = """Your job is to extract structured data from the following case document of a tenant petition.
There can be multiple issues raised in a single petition.
If more than 1 issue is included in a single petition, separate each issue in its own JSON array item.
If a string value is not present, output "N/A".

The data you will extract for each petition includes:
1. issueTypeNumber: Select one of the following: (1) Rent Ceiling Violations (2) Reductions in Maintenance and Habitability (3) Reductions in Service (4) Failure to Register a Unit with the Rent Stabilization Program.
2. caseInfo: in the format "Petition: <caseNumber>" or "Appeal: <caseNumber>"
3. city: the city where the petition was filed
4. argumentsAndDecisions: a list of the petitioner's complaints and the corresponding decision. Each complaint and decision includes:
    1. complaintSummary: Provide a short summary of the tenant's complaint relevant to the code
    2. violatedCode: Specific code/regulation violations claimed
    3. reimbursement: the reimbursement value if awarded. Otherwise, state "No reimbursement awarded."
    4. complaintTiming: the time duration (e.g. 6 months) or reported start date for the complaint.
    5. respondentHadNotice: whether the landlord knew of the complaints raised and/or was given notice by the tenant
    6. evidenceAssessment: how the hearing officer interpreted the evidence presented
    7. impactAssessment: hearing officer's assessment of the impact on the tenant
5. reimbursementJustified: Does the hearing officer give a strong justification for why they chose that specific dollar amount or percent rent reduction for reimbursement? For example, "7.5% reduction/rebate will be applied for a four month period because the tenant's housing services were not maintained for a similar period" would be considered a strong justification. Provide "yes" or "no."
6. rentAdjustment: only select (1) Yes or (2) No. If yes, and the value of the increase or decrease is available in percent format in the document, provide in parentheses.
7. respondent
8. hearingOfficer
9. hearingDate
10. filedOnDate
11. decisionDate
"""

include_example = True
if include_example:
    SYSTEM_PROMPT += f"\n\nEXAMPLE OUTPUT:\n{EXAMPLE_OUTPUT.model_dump_json(indent=2)}"


async def extract_housing_case_data_with_openai(image_datas):
    pass
