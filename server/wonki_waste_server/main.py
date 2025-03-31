from contextlib import asynccontextmanager

from fastapi import FastAPI, Response, status

from wonki_waste_server.api.routes import api_router
from wonki_waste_server.db import create_db_and_tables


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()

    yield


app = FastAPI(lifespan=lifespan)

app.include_router(api_router)


@app.get("/health")
def check_health():
    return Response(status_code=status.HTTP_204_NO_CONTENT)
