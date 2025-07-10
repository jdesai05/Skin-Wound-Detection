from pydantic import BaseModel
from fastapi import UploadFile,File

class DiagnosisRequest(BaseModel):
    image:UploadFile = File(...)
