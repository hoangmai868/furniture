# Furniture E-Commerce System - Setup Guide

## Quick Start with Docker

The easiest way to run the entire system is using Docker Compose.

### Prerequisites

- Docker (version 20.10 or higher)
- Docker Compose (version 2.0 or higher)

### Step 1: Start All Services

From the project root directory, run:

```bash
docker compose up --build
```

This single command will:
- Build the backend API
- Build the storefront
- Build the admin CMS
- Start a MySQL database
- Set up all networking and dependencies

### Step 2: Access the Applications

Once all services are running, you can access:

- **Storefront**: http://localhost:3000
- **Admin CMS**: http://localhost:3002
- **Backend API**: http://localhost:3001

### Step 3: Stop the Services

To stop all services:

```bash
docker compose down
```

To remove all data (including database):

```bash
docker compose down -v
```

## Development Setup (Without Docker)

If you want to run services individually for development:

### 1. Start MySQL Database

You need a MySQL database running. You can use Docker for just the database:

```bash
docker run -d \
  --name furniture-mysql \
  -e MYSQL_ROOT_PASSWORD=furniture123 \
  -e MYSQL_DATABASE=furniture_db \
  -p 3306:3306 \
  mysql:8.0
```

### 2. Setup Backend API

```bash
cd backend
npm install
cp .env.example .env
# Edit .env if needed
npm run start:dev
```

The API will be available at http://localhost:3001

### 3. Setup Storefront

```bash
cd storefront
npm install
cp .env.example .env
# Edit .env if needed
npm run dev
```

The storefront will be available at http://localhost:3000

### 4. Setup Admin CMS

```bash
cd admin
npm install
cp .env.example .env
# Edit .env if needed
npm run dev
```

The admin CMS will be available at http://localhost:3002

## Initial Data Setup

The system starts with an empty database. You can add data in two ways:

1. **Using Admin CMS**: Navigate to http://localhost:3002 and use the web interface to add products, categories, and posts.

2. **Using API directly**: Use tools like curl, Postman, or any HTTP client to send requests to http://localhost:3001

### Example: Create a Category

```bash
curl -X POST http://localhost:3001/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Living Room",
    "description": "Furniture for your living room"
  }'
```

### Example: Create a Product

```bash
curl -X POST http://localhost:3001/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Luxury Sofa",
    "description": "Premium 3-seater sofa with velvet upholstery",
    "price": 1299.99,
    "stock": 15,
    "material": "Velvet",
    "categoryId": 1,
    "images": ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800"]
  }'
```

### Example: Create a Blog Post

```bash
curl -X POST http://localhost:3001/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Interior Design Trends 2024",
    "content": "Discover the latest trends in furniture and interior design...",
    "thumbnail": "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800",
    "published": true
  }'
```

## Troubleshooting

### Port Conflicts

If you get errors about ports already in use:

1. Check what's using the ports:
```bash
lsof -i :3000  # Storefront
lsof -i :3001  # Backend
lsof -i :3002  # Admin
lsof -i :3306  # MySQL
```

2. Either stop the conflicting service or modify the ports in `docker-compose.yml`

### Database Connection Issues

If the backend can't connect to MySQL:

1. Ensure MySQL container is healthy:
```bash
docker compose ps
```

2. Check MySQL logs:
```bash
docker compose logs mysql
```

3. Try restarting with fresh data:
```bash
docker compose down -v
docker compose up --build
```

### Build Errors

If you encounter build errors:

1. Clear Docker build cache:
```bash
docker compose build --no-cache
```

2. Remove all containers and images:
```bash
docker compose down -v
docker system prune -a
```

Then rebuild:
```bash
docker compose up --build
```

## Project Structure

```
furniture/
├── backend/          # NestJS API
│   ├── src/
│   │   ├── entities/       # Database entities
│   │   ├── products/       # Products module
│   │   ├── categories/     # Categories module
│   │   ├── posts/          # Blog posts module
│   │   └── orders/         # Orders module
│   └── Dockerfile
├── storefront/       # Next.js customer-facing website
│   ├── app/
│   │   ├── page.tsx        # Home page
│   │   ├── products/       # Products pages
│   │   ├── blog/           # Blog pages
│   │   └── cart/           # Shopping cart
│   ├── components/         # Shared components
│   └── Dockerfile
├── admin/            # Next.js admin dashboard
│   ├── app/
│   │   ├── page.tsx        # Dashboard
│   │   ├── products/       # Product management
│   │   ├── posts/          # Blog management
│   │   └── orders/         # Order management
│   ├── components/         # Admin components
│   └── Dockerfile
└── docker-compose.yml
```

## Technology Stack

- **Frontend Framework**: Next.js 15 with TypeScript
- **Backend Framework**: NestJS with TypeScript
- **Database**: MySQL 8.0
- **ORM**: TypeORM
- **CSS Framework**: Tailwind CSS v4
- **Containerization**: Docker & Docker Compose

## Features Implemented

### Storefront
✅ Home page with banner slider
✅ Product listing with filters
✅ Product detail pages
✅ Blog/news section
✅ Shopping cart
✅ Checkout and order placement

### Admin CMS
✅ Dashboard with statistics
✅ Product management (CRUD)
✅ Category management (CRUD)
✅ Blog post management (CRUD)
✅ Order management and status updates

### Backend API
✅ RESTful API endpoints
✅ MySQL database integration
✅ TypeORM for database operations
✅ Data validation
✅ CORS enabled for frontend integration

## Next Steps

1. Add user authentication (JWT)
2. Add image upload functionality
3. Add payment gateway integration
4. Add email notifications
5. Add search functionality
6. Add product reviews
7. Add analytics and reporting

## License

MIT
