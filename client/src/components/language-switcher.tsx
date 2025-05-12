import { useLocale } from "../lib/stores/useLocale";

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useLocale();
  
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm">{t('language')}:</span>
      <div className="flex space-x-1 text-sm">
        <button
          onClick={() => setLocale('ru')}
          className={`px-2 py-0.5 rounded ${locale === 'ru' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
        >
          {t('ru')}
        </button>
        <button
          onClick={() => setLocale('en')}
          className={`px-2 py-0.5 rounded ${locale === 'en' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
        >
          {t('en')}
        </button>
      </div>
    </div>
  );
}