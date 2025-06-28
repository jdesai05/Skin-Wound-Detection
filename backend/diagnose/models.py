# models.py
from sqlalchemy import Column, Integer, String, JSON
from database import Base  # import Base from your db setup

class Diagnosis(Base):
    __tablename__ = "diagnoses"

    id = Column(Integer, primary_key=True, index=True)
    image_url = Column(String, nullable=False)
    user_email = Column(String, index=True, nullable=False)
    diagnosis = Column(JSON, index=True)