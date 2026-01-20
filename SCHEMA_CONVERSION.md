# Schema Conversion: MongoDB to MySQL

## Tổng quan

Tài liệu này mô tả cách các schema MongoDB được chuyển đổi sang MySQL entities sử dụng TypeORM.

## Chiến lược chuyển đổi

### 1. Nested Objects (JSON)
MongoDB hỗ trợ nested documents tự nhiên. Trong MySQL, chúng ta sử dụng:
- **JSON columns** cho các object đơn giản không cần query riêng
- **Separate tables** cho relationships phức tạp cần query

### 2. Arrays
- **JSON columns** cho arrays đơn giản (tags, categories)
- **Separate tables** cho complex arrays với relationships

### 3. ObjectId References
- Chuyển thành **UUID** hoặc **Foreign Keys** trong MySQL
- Sử dụng TypeORM relationships (@ManyToOne, @OneToMany)

## Chi tiết chuyển đổi từng model

### User Model

#### MongoDB → MySQL Mapping

| MongoDB Field | MySQL Column | Type | Notes |
|--------------|--------------|------|-------|
| _id | id | uuid | Primary key |
| email | email | varchar(255) | Unique index |
| password | password | varchar | select: false |
| role | role | enum | admin, editor, customer |
| firstName | firstName | varchar(100) | |
| lastName | lastName | varchar(100) | |
| phoneNumber | phoneNumber | varchar(10) | |
| avatar (object) | avatar | json | {url, alt} |
| address (object) | address | json | {street, city, province, postalCode} |
| isActive | isActive | boolean | default: true |
| lastLogin | lastLogin | timestamp | nullable |
| passwordChangedAt | passwordChangedAt | timestamp | nullable |
| passwordResetToken | passwordResetToken | varchar | nullable |
| passwordResetExpires | passwordResetExpires | timestamp | nullable |
| createdAt | createdAt | timestamp | auto-generated |
| updatedAt | updatedAt | timestamp | auto-updated |

**Đặc điểm:**
- Password được hash sử dụng bcryptjs trong @BeforeInsert và @BeforeUpdate hooks
- avatar và address lưu dưới dạng JSON vì chúng là nested objects đơn giản

### Category Model

#### MongoDB → MySQL Mapping

| MongoDB Field | MySQL Column | Type | Notes |
|--------------|--------------|------|-------|
| _id | id | uuid | Primary key |
| name | name | varchar(255) | Unique |
| slug | slug | varchar(255) | Unique |
| description | description | text | |
| image (object) | image | json | {url, alt} |
| parent (ref) | parentId | uuid | Foreign key to categories |
| level | level | integer | default: 0 |
| order | order | integer | default: 0 |
| isActive | isActive | boolean | default: true |
| metadata (object) | metadata | json | {seoTitle, seoDescription, seoKeywords} |
| createdAt | createdAt | timestamp | auto-generated |
| updatedAt | updatedAt | timestamp | auto-updated |

**Đặc điểm:**
- Self-referencing relationship: parent → children
- @ManyToOne và @OneToMany decorators cho hierarchical structure

### Product Model

#### MongoDB → MySQL Mapping

| MongoDB Field | MySQL Column | Type | Notes |
|--------------|--------------|------|-------|
| _id | id | uuid | Primary key |
| name | name | varchar(255) | |
| slug | slug | varchar(255) | Unique |
| description | description | text | |
| price | price | decimal(10,2) | |
| images (array) | images | json | Array of {url, alt, displayOrder} |
| category (ref) | categoryId | uuid | Foreign key to categories |
| specifications (object) | specifications | json | {dimensions, material, color, weight} |
| stock | stock | integer | default: 0 |
| featured | featured | boolean | default: false |
| status | status | enum | draft, published, outOfStock |
| metadata (object) | metadata | json | {seoTitle, seoDescription, seoKeywords} |
| createdAt | createdAt | timestamp | auto-generated |
| updatedAt | updatedAt | timestamp | auto-updated |

**Đặc điểm:**
- images array lưu dưới dạng JSON vì structure đơn giản
- specifications lưu dưới dạng JSON cho flexibility
- @ManyToOne relationship với Category

### Post Model

#### MongoDB → MySQL Mapping

| MongoDB Field | MySQL Column | Type | Notes |
|--------------|--------------|------|-------|
| _id | id | uuid | Primary key |
| title | title | varchar(255) | |
| slug | slug | varchar(255) | Unique |
| content | content | text | |
| excerpt | excerpt | varchar(500) | |
| featuredImage (object) | featuredImage | json | {url, alt} |
| images (array) | images | json | Array of {url, alt, caption} |
| author (ref) | authorId | uuid | Foreign key to users |
| categories (array) | categories | json | Array of enum strings |
| tags (array) | tags | json | Array of strings |
| status | status | enum | draft, published, archived |
| publishedAt | publishedAt | timestamp | nullable |
| metadata (object) | metadata | json | {seoTitle, seoDescription, seoKeywords, readingTime} |
| stats (object) | stats | json | {views, likes, shares} |
| createdAt | createdAt | timestamp | auto-generated |
| updatedAt | updatedAt | timestamp | auto-updated |

**Đặc điểm:**
- categories array lưu dưới dạng JSON với enum validation
- stats lưu dưới dạng JSON cho simple counters
- @ManyToOne relationship với User (author)

### Order Model

#### MongoDB → MySQL Mapping

| MongoDB Field | MySQL Column | Type | Notes |
|--------------|--------------|------|-------|
| _id | id | uuid | Primary key |
| orderType | orderType | enum | purchase, consultation |
| customer (object) | customer | json | {name, email, phone, address, userId} |
| items (array) | items | json | Array of {product, quantity, price} |
| consultationDetails (object) | consultationDetails | json | {projectType, spaceSize, budget, requirements, preferredContactTime} |
| totalAmount | totalAmount | decimal(10,2) | default: 0 |
| status | status | enum | pending, confirmed, processing, completed, cancelled |
| paymentStatus | paymentStatus | enum | unpaid, paid, refunded |
| paymentMethod | paymentMethod | enum | cod, bank_transfer, credit_card |
| notes | notes | text | nullable |
| staffNotes | staffNotes | text | nullable |
| assignedStaff (ref) | assignedStaffId | uuid | Foreign key to users |
| statusHistory (array) | statusHistory | json | Array of {status, timestamp, note, updatedBy} |
| createdAt | createdAt | timestamp | auto-generated |
| updatedAt | updatedAt | timestamp | auto-updated |

**Đặc điểm:**
- customer embedded document → JSON column
- items array → JSON column
- statusHistory → JSON array cho audit trail
- @ManyToOne relationship với User (assignedStaff)

## Lợi ích của cách tiếp cận này

### 1. Performance
- Indexed columns (email, slug) cho fast lookups
- JSON columns cho nested data không cần query riêng
- Proper foreign keys cho data integrity

### 2. Flexibility
- JSON columns cho dynamic/nested data
- Relational structure cho data cần query

### 3. Maintainability
- TypeORM entities rõ ràng, type-safe
- Validation với class-validator
- Auto-generated timestamps

### 4. Scalability
- Proper indexing strategy
- Optimized relationships
- Support cho future migrations

## Best Practices được áp dụng

1. **UUID cho Primary Keys**: Tránh sequential IDs exposure
2. **JSON cho Nested Objects**: Flexibility mà không cần nhiều tables
3. **Enums cho Fixed Values**: Type safety và data integrity
4. **Proper Relationships**: Foreign keys với cascade options
5. **Timestamps**: Auto-tracking create/update times
6. **Validation**: DTOs với class-validator decorators
7. **Password Hashing**: BeforeInsert/BeforeUpdate hooks

## Cách sử dụng

### 1. Setup Database
```sql
CREATE DATABASE furniture_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Configure Environment
```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=furniture_db
```

### 3. Start Application
```bash
npm run start:dev
```

TypeORM sẽ tự động tạo tables dựa trên entities (synchronize: true trong development).

## Migration cho Production

Trong production, nên:
1. Tắt `synchronize: true`
2. Sử dụng TypeORM migrations
3. Version control migration files

Ví dụ tạo migration:
```bash
npm run typeorm migration:generate -- -n InitialSchema
npm run typeorm migration:run
```
