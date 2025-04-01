from datetime import date
from typing import Annotated, Optional, Sequence

from fastapi import APIRouter, HTTPException, Path, Query, Response, status

from wonki_waste_server.api.deps import CurrentUser, SessionDep
from wonki_waste_server.db.category import get_category_by_id
from wonki_waste_server.db.food_waste import (
    FoodWasteOrdering,
    delete_food_waste,
    get_filtered_foodwaste,
    get_food_waste_by_id,
)
from wonki_waste_server.db.models import FoodWastePublic
from wonki_waste_server.db.user import get_user_by_id

router = APIRouter(prefix="/food-waste")


@router.get("/", response_model=Sequence[FoodWastePublic])
def all_foodwaste(
    session: SessionDep,
    _: CurrentUser,
    category_id: Annotated[
        Optional[int], Query(title="Category ID to filter by")
    ] = None,
    bbe_after: Annotated[
        Optional[date], Query(title="Keep only entries after this date")
    ] = None,
    bbe_before: Annotated[
        Optional[date], Query(title="Keep only entries before this date")
    ] = None,
    owner_id: Annotated[Optional[int], Query(title="Owner ID to filter by")] = None,
    order_by: Annotated[
        Optional[FoodWasteOrdering], Query(title="Change ordering of FoodWaste Entries")
    ] = None,
):
    if category_id is not None:
        category = get_category_by_id(session=session, id=category_id)
        if not category:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Could not find a category with the specified id",
            )

    if owner_id is not None:
        owner = get_user_by_id(session=session, id=owner_id)
        if not owner:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Could not find a user with the specified id",
            )

    return get_filtered_foodwaste(
        session=session,
        category_id=category_id,
        owner_id=owner_id,
        bbe_after=bbe_after,
        bbe_before=bbe_before,
        order_by=order_by,
    )


@router.get("/owned", response_model=Sequence[FoodWastePublic])
def owned_foodwaste(
    session: SessionDep,
    current_user: CurrentUser,
    category_id: Annotated[
        Optional[int], Query(title="Category ID to filter by")
    ] = None,
    bbe_after: Annotated[
        Optional[date], Query(title="Keep only entries after this date")
    ] = None,
    bbe_before: Annotated[
        Optional[date], Query(title="Keep only entries before this date")
    ] = None,
    order_by: Annotated[
        Optional[FoodWasteOrdering], Query(title="Change ordering of FoodWaste Entries")
    ] = None,
):
    if not current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Bad User",
        )

    if category_id is not None:
        category = get_category_by_id(session=session, id=category_id)
        if not category:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Could not find a category with the specified id",
            )

    return get_filtered_foodwaste(
        session=session,
        category_id=category_id,
        owner_id=current_user.id,
        bbe_after=bbe_after,
        bbe_before=bbe_before,
        order_by=order_by,
    )


@router.get("/{foodwaste_id}", response_model=Sequence[FoodWastePublic])
def foodwaste_by_id(
    foodwaste_id: Annotated[int, Path(title="ID of the foodwaste entry to get")],
    session: SessionDep,
    _: CurrentUser,
):
    food_waste = get_food_waste_by_id(session=session, id=foodwaste_id)

    if not food_waste:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Could not find the food waste entry with the specified id",
        )

    return food_waste


@router.delete("/{foodwaste_id}")
def delete_foodwaste(
    foodwaste_id: Annotated[int, Path(title="ID of the foodwaste entry to delete")],
    session: SessionDep,
    _: CurrentUser,
):
    food_waste = get_food_waste_by_id(session=session, id=foodwaste_id)

    if not food_waste:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Could not find the food waste entry with the specified id",
        )

    delete_food_waste(session=session, food_waste=food_waste)

    return Response(status_code=status.HTTP_204_NO_CONTENT)
