from dotenv import load_dotenv
import json
from fastapi import APIRouter, HTTPException, Response
from fastapi.responses import StreamingResponse
import io
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


@router.get("/file/{file_path:path}")
async def get_file(file_path: str):
    """
    Fetches a file from the 'documents' bucket in Supabase storage.
    """
    # Basic security check to prevent accessing unintended paths if needed
    # e.g., if file_path could contain '..'
    if ".." in file_path:
        raise HTTPException(status_code=400, detail="Invalid file path")

    try:
        logger.info(f"Attempting to download file: {file_path} from bucket 'documents'")
        response_data = supabase.storage.from_("documents").download(file_path)

        # Determine content type (simple check for PDF for now)
        content_type = "application/octet-stream" # Default
        file_path_lower = file_path.lower()
        if file_path_lower.endswith(".pdf"):
            content_type = "application/pdf"
        elif file_path_lower.endswith(".json"):
            content_type = "application/json"
        # Add more types as needed

        # Return the file content as a streaming response
        return StreamingResponse(
            io.BytesIO(response_data),
            media_type=content_type,
            headers={"Content-Disposition": f"inline; filename=\"{file_path.split('/')[-1]}\""} # Show inline, suggest original filename
        )

    except Exception as e:
        # Handle Supabase client errors, especially file not found
        # The Supabase client might raise specific exceptions or return an error response
        # Check the Supabase client documentation for precise error handling
        error_message = str(e)
        logger.error(f"Error downloading file '{file_path}': {error_message}")

        # Example check for common 'Not Found' patterns (adjust based on actual Supabase errors)
        if "404" in error_message or "does not exist" in error_message.lower() or "NotFound" in error_message:
             raise HTTPException(status_code=404, detail=f"File not found: {file_path}")
        else:
             raise HTTPException(status_code=500, detail=f"Error fetching file from Supabase: {error_message}")
