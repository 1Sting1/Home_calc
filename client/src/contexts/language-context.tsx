import { createContext, ReactNode, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface LanguageContextType {
  language: string;
  changeLanguage: (lng: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Try to get the language from localStorage
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    } else {
      // Default to Russian if no language is set
      i18n.changeLanguage("ru");
    }
  }, [i18n]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  return (
    <LanguageContext.Provider
      value={{
        language: i18n.language,
        changeLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
