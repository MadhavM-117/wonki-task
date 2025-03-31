from typing import Optional, Sequence

from sqlmodel import Session, select

from wonki_waste_server.db.models import Category, CategoryCreate


def create_category(*, session: Session, category_create: CategoryCreate) -> Category:
    db_obj = Category.model_validate(category_create)
    session.add(db_obj)
    session.commit()
    session.refresh(db_obj)
    return db_obj


def get_category_by_name(*, session: Session, name: str) -> Optional[Category]:
    statement = select(Category).where(Category.name == name)
    return session.exec(statement).first()


def get_category_by_id(*, session: Session, id: int) -> Optional[Category]:
    statement = select(Category).where(Category.id == id)
    return session.exec(statement).first()


def get_all_categories(*, session: Session) -> Sequence[Category]:
    statement = select(Category)
    return session.exec(statement).all()


def save_category(*, session: Session, category: Category) -> Category:
    session.add(category)
    session.commit()
    session.refresh(category)
    return category
