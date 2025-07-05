import jwt
import os
from dotenv import load_dotenv
from fastapi.security import OAuth2AuthorizationCodeBearer
from fastapi import Depends
from fastapi.exceptions import HTTPException

load_dotenv()

oauth2_scheme = OAuth2AuthorizationCodeBearer(authorizationUrl='/users/login',tokenUrl='/users/login')

key = os.environ.get('JWT_SECRET_KEY')
algorithm = 'HS256'

def create_access_token(data: dict) -> str:
    return jwt.encode(data, key, algorithm=algorithm)

def decode_access_token(token: str) -> dict:
    return jwt.decode(token, key, algorithms=[algorithm])

def is_user(token: str = Depends(oauth2_scheme)) -> bool:
    payload = decode_access_token(token)
    if 'email' in payload:
        return payload
    else:
        raise HTTPException(401)

def is_admin(token: str = Depends(oauth2_scheme)) -> bool:
    payload = decode_access_token(token)
    if 'is_admin' in payload and payload.get('is_admin') == True:
        return payload
    else:
        raise HTTPException(401)
