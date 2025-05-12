FROM node:20-slim

WORKDIR /app

# Копируем файлы зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Порт, который будет открыт наружу
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "run", "dev"]