# Quick Start Guide - Hotel Chandamama

Get your restaurant management system running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- Internet connection
- Code editor (VS Code recommended)

## 🚀 Option 1: Automated Setup (Recommended)

```bash
# 1. Clone the repository
git clone https://github.com/doddasurendra/hotelchandamama-vinukonda.git
cd hotelchandamama-vinukonda

# 2. Run setup script
./setup.sh

# 3. Configure environment
# Edit backend/.env with your MongoDB URI

# 4. Start development servers
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## 📝 Option 2: Manual Setup

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env file
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## 🔑 Environment Configuration

Create `backend/.env`:

```env
MONGODB_URI=mongodb://localhost:27017/hotel-chandamama
JWT_SECRET=your-secret-key-change-this
PORT=5000
NODE_ENV=development
```

## 🎯 Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **API Health:** http://localhost:5000/api/health

## 👤 Default Admin Login

After running the application for the first time:

- **Email:** admin@hotelchandamama.com
- **Password:** ChangeMeNow123!

⚠️ **Change this immediately after first login!**

## 📱 Test Features

1. **Browse Menu:** http://localhost:3000/menu
2. **Place Order:** http://localhost:3000/order
3. **Admin Panel:** http://localhost:3000/admin/login
4. **Kitchen Display:** http://localhost:3000/kitchen

## 🐛 Common Issues

### Port Already in Use

```bash
# Backend (5000)
lsof -i :5000
kill -9 <PID>

# Frontend (3000)
lsof -i :3000
kill -9 <PID>
```

### MongoDB Connection Error

1. Ensure MongoDB is running
2. Check connection string in .env
3. Try local MongoDB: `mongodb://localhost:27017/hotel-chandamama`

### Dependencies Installation Failed

```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 📚 Next Steps

1. ✅ Add menu items via Admin Panel
2. ✅ Upload restaurant photos to Gallery
3. ✅ Configure payment methods
4. ✅ Generate QR codes for tables
5. ✅ Test order flow
6. ✅ Deploy to production (see DEPLOYMENT.md)

## 🆘 Need Help?

- Check `README.md` for detailed documentation
- See `API_DOCUMENTATION.md` for API reference
- Review `DEPLOYMENT.md` for production setup

## 🎉 You're Ready!

Your restaurant management system is now running locally. Happy managing! 🍽️

---

**Questions?** Check the documentation or contact support.
