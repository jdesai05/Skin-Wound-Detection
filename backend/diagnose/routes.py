from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from utils.auth import is_user
import numpy as np
from PIL import Image
import io
from google import genai
from google.genai import types
from dotenv import load_dotenv
import os
import json

load_dotenv()

genai_api_key = os.environ.get('GOOGLE_API_KEY')
client = genai.Client(api_key=genai_api_key)

router = APIRouter()

# The desired pattern for the diagnosis response
# This is now primarily for documentation/understanding, as the schema will enforce the structure.
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
                # The prompt can still guide the model, but the schema enforces the output format.
                # Modified the prompt as requested to include the diagnosis_response_pattern.
                f'Diagnose this image for a skin disease or wound. Provide the response in JSON format only which is {diagnosis_response_pattern}.'
            ],
            config={
                "response_json_schema": {
                    "type": "OBJECT",
                    "properties": {
                        "condition": { "type": "STRING", "description": "Identified condition or 'None' if not found" },
                        "first_aid": { "type": "STRING", "description": "Recommended first aid steps" },
                        "remedy": { "type": "STRING", "description": "Suggested remedies, if applicable" },
                        "disclaimer": { "type": "STRING", "description": "Disclaimer about AI diagnosis vs. professional medical advice" }
                    },
                    "propertyOrdering": ["condition", "first_aid", "remedy", "disclaimer"],
                    "required": ["condition", "first_aid", "remedy", "disclaimer"] # All fields are expected
                }
            }
        )
        
        # Extract the response text, which should now be a JSON string
        if response and response.text:
            # Clean the response text by removing markdown code block delimiters
            # The response often comes wrapped in ```json\n...\n```
            cleaned_response_text = response.text.strip()
            if cleaned_response_text.startswith("```json"):
                cleaned_response_text = cleaned_response_text[len("```json"):].strip()
            if cleaned_response_text.endswith("```"):
                cleaned_response_text = cleaned_response_text[:-len("```")].strip()
            
            # Parse the cleaned JSON string into a Python dictionary
            return {"diagnosis": json.loads(cleaned_response_text)}
        else:
            raise HTTPException(status_code=500, detail="No valid response from the model")
    
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=f"Error parsing JSON response from model: {str(e)}. Raw response: {response.text if 'response' in locals() else 'N/A'}")
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
            "diagnosis": result["diagnosis"] # This will now be a dictionary
        }
        
    except HTTPException as e:
        raise e
    except Exception as e:
        print(str(e))
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")

