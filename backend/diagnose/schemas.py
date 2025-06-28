from pydantic import BaseModel
from fastapi import UploadFile,File

class DiagnosisRequest(BaseModel):
    email:str
    hash:str
    image:UploadFile = File(...)
