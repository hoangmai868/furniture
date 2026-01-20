# API Testing Examples

## Prerequisites
- Server chạy tại `http://localhost:3000`
- MySQL database đã được tạo và kết nối thành công
- Content-Type: application/json

## Users API

### 1. Tạo User mới
```bash
POST http://localhost:3000/users
Content-Type: application/json

{
  "email": "admin@furniture.com",
  "password": "password123",
  "role": "admin",
  "firstName": "Hoàng",
  "lastName": "Mai",
  "phoneNumber": "0123456789",
  "avatar": {
    "url": "https://example.com/avatar.jpg",
    "alt": "Admin Avatar"
  },
  "address": {
    "street": "123 Main St",
    "city": "Ho Chi Minh",
    "province": "Ho Chi Minh",
    "postalCode": "70000"
  },
  "isActive": true
}
```

### 2. Lấy danh sách Users
```bash
GET http://localhost:3000/users
```

### 3. Lấy User theo ID
```bash
GET http://localhost:3000/users/{userId}
```

### 4. Cập nhật User
```bash
PATCH http://localhost:3000/users/{userId}
Content-Type: application/json

{
  "firstName": "Updated Name",
  "phoneNumber": "0987654321"
}
```

### 5. Xóa User
```bash
DELETE http://localhost:3000/users/{userId}
```

## Categories API

### 1. Tạo Category mới
```bash
POST http://localhost:3000/categories
Content-Type: application/json

{
  "name": "Phòng khách",
  "slug": "phong-khach",
  "description": "Nội thất phòng khách",
  "image": {
    "url": "https://example.com/category.jpg",
    "alt": "Phòng khách"
  },
  "level": 0,
  "order": 1,
  "isActive": true,
  "metadata": {
    "seoTitle": "Nội thất phòng khách cao cấp",
    "seoDescription": "Bộ sưu tập nội thất phòng khách đẹp",
    "seoKeywords": ["phòng khách", "nội thất", "sofa"]
  }
}
```

### 2. Tạo Sub-category
```bash
POST http://localhost:3000/categories
Content-Type: application/json

{
  "name": "Sofa",
  "slug": "sofa",
  "description": "Ghế sofa",
  "parentId": "{parentCategoryId}",
  "level": 1,
  "order": 1,
  "isActive": true
}
```

### 3. Lấy danh sách Categories
```bash
GET http://localhost:3000/categories
```

### 4. Lấy Category theo ID
```bash
GET http://localhost:3000/categories/{categoryId}
```

### 5. Cập nhật Category
```bash
PATCH http://localhost:3000/categories/{categoryId}
Content-Type: application/json

{
  "name": "Updated Category Name",
  "order": 2
}
```

### 6. Xóa Category
```bash
DELETE http://localhost:3000/categories/{categoryId}
```

## Products API

### 1. Tạo Product mới
```bash
POST http://localhost:3000/products
Content-Type: application/json

{
  "name": "Sofa Da Cao Cấp",
  "slug": "sofa-da-cao-cap",
  "description": "Sofa da cao cấp nhập khẩu từ Ý",
  "price": 25000000,
  "images": [
    {
      "url": "https://example.com/product1.jpg",
      "alt": "Sofa view 1",
      "displayOrder": 0
    },
    {
      "url": "https://example.com/product2.jpg",
      "alt": "Sofa view 2",
      "displayOrder": 1
    }
  ],
  "categoryId": "{categoryId}",
  "specifications": {
    "dimensions": {
      "length": 200,
      "width": 90,
      "height": 85
    },
    "material": "Da thật",
    "color": "Nâu",
    "weight": 80
  },
  "stock": 10,
  "featured": true,
  "status": "published",
  "metadata": {
    "seoTitle": "Sofa Da Cao Cấp - Nhập Khẩu Ý",
    "seoDescription": "Sofa da cao cấp thiết kế sang trọng",
    "seoKeywords": ["sofa", "sofa da", "nội thất cao cấp"]
  }
}
```

### 2. Lấy danh sách Products
```bash
GET http://localhost:3000/products
```

### 3. Lấy Product theo ID
```bash
GET http://localhost:3000/products/{productId}
```

### 4. Cập nhật Product
```bash
PATCH http://localhost:3000/products/{productId}
Content-Type: application/json

{
  "price": 23000000,
  "stock": 15,
  "status": "published"
}
```

### 5. Xóa Product
```bash
DELETE http://localhost:3000/products/{productId}
```

## Posts API

### 1. Tạo Post mới
```bash
POST http://localhost:3000/posts
Content-Type: application/json

{
  "title": "10 Mẹo Trang Trí Phòng Khách Đẹp",
  "slug": "10-meo-trang-tri-phong-khach-dep",
  "content": "Nội dung chi tiết của bài viết...",
  "excerpt": "Tổng hợp 10 mẹo trang trí phòng khách giúp không gian sống của bạn trở nên đẹp hơn",
  "featuredImage": {
    "url": "https://example.com/post-featured.jpg",
    "alt": "Phòng khách đẹp"
  },
  "images": [
    {
      "url": "https://example.com/post1.jpg",
      "alt": "Image 1",
      "caption": "Ví dụ trang trí 1"
    }
  ],
  "authorId": "{userId}",
  "categories": ["design-tips", "decoration"],
  "tags": ["trang trí", "phòng khách", "nội thất"],
  "status": "published",
  "publishedAt": "2024-01-20T10:00:00Z",
  "metadata": {
    "seoTitle": "10 Mẹo Trang Trí Phòng Khách",
    "seoDescription": "Hướng dẫn trang trí phòng khách đẹp",
    "seoKeywords": ["trang trí", "phòng khách"],
    "readingTime": 5
  },
  "stats": {
    "views": 0,
    "likes": 0,
    "shares": 0
  }
}
```

### 2. Lấy danh sách Posts
```bash
GET http://localhost:3000/posts
```

### 3. Lấy Post theo ID
```bash
GET http://localhost:3000/posts/{postId}
```

### 4. Cập nhật Post
```bash
PATCH http://localhost:3000/posts/{postId}
Content-Type: application/json

{
  "status": "published",
  "stats": {
    "views": 100,
    "likes": 5,
    "shares": 2
  }
}
```

### 5. Xóa Post
```bash
DELETE http://localhost:3000/posts/{postId}
```

## Orders API

### 1. Tạo Purchase Order
```bash
POST http://localhost:3000/orders
Content-Type: application/json

{
  "orderType": "purchase",
  "customer": {
    "name": "Nguyễn Văn A",
    "email": "customer@example.com",
    "phone": "0123456789",
    "address": {
      "street": "456 Nguyen Hue",
      "city": "Ho Chi Minh",
      "province": "Ho Chi Minh",
      "postalCode": "70000"
    },
    "userId": "{userId}"
  },
  "items": [
    {
      "product": "{productId}",
      "quantity": 1,
      "price": 25000000
    },
    {
      "product": "{productId2}",
      "quantity": 2,
      "price": 5000000
    }
  ],
  "totalAmount": 35000000,
  "status": "pending",
  "paymentStatus": "unpaid",
  "paymentMethod": "bank_transfer",
  "notes": "Giao hàng ngoài giờ hành chính"
}
```

### 2. Tạo Consultation Order
```bash
POST http://localhost:3000/orders
Content-Type: application/json

{
  "orderType": "consultation",
  "customer": {
    "name": "Trần Thị B",
    "email": "consultation@example.com",
    "phone": "0987654321",
    "address": {
      "street": "789 Le Loi",
      "city": "Ha Noi",
      "province": "Ha Noi",
      "postalCode": "10000"
    }
  },
  "consultationDetails": {
    "projectType": "Thiết kế nội thất chung cư",
    "spaceSize": "80m2",
    "budget": 100000000,
    "requirements": "Phong cách hiện đại, tối ưu không gian",
    "preferredContactTime": "2024-01-25T14:00:00Z"
  },
  "status": "pending",
  "paymentStatus": "unpaid"
}
```

### 3. Lấy danh sách Orders
```bash
GET http://localhost:3000/orders
```

### 4. Lấy Order theo ID
```bash
GET http://localhost:3000/orders/{orderId}
```

### 5. Cập nhật Order Status
```bash
PATCH http://localhost:3000/orders/{orderId}
Content-Type: application/json

{
  "status": "confirmed",
  "assignedStaffId": "{staffUserId}",
  "staffNotes": "Đã liên hệ khách hàng, xác nhận đơn hàng"
}
```

### 6. Xóa Order
```bash
DELETE http://localhost:3000/orders/{orderId}
```

## Sử dụng với cURL

### Ví dụ tạo User với cURL:
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User",
    "role": "customer"
  }'
```

### Ví dụ lấy danh sách Products:
```bash
curl -X GET http://localhost:3000/products
```

## Sử dụng với Postman

1. Import các request trên vào Postman
2. Tạo environment variables cho baseUrl: `http://localhost:3000`
3. Lưu response IDs để sử dụng trong các request khác
4. Sử dụng Tests tab để extract và lưu IDs tự động

## Lưu ý

- Tất cả endpoints yêu cầu Content-Type: application/json
- UUIDs được tự động generate cho các entities mới
- Timestamps (createdAt, updatedAt) được tự động quản lý
- Password được tự động hash trước khi lưu vào database
- Foreign key constraints được enforce bởi MySQL
- Validation errors sẽ trả về HTTP 400 với chi tiết lỗi
- Not found errors sẽ trả về HTTP 404
- Conflict errors (duplicate email, slug) sẽ trả về HTTP 409

## Response Format

### Success Response
```json
{
  "id": "uuid",
  "field1": "value1",
  ...
}
```

### Error Response
```json
{
  "statusCode": 400,
  "message": ["Error message 1", "Error message 2"],
  "error": "Bad Request"
}
```
