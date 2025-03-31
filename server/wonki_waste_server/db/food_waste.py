from typing import Optional, Sequence

from sqlmodel import Session, select

from wonki_waste_server.db.models import FoodWaste, FoodWasteCreate


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


def save_food_waste(*, session: Session, food_waste: FoodWaste) -> FoodWaste:
    session.add(food_waste)
    session.commit()
    session.refresh(food_waste)
    return food_waste
