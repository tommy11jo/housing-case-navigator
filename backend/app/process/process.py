from fastapi import APIRouter, UploadFile, File, HTTPException

from .process_services import pdf_to_base64_images
import anthropic
import openai
import os
from dotenv import load_dotenv
from textwrap import dedent

load_dotenv()

router = APIRouter(prefix="/process")


MODEL = "claude-3-5-sonnet-20241022"

anthropic_client = anthropic.Client(api_key=os.environ.get("ANTHROPIC_API_KEY"))
openai_client = openai.OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))


MAX_PAGES = 100


@router.post("/extract-pdf")
async def extract_data(file: UploadFile = File(...)):
    """Takes in a PDF file, breaks it into page images, and extracts the item data from each page."""
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=415, detail="Unsupported file type")

    return await extract_data_helper(file.file)


async def extract_data_helper(file):
    base64_images = pdf_to_base64_images(file, max_pages=MAX_PAGES)
    results = await extract_housing_case_data(base64_images, MODEL)
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

    try:
        message = anthropic_client.messages.create(
            model="claude-3-5-sonnet-20241022",
            system=dedent(
                """Extract structured data for the following fields:
                - Case Number
                - Case Title
                """
            ),
            max_tokens=1024,
            messages=img_messages,
        )
    except Exception as e:
        print(e)
        return "Error processing images"

    return message.content[0].text


async def extract_housing_case_data_with_openai(image_datas):
    pass
