from dotenv import load_dotenv
import json
from fastapi import APIRouter, HTTPException
from ..config import supabase
import logging

logger = logging.getLogger(__name__)

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
async def get_documents():
    try:
        # Get data from Supabase storage
        response = supabase.storage.from_("documents").download("all_decisions.json")
        # response is bytes, decode it to string then parse JSON
        data = json.loads(response.decode('utf-8'))
    except Exception as e:
        # If file doesn't exist, return empty data
        if "404" in str(e):
            data = {"petitions": []} # Ensure structure matches expected format
            logger.warning("all_decisions.json not found in Supabase, returning empty list.")
        else:
            logger.error(f"Error fetching from Supabase: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Error fetching from Supabase: {str(e)}")

    # Ensure petitions key exists even if file was empty or structure was unexpected
    petitions = data.get("petitions", [])

    # Return the petitions list directly as the JSON response body
    return petitions
