import { create } from 'zustand';

// Перевод для русского языка
const russianTranslations = {
  // Главная страница
  siteTitle: "ДомРасчет",
  welcome: "Добро пожаловать в ДомРасчет",
  description: "Простой и удобный калькулятор для расчёта строительства вашего дома",
  selectHouseType: "Выберите тип дома",
  brick: "Кирпичный",
  wooden: "Деревянный",
  concrete: "Бетонный",
  calculate: "Рассчитать",
  
  // Аутентификация
  login: "Вход",
  register: "Регистрация",
  email: "Email",
  password: "Пароль",
  name: "Имя",
  lastname: "Фамилия",
  submit: "Отправить",
  profile: "Профиль",
  logout: "Выход",
  
  // Калькулятор
  foundation: "Фундамент",
  width: "Ширина (м)",
  length: "Длина (м)",
  type: "Вид",
  strip: "Ленточный",
  pile: "Свайный",
  monolithic: "Монолитный",
  walls: "Стены",
  wall: "Стена",
  material: "Материал",
  wood: "Дерево",
  aerocrete: "Газобетон",
  addWall: "Добавить стену",
  addOpening: "Добавить проём",
  openingType: "Тип проёма",
  door: "Дверь",
  window: "Окно",
  height: "Высота (м)",
  
  // Крыша
  roof: "Крыша",
  roofType: "Тип крыши",
  flat: "Плоская",
  gable: "Двускатная", 
  hip: "Четырёхскатная (вальмовая)",
  mansard: "Мансардная",
  
  // Результаты
  results: "Результаты расчета",
  totalWallArea: "Общая площадь стен до вычета проёмов",
  openingsArea: "Площадь проёмов",
  netWallArea: "Чистая площадь стен",
  foundationArea: "Площадь фундамента",
  estimatedCost: "Примерная стоимость",
  cleanArea: "Чистая площадь",
  download: "Скачать",
  toMainPage: "На Главную",
  
  // Переключение языка
  language: "Язык",
  ru: "Русский",
  en: "English",
};

// Перевод для английского языка
const englishTranslations = {
  // Main page
  siteTitle: "HomeCalc",
  welcome: "Welcome to HomeCalc",
  description: "Simple and convenient calculator for planning your home construction",
  selectHouseType: "Select home type",
  brick: "Brick",
  wooden: "Wooden",
  concrete: "Concrete",
  calculate: "Calculate",
  
  // Authentication
  login: "Login",
  register: "Register",
  email: "Email",
  password: "Password",
  name: "First name",
  lastname: "Last name",
  submit: "Submit",
  profile: "Profile",
  logout: "Logout",
  
  // Calculator
  foundation: "Foundation",
  width: "Width (m)",
  length: "Length (m)",
  type: "Type",
  strip: "Strip",
  pile: "Pile",
  monolithic: "Monolithic",
  walls: "Walls",
  wall: "Wall",
  material: "Material",
  wood: "Wood",
  aerocrete: "Aerated concrete",
  addWall: "Add wall",
  addOpening: "Add opening",
  openingType: "Opening type",
  door: "Door",
  window: "Window",
  height: "Height (m)",
  
  // Roof
  roof: "Roof",
  roofType: "Roof type",
  flat: "Flat", 
  gable: "Gable",
  hip: "Hip",
  mansard: "Mansard",
  
  // Results
  results: "Calculation Results",
  totalWallArea: "Total wall area before openings",
  openingsArea: "Openings area",
  netWallArea: "Net wall area",
  foundationArea: "Foundation area",
  estimatedCost: "Estimated cost",
  cleanArea: "Net area",
  download: "Download",
  toMainPage: "To Main Page",
  
  // Language switching
  language: "Language",
  ru: "Русский",
  en: "English",
};

// Создаем store для хранения языка и переводов
interface LocaleStore {
  locale: 'ru' | 'en';
  translations: typeof russianTranslations;
  setLocale: (locale: 'ru' | 'en') => void;
  t: (key: keyof typeof russianTranslations) => string;
}

// Создаем Zustand store
export const useLocale = create<LocaleStore>((set, get) => ({
  locale: 'ru', // Используем русский язык по умолчанию
  translations: russianTranslations,
  
  // Метод для изменения языка
  setLocale: (locale: 'ru' | 'en') => {
    set({ 
      locale, 
      translations: locale === 'ru' ? russianTranslations : englishTranslations 
    });
  },
  
  // Метод для получения перевода по ключу
  t: (key: keyof typeof russianTranslations) => {
    return get().translations[key] || key;
  }
}));