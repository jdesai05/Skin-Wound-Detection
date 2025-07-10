from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from utils.auth import is_user
import numpy as np
from PIL import Image
import io
from google import genai
from google.genai import types
from dotenv import load_dotenv
import os

load_dotenv()

genai_api_key = os.environ.get('GOOGLE_API_KEY')
client = genai.Client(api_key=genai_api_key)

router = APIRouter()

diagnosis_response_pattern = '''
    {
        condition: '...' (blank if no condition is identified),
        first_aid: '...',
        remedy: '...' (if any),
        disclaimer: '...' (about how one shall trust a doctor more than AI),
    }
'''


async def get_prediction(image_bytes: bytes) -> dict:
    try:
        # Create content for the Gemini model
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=[
            types.Part.from_bytes(
                data=image_bytes,
                mime_type='image/jpeg',
            ),
            f'Diagnose this image for a skin disease or wound in this json pattern {diagnosis_response_pattern}'
            ]
        )
        
        # Extract the response text
        if response and response.text:
            return {"diagnosis": response.text}
        else:
            raise HTTPException(status_code=500, detail="No valid response from the model")
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing prediction: {str(e)}")

def file_to_image_array(file: UploadFile) -> bytes:
    try:
        # Read the file contents
        contents = file.file.read()
        
        # Validate image
        image = Image.open(io.BytesIO(contents))
        if image.format not in ["JPEG", "PNG"]:
            raise HTTPException(status_code=400, detail="Only JPEG or PNG images are supported")
            
        # Convert to RGB and resize
        image = image.convert("RGB")
        image = image.resize((224, 224))  # Adjust size as needed for the model
        
        # Save image to bytes
        img_byte_arr = io.BytesIO()
        image.save(img_byte_arr, format='JPEG')
        return img_byte_arr.getvalue()
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid image format: {str(e)}")

@router.post('/diagnose', dependencies=[Depends(is_user)])
async def diagnose_image(image: UploadFile = File(...)):
    try:
        # Validate file extension
        if not image.filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            raise HTTPException(status_code=400, detail="Invalid file extension. Use PNG or JPEG.")
        
        # Convert uploaded file to image bytes
        image_bytes = file_to_image_array(image)
        
        # Get prediction from the model
        result = await get_prediction(image_bytes)
        
        return {
            "filename": image.filename,
            "diagnosis": result["diagnosis"]
        }
        
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")