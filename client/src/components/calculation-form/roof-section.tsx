import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCalculation } from "@/contexts/calculation-context";

export default function RoofSection() {
  const { t } = useTranslation();
  const { houseType, roofForm, watch } = useCalculation();
  
  const roofType = watch("roof.type");
  const roofMaterial = watch("roof.material");

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">{t("calculation.roof.title")}</h2>
      
      <div className="mb-6">
        <h3 className="font-medium mb-3">{t("calculation.roof.types")}</h3>
        
        <Controller
          name="roof.type"
          control={roofForm.control}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="metalFrame" id="roof-metalFrame" />
                <Label htmlFor="roof-metalFrame">{t("calculation.roof.metalFrame")}</Label>
              </div>
              
              {houseType === "wooden" && (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="wooden" id="roof-wooden" />
                  <Label htmlFor="roof-wooden">{t("calculation.roof.wooden")}</Label>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="reinforcedConcrete" id="roof-reinforcedConcrete" />
                <Label htmlFor="roof-reinforcedConcrete">{t("calculation.roof.reinforcedConcrete")}</Label>
              </div>

              {(houseType === "brick" || houseType === "blocks") && (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="combined" id="roof-combined" />
                  <Label htmlFor="roof-combined">{t("calculation.roof.combined")}</Label>
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="truss" id="roof-truss" />
                <Label htmlFor="roof-truss">{t("calculation.roof.truss")}</Label>
              </div>
            </RadioGroup>
          )}
        />
      </div>
      
      <div className="mb-6">
        <Label htmlFor="roof-material" className="block mb-2">
          {t("calculation.roof.material")}
        </Label>
        <Controller
          name="roof.material"
          control={roofForm.control}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger id="roof-material">
                <SelectValue placeholder={t("calculation.roof.selectMaterial")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="metal">
                  {t("materials.metal")}
                </SelectItem>
                <SelectItem value="shingles">
                  {t("materials.shingles")}
                </SelectItem>
                <SelectItem value="metalTile">
                  {t("materials.metalTile")}
                </SelectItem>
                <SelectItem value="metalSheets">
                  {t("materials.metalSheets")}
                </SelectItem>
                <SelectItem value="ceramicTile">
                  {t("materials.ceramicTile")}
                </SelectItem>
                <SelectItem value="bitumenTile">
                  {t("materials.bitumenTile")}
                </SelectItem>
                <SelectItem value="compositeShingles">
                  {t("materials.compositeShingles")}
                </SelectItem>
                <SelectItem value="slate">
                  {t("materials.slate")}
                </SelectItem>
                <SelectItem value="woodenShingles">
                  {t("materials.woodenShingles")}
                </SelectItem>
                {(roofType === "combined" || roofType === "reinforcedConcrete") && (
                  <>
                    <SelectItem value="greenRoof">
                      {t("materials.greenRoof")}
                    </SelectItem>
                    <SelectItem value="polycarbonate">
                      {t("materials.polycarbonate")}
                    </SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          )}
        />
      </div>
      
      {roofMaterial && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <Label htmlFor="roof-length">{t("calculation.roof.length")}</Label>
            <Controller
              name="roof.length"
              control={roofForm.control}
              render={({ field }) => (
                <Input
                  id="roof-length"
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
            <Label htmlFor="roof-width">{t("calculation.roof.width")}</Label>
            <Controller
              name="roof.width"
              control={roofForm.control}
              render={({ field }) => (
                <Input
                  id="roof-width"
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
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="roof-area">{t("calculation.roof.area")}</Label>
        <Input
          id="roof-area"
          type="text"
          value={`${roofForm.watch("roof.length") * roofForm.watch("roof.width") || 0} м²`}
          disabled
          className="bg-gray-100"
        />
      </div>
    </>
  );
}
