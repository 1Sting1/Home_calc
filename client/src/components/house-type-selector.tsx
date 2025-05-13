import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCalculation } from "@/contexts/calculation-context";

interface HouseTypeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HouseTypeSelector({ isOpen, onClose }: HouseTypeSelectorProps) {
  const { t } = useTranslation();
  const [, navigate] = useLocation();
  const { setHouseType } = useCalculation();

  const handleSelection = (type: string) => {
    setHouseType(type);
    onClose();
    navigate("/calculation");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("houseTypeSelector.title")}</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={() => handleSelection("brick")}
            className="p-4 h-auto flex flex-col items-center hover:border-primary hover:bg-primary/5"
          >
            <svg className="w-10 h-10 text-primary mb-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            </svg>
            <span className="font-medium">{t("houseTypeSelector.brick")}</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={() => handleSelection("wooden")}
            className="p-4 h-auto flex flex-col items-center hover:border-primary hover:bg-primary/5"
          >
            <svg className="w-10 h-10 text-primary mb-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 22V2l10 5v15z"></path>
            </svg>
            <span className="font-medium">{t("houseTypeSelector.wooden")}</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={() => handleSelection("concrete")}
            className="p-4 h-auto flex flex-col items-center hover:border-primary hover:bg-primary/5"
          >
            <svg className="w-10 h-10 text-primary mb-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 7V4h16v3M9 20h6M8 20v-5h8v5M4 7l1 13h14l1-13"></path>
            </svg>
            <span className="font-medium">{t("houseTypeSelector.concrete")}</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={() => handleSelection("blocks")}
            className="p-4 h-auto flex flex-col items-center hover:border-primary hover:bg-primary/5"
          >
            <svg className="w-10 h-10 text-primary mb-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <span className="font-medium">{t("houseTypeSelector.blocks")}</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
