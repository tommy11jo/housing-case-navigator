from dotenv import load_dotenv
from typing import BinaryIO
import json
from fastapi import APIRouter, Response
import csv
from io import StringIO

load_dotenv()

router = APIRouter(prefix="/retrieval")

@router.get("/documents")
async def get_documents(format: str = "json"):
    with open("./data/all_decisions.json", "r") as file:
        data = json.load(file)
    
    if format.lower() == "csv":
        # Create a string buffer to write CSV data
        output = StringIO()
        petitions = data["petitions"]
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
