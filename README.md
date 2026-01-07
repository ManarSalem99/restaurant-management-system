# Restaurant Management System

A full-stack restaurant management application built with React (Vite) and NestJS.

## Features

- **User Authentication**: Registration, login, and JWT-based authorization
- **Role-Based Access**: Admin and Customer roles with different permissions
- **Restaurant Management**: CRUD operations for restaurants (Admin only)
- **Menu Management**: CRUD operations for menu items (Admin only)
- **Order System**: Customers can browse restaurants, add items to cart, and place orders
- **Order Tracking**: View order history and status

## Tech Stack

### Frontend
- React 19
- Vite
- React Router DOM
- Axios

### Backend
- NestJS
- TypeORM
- SQLite (development)
- JWT Authentication
- Passport.js

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone YOUR_REPO_URL
   cd FinalProject
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start Backend** (Terminal 1)
   ```bash
   cd backend
   npm run start:dev
   ```
   Backend runs on `http://localhost:3000`

2. **Start Frontend** (Terminal 2)
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

## Usage

1. **Register a new account**
   - Go to `/register`
   - Choose Admin role to manage restaurants
   - Choose Customer role to browse and order

2. **As Admin:**
   - Create restaurants
   - Add menu items to restaurants
   - View all orders

3. **As Customer:**
   - Browse restaurants
   - View menus
   - Add items to cart
   - Place orders
   - View order history

## Database Schema

- **User**: id, email, password, name, role
- **Restaurant**: id, name, address, phone, description
- **MenuItem**: id, name, price, description, imageUrl, restaurantId
- **Order**: id, customerId, restaurantId, status, total, createdAt
- **OrderItem**: id, orderId, menuItemId, quantity, price

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### Restaurants (Admin only)
- `GET /restaurants` - Get all restaurants
- `GET /restaurants/:id` - Get restaurant by ID
- `POST /restaurants` - Create restaurant
- `PATCH /restaurants/:id` - Update restaurant
- `DELETE /restaurants/:id` - Delete restaurant

### Menu Items (Admin only)
- `GET /menu-items` - Get all menu items
- `GET /menu-items/:id` - Get menu item by ID
- `POST /menu-items` - Create menu item
- `PATCH /menu-items/:id` - Update menu item
- `DELETE /menu-items/:id` - Delete menu item

### Orders
- `GET /orders` - Get orders (all for admin, own for customer)
- `GET /orders/:id` - Get order by ID
- `POST /orders` - Create order
- `PATCH /orders/:id/status` - Update order status (Admin only)

## Deployment

See `DEPLOYMENT.md` for detailed deployment instructions.

## License

This project is for educational purposes.
