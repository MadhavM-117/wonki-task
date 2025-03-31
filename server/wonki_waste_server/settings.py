import os

import dotenv

dotenv.load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

SECRET_KEY = os.getenv("SECRET_KEY", "secret")

ALGORITHM = "HS512"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

BASE_API_URL = "/api/v1"
