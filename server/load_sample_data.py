from csv import DictReader
from datetime import date
from decimal import Decimal
from os import path

from sqlmodel import Session

from wonki_waste_server.api.security import get_password_hash
from wonki_waste_server.db import engine
from wonki_waste_server.db.models import Category, FoodWaste, User


def get_csv_path():
    data_directory = path.join(path.dirname(__file__), "data")
    return path.join(data_directory, "sample-data.csv")


def create_users(session: Session):
    names = [
        "Alice",
        "Bob",
        "Charlie",
        "David",
        "Emily",
        "Frank",
        "Grace",
        "Hannah",
        "Ivy",
        "Jack",
    ]

    for index, name in enumerate(names):
        user = User(
            id=index + 1,
            username=name.lower(),
            full_name=name,
            password_hash=get_password_hash("password"),
        )

        session.add(user)

    session.commit()


def create_categories(session: Session):
    names = ["fruit", "dairy", "bakery"]

    for index, name in enumerate(names):
        category = Category(id=index + 1, name=name)

        session.add(category)

    session.commit()


def store_data_from_csv(session: Session):
    with open(get_csv_path()) as csvfile:
        reader = DictReader(csvfile)
        for row in reader:
            food_waste = FoodWaste(
                item_name=row["item_name"],
                category_id=int(row["category_id"]),
                surplus_weight_kg=Decimal(row["weight_kg"]),
                bbe_date=date.fromisoformat(row["bbe_date"]),
                owner_id=int(row["owner_id"]),
            )

            session.add(food_waste)
    session.commit()


def main():
    with Session(engine) as session:
        create_users(session)
        create_categories(session)
        store_data_from_csv(session)

    print("Loaded sample data successfully")


if __name__ == "__main__":
    main()
