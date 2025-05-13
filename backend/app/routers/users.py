from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Any
from app.database.database import get_db
from app.models.schemas import UserResponse
from app.models.models import User
from app.auth.jwt import get_current_active_user, get_password_hash

router = APIRouter(
    prefix="/api/users",
    tags=["users"],
    responses={401: {"description": "Unauthorized"}},
)

@router.get("/profile", response_model=UserResponse)
def get_user_profile(
    current_user: User = Depends(get_current_active_user)
) -> Any:
    return current_user

@router.put("/profile", response_model=UserResponse)
def update_user_profile(
    update_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    # Get user from database
    db_user = db.query(User).filter(User.id == current_user.id).first()
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Update user fields
    if "name" in update_data:
        db_user.name = update_data["name"]
    if "lastname" in update_data:
        db_user.lastname = update_data["lastname"]
    if "password" in update_data:
        db_user.hashed_password = get_password_hash(update_data["password"])
    
    db.commit()
    db.refresh(db_user)
    
    return db_user

@router.put("/subscription", response_model=UserResponse)
def update_subscription(
    subscription_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    # Get user from database
    db_user = db.query(User).filter(User.id == current_user.id).first()
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Update subscription type
    subscription_type = subscription_data.get("subscription_type")
    if subscription_type in ["free", "premium"]:
        db_user.subscription_type = subscription_type
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid subscription type"
        )
    
    db.commit()
    db.refresh(db_user)
    
    return db_user 