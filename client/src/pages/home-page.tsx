import { useTranslation } from "react-i18next";
import { useState } from "react";
import HouseTypeSelector from "@/components/house-type-selector";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const { t } = useTranslation();
  const [showCalculator, setShowCalculator] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          {t("home.title")}
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          {t("home.subtitle")}
        </p>
        <Button 
          size="lg"
          onClick={() => setShowCalculator(true)} 
          className="px-8 py-7 text-lg font-medium shadow-lg"
        >
          {t("home.calculate")}
        </Button>
      </div>
      
      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-primary mb-4">
            <svg className="w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-3">
            {t("home.features.accurate.title")}
          </h3>
          <p className="text-gray-600">
            {t("home.features.accurate.description")}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-primary mb-4">
            <svg className="w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-3">
            {t("home.features.various.title")}
          </h3>
          <p className="text-gray-600">
            {t("home.features.various.description")}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-primary mb-4">
            <svg className="w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-3">
            {t("home.features.export.title")}
          </h3>
          <p className="text-gray-600">
            {t("home.features.export.description")}
          </p>
        </div>
      </div>

      {/* House Type Selection Modal */}
      {showCalculator && (
        <HouseTypeSelector 
          isOpen={showCalculator}
          onClose={() => setShowCalculator(false)}
        />
      )}
    </div>
  );
}
