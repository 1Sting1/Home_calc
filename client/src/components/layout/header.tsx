import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import HouseTypeSelector from "@/components/house-type-selector";

export default function Header() {
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();
  const { user, logoutMutation } = useAuth();
  const [showCalculator, setShowCalculator] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  // Render login/register buttons if not logged in, or profile link if logged in
  const renderAuthButtons = () => {
    if (!user) {
      return (
        <div className="flex space-x-3">
          <Link href="/auth?tab=login">
            <Button variant="outline" size="sm">
              {t("nav.login")}
            </Button>
          </Link>
          <Link href="/auth?tab=register">
            <Button size="sm">
              {t("nav.register")}
            </Button>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="flex items-center space-x-3">
          <Link href="/profile" className="flex items-center text-gray-700 hover:text-primary transition">
            <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            {t("nav.profile")}
          </Link>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
          >
            {logoutMutation.isPending ? t("profile.loggingOut") : i18n.language === "ru" ? "Выход" : "Exit"}
          </Button>
        </div>
      );
    }
  };

  return (
    <header className="sticky top-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold text-primary">
            <svg className="w-6 h-6 inline-block mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            {i18n.language === "ru" ? "HouseCraft" : "HouseCraft"}
          </span>
        </Link>
        
        {/* Mobile Menu Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-4 mt-8">
              <SheetClose asChild>
                <Link href="/" className="py-2">
                  {t("nav.home")}
                </Link>
              </SheetClose>
              
              <Collapsible className="w-full">
                <CollapsibleTrigger className="flex items-center justify-between w-full py-2">
                  <span>{t("nav.subscriptions")}</span>
                  <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 pl-4">
                  <div className="mb-3">
                    <h3 className="font-semibold mb-1">{t("nav.subscription.free")}</h3>
                    <ul className="text-sm pl-4">
                      <li className="mb-1">• {t("nav.subscription.free1")}</li>
                      <li className="mb-1">• {t("nav.subscription.free2")}</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t("nav.subscription.premium")}</h3>
                    <ul className="text-sm pl-4">
                      <li className="mb-1">• {t("nav.subscription.premium1")}</li>
                      <li className="mb-1">• {t("nav.subscription.premium2")}</li>
                    </ul>
                  </div>
                </CollapsibleContent>
              </Collapsible>
              
              <SheetClose asChild>
                <Button 
                  variant="ghost" 
                  className="justify-start px-0"
                  onClick={() => setShowCalculator(true)}
                >
                  {t("nav.calculate")}
                </Button>
              </SheetClose>
              
              <SheetClose asChild>
                <Link href="/docs" className="py-2">
                  {t("nav.docs")}
                </Link>
              </SheetClose>
              
              <SheetClose asChild>
                <Link href="/contacts" className="py-2">
                  {t("nav.contacts")}
                </Link>
              </SheetClose>
              
              {!user ? (
                <div className="flex flex-col space-y-2 py-2">
                  <SheetClose asChild>
                    <Link href="/auth?tab=login">
                      <Button variant="outline" className="w-full">
                        {t("nav.login")}
                      </Button>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/auth?tab=register">
                      <Button className="w-full">
                        {t("nav.register")}
                      </Button>
                    </Link>
                  </SheetClose>
                </div>
              ) : (
                <>
                  <SheetClose asChild>
                    <Link href="/profile" className="py-2 flex items-center">
                      <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      {t("nav.profile")}
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button 
                      variant="ghost" 
                      className="justify-start px-0 text-red-600" 
                      onClick={handleLogout}
                      disabled={logoutMutation.isPending}
                    >
                      <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                      {logoutMutation.isPending ? t("profile.loggingOut") : i18n.language === "ru" ? "Выход" : "Exit"}
                    </Button>
                  </SheetClose>
                </>
              )}
              
              <Button
                variant="ghost"
                className="justify-start px-0 py-2"
                onClick={() => changeLanguage(i18n.language === "ru" ? "en" : "ru")}
              >
                <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
                {i18n.language === "ru" ? "English" : "Русский"}
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-gray-700 hover:text-primary transition">
            {t("nav.home")}
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="text-gray-700 hover:text-primary transition flex items-center">
              {t("nav.subscriptions")}
              <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64">
              <div className="flex">
                <div className="w-1/2 p-4 border-r">
                  <h3 className="font-semibold mb-2">{t("nav.subscription.free")}</h3>
                  <ul className="text-sm">
                    <li className="mb-1">• {t("nav.subscription.free1")}</li>
                    <li className="mb-1">• {t("nav.subscription.free2")}</li>
                  </ul>
                </div>
                <div className="w-1/2 p-4 bg-gray-50">
                  <h3 className="font-semibold mb-2">{t("nav.subscription.premium")}</h3>
                  <ul className="text-sm">
                    <li className="mb-1">• {t("nav.subscription.premium1")}</li>
                    <li className="mb-1">• {t("nav.subscription.premium2")}</li>
                  </ul>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            variant="ghost" 
            className="text-gray-700 hover:text-primary"
            onClick={() => setShowCalculator(true)}
          >
            {t("nav.calculate")}
          </Button>
          
          <Link href="/docs" className="text-gray-700 hover:text-primary transition">
            {t("nav.docs")}
          </Link>
          
          <Link href="/contacts" className="text-gray-700 hover:text-primary transition">
            {t("nav.contacts")}
          </Link>
          
          {renderAuthButtons()}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => changeLanguage(i18n.language === "ru" ? "en" : "ru")}
            className="text-gray-700 hover:text-primary"
          >
            <svg className="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            {i18n.language === "ru" ? "EN" : "RU"}
          </Button>
        </nav>
      </div>

      {/* House Type Selection Modal */}
      {showCalculator && (
        <HouseTypeSelector 
          isOpen={showCalculator} 
          onClose={() => setShowCalculator(false)} 
        />
      )}
    </header>
  );
}
