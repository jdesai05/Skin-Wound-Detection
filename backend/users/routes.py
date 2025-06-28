from users.schemas import UserCreate,UserLogin,DeleteRequest
from users.service import user_service

from fastapi import APIRouter
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post('/signup')
async def create_user(user:UserCreate):
    user = user_service.create_user(user)
    return user

@router.get('/all')
async def list_users():
    return user_service.get_all_users()

@router.post('/login')
async def login(user:UserLogin):
    return user_service.login(user)

@router.delete('/all')
async def delete_all_users():
    return user_service.delete_all()

@router.delete('/{email}')
async def delete_user(
    request:DeleteRequest
):
    return user_service.delete_user(request.email,request.hash)
