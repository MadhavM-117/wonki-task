# Wonki Waste Server

## Database Schema

### User

| Field    | Type | Description             |
|----------|------|-------------------------|
| id       | int  | primary key, serial     |
| name     | text | user's full name        |
| username | text | unique user name        |
| password | text | hash of user's password |

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
| surplus_weight_kg | double precision | surplus weight                                        |
| bbe_date          | date             | best before / expiry date                             |



## APIs

The APIs are run using FastAPI. 
- Performant
- Lightweight
- Easy to setup and use
