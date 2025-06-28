from fastapi import FastAPI
import uvicorn
from users.routes import router as user_router
from users.models import UserDB,Base
from diagnose.routes import router as diagnosis_router

from database import engine

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Welcome to FastAPI with PostgreSQL"}

app.include_router(user_router,prefix='/users',tags=['Users'])
app.include_router(diagnosis_router,prefix='/engine',tags=['Diagnosis Engine'])

## Uncomment the line below if wanting to refresh the db
#Base.metadata.drop_all(bind=engine)

Base.metadata.create_all(bind=engine)


if __name__=='__main__':
    uvicorn.run(app)