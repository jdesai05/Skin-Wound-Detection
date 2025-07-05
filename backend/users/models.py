# models.py
from sqlalchemy import Column, Integer, String, Boolean
from database import Base  # import Base from your db setup


class UserDB(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    is_admin = Column(Boolean, nullable=False)

    def to_dict(self):
        return {
            'name':self.name,
            'email':self.email,
            'is_admin':self.is_admin
        }