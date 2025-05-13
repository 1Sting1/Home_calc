from fastapi import FastAPI, Request, Depends, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.exc import SQLAlchemyError
import app.routers.auth as auth
import app.routers.users as users
import app.routers.calculations as calculations
import app.routers.materials as materials
from app.database.database import engine, get_db
from app.models.models import Base, User
from app.database.init_db import init_db
from app.auth.jwt import (
    authenticate_user, create_access_token, get_password_hash,
    ACCESS_TOKEN_EXPIRE_MINUTES
)
from app.models.schemas import UserCreate, UserResponse, Token
from sqlalchemy.orm import Session
from datetime import timedelta
from fastapi.security import OAuth2PasswordRequestForm
from typing import Any
from fastapi import status, HTTPException

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

# Initialize the FastAPI app
app = FastAPI(
    title="House Calculator API",
    description="API for calculating house construction materials",
    version="1.0.0",
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(calculations.router)
app.include_router(materials.router)

# Exception handler for SQLAlchemy errors
@app.exception_handler(SQLAlchemyError)
async def sqlalchemy_exception_handler(request: Request, exc: SQLAlchemyError):
    return JSONResponse(
        status_code=500,
        content={"message": "Database error occurred", "detail": str(exc)},
    )

# Initialize database with default data on startup
@app.on_event("startup")
async def startup_event():
    db = next(get_db())
    init_db(db)

@app.get("/api/health")
def health_check():
    return {"status": "ok"}

@app.get("/")
def root():
    return {"message": "Welcome to House Calculator API. Navigate to /docs for API documentation."}

# Direct API routes for compatibility with frontend
@app.post("/api/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def direct_register(user_data: UserCreate, db: Session = Depends(get_db)) -> Any:
    # Check if user with the same email already exists
    db_user = db.query(User).filter(User.email == user_data.email).first()
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )
    
    # Create new user
    hashed_password = get_password_hash(user_data.password)
    db_user = User(
        email=user_data.email,
        name=user_data.name,
        lastname=user_data.lastname,
        hashed_password=hashed_password,
        is_active=True,
        is_admin=False,
        subscription_type="free"
    )
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return db_user

@app.post("/api/login", response_model=Token)
def direct_login(response: Response, form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)) -> Any:
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    
    # Set a cookie to simulate authentication
    response_data = {"access_token": access_token, "token_type": "bearer"}
    response.set_cookie(
        key="session",
        value=f"user_id={user.id}",
        httponly=True,
        max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    )
    
    return response_data

@app.get("/api/user", response_model=UserResponse)
def get_current_user(request: Request, db: Session = Depends(get_db)):
    # Try to get user id from cookie
    session_cookie = request.cookies.get("session", "")
    user_id = None
    
    if session_cookie and "user_id=" in session_cookie:
        try:
            user_id = int(session_cookie.split("user_id=")[1])
            # Try to get user by id
            user = db.query(User).filter(User.id == user_id).first()
            if user:
                return user
        except:
            pass
    
    # Fallback: return first active user
    user = db.query(User).filter(User.is_active == True).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
        )
    
    return user

@app.post("/api/logout")
def direct_logout(response: Response):
    response.delete_cookie(key="session")
    return {"message": "Logged out successfully"} 