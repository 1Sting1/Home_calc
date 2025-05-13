from typing import List, Optional, Dict, Any, Union
from pydantic import BaseModel, EmailStr, Field
from enum import Enum
from datetime import datetime

# Auth Schemas
class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    name: str
    lastname: str
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(UserBase):
    id: int
    name: str
    lastname: str
    is_active: bool
    subscription_type: str
    is_admin: bool = False
    
    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

# House Types
class HouseTypeEnum(str, Enum):
    BRICK = "brick"
    WOODEN = "wooden"
    CONCRETE = "concrete"
    BLOCKS = "blocks"

# Foundation Schemas
class FoundationBase(BaseModel):
    width: float
    depth: float
    length: float
    type: str
    has_basement: bool = Field(..., alias="hasBasement")
    has_basement_floor: bool = Field(..., alias="hasBasementFloor")
    floor_material: Optional[str] = Field(None, alias="floorMaterial")
    finishing: Optional[str] = None

# Wall Schemas
class WallBase(BaseModel):
    width: float  # blocks count or width in meters
    length: float
    height: float
    material: str
    insulation: str
    finishing: Optional[str] = None

# Roof Schemas
class RoofBase(BaseModel):
    type: str
    material: str
    length: float
    width: float

# Calculation Schemas
class CalculationCreate(BaseModel):
    house_type: HouseTypeEnum = Field(..., alias="houseType")
    foundation: FoundationBase
    walls: List[WallBase]
    roof: RoofBase

    class Config:
        allow_population_by_field_name = True

class CalculationResultItem(BaseModel):
    name: str
    quantity: float
    unit: str
    price_per_unit: Optional[float] = None
    total_price: Optional[float] = None

class CalculationResult(BaseModel):
    materials: List[CalculationResultItem]
    total_area: float
    total_cost: Optional[float] = None

class CalculationResponse(BaseModel):
    id: int
    house_type: HouseTypeEnum
    input_data: Dict[str, Any]
    result_data: CalculationResult
    created_at: datetime
    
    class Config:
        orm_mode = True

# Material Schemas
class MaterialBase(BaseModel):
    name: str
    type: str
    house_type: Optional[HouseTypeEnum] = None
    price_per_unit: float
    unit: str
    description: Optional[str] = None

class MaterialCreate(MaterialBase):
    pass

class MaterialResponse(MaterialBase):
    id: int
    
    class Config:
        orm_mode = True 