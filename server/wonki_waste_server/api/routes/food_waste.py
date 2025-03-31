from typing import Annotated, Sequence

from fastapi import APIRouter, HTTPException, Path, status

from wonki_waste_server.api.deps import CurrentUser, SessionDep
from wonki_waste_server.db.food_waste import (
    get_all_foodwaste,
    get_food_waste_by_id,
    get_food_waste_by_owner,
)
from wonki_waste_server.db.models import FoodWastePublic

router = APIRouter(prefix="/food-waste")


@router.get("/", response_model=Sequence[FoodWastePublic])
def all_foodwaste(session: SessionDep, _: CurrentUser):
    return get_all_foodwaste(session=session)


@router.get("/owned", response_model=Sequence[FoodWastePublic])
def owned_foodwaste(
    session: SessionDep,
    current_user: CurrentUser,
):
    if not current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Bad User",
        )
    return get_food_waste_by_owner(session=session, owner_id=current_user.id)


@router.get("/{foodwaste_id}", response_model=Sequence[FoodWastePublic])
def foodwaste_by_id(
    foodwaste_id: Annotated[int, Path(title="ID of the foodwaste entry to get")],
    session: SessionDep,
    _: CurrentUser,
):
    return get_food_waste_by_id(session=session, id=foodwaste_id)
