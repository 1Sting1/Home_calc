#!/bin/bash

# Делаем скрипт инициализации БД исполняемым
chmod +x docker-init/init-db.sh

# Копируем .env.example в .env, если файл .env не существует
if [ ! -f .env ]; then
  echo "Creating .env file from .env.example"
  cp .env.example .env
else
  echo ".env file already exists"
fi

# Запускаем контейнеры Docker
echo "Starting Docker containers..."
docker-compose up -d

# Ожидаем запуска БД
echo "Waiting for database to be ready..."
sleep 10

# Устанавливаем зависимости и инициализируем БД
echo "Setting up the database schema..."
docker-compose exec app npm run db:push

# Запускаем сиды для БД (опционально)
echo "Do you want to seed the database with initial data? (y/n)"
read seed_choice

if [ "$seed_choice" = "y" ] || [ "$seed_choice" = "Y" ]; then
  echo "Seeding the database..."
  docker-compose exec app npm run db:seed
fi

echo ""
echo "Setup completed! Your application is running at http://localhost:3000"
echo ""
echo "To stop the application, run: docker-compose down"
echo "To view logs, run: docker-compose logs -f"