from typing import Annotated

from fastapi import Depends
from sqlmodel import Session, SQLModel, create_engine

from wonki_waste_server import settings

assert settings.DATABASE_URL is not None, "DATABASE_URL env variable must be specified"
engine = create_engine(settings.DATABASE_URL)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]
