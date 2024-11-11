from dotenv import load_dotenv
from typing import BinaryIO
import json
from fastapi import APIRouter, Response
import csv
from io import StringIO

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
    with open("./data/all_decisions.json", "r") as file:
        data = json.load(file)
    
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
    
    return data
