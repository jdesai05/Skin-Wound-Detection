# crud.py
from users.models import UserDB
from users.schemas import UserCreate,UserLogin
from utils.hashing import *
from fastapi.exceptions import HTTPException
from database import SessionLocal

class UserService:
    def __init__(self):
        self.db = SessionLocal()

    def create_user(self, user: UserCreate):
        db_user = UserDB(name=user.name, email=user.email,password=user.password)
        self.db.add(db_user)
        self.db.commit()
        self.db.refresh(db_user)
        return self_hmac_hash(db_user.email,db_user.password)
    
    def does_user_exist(self,email:str,hash:str):
        existing_user = self.db.query(UserDB).filter(UserDB.email == email).first()
        return verify_self_hmac(existing_user.email,hash,existing_user.password)

    # only for development and testing purpose
    def get_all_users(self):
        return self.db.query(UserDB).all()
    
    def login(self,request:UserLogin):
        existing_user = self.db.query(UserDB).filter(UserDB.email == request.email, UserDB.password == request.password).first()
        if existing_user is not None:
            return self_hmac_hash(existing_user.email,existing_user.password)
        
    # only for development and testing purpose
    def delete_all(self):
        return self.db.query(UserDB).delete()
    
    def delete_user(self,email,hash):
        if self.does_user_exist(email,hash):
            return self.db.query(UserDB).filter(UserDB.email == email).delete()
        
        return HTTPException(401)
    
user_service = UserService()