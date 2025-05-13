from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float, DateTime, JSON, Text, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.database import Base
import enum

class HouseType(enum.Enum):
    BRICK = "brick"
    WOODEN = "wooden"
    CONCRETE = "concrete"
    BLOCKS = "blocks"

class MaterialType(enum.Enum):
    BRICK = "brick"
    CONCRETE = "concrete"
    WOOD = "wood"
    BLOCKS = "blocks"
    INSULATION = "insulation"
    ROOFING = "roofing"
    OTHER = "other"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    name = Column(String)
    lastname = Column(String)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)
    subscription_type = Column(String, default="free")  # free or premium
    
    calculations = relationship("Calculation", back_populates="user")

class Material(Base):
    __tablename__ = "materials"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    type = Column(Enum(MaterialType))
    house_type = Column(Enum(HouseType))
    price_per_unit = Column(Float)
    unit = Column(String)  # e.g., m², m³, kg, piece
    description = Column(Text, nullable=True)

class Calculation(Base):
    __tablename__ = "calculations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    house_type = Column(Enum(HouseType))
    input_data = Column(JSON)  # Store all input parameters
    result_data = Column(JSON)  # Store calculation results
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    user = relationship("User", back_populates="calculations") 