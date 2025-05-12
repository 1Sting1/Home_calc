import { useState } from "react";
import { Button } from "@/components/ui/button";
import HouseSelectDialog from "@/components/house-select-dialog";

export default function HomePage() {
  const [isHouseSelectOpen, setIsHouseSelectOpen] = useState(false);
  
  const handleCalculateClick = () => {
    setIsHouseSelectOpen(true);
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center py-12 px-4">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Рассчитайте стоимость вашего будущего дома
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Простой и удобный сервис для расчёта строительных материалов и стоимости дома
        </p>
        <Button
          id="calculate-trigger"
          size="lg"
          className="text-lg px-8 py-4 h-auto rounded-lg shadow-lg transition transform hover:scale-105"
          onClick={handleCalculateClick}
        >
          Рассчитать
        </Button>
      </div>
      
      <HouseSelectDialog 
        isOpen={isHouseSelectOpen} 
        onOpenChange={setIsHouseSelectOpen} 
      />
    </div>
  );
}
