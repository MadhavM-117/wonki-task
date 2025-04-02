# Wonki - Food Waste Tracker

## Task
- Cloud Storage: GCP
- Backend modelling: Python

Create a Food Waste Tracker to: 
1. Log food waste data
2. Visualize trends over time

Goals to achieve: 
1. Database for Persistence
2. Authentication 
3. Data Input & Storage
4. Data Delete
5. Data Querying with Filtering & Sorting
6. Data Visualisation

I re-ordered the goals so that each goal builds on top of the previous in a meaningful way.

## Local setup and execution

The easiest way to run this locally is via [docker compose](https://docs.docker.com/compose/). 

Once you have it installed, navigate to the directory with the `compose.yaml` file, and run the following commands:
```bash
# Run this only when you want to restart from scratch
# docker compose down

# build and start the application
docker compose up -d

# load sample data. You should only do this once (when starting from scratch)
docker compose exec server bash
python load_sample_data.py
```

Once you've done that, you can:
- Visit the application at [http://localhost:4173](http://localhost:4173)
- View the API docs at: [http://localhost:8000/docs](http://localhost:8000/docs)
- Call the API at: [http://localhost:8000/](http://localhost:8000/)


## Approach

1. High level decision about the tools to use to solve this. 
    1. `postgresql16` as the Database. Easy to run a local instance via docker compose.
    2. As the backend modelling is in Python, having the server be in Python can potentially allow for easier integration in the future.
    3. `FastAPI` as the web framework for building APIs in Python. Fast, easy to learn, and has auto-generated API docs. 
        We want a stateless server for simplicity, so we will follow `ReST` API guidelines where possible.
    4. `SQLModel` as the ORM as it integrates nicely with FastAPI, postgresql and pydantic (for type validation).
    5. `React` for the front-end. Most popular web framework, good community, and a sea of supporting tools. 
    6. `Typescript` for types in the front-end. Working on a typed language makes it easier to read later.
    7. `Tailwindcss`, `shadcn/ui`, `recharts` for styling, layout and data visualisation, to build faster.
    8. `Docker Compose` for easy cross-platform execution of the final application. 

2. Designing the server / backend.
    1. Database schema design comes first, based on requirements. 
    2. Create Models for Requests, Responses, Filtering and other operations.
    3. Authentication approach needs to be considered next. We're using JWT with oauth2, supported by FastAPI.
    4. Remaining API design. We need `CRUD` (Create, Retrieve, Update, Delete) APIs for the different data we're storing.
       We also version the APIs `/api/v1` to allow for future enhancements, while maintaining backward compatibility.
    5. (Ideally, testing plan and structure would be done here. However, I skipped this in the interest of time.) 

3. Implement the backend. 
    1. FastAPI, SQLModel, and pydanctic were new to me, so used the [template repo](https://github.com/fastapi/full-stack-fastapi-template) as reference.
    2. Validate the APIs as you build them, with manual testing using the swagger docs at `http://localhost:8000/docs`.

4. Design the frontend.
    1. Sketch out the rough layout you want. Verify what's achievable with the tools and time available.
    2. Decide tools for routing(`react-router`), and state management(`redux`), and whether they're required.
    3. Plan out the content to be displayed in the graphs and the goals they should achieve.
    4. Ensure user workflows follow good UX patterns, and content displayed is thematically consistent.
    5. Integrate brand identity into the UI design where possible.

5. Implement the frontend. 
    1. I was relatively comfortable with the tools, but there was a lot to be done, to meet the design I had in mind. 

6. Integrate front-end and back-end.
    1. Fetch data from the back-end to be displayed on the front-end.
    2. Watch out for CORS issues when deploying, as they are likely to be on different urls. 


7. Track Food Waste!
    

## Known Limitations

### API / Backend
1. Signup API doesn't work the first ten tries. It works fine after. Most likely an issue with SQLModel and the sample data loading script.
2. Database migrations aren't handled well. Each time API server loads, it ensures all models exist. This is not ideal. Ideally, `Alembic` or another migration manager should be used.
3. No tests means the code is quite fragile in the long-term.
4. Auth tokens are being stored in local storage. There is no refresh token, for auto-refresh. Auth tokens are better stored in domain-specific cookies.
5. No pagination for large responses. Will be a problem with more data.

### UI / Frontend
1. We make a lot of redundant API calls, which can be avoided with an active caching strategy. 
2. As we're fetching the entire dataset, filtering logic can happen on the client instead of the server.
3. We're missing global state sharing (`redux`), so sharing state between components that are far away can be tricky.
4. Create / Delete FoodWaste entry workflows have suboptimal state management. Ideally, create / delete should trigger a refresh. 
   Currently, we're just simulating a refresh with local state changes. 
5. Design doesn't represent the brand well enough. 
6. Styling could be better, especially for the data dashboard.
7. UI isn't responsive. Looks good on large desktop screens, doesn't work very well on smaller screens.
8. Again, no tests. 


