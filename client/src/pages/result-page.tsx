import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCalculation } from "@/contexts/calculation-context";
import { downloadAsImage, downloadAsPDF } from "@/lib/utils";

export default function ResultPage() {
  const { t } = useTranslation();
  const [, navigate] = useLocation();
  const { results } = useCalculation();

  if (!results || results.length === 0) {
    navigate("/");
    return null;
  }

  const handleDownloadPNG = () => {
    downloadAsImage("result-table", "house-calculation-results");
  };

  const handleDownloadPDF = () => {
    downloadAsPDF("result-table", "house-calculation-results");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-2xl font-bold mb-6">{t("result.title")}</h1>
        
        <div id="result-table" className="border rounded-lg overflow-hidden mb-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("result.table.material")}</TableHead>
                <TableHead>{t("result.table.quantity")}</TableHead>
                <TableHead>{t("result.table.unit")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{t(`materials.${item.material}`)}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{t(`units.${item.unit}`)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center space-y-3 md:space-y-0 md:space-x-6">
          <Button
            variant="outline"
            onClick={handleDownloadPNG}
            className="flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            {t("result.download.png")}
          </Button>
          <Button
            variant="outline"
            onClick={handleDownloadPDF}
            className="flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            {t("result.download.pdf")}
          </Button>
        </div>
      </div>
      
      <div className="text-center">
        <Button
          onClick={() => navigate("/")}
          className="px-6 py-3 font-medium"
        >
          <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          {t("result.goHome")}
        </Button>
      </div>
    </div>
  );
}
