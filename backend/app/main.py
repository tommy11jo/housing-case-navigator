# uvicorn app.main:app --reload --port 8000
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.process.process import router as quote_router
from app.retrieval.retrieval import router as retrieval_router
app = FastAPI()

# CORS setup
allowed_origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(quote_router)
app.include_router(retrieval_router)

@app.get("/")
def read_root():
    return {"message": "Hi there"}
