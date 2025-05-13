import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import FoundationSection from "@/components/calculation-form/foundation-section";
import WallsSection from "@/components/calculation-form/walls-section";
import RoofSection from "@/components/calculation-form/roof-section";
import { useCalculation } from "@/contexts/calculation-context";

export default function CalculationPage() {
  const { t } = useTranslation();
  const [, navigate] = useLocation();
  const { houseType, calculateResults } = useCalculation();
  
  const getHouseTitle = () => {
    switch(houseType) {
      case 'brick':
        return t("calculation.types.brick");
      case 'wooden':
        return t("calculation.types.wooden");
      case 'concrete':
        return t("calculation.types.concrete");
      case 'blocks':
        return t("calculation.types.blocks");
      default:
        return "";
    }
  };

  const handleCalculate = () => {
    calculateResults();
    navigate("/result");
  };

  if (!houseType) {
    navigate("/");
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <svg className="w-6 h-6 mr-2 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
        {getHouseTitle()}
      </h1>
      
      <Tabs defaultValue="foundation" className="mb-6">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="foundation" className="flex items-center">
            <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            </svg>
            {t("calculation.sections.foundation")}
          </TabsTrigger>
          <TabsTrigger value="walls" className="flex items-center">
            <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3v18h18"></path>
              <path d="M3 9h18"></path>
              <path d="M3 15h18"></path>
              <path d="M9 3v18"></path>
              <path d="M15 3v18"></path>
            </svg>
            {t("calculation.sections.walls")}
          </TabsTrigger>
          <TabsTrigger value="roof" className="flex items-center">
            <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            </svg>
            {t("calculation.sections.roof")}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="foundation" className="bg-white rounded-lg shadow-md p-6">
          <FoundationSection />
        </TabsContent>
        
        <TabsContent value="walls" className="bg-white rounded-lg shadow-md p-6">
          <WallsSection />
        </TabsContent>
        
        <TabsContent value="roof" className="bg-white rounded-lg shadow-md p-6">
          <RoofSection />
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 text-center">
        <Button 
          onClick={handleCalculate}
          size="lg"
          className="px-6 py-3 font-medium"
        >
          <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
          {t("calculation.calculate")}
        </Button>
      </div>
    </div>
  );
}
