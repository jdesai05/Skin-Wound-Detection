from fastapi import APIRouter
from users.service import user_service
from fastapi.exceptions import HTTPException
from diagnose.schemas import DiagnosisRequest
router = APIRouter()

@router.post('/diagnose')
async def diagnose_image(
    request:DiagnosisRequest
):
    if user_service.does_user_exist(request.email,request.hash):
        return HTTPException(200)

    return HTTPException(401)

