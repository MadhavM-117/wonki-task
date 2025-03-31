# Wonki Waste Server

## Database Schema

### User

| Field     | Type | Description             |
|-----------|------|-------------------------|
| id        | int  | primary key, serial     |
| full_name | text | user's full name        |
| username  | text | unique user name        |
| password  | text | hash of user's password |

### Category

| Field | Type | Description           |
|-------|------|-----------------------|
| id    | int  | primary key, serial   |
| name  | text | category name, unique |

### Food Waste

| Field             | Type             | Description                                           |
|-------------------|------------------|-------------------------------------------------------|
| id                | int              | primary key, serial                                   |
| owner_id          | int              | foreign key, pointing to which user entered the value |
| category_id       | int              | foreign key, pointing to category                     |
| item_name         | text             | Name of item                                          |
| surplus_weight_kg | double precision | surplus weight (atleast 10 digits)                    |
| bbe_date          | date             | best before / expiry date                             |



## APIs

The APIs are run using FastAPI. 
- Performant
- Lightweight
- Easy to setup and use
