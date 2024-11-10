import json
from fastapi import APIRouter, UploadFile, File, HTTPException

from .process_services import pdf_to_base64_images
import anthropic
import openai
import os
from dotenv import load_dotenv
from typing import BinaryIO
from pydantic import BaseModel
from typing import List, Optional

load_dotenv()

router = APIRouter(prefix="/process")


MODEL = "claude-3-5-sonnet-20241022"

anthropic_client = anthropic.Client(api_key=os.environ.get("ANTHROPIC_API_KEY"))
openai_client = openai.OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))


MAX_PAGES = 100


async def extract_all_epa_data():
    directory = "../epa_petition_decisions"
    for filename in os.listdir(directory):
        file_path = os.path.join(directory, filename)
        raw_fname = filename.rsplit(".", 1)[0]
        with open(file_path, "rb") as file:
            await extract_data_helper(file, raw_fname, save=True)


async def extract_all_mtnview_data(start_index=41, end_index=46):  # inclusive
    directory = "../mtnview_petition_decisions"
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


@router.post("/extract-pdf")
async def extract_data(file: UploadFile = File(...), fname="results"):
    """Takes in a PDF file, breaks it into page images, and extracts the item data from each page."""
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=415, detail="Unsupported file type")

    base_fname = fname.rsplit(".", 1)[0] if fname.endswith(".pdf") else fname
    return await extract_data_helper(file.file, base_fname, save=False)


async def extract_data_helper(file: BinaryIO, filename: str = "", save: bool = False):
    base64_images = pdf_to_base64_images(file, max_pages=MAX_PAGES)
    results = await extract_housing_case_data(base64_images, MODEL)
    if save:
        os.makedirs("../all_decisions_processed", exist_ok=True)
        output_path = os.path.join("../all_decisions_processed", f"{filename}.json")
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


class PetitionerArgument(BaseModel):
    violatedCode: str
    summaryOfViolation: str


class Rationale(BaseModel):
    respondentHadNotice: str
    issueDuration: str
    evidenceAssessment: str
    impactAssessment: str


class Petition(BaseModel):
    petitionTypeNumber: str
    petitionerArgument: List[PetitionerArgument]
    decision: str
    directReimbursement: Optional[str]
    rentAdjustment: str
    rationale: Rationale
    respondent: str
    hearingOfficer: str
    city: str
    caseNumber: str
    filedOnDate: str
    hearingDate: str
    decisionDate: str


class PetitionResponse(BaseModel):
    petitions: List[Petition]


# this output should technically be two petitions but i included one for simplicity
EXAMPLE_OUTPUT = PetitionResponse(
    petitions=[
        Petition(
            petitionTypeNumber="3",
            petitionerArgument=[
                PetitionerArgument(
                    violatedCode="CA Civil Code § 1941.1",
                    summaryOfViolation="Failure to maintain rental unit in habitable condition",
                ),
                PetitionerArgument(
                    violatedCode="City's Rent Stabilization Ordinance § 13",
                    summaryOfViolation="Reduction in housing services, lack of maintenance impacts livability and property value, and prevents use of outdoor space for storage",
                ),
            ],
            decision="granted",
            directReimbursement="398.76",
            rentAdjustment="Yes (5%)",
            rationale=Rationale(
                respondentHadNotice="Yes, in July & August 2023",
                issueDuration="Unresolved for 10+ months",
                evidenceAssessment="Found no visual evidence of repairs during May 2024 inspection, despite invoice from Innovative General Engineering (Aug 2023) claims repairs made",
                impactAssessment="Not a habitability violation but exceeds minor maintenance deficiency",
            ),
            respondent="Woodland Park Communities",
            hearingOfficer="Michael H. Roush",
            city="East Palo Alto",
            caseNumber="2023-0001/0002",
            filedOnDate="Nov 3, 2023",
            hearingDate="May 17, 2024",
            decisionDate="May 22, 2024",
        )
    ]
)


SYSTEM_PROMPT = """Your job is to extract structured data from the following case document of a tenant petition.
There is typically just 1 petition but there can be up to 3.
If more than 1 petition is included in a single case, separate each petition in its own JSON array item.

The data you will extract for each petition includes:
1. petitionTypeNumber: Select one of the following: (1) Rent Ceiling Violations (2) Reductions in Maintenance, Service, and/or Habitability (3) Failure to Register a Unit with the Rent Stabilization Program
2. petitionerArgument: a list of the petitioner's arguments. Each argument includes:
    1. "violatedCode":Specific code/regulation violations claimed
    2. "summaryOfViolation": Provide a short summary of the tenant’s complaint relevant to the code
3. decision: Only select (1) "granted" or (2) "denied" based on the hearing officer’s overall assessment of the issue raised
4. reimbursement
5. rentAdjustment: only select (1) Yes or (2) No. If yes, and the value of the increase or decrease is available in percent format in the document, provide in parentheses.
6. rationaleForDecision: Provide the following information:
    1. "respondentHadNotice": whether the landlord knew of the issue and/or was given notice by the tenant
    2. "issueDuration": how long the tenant issue had gone unresolved
    3. "evidenceAssessment": how the hearing officer interpreted the evidence presented
    4. "impactAssessment": hearing officer’s assessment of the impact on the tenant
7. respondent
8. hearingOfficer
9. city: the city where the petition was filed
10. caseNumber
11. hearingDate
12. filedOnDate
13. decisionDate
"""
include_example = True
if include_example:
    SYSTEM_PROMPT += f"\n\nEXAMPLE OUTPUT:\n{EXAMPLE_OUTPUT.model_dump_json(indent=2)}"

print(SYSTEM_PROMPT)


async def extract_housing_case_data_with_openai(image_datas):
    pass
