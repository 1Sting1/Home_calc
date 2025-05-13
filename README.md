# House Calculator Application

A web application for calculating construction materials for different types of houses.

## Features

- User authentication with JWT tokens
- Multi-language support (English/Russian)
- Calculation of materials for different house types:
  - Brick
  - Wooden
  - Concrete
  - Gas/Foam Blocks
- User profile management
- Subscription options (free/premium)
- Calculation history
- Export calculation results as PNG or PDF

## Architecture

The application consists of:

1. **Frontend**: React.js application with:
   - Responsive UI
   - i18n for translation
   - PDF/PNG export

2. **Backend**: Python FastAPI application with:
   - JWT authentication
   - PostgreSQL database
   - Material calculation logic

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js (for local development)
- Python 3.9+ (for local development)

### Running with Docker Compose

1. Clone the repository:
   ```
   git clone <repository-url>
   cd ReactNoteApp
   ```

2. Start the application with Docker Compose:
   ```
   docker-compose up -d
   ```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

### Development Setup

#### Frontend

1. Install dependencies:
   ```
   npm install
   ```

2. Start development server:
   ```
   npm run dev
   ```

#### Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Run the backend:
   ```
   uvicorn app.main:app --reload
   ```

## Usage

1. Register a new user account
2. Log in to access the calculation tools
3. Select a house type
4. Enter the dimensions and materials
5. View the calculation results
6. Download as PDF or PNG if needed

## Default Admin Account

- Email: admin@example.com
- Password: adminpassword 