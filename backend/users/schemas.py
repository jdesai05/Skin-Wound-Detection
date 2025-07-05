# schemas.py
from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    email: str
    password:str
    is_admin:bool

class UserLogin(BaseModel):
    email:str
    password:str

class DeleteRequest(BaseModel):
    email: str