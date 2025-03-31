from fastapi import APIRouter

from wonki_waste_server.api.routes import auth

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(auth.router)
