from datetime import date
from typing import Literal, Optional, Sequence, TypeAlias

from sqlmodel import Session, asc, desc, select

from wonki_waste_server.db.models import FoodWaste, FoodWasteCreate

FoodWasteOrdering: TypeAlias = Literal[
    "bbe", "-bbe", "surplus_weight", "-surplus_weight"
]


def create_food_waste(
    *, session: Session, food_waste_create: FoodWasteCreate
) -> FoodWaste:
    db_obj = FoodWaste.model_validate(food_waste_create)
    session.add(db_obj)
    session.commit()
    session.refresh(db_obj)
    return db_obj


def get_food_waste_by_id(*, session: Session, id: int) -> Optional[FoodWaste]:
    statement = select(FoodWaste).where(FoodWaste.id == id)
    return session.exec(statement).first()


def get_food_waste_by_owner(*, session: Session, owner_id: int) -> Sequence[FoodWaste]:
    statement = select(FoodWaste).where(FoodWaste.owner_id == owner_id)
    return session.exec(statement).all()


def get_all_foodwaste(*, session: Session) -> Sequence[FoodWaste]:
    statement = select(FoodWaste)
    return session.exec(statement).all()


def get_filtered_foodwaste(
    *,
    session: Session,
    category_id: Optional[int],
    owner_id: Optional[int],
    bbe_after: Optional[date],
    bbe_before: Optional[date],
    order_by: Optional[FoodWasteOrdering],
):
    statement = select(FoodWaste)
    if category_id:
        statement = statement.where(FoodWaste.category_id == category_id)

    if owner_id:
        statement = statement.where(FoodWaste.owner_id == owner_id)

    if bbe_after:
        statement = statement.where(FoodWaste.bbe_date >= bbe_after)

    if bbe_before:
        statement = statement.where(FoodWaste.bbe_date <= bbe_before)

    if order_by:
        if order_by == "bbe":
            statement = statement.order_by(asc(FoodWaste.bbe_date))

        if order_by == "-bbe":
            statement = statement.order_by(desc(FoodWaste.bbe_date))

        if order_by == "surplus_weight":
            statement = statement.order_by(asc(FoodWaste.surplus_weight_kg))

        if order_by == "-surplus_weight":
            statement = statement.order_by(desc(FoodWaste.surplus_weight_kg))

    return session.exec(statement).all()


def save_food_waste(*, session: Session, food_waste: FoodWaste) -> FoodWaste:
    session.add(food_waste)
    session.commit()
    session.refresh(food_waste)
    return food_waste


def delete_food_waste(*, session: Session, food_waste: FoodWaste):
    session.delete(food_waste)
    session.commit()
    return
