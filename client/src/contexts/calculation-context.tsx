import { createContext, ReactNode, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { calculateMaterials } from "@/lib/calculation";

export type HouseType = 'brick' | 'wooden' | 'concrete' | 'blocks';

export type MaterialType = 
  // Brick types
  | 'brick' | 'ceramicBrick' | 'clinkerBrick' | 'silicateBrick'
  // Concrete types
  | 'concrete' | 'reinforcedConcrete' | 'monolithicConcrete' | 'porousConcrete'
  // Wood types
  | 'wood' | 'timber' | 'log' | 'glulam' | 'clb' | 'frameWooden'
  // Block types
  | 'gasblock' | 'foamblock' | 'keramsitBlock' | 'cinderBlock' | 'arboliteBlock'
  // Insulation types
  | 'mineral' | 'foam' | 'eco' | 'extrudedPolystyrene' | 'stoneWool' | 'glassWool' | 'polyurethane' | 'cellulose'
  // Finishing types
  | 'siding' | 'plaster' | 'decorativePlaster' | 'compositePanels' | 'naturalStone' 
  | 'facadePanels' | 'blockHouse' | 'woodenPanels' | 'thermoWood' | 'imitationTimber'
  // Roof types
  | 'metal' | 'shingles' | 'metalTile' | 'metalSheets' | 'ceramicTile' | 'bitumenTile' 
  | 'compositeShingles' | 'slate' | 'woodenShingles' | 'greenRoof' | 'polycarbonate'
  // Foundation types
  | 'rubble' | 'stripFoundation' | 'pileFoundation' | 'monolithicSlab' 
  | 'pileGrillage' | 'screwPile' | 'concretePillars' | 'stone' | 'floatingFoundation'
  // Other
  | 'boards';

export type RoofType = 'metalFrame' | 'wooden' | 'reinforcedConcrete' | 'combined' | 'truss';

export interface FoundationData {
  width: number;
  depth: number;
  length: number;
  type: string;
  finishing?: string;
  hasBasement: boolean;
  hasBasementFloor: boolean;
  floorMaterial?: string;
  wallMaterial?: string; // Added wall material for basement
}

export interface WallData {
  width: number;
  length: number;
  height: number;
  material: string;
  insulation: string;
  finishing?: string;
  openings: OpeningData[];
}

export interface OpeningData {
  type: 'door' | 'window';
  width: number;
  height: number;
}

export interface RoofData {
  type: string;
  material: string;
  length: number;
  width: number;
}

export interface CalculationData {
  foundation: FoundationData;
  walls: WallData[];
  roof: RoofData;
}

export interface MaterialResult {
  material: string;
  quantity: number;
  unit: string;
}

const foundationSchema = z.object({
  width: z.number().min(0),
  depth: z.number().min(0),
  length: z.number().min(0),
  type: z.string().min(1),
  finishing: z.string().optional(),
  hasBasement: z.boolean(),
  hasBasementFloor: z.boolean(),
  floorMaterial: z.string().optional(),
  wallMaterial: z.string().optional(),
});

const openingSchema = z.object({
  type: z.enum(['door', 'window']),
  width: z.number().min(0),
  height: z.number().min(0),
});

const wallSchema = z.object({
  width: z.number().min(0),
  length: z.number().min(0),
  height: z.number().min(0),
  material: z.string().min(1),
  insulation: z.string().min(1),
  finishing: z.string().optional(),
  openings: z.array(openingSchema).default([]),
});

const roofSchema = z.object({
  type: z.string().min(1),
  material: z.string().min(1),
  length: z.number().min(0),
  width: z.number().min(0),
});

const calculationSchema = z.object({
  foundation: foundationSchema,
  walls: z.array(wallSchema),
  roof: roofSchema,
});

type CalculationContextType = {
  houseType: HouseType;
  setHouseType: (type: HouseType) => void;
  foundationForm: ReturnType<typeof useForm<{ foundation: FoundationData }>>;
  wallsForm: ReturnType<typeof useForm<{ walls: WallData[] }>>;
  roofForm: ReturnType<typeof useForm<{ roof: RoofData }>>;
  calculateResults: () => void;
  results: MaterialResult[];
  watch: <T extends keyof CalculationData>(name: T) => any;
};

const CalculationContext = createContext<CalculationContextType | undefined>(undefined);

export const CalculationProvider = ({ children }: { children: ReactNode }) => {
  const [houseType, setHouseType] = useState<HouseType>(null);
  const [results, setResults] = useState<MaterialResult[]>([]);

  const foundationForm = useForm<{ foundation: FoundationData }>({
    resolver: zodResolver(z.object({ foundation: foundationSchema })),
    defaultValues: {
      foundation: {
        width: 0,
        depth: 0,
        length: 0,
        type: "",
        hasBasement: false,
        hasBasementFloor: false,
      },
    },
  });

  const wallsForm = useForm<{ walls: WallData[] }>({
    resolver: zodResolver(z.object({ walls: z.array(wallSchema) })),
    defaultValues: {
      walls: [
        {
          width: 0,
          length: 0,
          height: 0,
          material: "",
          insulation: "mineral",
          finishing: "",
          openings: [],
        },
      ],
    },
  });

  const roofForm = useForm<{ roof: RoofData }>({
    resolver: zodResolver(z.object({ roof: roofSchema })),
    defaultValues: {
      roof: {
        type: "metal",
        material: "",
        length: 0,
        width: 0,
      },
    },
  });

  const watch = <T extends keyof CalculationData>(name: T) => {
    if (name === "foundation") {
      return foundationForm.watch("foundation");
    } else if (name === "walls") {
      return wallsForm.watch("walls");
    } else if (name === "roof") {
      return roofForm.watch("roof");
    }
    
    // For nested properties we simply return null
    // Each component now uses their form's watch method directly
    // See foundation-section.tsx for examples
    return null;
  };

  const calculateResults = () => {
    if (!houseType) return;
    
    const foundationData = foundationForm.getValues().foundation;
    const wallsData = wallsForm.getValues().walls;
    const roofData = roofForm.getValues().roof;
    
    const calculationData: CalculationData = {
      foundation: foundationData,
      walls: wallsData,
      roof: roofData,
    };
    
    const materialResults = calculateMaterials(houseType, calculationData);
    setResults(materialResults);
  };

  // Reset form defaults when house type changes
  const resetForms = (type: HouseType) => {
    if (!type) return;
    
    foundationForm.reset({
      foundation: {
        width: 0,
        depth: 0,
        length: 0,
        type: type === "brick" ? "concrete" :
              type === "concrete" ? "reinforced-concrete" :
              type === "wooden" ? "wood" : "gasblock",
        finishing: type === "concrete" ? "brick" : undefined,
        hasBasement: false,
        hasBasementFloor: false,
        floorMaterial: type === "wooden" ? "reinforced-concrete" : undefined,
        wallMaterial: type === "wooden" ? "reinforced-concrete" : undefined,
      },
    });

    wallsForm.reset({
      walls: [
        {
          width: 0,
          length: 0,
          height: 0,
          material: type === "brick" ? "brick" :
                   type === "concrete" ? "reinforced-concrete" :
                   type === "wooden" ? "timber" : "gasblock",
          insulation: "mineral",
          finishing: type === "wooden" || type === "concrete" || type === "blocks" ? "siding" : "",
          openings: [],
        },
      ],
    });

    roofForm.reset({
      roof: {
        type: "metal",
        material: "siding",
        length: 0,
        width: 0,
      },
    });
  };

  const handleHouseTypeChange = (type: HouseType) => {
    setHouseType(type);
    resetForms(type);
    setResults([]);
  };

  return (
    <CalculationContext.Provider
      value={{
        houseType,
        setHouseType: handleHouseTypeChange,
        foundationForm,
        wallsForm,
        roofForm,
        calculateResults,
        results,
        watch,
      }}
    >
      {children}
    </CalculationContext.Provider>
  );
};

export const useCalculation = () => {
  const context = useContext(CalculationContext);
  if (context === undefined) {
    throw new Error("useCalculation must be used within a CalculationProvider");
  }
  return context;
};
