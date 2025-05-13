# House Calculator Backend

This is the backend for the House Calculator application, developed using FastAPI and PostgreSQL.

## Features

- User authentication with JWT tokens
- Material calculation for different house types (Brick, Wooden, Concrete, Gas/Foam Blocks)
- User profile management
- Calculation history
- Material database

## Technologies

- Python 3.9+
- FastAPI
- SQLAlchemy
- PostgreSQL
- Docker

## Getting Started

### Local Development

1. Make sure you have Python 3.9+ installed
2. Clone the repository
3. Set up a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
5. Create a `.env` file with database settings
6. Run the app:
   ```
   uvicorn app.main:app --reload
   ```

### Docker

The backend can be run as part of the docker-compose setup:

```
docker-compose up -d
```

## API Documentation

When the server is running, you can access the API documentation at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Authentication

The API uses JWT tokens for authentication:
1. Register at `/api/auth/register`
2. Login at `/api/auth/login` to get a token
3. Use the token in the Authorization header for protected endpoints

## Calculation

The main calculation endpoint is at `/api/calculations/calculate` which accepts house parameters and returns the required materials. 