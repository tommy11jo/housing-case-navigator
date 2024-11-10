import pytesseract
from PIL import Image
import fitz
import io
import openai
from typing import Dict
from dotenv import load_dotenv

load_dotenv()

def process_pdf(file_path: str):
    doc = fitz.open(file_path)
    all_text = []

    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        image_list = page.get_images(full=True)

        for img_index, img in enumerate(image_list):
            xref = img[0]
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            
            # Convert bytes to Image and apply OCR
            image = Image.open(io.BytesIO(image_bytes))
            text = pytesseract.image_to_string(image)
            all_text.append(text)
    return '\n'.join(all_text)

def extract_info_from_text(text: str) -> Dict:
    # Initialize OpenAI client (make sure to set your API key in environment variables)
    client = openai.OpenAI()
    
    prompt = """Please analyze this legal document to identify key issues brought up by the petitioner. For each issue, provide the following:
    - issue type
    - petitioner argument
    - decision (granted or denied)
    - reimbursement
    - rent adjustment
    - rationale for decision
    - respondent
    
    Output should be in JSON format with the following structure:
    {
        "issues": Issue[]
    }
    """

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You are a legal document analyzer. Provide output in JSON format only."},
            {"role": "user", "content": f"{prompt}\n\nDocument text:\n{text}"}
        ],
        response_format={ "type": "json_object" }
    )
    
    return response.choices[0].message.content

# Combine all text and process with GPT-4
# document_text = '\n'.join(all_text)
use_processed_pdf = False
if use_processed_pdf:
    with open('test_ocr_output.txt', 'r', encoding='utf-8') as f:
        document_text = f.read()
else:
    document_text = process_pdf("epa_petition_decisions/Decision Franklin v WPC 20230001 and 20230002.pdf")

analysis_result = extract_info_from_text(document_text)
print(analysis_result)
# Write both OCR text and analysis results
with open('results.txt', 'w', encoding='utf-8') as f:
    f.write('\n\n=== ANALYSIS RESULTS ===\n')
    f.write(analysis_result)