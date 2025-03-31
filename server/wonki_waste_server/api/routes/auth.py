from datetime import timedelta
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm

from wonki_waste_server import settings
from wonki_waste_server.api import security
from wonki_waste_server.api.deps import CurrentUser, SessionDep
from wonki_waste_server.api.models import Token
from wonki_waste_server.db.models import UserCreate, UserPublic
from wonki_waste_server.db.user import authenticate, create_user, get_user_by_username

router = APIRouter(prefix="/auth")


@router.post("/token")
def login_access_token(
    session: SessionDep, form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
) -> Token:
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    user = authenticate(
        session=session, username=form_data.username, password=form_data.password
    )
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return Token(
        access_token=security.create_access_token(
            user.id, expires_delta=access_token_expires
        )
    )


@router.get("/whoami", response_model=UserPublic)
async def read_users_me(
    current_user: CurrentUser,
):
    return current_user


@router.post("/signup", response_model=UserPublic)
def register_user(session: SessionDep, user_in: UserCreate):
    """
    Create new user without the need to be logged in.
    """
    user = get_user_by_username(session=session, username=user_in.username)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this username already exists in the system",
        )
    user_create = UserCreate.model_validate(user_in)
    user = create_user(session=session, user_create=user_create)
    return user
