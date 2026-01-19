# Furniture E-Commerce System

A complete, production-ready furniture e-commerce platform with customer storefront, admin CMS, and backend API. Built with modern technologies and containerized with Docker for easy deployment.

![Tech Stack](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![NestJS](https://img.shields.io/badge/NestJS-11-red?logo=nestjs)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?logo=mysql)
![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)

## 🚀 Quick Start

Get the entire system running with a single command:

```bash
docker compose up --build
```

Then access:
- **Storefront**: http://localhost:3000
- **Admin CMS**: http://localhost:3002  
- **Backend API**: http://localhost:3001

### Seed Sample Data (Optional)

After the services are running, populate with sample data:

```bash
chmod +x seed-data.sh
./seed-data.sh
```

For detailed setup instructions, see [SETUP.md](SETUP.md)

## 📋 Project Structure

```
furniture/
├── backend/          # NestJS API
├── storefront/       # Next.js customer-facing website
├── admin/            # Next.js admin dashboard
├── docker-compose.yml
└── seed-data.sh      # Sample data seeder
```

## 🎯 Features

### Storefront (Customer Experience)
- ✅ Modern home page with image slider
- ✅ Product catalog with advanced filtering (category, price, material)
- ✅ Product detail pages
- ✅ Blog/news section with articles
- ✅ Shopping cart with quantity management
- ✅ Checkout and order placement
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Liquid Glass design system with premium aesthetics

### Admin CMS (Content Management)
- ✅ Dashboard with real-time statistics
- ✅ Product management (Create, Read, Update, Delete)
- ✅ Category management
- ✅ Blog post editor with rich content
- ✅ Order management with status updates
- ✅ Clean, intuitive interface
- ✅ Real-time data synchronization

### Backend API
- ✅ RESTful API architecture
- ✅ MySQL database integration
- ✅ TypeORM for elegant database operations
- ✅ Data validation with class-validator
- ✅ CORS enabled for frontend integration
- ✅ Auto-generated database schema
- ✅ Comprehensive error handling

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Design System**: Liquid Glass (Cinzel/Josefin Sans fonts)
- **State**: React Hooks + localStorage

### Backend
- **Framework**: NestJS 11
- **Language**: TypeScript  
- **Database**: MySQL 8.0
- **ORM**: TypeORM
- **Validation**: class-validator

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **API Communication**: REST
- **Environment**: Node.js 20

## 📊 Database Schema

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

## 🎨 Design System

The UI follows the **ui-ux-pro-max** design guidelines:

- **Style**: Liquid Glass (flowing, morphing, smooth transitions)
- **Colors**: Premium earth tones
  - Primary: `#1C1917` (Stone)
  - Secondary: `#44403C` (Warm Gray)
  - Accent: `#CA8A04` (Gold)
  - Background: `#FAFAF9` (Off-white)
- **Typography**: 
  - Headings: Cinzel (serif, elegant)
  - Body: Josefin Sans (sans-serif, modern)
- **Effects**: Backdrop blur, smooth transitions, glass morphism

## 📖 API Documentation

### Products Endpoints
```
GET    /products       - Get all products
GET    /products/:id   - Get product by ID
POST   /products       - Create product
PATCH  /products/:id   - Update product
DELETE /products/:id   - Delete product
```

### Categories Endpoints
```
GET    /categories       - Get all categories
GET    /categories/:id   - Get category by ID
POST   /categories       - Create category
PATCH  /categories/:id   - Update category
DELETE /categories/:id   - Delete category
```

### Posts Endpoints
```
GET    /posts       - Get all published posts
GET    /posts/:id   - Get post by ID
POST   /posts       - Create post
PATCH  /posts/:id   - Update post
DELETE /posts/:id   - Delete post
```

### Orders Endpoints
```
GET    /orders       - Get all orders
GET    /orders/:id   - Get order by ID
POST   /orders       - Create order
PATCH  /orders/:id   - Update order status
DELETE /orders/:id   - Delete order
```

## 🔧 Development

### Prerequisites
- Node.js 20+
- Docker & Docker Compose
- MySQL 8.0 (if running without Docker)

### Local Development Setup

See [SETUP.md](SETUP.md) for detailed instructions on running individual services.

### Environment Variables

Each application has an `.env.example` file. Copy to `.env` and configure:

**Backend** (`backend/.env`):
```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=furniture123
DB_DATABASE=furniture_db
PORT=3001
```

**Storefront & Admin** (`.env`):
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 📦 Deployment

### Production Deployment

For production, modify `docker-compose.yml`:
1. Set `synchronize: false` in TypeORM config
2. Use environment-specific `.env` files
3. Enable HTTPS/SSL
4. Configure proper database backups
5. Set up monitoring and logging

### Docker Commands

```bash
# Start all services
docker compose up -d

# View logs
docker compose logs -f

# Stop services
docker compose down

# Remove all data
docker compose down -v

# Rebuild specific service
docker compose build backend
docker compose up -d backend
```

## 🧪 Testing

Build all services to verify:

```bash
# Backend
cd backend && npm run build

# Storefront
cd storefront && npm run build

# Admin
cd admin && npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🎓 Learning Resources

This project demonstrates:
- Full-stack TypeScript development
- Modern Next.js patterns (App Router, Server Components)
- NestJS architecture and modules
- TypeORM database integration
- Docker containerization
- RESTful API design
- E-commerce workflows
- Admin panel development

## 🔮 Future Enhancements

- [ ] User authentication & authorization (JWT)
- [ ] Image upload & management
- [ ] Payment gateway integration (Stripe, PayPal)
- [ ] Email notifications
- [ ] Advanced search with Elasticsearch
- [ ] Product reviews & ratings
- [ ] Wishlist functionality
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] Mobile app (React Native)

## 📞 Support

For questions or issues, please open a GitHub issue.

---

**Built with ❤️ using Next.js, NestJS, and MySQL**
