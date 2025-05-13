import { HouseType, CalculationData, MaterialResult, OpeningData } from "@/contexts/calculation-context";

export function calculateMaterials(houseType: HouseType, data: CalculationData): MaterialResult[] {
  const results: MaterialResult[] = [];
  
  // Calculate foundation materials
  const foundationVolume = data.foundation.width * data.foundation.depth * data.foundation.length;
  
  // Add foundation type explicitly
  results.push({
    material: data.foundation.type,
    quantity: 1,
    unit: "foundation"
  });
  
  if (data.foundation.type === 'reinforced-concrete') {
    // Calculate reinforced concrete (concrete mixture + rebar)
    const concreteWeight = foundationVolume * 2400; // 2400 kg/m³ is approx. density of concrete
    results.push({
      material: "concrete-mixture",
      quantity: parseFloat(concreteWeight.toFixed(2)),
      unit: "kg"
    });
    
    // Rebar is typically 100-200 kg per m³ of concrete
    const rebarAmount = foundationVolume * 150; // 150 kg/m³ as average
    results.push({
      material: "rebar",
      quantity: parseFloat(rebarAmount.toFixed(2)),
      unit: "kg"
    });
  } else {
    results.push({
      material: data.foundation.type + "-foundation",
      quantity: parseFloat(foundationVolume.toFixed(2)),
      unit: "m3"
    });
  }
  
  // Add basement materials if needed
  if (data.foundation.hasBasement) {
    results.push({
      material: "basement",
      quantity: 1,
      unit: "element"
    });
    
    if (data.foundation.wallMaterial) {
      // Calculate basement walls (assume 2.4m height)
      const basementPerimeter = 2 * (data.foundation.width + data.foundation.length);
      const basementWallArea = basementPerimeter * 2.4; // 2.4m standard height
      
      // Add basement wall material explicitly
      results.push({
        material: data.foundation.wallMaterial,
        quantity: 1,
        unit: "basement-walls"
      });
      
      if (data.foundation.wallMaterial === 'reinforced-concrete') {
        const basementWallVolume = basementWallArea * 0.2; // 20cm thick walls
        const concreteWeight = basementWallVolume * 2400;
        
        // Find if concrete mixture already exists in results
        const concreteIndex = results.findIndex(r => r.material === "concrete-mixture");
        if (concreteIndex >= 0) {
          results[concreteIndex].quantity += parseFloat(concreteWeight.toFixed(2));
        } else {
          results.push({
            material: "concrete-mixture",
            quantity: parseFloat(concreteWeight.toFixed(2)),
            unit: "kg"
          });
        }
        
        // Add rebar for basement walls
        const basementRebarAmount = basementWallVolume * 150;
        const rebarIndex = results.findIndex(r => r.material === "rebar");
        if (rebarIndex >= 0) {
          results[rebarIndex].quantity += parseFloat(basementRebarAmount.toFixed(2));
        } else {
          results.push({
            material: "rebar",
            quantity: parseFloat(basementRebarAmount.toFixed(2)),
            unit: "kg"
          });
        }
      } else if (data.foundation.wallMaterial === 'brick') {
        // Average brick calculation
        const brickVolume = 0.25 * 0.12 * 0.065;
        const brickCount = Math.ceil((basementWallArea * 0.25) / brickVolume);
        
        results.push({
          material: "basement-brick",
          quantity: brickCount,
          unit: "pcs"
        });
        
        // Mortar calculation
        const mortarVolume = (brickCount / 1000) * 0.2;
        results.push({
          material: "basement-mortar",
          quantity: parseFloat(mortarVolume.toFixed(2)),
          unit: "m3"
        });
      } else if (data.foundation.wallMaterial === 'gasblock' || data.foundation.wallMaterial === 'foamblock') {
        // Block calculation
        const blockVolume = 0.6 * 0.2 * 0.3;
        const blockCount = Math.ceil((basementWallArea * 0.2) / blockVolume);
        
        results.push({
          material: "basement-" + data.foundation.wallMaterial,
          quantity: blockCount,
          unit: "pcs"
        });
        
        // Mortar calculation
        const mortarVolume = (blockCount / 100) * 0.05;
        results.push({
          material: "basement-mortar",
          quantity: parseFloat(mortarVolume.toFixed(2)),
          unit: "m3"
        });
      } else if (data.foundation.wallMaterial === 'wood') {
        results.push({
          material: "basement-wood",
          quantity: parseFloat(basementWallArea.toFixed(2)),
          unit: "m2"
        });
      }
    }
    
    // Add basement floor if needed
    if (data.foundation.hasBasementFloor && data.foundation.floorMaterial) {
      const basementFloorArea = data.foundation.width * data.foundation.length;
      
      // Add basement floor material explicitly
      results.push({
        material: data.foundation.floorMaterial,
        quantity: 1,
        unit: "basement-floor"
      });
      
      if (data.foundation.floorMaterial === 'reinforced-concrete') {
        const floorThickness = 0.1; // 10cm standard floor
        const floorVolume = basementFloorArea * floorThickness;
        const concreteWeight = floorVolume * 2400;
        
        // Find if concrete mixture already exists in results
        const concreteIndex = results.findIndex(r => r.material === "concrete-mixture");
        if (concreteIndex >= 0) {
          results[concreteIndex].quantity += parseFloat(concreteWeight.toFixed(2));
        } else {
          results.push({
            material: "concrete-mixture",
            quantity: parseFloat(concreteWeight.toFixed(2)),
            unit: "kg"
          });
        }
        
        // Add rebar for floor
        const floorRebarAmount = floorVolume * 100; // Less rebar in floors
        const rebarIndex = results.findIndex(r => r.material === "rebar");
        if (rebarIndex >= 0) {
          results[rebarIndex].quantity += parseFloat(floorRebarAmount.toFixed(2));
        } else {
          results.push({
            material: "rebar",
            quantity: parseFloat(floorRebarAmount.toFixed(2)),
            unit: "kg"
          });
        }
      } else {
        results.push({
          material: "basement-floor-" + data.foundation.floorMaterial,
          quantity: parseFloat(basementFloorArea.toFixed(2)),
          unit: "m2"
        });
      }
    }
  }
  
  // Calculate wall materials
  data.walls.forEach((wall, wallIndex) => {
    // Рассчитаем площадь и другие показатели сразу
    // Calculate openings area to subtract from wall area
    let openingsArea = 0;
    if (wall.openings && wall.openings.length > 0) {
      wall.openings.forEach((opening, openingIndex) => {
        openingsArea += opening.width * opening.height;
      });
    }
    
    const wallArea = (wall.length * wall.height) - openingsArea;
    const insulationArea = wallArea;
    
    // Добавим только реальные материалы, а не метаданные
    if (wall.material === "brick") {
      // Average brick is 0.25x0.12x0.065m, calculate brick count
      const brickVolume = 0.25 * 0.12 * 0.065;
      const brickCount = Math.ceil((wallArea * 0.25) / brickVolume * wall.width);
      
      // Find if brick already exists in results
      const existingBrickIndex = results.findIndex(r => r.material === "brick" && r.unit === "pcs");
      if (existingBrickIndex >= 0) {
        results[existingBrickIndex].quantity += brickCount;
      } else {
        results.push({
          material: "brick",
          quantity: brickCount,
          unit: "pcs"
        });
      }
      
      // Mortar calculation (approximately 0.2 m³ per 1000 bricks)
      const mortarVolume = (brickCount / 1000) * 0.2;
      
      // Find if mortar already exists in results
      const existingMortarIndex = results.findIndex(r => r.material === "mortar");
      if (existingMortarIndex >= 0) {
        results[existingMortarIndex].quantity += parseFloat(mortarVolume.toFixed(2));
      } else {
        results.push({
          material: "mortar",
          quantity: parseFloat(mortarVolume.toFixed(2)),
          unit: "m3"
        });
      }
    } else if (wall.material === "timber" || wall.material === "log" || 
               wall.material === "glulam" || wall.material === "clb" || 
               wall.material === "frameWooden") {
      // Calculate wood volume in cubic meters
      const woodVolume = wallArea * 0.15; // Assuming 15cm thick wooden walls
      
      // Find if this wood type already exists in results for volume calculation
      const existingWoodIndex = results.findIndex(r => r.material === wall.material && r.unit === "m3");
      if (existingWoodIndex >= 0) {
        results[existingWoodIndex].quantity += parseFloat(woodVolume.toFixed(2));
      } else {
        results.push({
          material: wall.material,
          quantity: parseFloat(woodVolume.toFixed(2)),
          unit: "m3"
        });
      }
    } else if (wall.material === "reinforcedConcrete" || 
               wall.material === "monolithicConcrete" || 
               wall.material === "porousConcrete") {
      const wallVolume = wallArea * 0.2; // Assume 20cm thick walls
      const concreteWeight = wallVolume * 2400; // kg
      
      // Find if concrete mixture already exists in results
      const concreteIndex = results.findIndex(r => r.material === "concrete-mixture");
      if (concreteIndex >= 0) {
        results[concreteIndex].quantity += parseFloat(concreteWeight.toFixed(2));
      } else {
        results.push({
          material: "concrete-mixture",
          quantity: parseFloat(concreteWeight.toFixed(2)),
          unit: "kg"
        });
      }
      
      // Calculate rebar for walls
      const rebarAmount = wallVolume * 120; // less than foundation
      const rebarIndex = results.findIndex(r => r.material === "rebar");
      if (rebarIndex >= 0) {
        results[rebarIndex].quantity += parseFloat(rebarAmount.toFixed(2));
      } else {
        results.push({
          material: "rebar",
          quantity: parseFloat(rebarAmount.toFixed(2)),
          unit: "kg"
        });
      }
    } else if (wall.material === "gasblock" || wall.material === "foamblock" || 
               wall.material === "keramsitBlock" || wall.material === "cinderBlock" || 
               wall.material === "arboliteBlock") {
      // Average block size might be 0.6x0.2x0.3m
      const blockVolume = 0.6 * 0.2 * 0.3;
      const blockCount = Math.ceil((wallArea * 0.2) / blockVolume * wall.width);
      
      // Find if this block type already exists in results
      const existingBlockIndex = results.findIndex(r => r.material === wall.material && r.unit === "pcs");
      if (existingBlockIndex >= 0) {
        results[existingBlockIndex].quantity += blockCount;
      } else {
        results.push({
          material: wall.material,
          quantity: blockCount,
          unit: "pcs"
        });
      }
      
      // Mortar calculation for blocks
      const mortarVolume = (blockCount / 100) * 0.05;
      
      // Find if mortar already exists in results
      const existingMortarIndex = results.findIndex(r => r.material === "mortar");
      if (existingMortarIndex >= 0) {
        results[existingMortarIndex].quantity += parseFloat(mortarVolume.toFixed(2));
      } else {
        results.push({
          material: "mortar",
          quantity: parseFloat(mortarVolume.toFixed(2)),
          unit: "m3"
        });
      }
    }
    
    // Add insulation
    if (wall.insulation) {
      // Find if insulation already exists in results
      const existingInsulationIndex = results.findIndex(r => r.material === wall.insulation && r.unit === "m2");
      if (existingInsulationIndex >= 0) {
        results[existingInsulationIndex].quantity += parseFloat(insulationArea.toFixed(2));
      } else {
        results.push({
          material: wall.insulation,
          quantity: parseFloat(insulationArea.toFixed(2)),
          unit: "m2"
        });
      }
    }
    
    // Add finishing materials if specified
    if (wall.finishing) {
      // Find if finishing material already exists in results
      const existingFinishingIndex = results.findIndex(r => r.material === wall.finishing && r.unit === "m2");
      if (existingFinishingIndex >= 0) {
        results[existingFinishingIndex].quantity += parseFloat(wallArea.toFixed(2));
      } else {
        results.push({
          material: wall.finishing,
          quantity: parseFloat(wallArea.toFixed(2)),
          unit: "m2"
        });
      }
    }
  });
  
  // Calculate roof materials
  const roofArea = data.roof.length * data.roof.width;
  
  // Add roof type explicitly
  results.push({
    material: data.roof.type || "unknown-roof-type",
    quantity: 1,
    unit: "roof-type"
  });
  
  if (data.roof.material) {
    // Add roof material type explicitly
    results.push({
      material: data.roof.material,
      quantity: 1,
      unit: "roof-material"
    });
    
    // Add roof area calculation
    results.push({
      material: data.roof.material,
      quantity: parseFloat(roofArea.toFixed(2)),
      unit: "m2"
    });
  }
  
  // Удалим все элементы, которые имеют unit содержащий "wall-", "insulation-wall-" и т.д.
  // эти элементы нужны для внутренних расчетов, но не должны отображаться в итоговых результатах
  const filteredResults = results.filter(result => {
    // Оставляем только результаты с реальными единицами измерения (м², м³, шт, кг)
    return ["m2", "m3", "pcs", "kg", "piece"].includes(result.unit);
  });
  
  // Round all quantities to 2 decimal places
  filteredResults.forEach(result => {
    if (typeof result.quantity === 'number') {
      result.quantity = parseFloat(result.quantity.toFixed(2));
    }
  });
  
  return filteredResults;
}
