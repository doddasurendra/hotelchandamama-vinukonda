# API Documentation - Hotel Chandamama

Base URL: `http://localhost:5000/api` (Development)
Production: `https://your-domain.com/api`

## Authentication

Most endpoints require authentication. Include JWT token in request header:

```
Authorization: Bearer <your_jwt_token>
```

## Role-Based Access

- 🟢 Public - No authentication required
- 🔵 Customer - Requires customer login
- 🟡 Staff - Requires staff or higher
- 🟠 Admin - Requires admin or higher
- 🔴 Owner - Requires owner or higher
- ⚫ Developer - Requires developer access

---

## Authentication Endpoints

### Register Customer
```http
POST /api/auth/register
```

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

### Login
```http
POST /api/auth/login
```

**Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

### Get Current User
```http
GET /api/auth/me
```

**Headers:**
```
Authorization: Bearer <token>
```

---

## Menu Endpoints

### Get All Menu Items 🟢
```http
GET /api/menu
```

**Query Parameters:**
- `category` - Filter by category (Tiffins, Meals, Snacks, Beverages, Desserts)
- `search` - Search by name or description
- `available` - Filter by availability (true/false)

**Example:**
```http
GET /api/menu?category=Tiffins&search=dosa
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "item_id",
      "name": "Masala Dosa",
      "description": "Crispy dosa with potato filling",
      "category": "Tiffins",
      "price": 50,
      "image": {
        "url": "https://cloudinary.com/image.jpg",
        "publicId": "public_id"
      },
      "isAvailable": true,
      "spiceLevel": "Medium",
      "preparationTime": 15,
      "rating": 4.5,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Get Single Menu Item 🟢
```http
GET /api/menu/:id
```

### Create Menu Item 🟠
```http
POST /api/menu
```

**Headers:**
```
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Masala Dosa",
  "description": "Crispy dosa with potato filling",
  "category": "Tiffins",
  "price": 50,
  "spiceLevel": "Medium",
  "preparationTime": 15,
  "tags": ["South Indian", "Popular"]
}
```

### Update Menu Item 🟠
```http
PUT /api/menu/:id
```

### Delete Menu Item 🔴
```http
DELETE /api/menu/:id
```

---

## Order Endpoints

### Create Order 🔵
```http
POST /api/orders
```

**Body:**
```json
{
  "customerName": "John Doe",
  "customerPhone": "9876543210",
  "items": [
    {
      "menuItem": "item_id",
      "name": "Masala Dosa",
      "price": 50,
      "quantity": 2
    }
  ],
  "totalAmount": 100,
  "orderType": "dine-in",
  "tableNumber": "T5",
  "notes": "Extra spicy",
  "paymentMethod": "cash"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "order_id",
    "orderNumber": "ORD1234567890",
    "status": "pending",
    "totalAmount": 100,
    "createdAt": "2024-01-01T12:00:00.000Z"
  }
}
```

### Get All Orders 🟡
```http
GET /api/orders
```

**Query Parameters:**
- `status` - Filter by status
- `date` - Filter by date
- `customer` - Filter by customer ID

### Get Single Order 🔵
```http
GET /api/orders/:id
```

### Update Order Status 🟡
```http
PATCH /api/orders/:id/status
```

**Body:**
```json
{
  "status": "preparing"
}
```

**Valid Status Values:**
- `pending` - Order received
- `confirmed` - Order confirmed
- `preparing` - Being prepared in kitchen
- `ready` - Ready for pickup/delivery
- `delivered` - Completed
- `cancelled` - Cancelled

---

## Admin Endpoints

### Get Dashboard Stats 🟠
```http
GET /api/admin/dashboard/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalOrders": 150,
    "todayOrders": 25,
    "totalRevenue": 45000,
    "todayRevenue": 5000,
    "totalCustomers": 120,
    "menuItems": 45
  }
}
```

### Get Sales Analytics 🟠
```http
GET /api/admin/analytics/sales
```

**Query Parameters:**
- `startDate` - Start date (YYYY-MM-DD)
- `endDate` - End date (YYYY-MM-DD)
- `groupBy` - Group by (day, week, month)

### Upload Menu Image 🟠
```http
POST /api/admin/menu/:id/image
```

**Headers:**
```
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data
```

**Body (FormData):**
```
image: <file>
```

### Manage Users 🔴
```http
GET /api/admin/users
POST /api/admin/users
PUT /api/admin/users/:id
DELETE /api/admin/users/:id
```

---

## Gallery Endpoints

### Get Gallery Images 🟢
```http
GET /api/gallery
```

### Upload Gallery Image 🟠
```http
POST /api/gallery
```

**Headers:**
```
Content-Type: multipart/form-data
```

**Body:**
```
image: <file>
title: "Restaurant Interior"
description: "Beautiful dining area"
```

### Delete Gallery Image 🟠
```http
DELETE /api/gallery/:id
```

---

## Catering Endpoints

### Submit Catering Enquiry 🟢
```http
POST /api/catering/enquiry
```

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "eventType": "Wedding",
  "eventDate": "2024-12-25",
  "guestCount": 500,
  "message": "Need catering for wedding reception"
}
```

### Get Catering Enquiries 🟠
```http
GET /api/catering/enquiries
```

---

## Customer Endpoints

### Get Profile 🔵
```http
GET /api/customer/profile
```

### Update Profile 🔵
```http
PUT /api/customer/profile
```

### Get Order History 🔵
```http
GET /api/customer/orders
```

### Add to Favorites 🔵
```http
POST /api/customer/favorites/:itemId
```

### Get Loyalty Points 🔵
```http
GET /api/customer/loyalty
```

---

## Kitchen Display

### Get Active Orders 🟡
```http
GET /api/kitchen/active-orders
```

### Mark Order Ready 🟡
```http
POST /api/kitchen/orders/:id/ready
```

---

## QR Code

### Generate Menu QR 🟠
```http
GET /api/qr/menu
```

### Generate Table QR 🟠
```http
GET /api/qr/table/:tableNumber
```

---

## Error Responses

All endpoints return errors in this format:

```json
{
  "success": false,
  "message": "Error message here",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

---

## Rate Limiting

- 100 requests per 15 minutes per IP
- 1000 requests per hour for authenticated users

## Pagination

For endpoints returning lists:

```http
GET /api/menu?page=1&limit=20
```

**Response includes:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 100,
    "itemsPerPage": 20
  }
}
```

---

## Testing with Postman

1. Import collection from `postman_collection.json`
2. Set environment variables:
   - `base_url` - http://localhost:5000/api
   - `token` - Your JWT token

## Testing with cURL

```bash
# Get menu items
curl http://localhost:5000/api/menu

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password"}'

# Create order (with auth)
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"items":[...],"totalAmount":100}'
```

---

For support or questions about the API, contact the development team.
