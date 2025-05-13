from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Any, List
from app.database.database import get_db
from app.models.schemas import MaterialCreate, MaterialResponse, HouseTypeEnum
from app.models.models import Material, User, HouseType
from app.auth.jwt import get_current_active_user

router = APIRouter(
    prefix="/api/materials",
    tags=["materials"],
    responses={401: {"description": "Unauthorized"}},
)

@router.get("/", response_model=List[MaterialResponse])
def get_materials(
    house_type: HouseTypeEnum = None,
    db: Session = Depends(get_db)
) -> Any:
    query = db.query(Material)
    
    if house_type:
        query = query.filter(Material.house_type == house_type.value)
    
    materials = query.all()
    return materials

@router.get("/house-type/{house_type}", response_model=List[MaterialResponse])
def get_materials_by_house_type(
    house_type: HouseTypeEnum,
    db: Session = Depends(get_db)
) -> Any:
    materials = db.query(Material).filter(
        Material.house_type == house_type.value
    ).all()
    
    if not materials:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No materials found for house type: {house_type}"
        )
    
    return materials

@router.get("/{material_id}", response_model=MaterialResponse)
def get_material(
    material_id: int,
    db: Session = Depends(get_db)
) -> Any:
    material = db.query(Material).filter(Material.id == material_id).first()
    
    if not material:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Material not found"
        )
    
    return material

@router.post("/", response_model=MaterialResponse, status_code=status.HTTP_201_CREATED)
def create_material(
    material_data: MaterialCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    # Only admin users can create materials
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to create materials"
        )
    
    # Convert house_type from string to enum
    house_type_value = None
    if material_data.house_type:
        house_type_value = HouseType[material_data.house_type.upper()]
    
    # Create new material
    db_material = Material(
        name=material_data.name,
        type=material_data.type,
        house_type=house_type_value,
        price_per_unit=material_data.price_per_unit,
        unit=material_data.unit,
        description=material_data.description
    )
    
    db.add(db_material)
    db.commit()
    db.refresh(db_material)
    
    return db_material 