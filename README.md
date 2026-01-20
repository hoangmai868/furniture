# Furniture Store Backend API

Backend API cho website nội thất sử dụng NestJS và MySQL.

## Yêu cầu

- Node.js >= 16
- MySQL >= 5.7
- npm hoặc yarn

## Cài đặt

1. Clone repository:
```bash
git clone <repository-url>
cd furniture
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Tạo file `.env` từ `.env.example`:
```bash
cp .env.example .env
```

4. Cấu hình database trong file `.env`:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=furniture_db
PORT=3000
```

5. Tạo database MySQL:
```sql
CREATE DATABASE furniture_db;
```

## Chạy ứng dụng

### Development mode
```bash
npm run start:dev
```

### Production mode
```bash
npm run build
npm run start:prod
```

Server sẽ chạy tại: `http://localhost:3000`

## API Endpoints

### Users
- `POST /users` - Tạo user mới
- `GET /users` - Lấy danh sách users
- `GET /users/:id` - Lấy thông tin user theo ID
- `PATCH /users/:id` - Cập nhật user
- `DELETE /users/:id` - Xóa user

### Categories
- `POST /categories` - Tạo category mới
- `GET /categories` - Lấy danh sách categories
- `GET /categories/:id` - Lấy thông tin category theo ID
- `PATCH /categories/:id` - Cập nhật category
- `DELETE /categories/:id` - Xóa category

### Products
- `POST /products` - Tạo product mới
- `GET /products` - Lấy danh sách products
- `GET /products/:id` - Lấy thông tin product theo ID
- `PATCH /products/:id` - Cập nhật product
- `DELETE /products/:id` - Xóa product

### Posts
- `POST /posts` - Tạo post mới
- `GET /posts` - Lấy danh sách posts
- `GET /posts/:id` - Lấy thông tin post theo ID
- `PATCH /posts/:id` - Cập nhật post
- `DELETE /posts/:id` - Xóa post

### Orders
- `POST /orders` - Tạo order mới
- `GET /orders` - Lấy danh sách orders
- `GET /orders/:id` - Lấy thông tin order theo ID
- `PATCH /orders/:id` - Cập nhật order
- `DELETE /orders/:id` - Xóa order

## Database Schema

### Users
- email (unique, required)
- password (hashed, required)
- role (enum: admin, editor, customer)
- firstName, lastName
- phoneNumber
- avatar (JSON)
- address (JSON)
- isActive
- timestamps

### Categories
- name (unique, required)
- slug (unique, required)
- description
- image (JSON)
- parent (self-reference)
- level, order
- isActive
- metadata (JSON - SEO)
- timestamps

### Products
- name, slug (unique)
- description
- price
- images (JSON array)
- category (foreign key)
- specifications (JSON)
- stock
- featured
- status (enum: draft, published, outOfStock)
- metadata (JSON - SEO)
- timestamps

### Posts
- title, slug (unique)
- content, excerpt
- featuredImage (JSON)
- images (JSON array)
- author (foreign key to User)
- categories (JSON array)
- tags (JSON array)
- status (enum: draft, published, archived)
- publishedAt
- metadata (JSON - SEO)
- stats (JSON - views, likes, shares)
- timestamps

### Orders
- orderType (enum: purchase, consultation)
- customer (JSON - embedded customer info)
- items (JSON array)
- consultationDetails (JSON)
- totalAmount
- status (enum: pending, confirmed, processing, completed, cancelled)
- paymentStatus (enum: unpaid, paid, refunded)
- paymentMethod (enum: cod, bank_transfer, credit_card)
- notes, staffNotes
- assignedStaff (foreign key to User)
- statusHistory (JSON array)
- timestamps

## Công nghệ sử dụng

- **NestJS** - Framework backend
- **TypeORM** - ORM cho MySQL
- **MySQL** - Database
- **class-validator** - Validation
- **bcryptjs** - Password hashing
- **TypeScript** - Programming language

## License

ISC
