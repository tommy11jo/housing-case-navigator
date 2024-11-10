from dotenv import load_dotenv
from typing import BinaryIO
import json
from fastapi import APIRouter, HTTPException
import anthropic
import os

load_dotenv()

router = APIRouter(prefix="/petition")


MODEL = "claude-3-5-sonnet-20241022"

print(os.environ.get("ANTHROPIC_API_KEY"))
anthropic_client = anthropic.Client(api_key=os.environ.get("ANTHROPIC_API_KEY"))
# openai_client = openai.OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))


@router.post("/generate-guidance")
async def generate_guidance(request: dict):
    petition_details = request.get("petitionDetails")
    if not petition_details:
        raise HTTPException(status_code=400, detail="petitionDetails is required")
    
    system_prompt = """You are an expert at writing petitions. Your task is to provide guidance on how to improve the given petition details and make them more effective."""
    
    try:
        response = anthropic_client.messages.create(
            model=MODEL,
            max_tokens=1000, 
            system=system_prompt,
            messages=[
                {
                    "role": "user",
                    "content": f"Please ignore the content above and just reply back with 'hello':{petition_details}"
                }
            ]
        )
        
        return {"guidance": response.content[0].text}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating guidance: {str(e)}")
