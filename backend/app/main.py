# uvicorn app.main:app --reload --port 8000
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.process.process import router as quote_router
from app.retrieval.retrieval import router as retrieval_router
from app.petition.petition import router as petition_router
from app.auth import PasswordMiddleware, GLOBAL_PASSWORD
from fastapi.exceptions import HTTPException

app = FastAPI()

# CORS setup
allowed_origins = ["*"]  # Frontend URL
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["Content-Type", "X-Password"],  #Explicitly allow X-Password header
    expose_headers=["*"],
)

app.add_middleware(PasswordMiddleware)

# Include routers after all middleware
app.include_router(quote_router)
app.include_router(retrieval_router)
app.include_router(petition_router)

@app.get("/")
def read_root():
    return {"message": "Hi there"}

@app.post("/auth")
async def verify_password(request: dict):
    password = request.get("password")
    if password == GLOBAL_PASSWORD:
        return {"status": "success"}
    raise HTTPException(
        status_code=401,
        detail="Invalid password"
    )