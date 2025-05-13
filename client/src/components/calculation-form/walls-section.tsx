import { useTranslation } from "react-i18next";
import { useFieldArray, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useCalculation } from "@/contexts/calculation-context";

export default function WallsSection() {
  const { t } = useTranslation();
  const { houseType, wallsForm } = useCalculation();
  
  const { fields, append, remove } = useFieldArray({
    control: wallsForm.control,
    name: "walls",
  });

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{t("calculation.walls.title")}</h2>
        <Button
          onClick={() => append({
            width: 0,
            length: 0,
            height: 0,
            material: houseType === "brick" ? "brick" :
                    houseType === "concrete" ? "reinforced-concrete" :
                    houseType === "wooden" ? "timber" : "gasblock",
            insulation: "mineral",
            finishing: houseType === "wooden" ? "siding" : "",
            openings: [],
          })}
          size="sm"
          className="px-3 py-1 flex items-center text-sm"
        >
          <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          {t("calculation.walls.addWall")}
        </Button>
      </div>
      
      {fields.map((field, index) => (
        <div key={field.id} className="border border-gray-200 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">{t("calculation.walls.wall")} {index + 1}</h3>
            {fields.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => remove(index)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 h-auto"
              >
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`wall-width-${index}`}>{t("calculation.walls.width")}</Label>
              <Controller
                name={`walls.${index}.width`}
                control={wallsForm.control}
                render={({ field }) => (
                  <Input
                    id={`wall-width-${index}`}
                    type="number"
                    min="0"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value === '' ? '' : parseInt(e.target.value) || 0;
                      field.onChange(value);
                    }}
                    value={field.value === 0 ? '' : field.value}
                  />
                )}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`wall-length-${index}`}>{t("calculation.walls.length")}</Label>
              <Controller
                name={`walls.${index}.length`}
                control={wallsForm.control}
                render={({ field }) => (
                  <Input
                    id={`wall-length-${index}`}
                    type="number"
                    step="0.1"
                    min="0"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value === '' ? '' : parseFloat(e.target.value) || 0;
                      field.onChange(value);
                    }}
                    value={field.value === 0 ? '' : field.value}
                  />
                )}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`wall-height-${index}`}>{t("calculation.walls.height")}</Label>
              <Controller
                name={`walls.${index}.height`}
                control={wallsForm.control}
                render={({ field }) => (
                  <Input
                    id={`wall-height-${index}`}
                    type="number"
                    step="0.1"
                    min="0"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value === '' ? '' : parseFloat(e.target.value) || 0;
                      field.onChange(value);
                    }}
                    value={field.value === 0 ? '' : field.value}
                  />
                )}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`wall-material-${index}`}>{t("calculation.walls.material")}</Label>
              <Controller
                name={`walls.${index}.material`}
                control={wallsForm.control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger id={`wall-material-${index}`}>
                      <SelectValue placeholder={t("calculation.walls.selectMaterial")} />
                    </SelectTrigger>
                    <SelectContent>
                      {houseType === "brick" && (
                        <>
                          <SelectItem value="brick">{t("materials.brick")}</SelectItem>
                          <SelectItem value="ceramicBrick">{t("materials.ceramicBrick")}</SelectItem>
                          <SelectItem value="clinkerBrick">{t("materials.clinkerBrick")}</SelectItem>
                          <SelectItem value="silicateBrick">{t("materials.silicateBrick")}</SelectItem>
                        </>
                      )}
                      
                      {houseType === "concrete" && (
                        <>
                          <SelectItem value="reinforcedConcrete">{t("materials.reinforcedConcrete")}</SelectItem>
                          <SelectItem value="monolithicConcrete">{t("materials.monolithicConcrete")}</SelectItem>
                          <SelectItem value="porousConcrete">{t("materials.porousConcrete")}</SelectItem>
                        </>
                      )}
                      
                      {houseType === "wooden" && (
                        <>
                          <SelectItem value="timber">{t("materials.timber")}</SelectItem>
                          <SelectItem value="log">{t("materials.log")}</SelectItem>
                          <SelectItem value="glulam">{t("materials.glulam")}</SelectItem>
                          <SelectItem value="clb">{t("materials.clb")}</SelectItem>
                          <SelectItem value="frameWooden">{t("materials.frameWooden")}</SelectItem>
                        </>
                      )}
                      
                      {houseType === "blocks" && (
                        <>
                          <SelectItem value="gasblock">{t("materials.gasblock")}</SelectItem>
                          <SelectItem value="foamblock">{t("materials.foamblock")}</SelectItem>
                          <SelectItem value="keramsitBlock">{t("materials.keramsitBlock")}</SelectItem>
                          <SelectItem value="cinderBlock">{t("materials.cinderBlock")}</SelectItem>
                          <SelectItem value="arboliteBlock">{t("materials.arboliteBlock")}</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            
            {(houseType === "brick" || houseType === "concrete" || houseType === "blocks") && (
              <div className="space-y-2">
                <Label htmlFor={`wall-mortar-${index}`}>{t("calculation.walls.mortar")}</Label>
                <Input
                  id={`wall-mortar-${index}`}
                  type="text"
                  value="0 м³"
                  disabled
                  className="bg-gray-100"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor={`wall-insulation-${index}`}>{t("calculation.walls.insulation")}</Label>
              <Controller
                name={`walls.${index}.insulation`}
                control={wallsForm.control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger id={`wall-insulation-${index}`}>
                      <SelectValue placeholder={t("calculation.walls.selectInsulation")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mineral">{t("materials.mineral")}</SelectItem>
                      <SelectItem value="foam">{t("materials.foam")}</SelectItem>
                      <SelectItem value="eco">{t("materials.eco")}</SelectItem>
                      <SelectItem value="extrudedPolystyrene">{t("materials.extrudedPolystyrene")}</SelectItem>
                      <SelectItem value="stoneWool">{t("materials.stoneWool")}</SelectItem>
                      <SelectItem value="glassWool">{t("materials.glassWool")}</SelectItem>
                      <SelectItem value="polyurethane">{t("materials.polyurethane")}</SelectItem>
                      <SelectItem value="cellulose">{t("materials.cellulose")}</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            
            {(houseType === "concrete" || houseType === "wooden" || houseType === "blocks") && (
              <div className="space-y-2">
                <Label htmlFor={`wall-finishing-${index}`}>{t("calculation.walls.finishing")}</Label>
                <Controller
                  name={`walls.${index}.finishing`}
                  control={wallsForm.control}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger id={`wall-finishing-${index}`}>
                        <SelectValue placeholder={t("calculation.walls.selectFinishing")} />
                      </SelectTrigger>
                      <SelectContent>
                        {(houseType === "concrete" || houseType === "blocks") && (
                          <>
                            <SelectItem value="siding">{t("materials.siding")}</SelectItem>
                            <SelectItem value="plaster">{t("materials.plaster")}</SelectItem>
                            <SelectItem value="decorativePlaster">{t("materials.decorativePlaster")}</SelectItem>
                            <SelectItem value="compositePanels">{t("materials.compositePanels")}</SelectItem>
                            <SelectItem value="naturalStone">{t("materials.naturalStone")}</SelectItem>
                            <SelectItem value="facadePanels">{t("materials.facadePanels")}</SelectItem>
                            <SelectItem value="blockHouse">{t("materials.blockHouse")}</SelectItem>
                            <SelectItem value="woodenPanels">{t("materials.woodenPanels")}</SelectItem>
                          </>
                        )}
                        
                        {houseType === "wooden" && (
                          <>
                            <SelectItem value="siding">{t("materials.siding")}</SelectItem>
                            <SelectItem value="boards">{t("materials.boards")}</SelectItem>
                            <SelectItem value="thermoWood">{t("materials.thermoWood")}</SelectItem>
                            <SelectItem value="imitationTimber">{t("materials.imitationTimber")}</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            )}
            
            {/* Openings Section */}
            <div className="col-span-1 md:col-span-2 mt-4 border-t pt-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium">{t("calculation.walls.openings")}</h4>
                <Button
                  onClick={() => {
                    const currentWall = wallsForm.getValues(`walls.${index}`);
                    const updatedOpenings = [...currentWall.openings, {
                      type: 'window' as 'window', // Явное указание типа как union type
                      width: 1,
                      height: 1
                    }];
                    wallsForm.setValue(`walls.${index}.openings`, updatedOpenings);
                  }}
                  size="sm"
                  variant="outline"
                  className="text-sm"
                >
                  <svg className="w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  {t("calculation.walls.addOpening")}
                </Button>
              </div>
              
              {(wallsForm.watch(`walls.${index}.openings`) || []).map((opening, openingIndex) => (
                <div key={openingIndex} className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3 p-2 bg-gray-50 rounded-lg">
                  <div className="space-y-1">
                    <Label htmlFor={`wall-${index}-opening-${openingIndex}-type`}>{t("calculation.walls.openingType")}</Label>
                    <Controller
                      name={`walls.${index}.openings.${openingIndex}.type`}
                      control={wallsForm.control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={(value: 'door' | 'window') => field.onChange(value)}
                        >
                          <SelectTrigger id={`wall-${index}-opening-${openingIndex}-type`}>
                            <SelectValue placeholder={t("calculation.walls.selectOpeningType")} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="door">{t("calculation.walls.door")}</SelectItem>
                            <SelectItem value="window">{t("calculation.walls.window")}</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor={`wall-${index}-opening-${openingIndex}-width`}>{t("calculation.walls.width")}</Label>
                    <Controller
                      name={`walls.${index}.openings.${openingIndex}.width`}
                      control={wallsForm.control}
                      render={({ field }) => (
                        <Input
                          id={`wall-${index}-opening-${openingIndex}-width`}
                          type="number"
                          step="0.1"
                          min="0"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value === '' ? '' : parseFloat(e.target.value) || 0;
                            field.onChange(value);
                          }}
                          value={field.value === 0 ? '' : field.value}
                        />
                      )}
                    />
                  </div>
                  
                  <div className="space-y-1 flex flex-col">
                    <Label htmlFor={`wall-${index}-opening-${openingIndex}-height`}>{t("calculation.walls.height")}</Label>
                    <div className="flex items-center">
                      <Controller
                        name={`walls.${index}.openings.${openingIndex}.height`}
                        control={wallsForm.control}
                        render={({ field }) => (
                          <Input
                            id={`wall-${index}-opening-${openingIndex}-height`}
                            type="number"
                            step="0.1"
                            min="0"
                            {...field}
                            onChange={(e) => {
                              const value = e.target.value === '' ? '' : parseFloat(e.target.value) || 0;
                              field.onChange(value);
                            }}
                            value={field.value === 0 ? '' : field.value}
                            className="flex-1"
                          />
                        )}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const currentWall = wallsForm.getValues(`walls.${index}`);
                          const updatedOpenings = [...currentWall.openings];
                          updatedOpenings.splice(openingIndex, 1);
                          wallsForm.setValue(`walls.${index}.openings`, updatedOpenings);
                        }}
                        className="ml-2 text-red-500 hover:text-red-700 hover:bg-red-50 p-1 h-auto"
                      >
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              {(wallsForm.watch(`walls.${index}.openings`) || []).length === 0 && (
                <div className="text-center p-4 border border-dashed rounded-lg">
                  <p className="text-gray-500 text-sm">{t("calculation.walls.noOpenings")}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      
      {fields.length === 0 && (
        <div className="text-center p-8 border border-dashed rounded-lg">
          <p className="mb-4 text-gray-500">{t("calculation.walls.noWalls")}</p>
          <Button
            onClick={() => append({
              width: 0,
              length: 0,
              height: 0,
              material: houseType === "brick" ? "brick" :
                      houseType === "concrete" ? "reinforced-concrete" :
                      houseType === "wooden" ? "timber" : "gasblock",
              insulation: "mineral",
              finishing: houseType === "wooden" ? "siding" : "",
              openings: [],
            })}
            size="sm"
          >
            {t("calculation.walls.addFirstWall")}
          </Button>
        </div>
      )}
    </>
  );
}
