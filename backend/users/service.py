# crud.py
from users.models import UserDB
from users.schemas import UserCreate,UserLogin
from utils.auth import *
from fastapi.exceptions import HTTPException
from database import SessionLocal

class UserService:
    def __init__(self):
        self.db = SessionLocal()

    def create_user(self, user: UserCreate):
        existing_user:UserDB = self.db.query(UserDB).filter(UserDB.email == user.email).first()
        if existing_user:
            raise HTTPException(status_code=409, detail="User with this email already exists")
        
        db_user = UserDB(name=user.name, email=user.email, password=user.password, is_admin=user.is_admin)
        self.db.add(db_user)
        self.db.commit()
        self.db.refresh(db_user)
        return create_access_token(db_user.to_dict())
        
    def does_user_exist(self,email:str):
        existing_user = self.db.query(UserDB).filter(UserDB.email == email).first()
        return existing_user is not None

    # only for development and testing purpose
    def get_all_users(self):
        return self.db.query(UserDB).all()
    
    def login(self,request:UserLogin):
        existing_user = self.db.query(UserDB).filter(UserDB.email == request.email).first()
        if existing_user is not None:
            if existing_user.password != request.password:
                raise HTTPException(status_code=401, detail="Invalid credentials")
            return create_access_token(existing_user.to_dict())
        else:
            raise HTTPException(404)
        
    # only for development and testing purpose
    def delete_all(self):
        return self.db.query(UserDB).delete()
    
    def delete_user(self, email: str):
        deleted_count = self.db.query(UserDB).filter(UserDB.email == email).delete()
        self.db.commit()
        if deleted_count == 0:
            raise HTTPException(status_code=404, detail="User not found")
        return {"message": "User deleted successfully"}
    
user_service = UserService()
