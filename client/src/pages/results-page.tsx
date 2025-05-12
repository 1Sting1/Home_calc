import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, FileText, Home, Loader2 } from "lucide-react";
import html2canvas from "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/+esm";
import { jsPDF } from "https://cdn.jsdelivr.net/npm/jspdf@2.5.1/+esm";

export default function ResultsPage() {
  const [, navigate] = useLocation();
  const resultRef = useRef<HTMLDivElement>(null);
  
  const { data: calculation, isLoading, isError } = useQuery({
    queryKey: ["/api/calculations/latest"],
  });
  
  const downloadAsPng = async () => {
    if (!resultRef.current) return;
    
    try {
      const canvas = await html2canvas(resultRef.current);
      const dataUrl = canvas.toDataURL("image/png");
      
      // Create a download link
      const link = document.createElement("a");
      link.download = "house-calculation.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Failed to download as PNG:", error);
    }
  };
  
  const downloadAsPdf = async () => {
    if (!resultRef.current) return;
    
    try {
      const canvas = await html2canvas(resultRef.current);
      const imgData = canvas.toDataURL("image/png");
      
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("house-calculation.pdf");
    } catch (error) {
      console.error("Failed to download as PDF:", error);
    }
  };
  
  const goToHome = () => {
    navigate("/");
  };
  
  // Helper to get material name in Russian
  const getMaterialName = (key: string) => {
    switch (key) {
      case 'brick': return 'Кирпич';
      case 'wood': return 'Дерево';
      case 'concrete': return 'Бетон';
      case 'aerocrete': return 'Газобетон';
      default: return key;
    }
  };
  
  // Helper to get foundation type name in Russian
  const getFoundationTypeName = (key: string) => {
    switch (key) {
      case 'strip': return 'Ленточный';
      case 'pile': return 'Свайный';
      case 'monolithic': return 'Монолитный';
      default: return key;
    }
  };
  
  // Helper to get roof type name in Russian
  const getRoofTypeName = (key: string) => {
    switch (key) {
      case 'flat': return 'Плоская';
      case 'gable': return 'Двускатная';
      case 'hip': return 'Четырёхскатная (вальмовая)';
      case 'mansard': return 'Мансардная';
      default: return key;
    }
  };
  
  // Helper to get house type name in Russian
  const getHouseTypeName = (key: string) => {
    switch (key) {
      case 'brick': return 'Кирпичный';
      case 'wooden': return 'Деревянный';
      case 'concrete': return 'Бетонный';
      default: return key;
    }
  };

  return (
    <div className="py-10 px-4">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-8">Результаты расчета</h1>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            {isLoading ? (
              <div className="flex justify-center items-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : isError ? (
              <div className="text-center py-16 px-4 bg-gray-50 rounded border border-dashed border-gray-300">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">Не удалось загрузить результаты расчета</p>
              </div>
            ) : !calculation ? (
              <div className="text-center py-16 px-4 bg-gray-50 rounded border border-dashed border-gray-300">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">Нет данных для отображения</p>
              </div>
            ) : (
              <div ref={resultRef} className="p-4 bg-white rounded-lg">
                <h2 className="text-xl font-bold mb-4 text-center">
                  {getHouseTypeName(calculation.houseType)} дом
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Фундамент</h3>
                    <table className="w-full border-collapse">
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 font-medium">Тип:</td>
                          <td className="py-2">{getFoundationTypeName(calculation.foundationType)}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 font-medium">Ширина:</td>
                          <td className="py-2">{calculation.foundationWidth} м</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 font-medium">Длина:</td>
                          <td className="py-2">{calculation.foundationLength} м</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 font-medium">Площадь:</td>
                          <td className="py-2">{(calculation.foundationWidth * calculation.foundationLength).toFixed(2)} м²</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Стены</h3>
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 text-left">№</th>
                          <th className="py-2 text-left">Ширина</th>
                          <th className="py-2 text-left">Длина</th>
                          <th className="py-2 text-left">Материал</th>
                          <th className="py-2 text-left">Площадь</th>
                        </tr>
                      </thead>
                      <tbody>
                        {calculation.walls.map((wall: any, index: number) => (
                          <tr key={index} className="border-b">
                            <td className="py-2">{index + 1}</td>
                            <td className="py-2">{wall.width} м</td>
                            <td className="py-2">{wall.length} м</td>
                            <td className="py-2">{getMaterialName(wall.material)}</td>
                            <td className="py-2">
                              {(wall.width * wall.length).toFixed(2)} м² 
                              {wall.hasOpening && wall.openingWidth && wall.openingHeight && (
                                <div className="mt-1 text-sm text-gray-600">
                                  {wall.openingType === 'door' ? 'Дверь' : 'Окно'}: {wall.openingWidth}x{wall.openingHeight} м
                                  ({(wall.openingWidth * wall.openingHeight).toFixed(2)} м²)
                                  <br />
                                  Чистая площадь: {(wall.width * wall.length - wall.openingWidth * wall.openingHeight).toFixed(2)} м²
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Крыша</h3>
                    <table className="w-full border-collapse">
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 font-medium">Тип:</td>
                          <td className="py-2">{getRoofTypeName(calculation.roofType)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Итого</h3>
                    <table className="w-full border-collapse">
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 font-medium">Общая площадь стен до вычета проёмов:</td>
                          <td className="py-2">
                            {calculation.walls.reduce((acc: number, wall: any) => {
                              return acc + (wall.width * wall.length);
                            }, 0).toFixed(2)} м²
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 font-medium">Площадь проёмов:</td>
                          <td className="py-2">
                            {calculation.walls.reduce((acc: number, wall: any) => {
                              // Считаем площадь проёма, если он есть
                              if (wall.hasOpening && wall.openingWidth && wall.openingHeight) {
                                return acc + (wall.openingWidth * wall.openingHeight);
                              }
                              return acc;
                            }, 0).toFixed(2)} м²
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 font-medium">Чистая площадь стен:</td>
                          <td className="py-2">
                            {calculation.walls.reduce((acc: number, wall: any) => {
                              // Считаем базовую площадь стены
                              let wallArea = wall.width * wall.length;
                              
                              // Вычитаем площадь проёма, если он есть
                              if (wall.hasOpening && wall.openingWidth && wall.openingHeight) {
                                wallArea -= (wall.openingWidth * wall.openingHeight);
                              }
                              
                              return acc + wallArea;
                            }, 0).toFixed(2)} м²
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 font-medium">Площадь фундамента:</td>
                          <td className="py-2">{(calculation.foundationWidth * calculation.foundationLength).toFixed(2)} м²</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 font-medium">Примерная стоимость:</td>
                          <td className="py-2 font-bold text-primary">{Math.floor(Math.random() * 1000000) + 500000} ₽</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <Button
                onClick={downloadAsPng}
                className="flex items-center justify-center bg-gray-800 hover:bg-gray-900"
                disabled={isLoading || isError || !calculation}
              >
                <Download className="mr-2 h-4 w-4" /> Скачать .png
              </Button>
              <Button
                onClick={downloadAsPdf}
                className="flex items-center justify-center bg-gray-800 hover:bg-gray-900"
                disabled={isLoading || isError || !calculation}
              >
                <FileText className="mr-2 h-4 w-4" /> Скачать .pdf
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center">
          <Button onClick={goToHome} className="px-8 py-3">
            На Главную
          </Button>
        </div>
      </div>
    </div>
  );
}
