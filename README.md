# Hotel Chandamama - Restaurant Management System

![Hotel Chandamama Logo](./frontend/src/assets/images/logo.jpg)

## 🌟 Overview

A complete, production-ready restaurant management platform for **Hotel Chandamama**, a pure vegetarian restaurant in Vinukonda, Andhra Pradesh.

**Official Website:** https://www.hotelchandamama-vinukonda.com

### ✨ Key Features

- 🎨 **Beautiful Peacock Blue Theme** - Premium, modern design
- 📱 **Progressive Web App (PWA)** - Install on mobile devices
- 🔐 **Role-Based Access Control** - Developer, Owner, Admin, Staff, Customer
- 🍽️ **Complete Menu Management** - CRUD operations with AI image generation
- 📦 **QR Code Ordering** - Contactless ordering system
- 👨‍🍳 **Kitchen Display System** - Real-time order tracking
- 📊 **Analytics Dashboard** - Sales, profit, peak hours analysis
- 🎯 **Loyalty System** - Points and rewards for customers
- 🎉 **Catering Module** - Event booking and management
- 📸 **Gallery Management** - Photo uploads and management
- 💳 **Multiple Payment Options** - Cash, UPI, Card
- 🔔 **Real-time Notifications** - Order status updates

## 🎯 System Requirements

- Node.js 18+ (LTS)
- MongoDB Atlas (Free Tier)
- Git
- Modern web browser

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/doddasurendra/hotelchandamama-vinukonda.git
cd hotelchandamama-vinukonda
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
PORT=5000
NODE_ENV=development
```

Start backend server:

```bash
npm run dev
```

Backend will run on: http://localhost:5000

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend will run on: http://localhost:3000

## 📁 Project Structure

```
hotel-chandamama/
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── assets/          # Images, fonts, static files
│   │   ├── components/      # Reusable components
│   │   │   ├── common/      # Navbar, Footer, etc.
│   │   │   ├── admin/       # Admin components
│   │   │   └── customer/    # Customer components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── utils/           # Helper functions
│   │   └── styles/          # CSS files
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── backend/                  # Node.js + Express backend
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Auth, validation, etc.
│   ├── config/              # Configuration files
│   ├── utils/               # Helper functions
│   ├── server.js            # Entry point
│   └── package.json
├── public/                   # Static files
├── .gitignore
└── README.md
```

## 🎨 Design System

### Color Palette

- **Primary (Peacock Blue):** `#00a8b5`
- **Secondary (Teal):** `#14b8a6`
- **Accent:** Various shades of peacock blue
- **Background:** Gradient from gray-50 to peacock-50

### Typography

- **Display Font:** Playfair Display
- **Body Font:** Poppins
- **Hindi Font:** Noto Sans Devanagari

## 👥 User Roles & Permissions

### 1. Developer / Super Admin
- Full system access
- Server and database management
- User role management
- All other permissions

### 2. Owner
- View all reports and analytics
- Approve menu changes
- Financial analytics
- Approve offers and discounts

### 3. Admin (Operations Manager)
- Full menu CRUD operations
- Image upload and management
- Slider and gallery management
- Stock and timing updates
- Customer management

### 4. Staff
- View orders
- Update order status
- View menu (read-only)

### 5. Customer
- Browse menu
- Place orders
- View order history
- Manage favorites
- Loyalty points tracking

## 🔐 Authentication & Security

- JWT-based authentication
- Password hashing with bcrypt
- Role-based middleware
- Protected API routes
- HTTPS in production
- Rate limiting
- Input validation
- XSS protection

## 📱 Mobile Features

- Fully responsive design
- Touch-optimized interfaces
- PWA installable app
- Offline support
- Push notifications (future)

## 🌐 API Endpoints

### Menu
- `GET /api/menu` - Get all menu items
- `GET /api/menu/:id` - Get single item
- `POST /api/menu` - Create item (Admin+)
- `PUT /api/menu/:id` - Update item (Admin+)
- `DELETE /api/menu/:id` - Delete item (Admin+)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get all orders (Staff+)
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id` - Update order status (Staff+)

### Authentication
- `POST /api/auth/register` - Register customer
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Admin
- `GET /api/admin/analytics` - Get analytics
- `GET /api/admin/users` - Manage users
- `POST /api/admin/menu/image` - Upload menu image
- `GET /api/admin/reports` - Generate reports

## 🚀 Deployment

### Frontend Deployment (Vercel - Free)

1. Push code to GitHub
2. Import repository on Vercel
3. Set environment variables
4. Deploy

```bash
# Build command
npm run build

# Output directory
dist
```

### Backend Deployment (Render - Free)

1. Create new Web Service on Render
2. Connect GitHub repository
3. Set environment variables
4. Deploy

```bash
# Build command
npm install

# Start command
npm start
```

### Database (MongoDB Atlas - Free)

1. Create free cluster
2. Add database user
3. Whitelist IP (0.0.0.0/0 for testing)
4. Get connection string
5. Add to environment variables

## 📊 Features Implementation Status

✅ Implemented:
- [x] Project structure
- [x] Frontend UI components
- [x] Responsive design
- [x] Navigation & routing
- [x] Backend API structure
- [x] Database models
- [x] Authentication system
- [x] Admin panel basic structure

🔄 In Progress:
- [ ] Menu management CRUD
- [ ] Order management system
- [ ] Kitchen display
- [ ] Payment integration
- [ ] Image upload (Cloudinary)
- [ ] Analytics dashboard
- [ ] QR code generation

📋 Planned:
- [ ] AI image generation
- [ ] Push notifications
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Review system
- [ ] Loyalty program
- [ ] Offer management
- [ ] Catering booking

## 🛠️ Technology Stack

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **State Management:** React Hooks
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **HTTP Client:** Axios
- **Notifications:** React Hot Toast
- **QR Codes:** qrcode.react

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT + bcrypt
- **File Upload:** Multer
- **Image Storage:** Cloudinary
- **Validation:** Express Validator
- **Email:** Nodemailer

### DevOps
- **Version Control:** Git + GitHub
- **Frontend Hosting:** Vercel
- **Backend Hosting:** Render
- **Database:** MongoDB Atlas
- **CI/CD:** GitHub Actions

## 📞 Contact Information

**Hotel Chandamama**
- **Address:** NRT Road, beside Indian Petrol Pump, Mulakaluru, Vinukonda, Andhra Pradesh
- **Phone:** 09989324091
- **Catering:** 9441128949, 9703145416
- **Hours:** 6:00 AM - 10:00 PM (Daily)

## 📄 License

MIT License - Free to use, modify, and distribute.

## 🤝 Contributing

This is a private project for Hotel Chandamama. For feature requests or bug reports, please contact the development team.

## 📝 Changelog

### Version 1.0.0 (Initial Release)
- Complete project structure
- Beautiful peacock-themed UI
- Basic authentication system
- Menu browsing functionality
- Order placement system
- Admin panel foundation
- Role-based access control
- Responsive design
- PWA support

---

**Built with ❤️ for Hotel Chandamama**

For support or queries, contact the development team.
