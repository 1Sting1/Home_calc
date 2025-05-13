from sqlalchemy.orm import Session
from app.models.models import User, Material, HouseType, MaterialType
from app.auth.jwt import get_password_hash

def init_db(db: Session):
    # Check if we already have the admin user
    admin_exists = db.query(User).filter(User.email == "admin@example.com").first()
    if not admin_exists:
        admin_user = User(
            email="admin@example.com",
            name="Admin",
            lastname="User",
            hashed_password=get_password_hash("adminpassword"),
            is_active=True,
            is_admin=True,
            subscription_type="premium"
        )
        db.add(admin_user)
        db.commit()
        print("Admin user created successfully")
    
    # Add sample materials for each house type if they don't exist
    if db.query(Material).count() == 0:
        # Brick materials
        brick_materials = [
            Material(
                name="Standard Brick",
                type=MaterialType.BRICK,
                house_type=HouseType.BRICK,
                price_per_unit=0.5,
                unit="piece",
                description="Standard building brick"
            ),
            Material(
                name="Cement Mortar",
                type=MaterialType.OTHER,
                house_type=HouseType.BRICK,
                price_per_unit=0.05,
                unit="kg",
                description="Mortar for brick laying"
            ),
            Material(
                name="Mineral Wool",
                type=MaterialType.INSULATION,
                house_type=HouseType.BRICK,
                price_per_unit=5.0,
                unit="m²",
                description="Insulation material"
            ),
            Material(
                name="Metal Roof Panel",
                type=MaterialType.ROOFING,
                house_type=HouseType.BRICK,
                price_per_unit=15.0,
                unit="m²",
                description="Metal roofing material"
            ),
            Material(
                name="Shingle",
                type=MaterialType.ROOFING,
                house_type=HouseType.BRICK,
                price_per_unit=12.0,
                unit="m²",
                description="Shingle roofing material"
            ),
            Material(
                name="Vinyl Siding",
                type=MaterialType.OTHER,
                house_type=HouseType.BRICK,
                price_per_unit=10.0,
                unit="m²",
                description="Exterior siding material"
            ),
        ]
        
        # Concrete materials
        concrete_materials = [
            Material(
                name="Concrete Mix",
                type=MaterialType.CONCRETE,
                house_type=HouseType.CONCRETE,
                price_per_unit=0.1,
                unit="kg",
                description="Concrete for construction"
            ),
            Material(
                name="Reinforcement Steel",
                type=MaterialType.OTHER,
                house_type=HouseType.CONCRETE,
                price_per_unit=2.0,
                unit="m²",
                description="Steel reinforcement for concrete"
            ),
            Material(
                name="Fiberglass Insulation",
                type=MaterialType.INSULATION,
                house_type=HouseType.CONCRETE,
                price_per_unit=4.5,
                unit="m²",
                description="Insulation material"
            ),
            Material(
                name="Metal Roof Panel",
                type=MaterialType.ROOFING,
                house_type=HouseType.CONCRETE,
                price_per_unit=15.0,
                unit="m²",
                description="Metal roofing material"
            ),
            Material(
                name="Brick Veneer",
                type=MaterialType.OTHER,
                house_type=HouseType.CONCRETE,
                price_per_unit=12.0,
                unit="m²",
                description="Decorative brick facing"
            ),
        ]
        
        # Wooden materials
        wooden_materials = [
            Material(
                name="Timber",
                type=MaterialType.WOOD,
                house_type=HouseType.WOODEN,
                price_per_unit=300.0,
                unit="m³",
                description="Construction timber"
            ),
            Material(
                name="Log",
                type=MaterialType.WOOD,
                house_type=HouseType.WOODEN,
                price_per_unit=350.0,
                unit="m³",
                description="Construction logs"
            ),
            Material(
                name="Polyethylene Insulation",
                type=MaterialType.INSULATION,
                house_type=HouseType.WOODEN,
                price_per_unit=3.0,
                unit="m²",
                description="Insulation material"
            ),
            Material(
                name="Wooden Roof Board",
                type=MaterialType.ROOFING,
                house_type=HouseType.WOODEN,
                price_per_unit=10.0,
                unit="m²",
                description="Wooden roof material"
            ),
            Material(
                name="Metal Roof Frame",
                type=MaterialType.OTHER,
                house_type=HouseType.WOODEN,
                price_per_unit=25.0,
                unit="m²",
                description="Metal framework for roof"
            ),
        ]
        
        # Gas and foam blocks materials
        blocks_materials = [
            Material(
                name="Gas Block",
                type=MaterialType.BLOCKS,
                house_type=HouseType.BLOCKS,
                price_per_unit=2.0,
                unit="piece",
                description="Gas-concrete building block"
            ),
            Material(
                name="Foam Block",
                type=MaterialType.BLOCKS,
                house_type=HouseType.BLOCKS,
                price_per_unit=1.8,
                unit="piece",
                description="Foam-concrete building block"
            ),
            Material(
                name="Special Mortar",
                type=MaterialType.OTHER,
                house_type=HouseType.BLOCKS,
                price_per_unit=0.08,
                unit="kg",
                description="Special mortar for blocks"
            ),
            Material(
                name="Expanded Polystyrene",
                type=MaterialType.INSULATION,
                house_type=HouseType.BLOCKS,
                price_per_unit=2.5,
                unit="m²",
                description="Insulation material"
            ),
            Material(
                name="Corrugated Roofing",
                type=MaterialType.ROOFING,
                house_type=HouseType.BLOCKS,
                price_per_unit=8.0,
                unit="m²",
                description="Corrugated roofing material"
            ),
        ]
        
        # Add all materials to the database
        for material in (brick_materials + concrete_materials + wooden_materials + blocks_materials):
            db.add(material)
        
        db.commit()
        print("Sample materials added successfully") 