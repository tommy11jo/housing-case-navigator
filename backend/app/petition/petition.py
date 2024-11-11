from dotenv import load_dotenv
from typing import BinaryIO
import json
from fastapi import APIRouter, HTTPException, Depends
from httpx import AsyncClient
import anthropic
import os

load_dotenv()

router = APIRouter(prefix="/petition")


MODEL = "claude-3-5-sonnet-20241022"

anthropic_client = anthropic.Client(api_key=os.environ.get("ANTHROPIC_API_KEY"))
# openai_client = openai.OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))


SYSTEM_PROMPT = """You are an expert at understanding and writing legal documents. Your task is to provide guidance on how to write a tenant petition based on the given details."""

USER_PROMPT = """
I am attaching a list of past tenant case decisions for landlord violations. Based on these, help me with crafting a petition for my tenant. Consider the issue type, situation, reward received, etc. for the cases above in your answer. Relevant information: {petition_details}

Here's what to include in your output:  

- Petition Type 
- Notable supporting cases 
- Key legal grounds 
- Evidence to Gather 
- Key Points to Emphasize
- Remedies to Request (reference past case decisions to justify the requests)

Format your output as JSON with the following format. Make sure to include all property names with double quotes.

{{
  "guidance": {{
    "petitionType": string;
    "supportingCases": string[];
    "keyLegalGrounds": string[];
    "evidenceToGather": string[];
    "keyPoints": string[];
    "remediesToRequest": string[];
  }};
}};

Past case decisions as CSV: {past_case_decisions}
"""

@router.post("/generate-guidance")
async def generate_guidance(request: dict):
    petition_details = request.get("petitionDetails")
    if not petition_details:
        raise HTTPException(status_code=400, detail="petitionDetails is required")

    print('got petition details')
    # Fetch past case decisions from retrieval endpoint
    async with AsyncClient() as client:
        response = await client.get("http://localhost:8000/retrieval/documents", params={"format": "csv"})
        print(f"respone status code: {response.status_code}")
        if response.status_code != 200:
            raise HTTPException(status_code=500, detail="Failed to fetch past case decisions")
        past_case_decisions = response.text

    print('got output')
    # try:
    message = anthropic_client.messages.create(
        model=MODEL,
        max_tokens=1000, 
        system=SYSTEM_PROMPT,
        messages=[
            {
                "role": "user",
                "content": USER_PROMPT.format(petition_details=petition_details, past_case_decisions=past_case_decisions)
            }
        ]
    )
    print(f"got response from anthropic")

    response = message.content[0].text
    # print(f"response: \n{response}")
    response_json = response[response.find("{"): response.rfind("}") + 1]
    # print(f"response_json: \n{response_json}")
    return json.loads(response_json)
    
    # except Exception as e:
    #     raise HTTPException(status_code=500, detail=f"Error generating guidance: {str(e)}")
