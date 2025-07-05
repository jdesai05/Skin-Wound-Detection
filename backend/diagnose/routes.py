from fastapi import APIRouter,Depends
from users.service import user_service
from utils.auth import is_user

from fastapi.exceptions import HTTPException
from diagnose.schemas import DiagnosisRequest
router = APIRouter()

@router.post('/diagnose',dependencies=[Depends(is_user)])
async def diagnose_image(
    request:DiagnosisRequest
):
    return HTTPException(200)

