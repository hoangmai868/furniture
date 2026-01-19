# Furniture E-Commerce System

A complete furniture e-commerce platform with storefront, admin CMS, and backend API.

## Tech Stack

- **Frontend**: Next.js 15 with TypeScript and Tailwind CSS
- **Backend**: NestJS with TypeScript
- **Database**: MySQL 8.0
- **ORM**: TypeORM
- **Containerization**: Docker & Docker Compose

## Project Structure

```
furniture/
├── storefront/          # Customer-facing e-commerce website (Next.js)
├── admin/               # Admin CMS for managing content (Next.js)
├── backend/             # REST API backend (NestJS)
└── docker-compose.yml   # Docker orchestration
```

## Features

### Storefront (Port 3000)
- Home page with banner slider and featured products
- Product listing with filters (category, price, material)
- Product detail pages
- Blog/News section
- Shopping cart
- Checkout process

### Admin CMS (Port 3002)
- Product management (CRUD operations)
- Category management
- Blog post editor
- Order management
- Dashboard overview

### Backend API (Port 3001)
- RESTful API endpoints
- Product management
- Category management
- Blog post management
- Order processing
- MySQL database with TypeORM

## Database Schema

### Products
- ID, Name, Description, Price, Images, Material, Stock, CategoryID

### Categories
- ID, Name, Description, Image

### Posts
- ID, Title, Content, Thumbnail, Published, CreatedAt

### Orders
- ID, CustomerName, CustomerEmail, CustomerPhone, ShippingAddress, TotalPrice, Status

### OrderItems
- ID, OrderID, ProductID, Quantity, Price

## Quick Start

### Prerequisites
- Docker
- Docker Compose

### Run with Docker (Recommended)

Build and start all services with a single command:

```bash
docker-compose up --build
```

This will start:
- MySQL database on port 3306
- Backend API on port 3001
- Storefront on port 3000
- Admin CMS on port 3002

Access the applications:
- Storefront: http://localhost:3000
- Admin CMS: http://localhost:3002
- Backend API: http://localhost:3001

### Stop all services

```bash
docker-compose down
```

### Development Setup (Without Docker)

#### Backend
```bash
cd backend
npm install
# Configure .env file with your MySQL credentials
npm run start:dev
```

#### Storefront
```bash
cd storefront
npm install
npm run dev
```

#### Admin
```bash
cd admin
npm install
npm run dev
```

## API Endpoints

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `POST /products` - Create new product
- `PATCH /products/:id` - Update product
- `DELETE /products/:id` - Delete product

### Categories
- `GET /categories` - Get all categories
- `GET /categories/:id` - Get category by ID
- `POST /categories` - Create new category
- `PATCH /categories/:id` - Update category
- `DELETE /categories/:id` - Delete category

### Posts
- `GET /posts` - Get all published posts
- `GET /posts/:id` - Get post by ID
- `POST /posts` - Create new post
- `PATCH /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post

### Orders
- `GET /orders` - Get all orders
- `GET /orders/:id` - Get order by ID
- `POST /orders` - Create new order
- `PATCH /orders/:id` - Update order status
- `DELETE /orders/:id` - Delete order

## Environment Variables

### Backend (.env)
```
DB_HOST=mysql
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=furniture123
DB_DATABASE=furniture_db
PORT=3001
```

### Frontend (Storefront & Admin)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Design System

The UI follows the **ui-ux-pro-max** design system with:
- **Style**: Liquid Glass (flowing glass, morphing, smooth transitions)
- **Colors**: Premium earth tones (#1C1917, #44403C, #CA8A04)
- **Typography**: Cinzel (headings) / Josefin Sans (body)
- **Pattern**: Minimal Single Column for optimal conversion

## License

MIT
