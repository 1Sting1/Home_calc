from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Any, List
from app.database.database import get_db
from app.models.schemas import CalculationCreate, CalculationResponse, CalculationResult
from app.models.models import Calculation, User
from app.models.calculations import calculate_materials
from app.auth.jwt import get_current_active_user

router = APIRouter(
    prefix="/api/calculations",
    tags=["calculations"],
    responses={401: {"description": "Unauthorized"}},
)

@router.post("/", response_model=CalculationResponse, status_code=status.HTTP_201_CREATED)
def create_calculation(
    calculation_data: CalculationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    # Calculate materials
    result = calculate_materials(calculation_data.house_type, calculation_data.dict(by_alias=True))
    
    # Save calculation to database
    db_calculation = Calculation(
        user_id=current_user.id,
        house_type=calculation_data.house_type.value,
        input_data=calculation_data.dict(by_alias=True),
        result_data=result.dict()
    )
    
    db.add(db_calculation)
    db.commit()
    db.refresh(db_calculation)
    
    return db_calculation

@router.post("/calculate", response_model=CalculationResult)
def calculate(
    calculation_data: CalculationCreate,
    current_user: User = Depends(get_current_active_user)
) -> Any:
    # Just calculate without saving to database
    return calculate_materials(calculation_data.house_type, calculation_data.dict(by_alias=True))

@router.get("/", response_model=List[CalculationResponse])
def get_user_calculations(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
    skip: int = 0,
    limit: int = 100
) -> Any:
    calculations = db.query(Calculation).filter(
        Calculation.user_id == current_user.id
    ).offset(skip).limit(limit).all()
    
    return calculations

@router.get("/{calculation_id}", response_model=CalculationResponse)
def get_calculation(
    calculation_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    calculation = db.query(Calculation).filter(
        Calculation.id == calculation_id,
        Calculation.user_id == current_user.id
    ).first()
    
    if not calculation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Calculation not found"
        )
    
    return calculation 