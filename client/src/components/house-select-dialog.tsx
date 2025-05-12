import { useState } from "react";
import { useLocation } from "wouter";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Building, Home, Building2, X } from "lucide-react";

interface HouseSelectDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function HouseSelectDialog({ isOpen, onOpenChange }: HouseSelectDialogProps) {
  const [, navigate] = useLocation();
  
  const handleHouseTypeSelect = (type: string) => {
    navigate(`/calculator/${type}`);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Каким будет дом?</DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button
            variant="outline"
            className="flex justify-between items-center w-full p-4 h-auto text-left"
            onClick={() => handleHouseTypeSelect('brick')}
          >
            <span className="font-medium">Кирпичный</span>
            <Building className="h-6 w-6 text-gray-600" />
          </Button>
          
          <Button
            variant="outline"
            className="flex justify-between items-center w-full p-4 h-auto text-left"
            onClick={() => handleHouseTypeSelect('wooden')}
          >
            <span className="font-medium">Деревянный</span>
            <Home className="h-6 w-6 text-gray-600" />
          </Button>
          
          <Button
            variant="outline"
            className="flex justify-between items-center w-full p-4 h-auto text-left"
            onClick={() => handleHouseTypeSelect('concrete')}
          >
            <span className="font-medium">Бетонный</span>
            <Building2 className="h-6 w-6 text-gray-600" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
