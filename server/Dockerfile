FROM python:3.10-slim

WORKDIR /app

# Install system dependencies including libpq for psycopg[c]
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY pyproject.toml .
COPY README.md .

# Copy application code
COPY wonki_waste_server/ ./wonki_waste_server/
COPY load_sample_data.py .
COPY data/ ./data/

RUN pip install . 

# Set environment variables
ENV PYTHONPATH=/app
ENV DATABASE_URL=postgresql+psycopg://wonki:nofoodwaste@postgres/wonki_db
ENV SECRET_KEY=secret

# Expose the API port
EXPOSE 8000

# Command to run the application
CMD ["uvicorn", "wonki_waste_server.main:app", "--host", "0.0.0.0"]
