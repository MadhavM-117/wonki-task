from typing import Optional

from sqlmodel import Session, select

from wonki_waste_server.api.security import get_password_hash, verify_password
from wonki_waste_server.db.models import User, UserCreate


def create_user(*, session: Session, user_create: UserCreate) -> User:
    db_obj = User.model_validate(
        user_create, update={"password_hash": get_password_hash(user_create.password)}
    )
    session.add(db_obj)
    session.commit()
    session.refresh(db_obj)
    return db_obj

def get_user_by_id(*, session: Session, id: int) -> Optional[User]:
    statement = select(User).where(User.id == id)
    return session.exec(statement).first()

def get_user_by_username(*, session: Session, username: str) -> Optional[User]:
    statement = select(User).where(User.username == username)
    return session.exec(statement).first()


def authenticate(*, session: Session, username: str, password: str) -> Optional[User]:
    user = get_user_by_username(session=session, username=username)
    if not user:
        return None

    if not verify_password(password, user.password_hash):
        return None

    return user
