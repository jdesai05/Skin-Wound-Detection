from users.schemas import UserCreate,UserLogin,DeleteRequest
from users.service import user_service

from fastapi import APIRouter,Depends
import logging
from utils.auth import is_user,is_admin

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post('/signup')
async def create_user(user:UserCreate):
    return user_service.create_user(user)


@router.get('/all',dependencies=[Depends(is_admin)])
async def list_users():
    return user_service.get_all_users()

@router.post('/login')
async def login(user:UserLogin):
    return user_service.login(user)

@router.delete('/all',dependencies=[Depends(is_admin)])
async def delete_all_users():
    return user_service.delete_all()

@router.delete('/',dependencies=[Depends(is_user)])
async def delete_user(
    token:str
):
    return user_service.delete_user(token)
