import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCalculation } from "@/contexts/calculation-context";

export default function FoundationSection() {
  const { t } = useTranslation();
  const { houseType, foundationForm } = useCalculation();
  
  // Using the foundation property of CalculationData to access hasBasement
  const hasBasement = foundationForm.watch("foundation.hasBasement");

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">{t("calculation.foundation.title")}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="foundation-width">{t("calculation.foundation.width")}</Label>
          <Controller
            name="foundation.width"
            control={foundationForm.control}
            render={({ field }) => (
              <Input
                id="foundation-width"
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
          <Label htmlFor="foundation-depth">{t("calculation.foundation.depth")}</Label>
          <Controller
            name="foundation.depth"
            control={foundationForm.control}
            render={({ field }) => (
              <Input
                id="foundation-depth"
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
          <Label htmlFor="foundation-length">{t("calculation.foundation.length")}</Label>
          <Controller
            name="foundation.length"
            control={foundationForm.control}
            render={({ field }) => (
              <Input
                id="foundation-length"
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
          <Label htmlFor="foundation-type">{t("calculation.foundation.type")}</Label>
          <Controller
            name="foundation.type"
            control={foundationForm.control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger id="foundation-type">
                  <SelectValue placeholder={t("calculation.foundation.selectType")} />
                </SelectTrigger>
                <SelectContent>
                  {houseType === "brick" && (
                    <>
                      <SelectItem value="reinforcedConcrete">
                        {t("materials.reinforcedConcrete")}
                      </SelectItem>
                      <SelectItem value="concrete">
                        {t("materials.concrete")}
                      </SelectItem>
                      <SelectItem value="brick">
                        {t("materials.brick")}
                      </SelectItem>
                      <SelectItem value="rubble">
                        {t("materials.rubble")}
                      </SelectItem>
                      <SelectItem value="stripFoundation">
                        {t("materials.stripFoundation")}
                      </SelectItem>
                      <SelectItem value="pileFoundation">
                        {t("materials.pileFoundation")}
                      </SelectItem>
                    </>
                  )}
                  
                  {houseType === "concrete" && (
                    <>
                      <SelectItem value="monolithicSlab">
                        {t("materials.monolithicSlab")}
                      </SelectItem>
                      <SelectItem value="pileGrillage">
                        {t("materials.pileGrillage")}
                      </SelectItem>
                      <SelectItem value="concrete">
                        {t("materials.concrete")}
                      </SelectItem>
                      <SelectItem value="reinforcedConcrete">
                        {t("materials.reinforcedConcrete")}
                      </SelectItem>
                      <SelectItem value="stripFoundation">
                        {t("materials.stripFoundation")}
                      </SelectItem>
                      <SelectItem value="pileFoundation">
                        {t("materials.pileFoundation")}
                      </SelectItem>
                    </>
                  )}
                  
                  {houseType === "wooden" && (
                    <>
                      <SelectItem value="screwPile">
                        {t("materials.screwPile")}
                      </SelectItem>
                      <SelectItem value="concretePillars">
                        {t("materials.concretePillars")}
                      </SelectItem>
                      <SelectItem value="stone">
                        {t("materials.stone")}
                      </SelectItem>
                      <SelectItem value="stripFoundation">
                        {t("materials.stripFoundation")}
                      </SelectItem>
                      <SelectItem value="pileFoundation">
                        {t("materials.pileFoundation")}
                      </SelectItem>
                    </>
                  )}
                  
                  {houseType === "blocks" && (
                    <>
                      <SelectItem value="concrete">
                        {t("materials.concrete")}
                      </SelectItem>
                      <SelectItem value="reinforcedConcrete">
                        {t("materials.reinforcedConcrete")}
                      </SelectItem>
                      <SelectItem value="rubble">
                        {t("materials.rubble")}
                      </SelectItem>
                      <SelectItem value="stripFoundation">
                        {t("materials.stripFoundation")}
                      </SelectItem>
                      <SelectItem value="pileFoundation">
                        {t("materials.pileFoundation")}
                      </SelectItem>
                      <SelectItem value="floatingFoundation">
                        {t("materials.floatingFoundation")}
                      </SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        
        {houseType === "concrete" && (
          <div className="space-y-2">
            <Label htmlFor="foundation-finishing">{t("calculation.foundation.finishing")}</Label>
            <Controller
              name="foundation.finishing"
              control={foundationForm.control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger id="foundation-finishing">
                    <SelectValue placeholder={t("calculation.foundation.selectFinishing")} />
                  </SelectTrigger>
                  <SelectContent>
                    {houseType === "concrete" && (
                      <>
                        <SelectItem value="brick">{t("materials.brick")}</SelectItem>
                        <SelectItem value="siding">{t("materials.siding")}</SelectItem>
                        <SelectItem value="decorative-plaster">{t("materials.decorativePlaster")}</SelectItem>
                        <SelectItem value="natural-stone">{t("materials.naturalStone")}</SelectItem>
                        <SelectItem value="facade-panels">{t("materials.facadePanels")}</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        )}
        
        <div className="col-span-1 md:col-span-2 space-y-4">
          <div className="flex items-center space-x-2">
            <Controller
              name="foundation.hasBasement"
              control={foundationForm.control}
              render={({ field }) => (
                <Checkbox
                  id="foundation-basement"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label htmlFor="foundation-basement">{t("calculation.foundation.basement")}</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Controller
              name="foundation.hasBasementFloor"
              control={foundationForm.control}
              render={({ field }) => (
                <Checkbox
                  id="foundation-basement-floor"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={!hasBasement}
                />
              )}
            />
            <Label htmlFor="foundation-basement-floor" className={!hasBasement ? "text-gray-400" : ""}>
              {t("calculation.foundation.basementFloor")}
            </Label>
          </div>
        </div>
        
        {hasBasement && foundationForm.watch("foundation.hasBasementFloor") && (
          <div className="space-y-2">
            <Label htmlFor="foundation-floor-material">{t("calculation.foundation.floorMaterial")}</Label>
            <Controller
              name="foundation.floorMaterial"
              control={foundationForm.control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger id="foundation-floor-material">
                    <SelectValue placeholder={t("calculation.foundation.selectFloorMaterial")} />
                  </SelectTrigger>
                  <SelectContent>
                    {houseType === "wooden" ? (
                      <>
                        <SelectItem value="reinforced-concrete">{t("materials.reinforcedConcrete")}</SelectItem>
                        <SelectItem value="wood">{t("materials.wood")}</SelectItem>
                      </>
                    ) : houseType === "blocks" ? (
                      <>
                        <SelectItem value="reinforced-concrete">{t("materials.reinforcedConcrete")}</SelectItem>
                        <SelectItem value="gasblock">{t("materials.gasblock")}</SelectItem>
                        <SelectItem value="foamblock">{t("materials.foamblock")}</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="reinforced-concrete">{t("materials.reinforcedConcrete")}</SelectItem>
                        <SelectItem value="brick">{t("materials.brick")}</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        )}
        
        {hasBasement && (
          <div className="space-y-2">
            <Label htmlFor="foundation-wall-material">{t("calculation.foundation.wallMaterial")}</Label>
            <Controller
              name="foundation.wallMaterial"
              control={foundationForm.control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger id="foundation-wall-material">
                    <SelectValue placeholder={t("calculation.foundation.selectWallMaterial")} />
                  </SelectTrigger>
                  <SelectContent>
                    {houseType === "wooden" ? (
                      <>
                        <SelectItem value="reinforced-concrete">{t("materials.reinforcedConcrete")}</SelectItem>
                        <SelectItem value="wood">{t("materials.wood")}</SelectItem>
                      </>
                    ) : houseType === "blocks" ? (
                      <>
                        <SelectItem value="reinforced-concrete">{t("materials.reinforcedConcrete")}</SelectItem>
                        <SelectItem value="gasblock">{t("materials.gasblock")}</SelectItem>
                        <SelectItem value="foamblock">{t("materials.foamblock")}</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="reinforced-concrete">{t("materials.reinforcedConcrete")}</SelectItem>
                        <SelectItem value="brick">{t("materials.brick")}</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        )}
      </div>
    </>
  );
}
