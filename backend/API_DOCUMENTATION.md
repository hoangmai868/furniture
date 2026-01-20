# Furniture Store Backend API

NestJS backend with MySQL database using TypeORM for a furniture e-commerce platform.

## Overview

This backend implements a complete REST API for managing:
- Users (customers, editors, admins)
- Products (furniture items)
- Categories (hierarchical product categories)
- Posts (blog posts)
- Orders (purchases and consultations)

## Database Schema

### Entities

All entities are converted from MongoDB schemas to TypeORM entities with MySQL as the database.

#### User Entity
- Authentication with password hashing (bcrypt)
- Role-based access control (admin, editor, customer)
- Profile information (firstName, lastName, email, phone)
- Avatar and address (JSON fields)
- Account status tracking (isActive, lastLogin)
- Password reset functionality

#### Product Entity
- Product details (name, slug, description, price)
- Image gallery with metadata
- Category relationship
- Specifications (dimensions, material, color, weight)
- Stock management
- Featured products
- Status (draft, published, outOfStock)
- SEO metadata
- Full-text search support

#### Category Entity
- Hierarchical structure (parent-child relationships)
- Category details (name, slug, description)
- Image support
- Ordering and level management
- Active/inactive status
- SEO metadata

#### Post Entity
- Blog post management (title, slug, content, excerpt)
- Featured image and image gallery
- Author relationship (User)
- Multiple category support (enum-based)
- Tags support
- Status management (draft, published, archived)
- Publishing date
- SEO metadata
- Statistics (views, likes, shares)
- Full-text search support

#### Order Entity
- Two types: purchase and consultation
- Customer information (embedded JSON)
- Order items (products, quantity, price)
- Consultation details for consultation requests
- Status tracking (pending, confirmed, processing, completed, cancelled)
- Payment tracking (unpaid, paid, refunded)
- Payment method (COD, bank transfer, credit card)
- Notes for customer and staff
- Staff assignment
- Status history with timestamps

## API Endpoints

### Users (`/users`)
- `POST /users` - Create new user
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Products (`/products`)
- `POST /products` - Create new product
- `GET /products` - Get all products (with category relations)
- `GET /products/:id` - Get product by ID
- `PATCH /products/:id` - Update product
- `DELETE /products/:id` - Delete product

### Categories (`/categories`)
- `POST /categories` - Create new category
- `GET /categories` - Get all categories (with parent-child relations)
- `GET /categories/:id` - Get category by ID (includes products)
- `PATCH /categories/:id` - Update category
- `DELETE /categories/:id` - Delete category

### Posts (`/posts`)
- `POST /posts` - Create new post
- `GET /posts` - Get all posts (with author relations)
- `GET /posts/:id` - Get post by ID
- `PATCH /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post

### Orders (`/orders`)
- `POST /orders` - Create new order
- `GET /orders` - Get all orders (with items, products, and staff relations)
- `GET /orders/:id` - Get order by ID
- `PATCH /orders/:id` - Update order
- `DELETE /orders/:id` - Delete order

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=furniture123
DB_DATABASE=furniture_db
PORT=3001
```

## Installation

```bash
npm install
```

## Running the Application

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Database Setup

The application uses TypeORM with `synchronize: true` for development, which automatically creates/updates database tables based on entities.

For production, you should:
1. Set `synchronize: false`
2. Use migrations for schema changes

## Features

### Security
- Password hashing with bcrypt
- Password never returned in API responses (select: false)
- Validation on all DTOs using class-validator

### Data Validation
- Email validation
- Phone number validation (10 digits)
- Price and stock validation (non-negative)
- Enum validation for status fields
- Required field validation

### Relationships
- Products belong to Categories
- Posts belong to Users (authors)
- Categories support parent-child relationships (hierarchical)
- Orders have many OrderItems
- Orders can be assigned to Staff (Users)

### JSON Fields
- User: avatar, address
- Product: images (array), specifications, metadata
- Category: image, metadata
- Post: featuredImage, images (array), metadata, stats
- Order: customer, consultationDetails, statusHistory

### Full-Text Search
- Products indexed on name and description
- Posts indexed on title and content

## Testing

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Build

```bash
npm run build
```

## Linting

```bash
npm run lint
```

## Technologies Used

- **Framework**: NestJS 11.x
- **Database**: MySQL 8.0
- **ORM**: TypeORM 0.3.x
- **Validation**: class-validator, class-transformer
- **Password Hashing**: bcryptjs
- **Language**: TypeScript 5.x

## Architecture

The application follows NestJS best practices:
- Module-based architecture
- Dependency injection
- DTOs for data validation
- Repository pattern with TypeORM
- Separation of concerns (controllers, services, entities)

## Notes

- All timestamps are automatically managed by TypeORM (createdAt, updatedAt)
- Password hashing is automatic before insert/update in User entity
- Cascade operations are configured for Order -> OrderItems relationship
- All foreign key relationships have proper onDelete strategies
