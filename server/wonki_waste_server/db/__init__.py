from sqlmodel import SQLModel, create_engine

from wonki_waste_server import settings

assert settings.DATABASE_URL is not None, "DATABASE_URL env variable must be specified"
engine = create_engine(settings.DATABASE_URL)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)
