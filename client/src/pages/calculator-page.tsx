import { useEffect, useState } from "react";
import { useLocation, useRoute, useLocation as useWouterLocation } from "wouter";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

// Schema for form validation
const calculatorSchema = z.object({
  foundationWidth: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Ширина должна быть положительным числом",
  }),
  foundationLength: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Длина должна быть положительным числом",
  }),
  foundationType: z.string().min(1, "Выберите вид фундамента"),
  walls: z.array(z.object({
    width: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Ширина стены должна быть положительным числом",
    }),
    length: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Длина стены должна быть положительным числом",
    }),
    material: z.string().min(1, "Выберите материал стены"),
    hasOpening: z.boolean().optional(),
    openingType: z.string().optional(),
    openingWidth: z.string().refine(val => !val || !isNaN(Number(val)) && Number(val) > 0, {
      message: "Ширина проёма должна быть положительным числом",
    }).optional(),
    openingHeight: z.string().refine(val => !val || !isNaN(Number(val)) && Number(val) > 0, {
      message: "Высота проёма должна быть положительным числом",
    }).optional(),
  })).min(1, "Добавьте хотя бы одну стену"),
  roofType: z.string().min(1, "Выберите тип крыши"),
});

type CalculatorFormValues = z.infer<typeof calculatorSchema>;

export default function CalculatorPage() {
  const [, navigate] = useWouterLocation();
  const [match, params] = useRoute('/calculator/:type');
  const houseType = match ? params.type : 'unknown';
  
  // Display title based on house type
  const getTitle = () => {
    switch (houseType) {
      case 'brick':
        return 'КИРПИЧНЫЙ ФУНДАМЕНТ';
      case 'wooden':
        return 'ДЕРЕВЯННЫЙ ФУНДАМЕНТ';
      case 'concrete':
        return 'БЕТОННЫЙ ФУНДАМЕНТ';
      default:
        return 'ФУНДАМЕНТ';
    }
  };
  
  // Form setup
  const { control, handleSubmit, formState: { errors } } = useForm<CalculatorFormValues>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      foundationWidth: '',
      foundationLength: '',
      foundationType: '',
      walls: [{ 
        width: '', 
        length: '', 
        material: '', 
        hasOpening: false, 
        openingType: 'door', 
        openingWidth: '', 
        openingHeight: '' 
      }],
      roofType: '',
    },
  });
  
  // Field array for walls
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'walls',
  });
  
  const onSubmit = async (data: CalculatorFormValues) => {
    try {
      // Convert string values to numbers
      const processedData = {
        ...data,
        foundationWidth: parseFloat(data.foundationWidth),
        foundationLength: parseFloat(data.foundationLength),
        houseType,
        walls: data.walls.map(wall => ({
          width: parseFloat(wall.width),
          length: parseFloat(wall.length),
          material: wall.material,
          hasOpening: wall.hasOpening || false,
          openingType: wall.openingType || '',
          openingWidth: wall.openingWidth ? parseFloat(wall.openingWidth) : 0,
          openingHeight: wall.openingHeight ? parseFloat(wall.openingHeight) : 0,
        })),
      };
      
      // Send calculation to backend
      await apiRequest("POST", "/api/calculations", processedData);
      
      // Navigate to results page
      navigate("/results");
    } catch (error) {
      console.error("Failed to save calculation:", error);
    }
  };
  
  return (
    <div className="py-10 px-4">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-8">{getTitle()}</h1>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="foundationWidth">Ширина (м)</Label>
                  <Controller
                    name="foundationWidth"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="foundationWidth"
                        type="number"
                        step="0.01"
                        className="mt-2"
                        {...field}
                      />
                    )}
                  />
                  {errors.foundationWidth && (
                    <p className="text-sm text-destructive mt-1">{errors.foundationWidth.message}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="foundationLength">Длина (м)</Label>
                  <Controller
                    name="foundationLength"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="foundationLength"
                        type="number"
                        step="0.01"
                        className="mt-2"
                        {...field}
                      />
                    )}
                  />
                  {errors.foundationLength && (
                    <p className="text-sm text-destructive mt-1">{errors.foundationLength.message}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="foundationType">Вид</Label>
                  <Controller
                    name="foundationType"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger id="foundationType" className="mt-2">
                          <SelectValue placeholder="Выберите вид фундамента" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="strip">Ленточный</SelectItem>
                          <SelectItem value="pile">Свайный</SelectItem>
                          <SelectItem value="monolithic">Монолитный</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.foundationType && (
                    <p className="text-sm text-destructive mt-1">{errors.foundationType.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <h2 className="text-2xl font-bold mb-4">СТЕНЫ</h2>
          
          {fields.map((field, index) => (
            <Card key={field.id} className="mb-4">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Стена {index + 1}</h3>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(index)}
                      className="text-gray-500 hover:text-destructive"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  )}
                </div>
                
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor={`walls.${index}.width`}>Ширина (м)</Label>
                    <Controller
                      name={`walls.${index}.width`}
                      control={control}
                      render={({ field }) => (
                        <Input
                          id={`walls.${index}.width`}
                          type="number"
                          step="0.01"
                          className="mt-2"
                          {...field}
                        />
                      )}
                    />
                    {errors.walls?.[index]?.width && (
                      <p className="text-sm text-destructive mt-1">{errors.walls[index]?.width?.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor={`walls.${index}.length`}>Длина (м)</Label>
                    <Controller
                      name={`walls.${index}.length`}
                      control={control}
                      render={({ field }) => (
                        <Input
                          id={`walls.${index}.length`}
                          type="number"
                          step="0.01"
                          className="mt-2"
                          {...field}
                        />
                      )}
                    />
                    {errors.walls?.[index]?.length && (
                      <p className="text-sm text-destructive mt-1">{errors.walls[index]?.length?.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor={`walls.${index}.material`}>Материал</Label>
                    <Controller
                      name={`walls.${index}.material`}
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger id={`walls.${index}.material`} className="mt-2">
                            <SelectValue placeholder="Выберите материал" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="brick">Кирпич</SelectItem>
                            <SelectItem value="wood">Дерево</SelectItem>
                            <SelectItem value="concrete">Бетон</SelectItem>
                            <SelectItem value="aerocrete">Газобетон</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.walls?.[index]?.material && (
                      <p className="text-sm text-destructive mt-1">{errors.walls[index]?.material?.message}</p>
                    )}
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex items-center mb-4">
                      <Controller
                        name={`walls.${index}.hasOpening`}
                        control={control}
                        render={({ field }) => (
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id={`walls.${index}.hasOpening`}
                              className="mr-2 h-4 w-4"
                              checked={field.value}
                              onChange={(e) => field.onChange(e.target.checked)}
                            />
                            <Label htmlFor={`walls.${index}.hasOpening`}>Добавить проём</Label>
                          </div>
                        )}
                      />
                    </div>
                    
                    {/* Показываем дополнительные поля только если hasOpening = true */}
                    <Controller
                      name={`walls.${index}.hasOpening`}
                      control={control}
                      render={({ field }) => (
                        field.value && (
                          <div className="border p-4 rounded-md space-y-4">
                            <div>
                              <Label htmlFor={`walls.${index}.openingType`}>Тип проёма</Label>
                              <Controller
                                name={`walls.${index}.openingType`}
                                control={control}
                                render={({ field }) => (
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue="door"
                                  >
                                    <SelectTrigger id={`walls.${index}.openingType`} className="mt-2">
                                      <SelectValue placeholder="Выберите тип проёма" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="door">Дверь</SelectItem>
                                      <SelectItem value="window">Окно</SelectItem>
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor={`walls.${index}.openingWidth`}>Ширина (м)</Label>
                                <Controller
                                  name={`walls.${index}.openingWidth`}
                                  control={control}
                                  render={({ field }) => (
                                    <Input
                                      id={`walls.${index}.openingWidth`}
                                      type="number"
                                      step="0.01"
                                      className="mt-2"
                                      {...field}
                                    />
                                  )}
                                />
                                {errors.walls?.[index]?.openingWidth && (
                                  <p className="text-sm text-destructive mt-1">{errors.walls[index]?.openingWidth?.message}</p>
                                )}
                              </div>
                              
                              <div>
                                <Label htmlFor={`walls.${index}.openingHeight`}>Высота (м)</Label>
                                <Controller
                                  name={`walls.${index}.openingHeight`}
                                  control={control}
                                  render={({ field }) => (
                                    <Input
                                      id={`walls.${index}.openingHeight`}
                                      type="number"
                                      step="0.01"
                                      className="mt-2"
                                      {...field}
                                    />
                                  )}
                                />
                                {errors.walls?.[index]?.openingHeight && (
                                  <p className="text-sm text-destructive mt-1">{errors.walls[index]?.openingHeight?.message}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          <div className="mb-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => append({ 
                width: '', 
                length: '', 
                material: '', 
                hasOpening: false, 
                openingType: 'door', 
                openingWidth: '', 
                openingHeight: '' 
              })}
              className="flex items-center text-primary"
            >
              <Plus className="h-4 w-4 mr-2" /> Добавить стену
            </Button>
          </div>
          
          <h2 className="text-2xl font-bold mb-4">КРЫША</h2>
          <Card className="mb-8">
            <CardContent className="pt-6">
              <Controller
                name="roofType"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="flat" id="roof-flat" />
                      <Label htmlFor="roof-flat">Плоская</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="gable" id="roof-gable" />
                      <Label htmlFor="roof-gable">Двускатная</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hip" id="roof-hip" />
                      <Label htmlFor="roof-hip">Четырёхскатная (вальмовая)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mansard" id="roof-mansard" />
                      <Label htmlFor="roof-mansard">Мансардная</Label>
                    </div>
                  </RadioGroup>
                )}
              />
              {errors.roofType && (
                <p className="text-sm text-destructive mt-1">{errors.roofType.message}</p>
              )}
            </CardContent>
          </Card>
          
          <div className="text-center">
            <Button type="submit" size="lg" className="px-8 py-3">
              Рассчитать
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
