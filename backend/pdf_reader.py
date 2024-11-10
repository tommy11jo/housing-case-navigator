import pytesseract
from PIL import Image
import fitz
import io

# Add at the beginning of the file, after imports
all_text = []

doc = fitz.open("epa_petition_decisions/2023-01-23 Rent Boards Finding and Decisions Appeal Case 2021056 - 2070 Glen Way Apartment F (1).pdf")

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

# Add at the end of the file, after the loops
# Write all OCR text to a single file
with open('test_ocr_output.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(all_text))