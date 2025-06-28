# schemas.py
from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    email: str
    password:str

class UserLogin(BaseModel):
    email:str
    password:str

class DeleteRequest(BaseModel):
    email: str
    hash: str