import { Link } from "wouter";
import { Mail, Phone } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ДомРасчет</h3>
            <p className="text-gray-300">Простой и удобный сервис расчета стоимости строительства домов различных типов.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition">
                  Главная
                </Link>
              </li>
              <li>
                <Link href="/" onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('calculate-trigger')?.click();
                }} className="text-gray-300 hover:text-white transition">
                  Расчёт
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-gray-300 hover:text-white transition">
                  Как работает
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-gray-300 hover:text-white transition">
                  О нас
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Контакты</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                <span>info@domraschet.ru</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5" />
                <span>+7 (999) 999-99-99</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          &copy; {new Date().getFullYear()} ДомРасчет. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
