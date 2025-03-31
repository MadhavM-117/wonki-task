from fastapi import APIRouter

from wonki_waste_server.api.routes import auth, category, food_waste

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(auth.router)
api_router.include_router(category.router)
api_router.include_router(food_waste.router)
