import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.creative_routes import router

_dev_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
# In production set ALLOWED_ORIGINS=https://your-frontend.vercel.app
_extra = [o.strip() for o in os.getenv("ALLOWED_ORIGINS", "").split(",") if o.strip()]

app = FastAPI(title="Creative Block API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=_dev_origins + _extra,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
