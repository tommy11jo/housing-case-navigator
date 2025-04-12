from dotenv import load_dotenv
from typing import BinaryIO
import json
from fastapi import APIRouter, Response, HTTPException
import csv
from io import StringIO
from ..config import supabase

load_dotenv()

router = APIRouter(prefix="/retrieval")


# This mapping is duplicated in frontend/src/data.ts. Keep them in sync!
PETITION_TYPE_NUMBER_TO_NAME = {
  1: "Rent Ceiling Violations",
  2: "Reductions in Maintenance and Habitability",
  3: "Reductions in Service",
  4: "Failure to Register a Unit with the Rent Stabilization Program",
}

@router.get("/documents")
async def get_documents(format: str = "json"):
    try:
        # Get data from Supabase storage
        response = supabase.storage.from_("documents").download("all_decisions.json")
        # response is bytes, decode it to string then parse JSON
        data = json.loads(response.decode('utf-8'))
    except Exception as e:
        # If file doesn't exist, return empty data
        if "404" in str(e):
            data = {"petitions": []}
        else:
            raise HTTPException(status_code=500, detail=f"Error fetching from Supabase: {str(e)}")
    
    if format.lower() == "csv":
        # Create a string buffer to write CSV data
        output = StringIO()
        petitions = data["petitions"]
        petitions = [
            {"petitionType": PETITION_TYPE_NUMBER_TO_NAME[int(petition["issueTypeNumber"])], **petition}
            for petition in petitions
        ]
        if petitions:  # Check if data is not empty
            # Get headers from first item's keys
            writer = csv.DictWriter(output, fieldnames=petitions[0].keys())
            writer.writeheader()
            writer.writerows(petitions)
        csv_content = output.getvalue()
        output.close()
        
        return Response(
            content=csv_content,
            media_type="text/csv",
            headers={
                "Content-Disposition": "attachment; filename=documents.csv"
            }
        )
    else:  # Default to JSON
        # Return only the petitions array
        return Response(content=json.dumps(data["petitions"], indent=2), media_type="application/json")
