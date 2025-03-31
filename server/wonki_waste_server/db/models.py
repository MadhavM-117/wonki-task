from datetime import date
from decimal import Decimal
from typing import List, Optional

from sqlmodel import Field, Relationship, SQLModel


class UserBase(SQLModel):
    full_name: str = Field(max_length=255)
    username: str = Field(unique=True, max_length=255)


class User(UserBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    password_hash: str

    food_waste: List["FoodWaste"] = Relationship(back_populates="owner")


class UserPublic(UserBase):
    id: int


class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=40)


class CategoryBase(SQLModel):
    name: str = Field(unique=True, max_length=255)


class Category(CategoryBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    food_waste: List["FoodWaste"] = Relationship(back_populates="category")


class CategoryPublic(UserBase):
    id: int


class CategoryCreate(CategoryBase):
    pass


class CategoryUpdate(CategoryBase):
    pass


class FoodWasteBase(SQLModel):
    item_name: str = Field(max_length=255)
    surplus_weight_kg: Decimal = Field(default=0, max_digits=15)
    bbe_date: date = Field()


class FoodWaste(FoodWasteBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    owner_id: int = Field(foreign_key="user.id", ondelete="CASCADE")
    category_id: int = Field(foreign_key="category.id", ondelete="RESTRICT")

    owner: User = Relationship(back_populates="food_waste")
    category: Category = Relationship(back_populates="food_waste")


class FoodWastePublic(FoodWasteBase):
    id: int
    owner: str
    category: str


class FoodWasteCreate(FoodWasteBase):
    owner_id: int
    category_id: int


class FoodWasteUpdate(FoodWasteBase):
    category_id: Optional[int] = Field(
        default=None, foreign_key="category.id", ondelete="RESTRICT"
    )
