from fastapi import Request, HTTPException
from fastapi.security import HTTPBasic
from starlette.middleware.base import BaseHTTPMiddleware
import os
from dotenv import load_dotenv

load_dotenv()

GLOBAL_PASSWORD = os.getenv("GLOBAL_PASSWORD", "no default password!")
PUBLIC_PATHS = {"/auth"}  # Add any paths that should remain public

class PasswordMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Skip authentication for public paths
        if request.url.path in PUBLIC_PATHS:
            return await call_next(request)

        # Allow preflight requests to pass through
        if request.method == "OPTIONS":
            return await call_next(request)

        inputted_password = request.headers.get("X-Password")

        if not inputted_password or inputted_password != GLOBAL_PASSWORD:
            raise HTTPException(
                status_code=401,
                detail="Invalid password"
            )
            
        return await call_next(request)