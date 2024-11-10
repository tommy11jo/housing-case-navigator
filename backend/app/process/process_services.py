import pymupdf
import base64
import io


# Useful resource for pdf ocr with gpt-4o: https://cookbook.openai.com/examples/data_extraction_transformation
def encode_image(image_data):
    return base64.b64encode(image_data).decode("utf-8")


def pdf_to_base64_images(pdf_file, max_pages=None):
    pdf_content = pdf_file.read()
    pdf_stream = io.BytesIO(pdf_content)
    pdf_document = pymupdf.open(stream=pdf_stream, filetype="pdf")

    base64_images = []
    total_pages = len(pdf_document)
    pages_to_extract = min(total_pages, max_pages) if max_pages else total_pages
    for page_num in range(pages_to_extract):
        page = pdf_document.load_page(page_num)
        pix = page.get_pixmap()
        img_data = pix.tobytes()
        base64_image = encode_image(img_data)
        base64_images.append(base64_image)

    pdf_document.close()
    pdf_file.seek(0)

    return base64_images
