import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "../hooks/use-auth";
import { Menu, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { useLocale } from "../lib/stores/useLocale";
import LanguageSwitcher from "./language-switcher";

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logoutMutation } = useAuth();
  const [location] = useLocation();
  const { t } = useLocale();
  
  // Close mobile menu when changing location
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const handleLogout = () => {
    logoutMutation.mutate();
    setMobileMenuOpen(false); // Close mobile menu after logout
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-primary font-bold text-2xl">
            <span className="text-primary">{t('siteTitle')}</span>
          </Link>
        </div>
        
        {/* Mobile menu button - Бургер */}
        <div className="md:hidden">
          <button 
            onClick={toggleMobileMenu}
            className="focus:outline-none relative" 
            aria-label="Открыть меню"
          >
            <div className="w-8 flex flex-col space-y-1.5">
              <span className={`block h-0.5 bg-gray-800 rounded transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block h-0.5 bg-gray-800 rounded transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block h-0.5 bg-gray-800 rounded transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-gray-700 hover:text-primary font-medium transition">
            {t('toMainPage')}
          </Link>
          <Link href="/" onClick={(e) => {
            e.preventDefault();
            document.getElementById('calculate-trigger')?.click();
          }} className="text-gray-700 hover:text-primary font-medium transition">
            {t('calculate')}
          </Link>
          <Link href="#how-it-works" className="text-gray-700 hover:text-primary font-medium transition">
            Как работает
          </Link>
          <Link href="#about" className="text-gray-700 hover:text-primary font-medium transition">
            О нас
          </Link>
          
          {!user ? (
            <>
              <Link href="/auth?tab=register" className="text-gray-700 hover:text-primary font-medium transition">
                {t('register')}
              </Link>
              <Link href="/auth?tab=login" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                {t('login')}
              </Link>
            </>
          ) : (
            <>
              <Link href="/profile" className="text-gray-700 hover:text-primary font-medium transition">
                {t('profile')}
              </Link>
              <Button variant="outline" onClick={handleLogout}>
                {t('logout')}
              </Button>
            </>
          )}
          
          <LanguageSwitcher />
        </nav>
      </div>
      
      {/* Mobile navigation menu */}
      <div className={`fixed inset-0 bg-gray-900 bg-opacity-50 z-50 ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className={`absolute right-0 top-0 h-full w-64 bg-white shadow-lg transform burger-menu-transition ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-between items-center p-4 border-b">
            <span className="font-semibold text-lg">Меню</span>
            <button 
              onClick={toggleMobileMenu}
              className="focus:outline-none relative w-8 h-8"
            >
              <span className="absolute h-0.5 w-6 bg-gray-800 rounded transform rotate-45 left-1 top-4"></span>
              <span className="absolute h-0.5 w-6 bg-gray-800 rounded transform -rotate-45 left-1 top-4"></span>
            </button>
          </div>
          <div className="py-4 px-2">
            <Link href="/" className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-lg">
              {t('toMainPage')}
            </Link>
            <Link href="/" onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              document.getElementById('calculate-trigger')?.click();
            }} className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-lg">
              {t('calculate')}
            </Link>
            <Link href="#how-it-works" className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-lg">
              Как работает
            </Link>
            <Link href="#about" className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-lg">
              О нас
            </Link>
            
            {!user ? (
              <>
                <Link href="/auth?tab=register" className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-lg">
                  {t('register')}
                </Link>
                <Link href="/auth?tab=login" className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-lg">
                  {t('login')}
                </Link>
              </>
            ) : (
              <>
                <Link href="/profile" className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-lg">
                  {t('profile')}
                </Link>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left py-2 px-4 text-red-600 hover:bg-gray-100 rounded-lg"
                >
                  {t('logout')}
                </button>
              </>
            )}
            
            <div className="mt-4 px-4">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
