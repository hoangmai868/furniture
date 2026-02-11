# Database Migrations

This project uses TypeORM migrations to manage database schema changes.

## Overview

- **Development Mode**: Uses `synchronize: true` to auto-create tables from entities
- **Production Mode**: Uses migrations for controlled schema changes
- **Docker**: Migrations run automatically on container startup

## Files

- `src/data-source.ts` - TypeORM DataSource configuration for migrations
- `src/migrations/` - Migration files directory
- `docker-entrypoint.sh` - Script that runs migrations before starting the app

## Migration Scripts

### Generate a new migration
```bash
npm run migration:generate -- src/migrations/MigrationName
```

### Run pending migrations
```bash
npm run migration:run
```

### Revert last migration
```bash
npm run migration:revert
```

## Docker Usage

When running with `docker-compose up`, migrations are automatically executed before the application starts. No manual intervention required.

## Initial Migration

The initial migration (`1704067200000-InitialSchema.ts`) creates all tables based on existing entities:

1. **users** - User authentication and profiles
2. **categories** - Hierarchical product categories
3. **products** - Furniture product catalog
4. **posts** - Blog/content management
5. **orders** - Purchase and consultation orders
6. **order_items** - Order line items

All tables include proper indexes, foreign keys, and constraints as defined in the entity models.

## Environment Variables

Set these in your `.env` file:

```
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=furniture123
DB_DATABASE=furniture_db
NODE_ENV=production  # Set to 'production' to use migrations instead of auto-sync
```
