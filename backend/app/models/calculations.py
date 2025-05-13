from typing import Dict, List, Optional, Any
from app.models.schemas import CalculationResult, CalculationResultItem, HouseTypeEnum

def calculate_brick_house(data: Dict[str, Any]) -> CalculationResult:
    foundation = data.get("foundation", {})
    walls = data.get("walls", [])
    roof = data.get("roof", {})
    
    materials = []
    total_area = 0
    
    # Calculate foundation materials
    foundation_width = foundation.get("width", 0)
    foundation_depth = foundation.get("depth", 0)
    foundation_length = foundation.get("length", 0)
    foundation_type = foundation.get("type", "")
    has_basement = foundation.get("has_basement", False)
    has_basement_floor = foundation.get("has_basement_floor", False)
    
    # Calculate foundation volume
    foundation_volume = foundation_width * foundation_depth * foundation_length
    
    if foundation_type == "Железобетон":
        # Concrete in kg (density approx 2400 kg/m³)
        concrete_kg = foundation_volume * 2400
        # Steel reinforcement (approx 100 kg per m³ of concrete)
        steel_area = foundation_volume * 0.1 * 10  # Convert to m²
        
        materials.append(CalculationResultItem(
            name="Concrete Mix",
            quantity=concrete_kg,
            unit="kg"
        ))
        
        materials.append(CalculationResultItem(
            name="Reinforcement Steel",
            quantity=steel_area,
            unit="m²"
        ))
    
    # Calculate basement if needed
    if has_basement:
        basement_walls_area = 2 * (foundation_width + foundation_length) * foundation_depth
        materials.append(CalculationResultItem(
            name="Basement Walls Material",
            quantity=basement_walls_area,
            unit="m²"
        ))
        
        if has_basement_floor:
            basement_floor_area = foundation_width * foundation_length
            materials.append(CalculationResultItem(
                name="Basement Floor Material",
                quantity=basement_floor_area,
                unit="m²"
            ))
    
    # Calculate walls
    total_brick_count = 0
    total_mortar_kg = 0
    total_insulation_area = 0
    
    for wall in walls:
        wall_width = wall.get("width", 0)  # Number of bricks in width
        wall_length = wall.get("length", 0)
        wall_height = wall.get("height", 0)
        
        # Area calculation
        wall_area = wall_length * wall_height
        total_area += wall_area
        
        # Brick calculation (standard brick size ~0.25 x 0.12 x 0.065 m)
        brick_length = 0.25
        brick_width = 0.12
        brick_height = 0.065
        
        # Calculate number of bricks (considering width in blocks)
        bricks_per_m2 = 1 / (brick_length * brick_height) * wall_width
        wall_bricks = wall_area * bricks_per_m2
        
        # Account for openings
        # Assuming 15% of wall area is openings
        wall_bricks *= 0.85
        
        total_brick_count += wall_bricks
        
        # Calculate mortar (approx 0.02 m³ per m² of wall, density ~2000 kg/m³)
        mortar_volume = wall_area * 0.02
        mortar_kg = mortar_volume * 2000
        total_mortar_kg += mortar_kg
        
        # Calculate insulation
        insulation_area = wall_area
        total_insulation_area += insulation_area
    
    materials.append(CalculationResultItem(
        name="Standard Brick",
        quantity=round(total_brick_count),
        unit="piece"
    ))
    
    materials.append(CalculationResultItem(
        name="Cement Mortar",
        quantity=round(total_mortar_kg),
        unit="kg"
    ))
    
    materials.append(CalculationResultItem(
        name="Insulation Material",
        quantity=round(total_insulation_area, 2),
        unit="m²"
    ))
    
    # Calculate roof
    roof_length = roof.get("length", 0)
    roof_width = roof.get("width", 0)
    roof_type = roof.get("type", "")
    roof_material = roof.get("material", "")
    
    # Roof area calculation (simplified)
    roof_area = roof_length * roof_width * 1.2  # 1.2 coefficient for pitched roof
    
    materials.append(CalculationResultItem(
        name=f"Roof Material ({roof_material})",
        quantity=round(roof_area, 2),
        unit="m²"
    ))
    
    total_area += roof_area
    
    return CalculationResult(
        materials=materials,
        total_area=round(total_area, 2)
    )

def calculate_concrete_house(data: Dict[str, Any]) -> CalculationResult:
    foundation = data.get("foundation", {})
    walls = data.get("walls", [])
    roof = data.get("roof", {})
    
    materials = []
    total_area = 0
    
    # Calculate foundation (similar to brick house)
    foundation_width = foundation.get("width", 0)
    foundation_depth = foundation.get("depth", 0)
    foundation_length = foundation.get("length", 0)
    
    # Calculate foundation volume
    foundation_volume = foundation_width * foundation_depth * foundation_length
    
    # Concrete in kg (density approx 2400 kg/m³)
    concrete_kg = foundation_volume * 2400
    # Steel reinforcement (approx 100 kg per m³ of concrete)
    steel_area = foundation_volume * 0.1 * 10  # Convert to m²
    
    materials.append(CalculationResultItem(
        name="Foundation Concrete",
        quantity=concrete_kg,
        unit="kg"
    ))
    
    materials.append(CalculationResultItem(
        name="Foundation Reinforcement Steel",
        quantity=steel_area,
        unit="m²"
    ))
    
    # Calculate walls
    total_concrete_kg = 0
    total_steel_area = 0
    total_insulation_area = 0
    total_finishing_area = 0
    
    for wall in walls:
        wall_width = wall.get("width", 0)  # Thickness in concrete
        wall_length = wall.get("length", 0)
        wall_height = wall.get("height", 0)
        finishing = wall.get("finishing", "")
        
        # Area and volume calculation
        wall_area = wall_length * wall_height
        wall_volume = wall_area * wall_width / 100  # Convert thickness to meters
        total_area += wall_area
        
        # Concrete calculation
        wall_concrete_kg = wall_volume * 2400
        total_concrete_kg += wall_concrete_kg
        
        # Steel calculation (approx 80 kg per m³ of concrete for walls)
        wall_steel_area = wall_volume * 0.08 * 10
        total_steel_area += wall_steel_area
        
        # Insulation calculation
        insulation_area = wall_area
        total_insulation_area += insulation_area
        
        # Finishing calculation if applicable
        if finishing:
            total_finishing_area += wall_area
    
    materials.append(CalculationResultItem(
        name="Wall Concrete",
        quantity=round(total_concrete_kg),
        unit="kg"
    ))
    
    materials.append(CalculationResultItem(
        name="Wall Reinforcement Steel",
        quantity=round(total_steel_area, 2),
        unit="m²"
    ))
    
    materials.append(CalculationResultItem(
        name="Insulation Material",
        quantity=round(total_insulation_area, 2),
        unit="m²"
    ))
    
    if total_finishing_area > 0:
        materials.append(CalculationResultItem(
            name="Wall Finishing Material",
            quantity=round(total_finishing_area, 2),
            unit="m²"
        ))
    
    # Calculate roof (similar to brick house)
    roof_length = roof.get("length", 0)
    roof_width = roof.get("width", 0)
    roof_material = roof.get("material", "")
    
    # Roof area calculation
    roof_area = roof_length * roof_width * 1.2
    
    materials.append(CalculationResultItem(
        name=f"Roof Material ({roof_material})",
        quantity=round(roof_area, 2),
        unit="m²"
    ))
    
    total_area += roof_area
    
    return CalculationResult(
        materials=materials,
        total_area=round(total_area, 2)
    )

def calculate_wooden_house(data: Dict[str, Any]) -> CalculationResult:
    foundation = data.get("foundation", {})
    walls = data.get("walls", [])
    roof = data.get("roof", {})
    
    materials = []
    total_area = 0
    
    # Calculate foundation (simplified)
    foundation_width = foundation.get("width", 0)
    foundation_depth = foundation.get("depth", 0)
    foundation_length = foundation.get("length", 0)
    
    # Foundation area and volume
    foundation_area = foundation_width * foundation_length
    foundation_volume = foundation_area * foundation_depth
    
    # Typically wooden houses have concrete foundation
    materials.append(CalculationResultItem(
        name="Foundation Concrete",
        quantity=round(foundation_volume * 2400),  # Convert to kg
        unit="kg"
    ))
    
    # Calculate walls
    total_wood_volume = 0
    total_insulation_area = 0
    
    for wall in walls:
        wall_material = wall.get("material", "")
        wall_length = wall.get("length", 0)
        wall_height = wall.get("height", 0)
        wall_width = wall.get("width", 0)  # Thickness in wooden houses
        
        # Area calculation
        wall_area = wall_length * wall_height
        total_area += wall_area
        
        # Wood volume calculation
        # For timber/logs, calculate actual volume
        # Assuming width is in cm, convert to m
        wood_volume = wall_area * wall_width / 100
        
        # Adjust for openings (approx 15%)
        wood_volume *= 0.85
        
        total_wood_volume += wood_volume
        
        # Insulation calculation
        insulation_area = wall_area
        total_insulation_area += insulation_area
    
    # Add wood material based on type (timber or logs)
    materials.append(CalculationResultItem(
        name="Timber/Logs",
        quantity=round(total_wood_volume, 2),
        unit="m³"
    ))
    
    materials.append(CalculationResultItem(
        name="Insulation Material",
        quantity=round(total_insulation_area, 2),
        unit="m²"
    ))
    
    # Calculate roof
    roof_length = roof.get("length", 0)
    roof_width = roof.get("width", 0)
    roof_type = roof.get("type", "")
    roof_material = roof.get("material", "")
    
    # Roof area calculation
    roof_area = roof_length * roof_width * 1.2
    
    if roof_type == "Деревянная":
        # Calculate roof wood volume (assuming 4cm thickness)
        roof_wood_volume = roof_area * 0.04
        materials.append(CalculationResultItem(
            name="Roof Timber",
            quantity=round(roof_wood_volume, 2),
            unit="m³"
        ))
    
    materials.append(CalculationResultItem(
        name=f"Roof Material ({roof_material})",
        quantity=round(roof_area, 2),
        unit="m²"
    ))
    
    total_area += roof_area
    
    return CalculationResult(
        materials=materials,
        total_area=round(total_area, 2)
    )

def calculate_blocks_house(data: Dict[str, Any]) -> CalculationResult:
    foundation = data.get("foundation", {})
    walls = data.get("walls", [])
    roof = data.get("roof", {})
    
    materials = []
    total_area = 0
    
    # Calculate foundation (similar to other houses)
    foundation_width = foundation.get("width", 0)
    foundation_depth = foundation.get("depth", 0)
    foundation_length = foundation.get("length", 0)
    
    # Foundation volume
    foundation_volume = foundation_width * foundation_depth * foundation_length
    
    materials.append(CalculationResultItem(
        name="Foundation Concrete",
        quantity=round(foundation_volume * 2400),  # Convert to kg
        unit="kg"
    ))
    
    # Calculate walls
    total_blocks_count = 0
    total_mortar_kg = 0
    total_insulation_area = 0
    total_finishing_area = 0
    block_type = ""
    
    for wall in walls:
        wall_width = wall.get("width", 0)  # Number of blocks in width
        wall_length = wall.get("length", 0)
        wall_height = wall.get("height", 0)
        wall_material = wall.get("material", "")
        finishing = wall.get("finishing", "")
        
        # Remember block type
        block_type = wall_material
        
        # Area calculation
        wall_area = wall_length * wall_height
        total_area += wall_area
        
        # Blocks calculation (standard block size ~0.6 x 0.3 x 0.2 m)
        block_length = 0.6
        block_height = 0.2
        
        # Calculate number of blocks (considering width in blocks)
        blocks_per_m2 = 1 / (block_length * block_height) * wall_width
        wall_blocks = wall_area * blocks_per_m2
        
        # Account for openings (approx 15%)
        wall_blocks *= 0.85
        
        total_blocks_count += wall_blocks
        
        # Calculate mortar (approx 0.01 m³ per m² of wall, density ~2000 kg/m³)
        mortar_volume = wall_area * 0.01
        mortar_kg = mortar_volume * 2000
        total_mortar_kg += mortar_kg
        
        # Calculate insulation
        insulation_area = wall_area
        total_insulation_area += insulation_area
        
        # Finishing calculation if applicable
        if finishing:
            total_finishing_area += wall_area
    
    materials.append(CalculationResultItem(
        name=block_type,
        quantity=round(total_blocks_count),
        unit="piece"
    ))
    
    materials.append(CalculationResultItem(
        name="Special Mortar",
        quantity=round(total_mortar_kg),
        unit="kg"
    ))
    
    materials.append(CalculationResultItem(
        name="Insulation Material",
        quantity=round(total_insulation_area, 2),
        unit="m²"
    ))
    
    if total_finishing_area > 0:
        materials.append(CalculationResultItem(
            name="Wall Finishing Material",
            quantity=round(total_finishing_area, 2),
            unit="m²"
        ))
    
    # Calculate roof (similar to other houses)
    roof_length = roof.get("length", 0)
    roof_width = roof.get("width", 0)
    roof_material = roof.get("material", "")
    
    # Roof area calculation
    roof_area = roof_length * roof_width * 1.2
    
    materials.append(CalculationResultItem(
        name=f"Roof Material ({roof_material})",
        quantity=round(roof_area, 2),
        unit="m²"
    ))
    
    total_area += roof_area
    
    return CalculationResult(
        materials=materials,
        total_area=round(total_area, 2)
    )

def calculate_materials(house_type: HouseTypeEnum, data: Dict[str, Any]) -> CalculationResult:
    if house_type == HouseTypeEnum.BRICK:
        return calculate_brick_house(data)
    elif house_type == HouseTypeEnum.CONCRETE:
        return calculate_concrete_house(data)
    elif house_type == HouseTypeEnum.WOODEN:
        return calculate_wooden_house(data)
    elif house_type == HouseTypeEnum.BLOCKS:
        return calculate_blocks_house(data)
    else:
        raise ValueError(f"Unsupported house type: {house_type}") 