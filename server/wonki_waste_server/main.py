from fastapi import FastAPI, Response, status

from wonki_waste_server.api.routes import api_router

app = FastAPI()

app.include_router(api_router)


@app.get("/health")
def check_health():
    return Response(status_code=status.HTTP_204_NO_CONTENT)
