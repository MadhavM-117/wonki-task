from typing import Annotated, Sequence

from fastapi import APIRouter, HTTPException, Path, status

from wonki_waste_server.api.deps import CurrentUser, SessionDep
from wonki_waste_server.db.category import (
    create_category,
    get_all_categories,
    get_category_by_id,
    get_category_by_name,
    save_category,
)
from wonki_waste_server.db.models import CategoryCreate, CategoryPublic, CategoryUpdate

router = APIRouter(prefix="/category")


@router.get("/", response_model=Sequence[CategoryPublic])
def get_categories(session: SessionDep, _: CurrentUser):
    return get_all_categories(session=session)


@router.post("/", response_model=CategoryPublic)
def create_a_category(category_in: CategoryCreate, session: SessionDep, _: CurrentUser):
    category = get_category_by_name(session=session, name=category_in.name)
    if category:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A category with this name already exists in the system",
        )

    category_create = CategoryCreate.model_validate(category_in)
    return create_category(session=session, category_create=category_create)


@router.get("/{category_id}", response_model=CategoryPublic)
def get_category(
    category_id: Annotated[int, Path(title="ID of the category to get")],
    session: SessionDep,
    _: CurrentUser,
):
    category = get_category_by_id(session=session, id=category_id)
    if not category:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Couldn't find the category with the specified id",
        )
    return category


@router.patch("/{category_id}", response_model=CategoryPublic)
def update_category(
    category_id: Annotated[int, Path(title="ID of the category to get")],
    category_update: CategoryUpdate,
    session: SessionDep,
    _: CurrentUser,
):
    category = get_category_by_id(session=session, id=category_id)
    if not category:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Couldn't find the category with the specified id",
        )

    update_dict = category_update.model_dump(exclude_unset=True)
    category.sqlmodel_update(update_dict)
    return save_category(session=session, category=category)
