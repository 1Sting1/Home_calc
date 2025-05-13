FROM node:18

WORKDIR /app

# Копируем только необходимые файлы для клиентской части
COPY package.json package-lock.json ./
COPY client ./client
COPY shared ./shared
COPY vite.client.config.js ./

# Устанавливаем зависимости
RUN npm install --production=false

EXPOSE 3000

# Запускаем клиентский Vite сервер
CMD ["npx", "vite", "-c", "vite.client.config.js", "--host", "0.0.0.0"] 