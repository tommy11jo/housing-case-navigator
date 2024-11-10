from dotenv import load_dotenv
from typing import BinaryIO
import json
from fastapi import APIRouter

load_dotenv()

router = APIRouter(prefix="/retrieval")

@router.get("/documents")
async def get_documents():
    with open("./data/all_decisions.json", "r") as file:
        data = json.load(file)
    return data
