import jwt
import os
from dotenv import load_dotenv

load_dotenv()

key = os.environ.get('JWT_SECRET_KEY')
algorithm = 'HS256'

def create_access_token(data: dict) -> str:
    return jwt.encode(data, key, algorithm=algorithm)

def decode_access_token(token: str) -> dict:
    return jwt.decode(token, key, algorithms=[algorithm])

def is_user(token: str) -> bool:
    payload = decode_access_token(token)
    return 'email' in payload

def is_admin(token: str) -> bool:
    payload = decode_access_token(token)
    return payload.get('is_admin') is True
