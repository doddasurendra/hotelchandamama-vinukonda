# 🚀 HOTEL CHANDAMAMA - COMPLETE BACKEND

## ✅ THIS IS THE COMPLETE BACKEND - ALL FILES INCLUDED!

This folder contains **EVERYTHING** you need for your backend to work on Render.

---

## 📦 WHAT'S INCLUDED:

```
COMPLETE_BACKEND/
├── controllers/          ✅ (5 files)
│   ├── authController.js
│   ├── menuController.js
│   ├── orderController.js
│   ├── contactController.js
│   └── galleryController.js
│
├── models/              ✅ (5 files)
│   ├── User.js
│   ├── MenuItem.js
│   ├── Order.js
│   ├── Contact.js
│   └── Gallery.js
│
├── routes/              ✅ (5 files)
│   ├── authRoutes.js
│   ├── menuRoutes.js
│   ├── orderRoutes.js
│   ├── contactRoutes.js
│   └── galleryRoutes.js
│
├── middleware/          ✅ (1 file)
│   └── auth.js
│
├── utils/               ✅ (1 file)
│   └── cloudinary.js
│
├── scripts/             ✅ (1 file)
│   └── createAdmin.js
│
├── server.js            ✅ Main server file
├── package.json         ✅ Dependencies
├── .env.example         ✅ Environment variables template
├── .gitignore          ✅ Git ignore file
└── README.md           ✅ This file

Total: 22 files - COMPLETE BACKEND!
```

---

## 🚀 HOW TO UPLOAD TO GITHUB:

### **METHOD 1: Upload Entire Folder (Easiest!)**

1. **Go to your GitHub repository:**
   https://github.com/doddasurendra/hotelchandamama-vinukonda

2. **Delete the old BACKEND folder:**
   - Click on `BACKEND` folder
   - Click the "..." menu → Delete directory
   - Commit the deletion

3. **Upload new BACKEND folder:**
   - Go back to main repository page
   - Click "Add file" → "Upload files"
   - Drag the ENTIRE `COMPLETE_BACKEND` folder
   - Rename it to `BACKEND` before uploading
   - OR upload all contents and they'll go into BACKEND folder
   - Commit changes

### **METHOD 2: Using GitHub Desktop**

1. **Delete your current backend folder**
2. **Copy this COMPLETE_BACKEND folder**
3. **Rename it to `backend`**
4. **Place it in your repository folder**
5. **GitHub Desktop will show all changes**
6. **Commit:** "Upload complete backend with all files"
7. **Push to GitHub**

---

## ⚙️ RENDER DEPLOYMENT SETTINGS:

After uploading to GitHub, deploy on Render with these settings:

**Name:** `hotel-chandamama-api`
**Region:** Singapore (or closest)
**Branch:** `main`
**Root Directory:** `BACKEND` (or leave empty if files are in root)
**Build Command:** `npm install`
**Start Command:** `npm start`
**Instance Type:** Free

---

## 🔐 ENVIRONMENT VARIABLES FOR RENDER:

Add these in Render dashboard (Environment section):

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://hotelAdmin:YOUR_PASSWORD@cluster.mongodb.net/hotel-chandamama?retryWrites=true&w=majority
JWT_SECRET=your_random_secret_key_from_randomkeygen.com
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=https://www.hotel-chandamama-vinukonda.com
ADMIN_URL=https://admin.hotel-chandamama-vinukonda.com
```

---

## ✅ AFTER DEPLOYMENT:

1. **Wait 5 minutes** for Render to deploy

2. **Check logs** - Should see:
   ```
   ✅ MongoDB connected successfully
   🚀 Server running on port 5000
   ```

3. **Test your API:**
   Visit: https://hotelchandamama-vinukonda.onrender.com
   
   Should return:
   ```json
   {
     "success": true,
     "message": "Hotel Chandamama API is running",
     "timestamp": "..."
   }
   ```

4. **Test menu endpoint:**
   Visit: https://hotelchandamama-vinukonda.onrender.com/api/menu
   
   Should return:
   ```json
   {
     "success": true,
     "count": 0,
     "data": []
   }
   ```

---

## 👤 CREATE ADMIN USER:

After backend is deployed, create admin user:

**In Render Dashboard:**
1. Go to your service
2. Click "Shell" tab
3. Run: `node scripts/createAdmin.js`
4. You'll see:
   ```
   ✅ Admin user created successfully!
   📧 Email: admin@hotelchandamama.com
   🔒 Password: Admin@123456
   ```

---

## 🎯 API ENDPOINTS:

Once deployed, your API will have these endpoints:

**Auth:**
- POST `/api/auth/login` - Admin login
- GET `/api/auth/me` - Get current user

**Menu:**
- GET `/api/menu` - Get all menu items
- GET `/api/menu?category=morning` - Get by category
- POST `/api/menu` - Create item (admin only)
- PUT `/api/menu/:id` - Update item (admin only)
- DELETE `/api/menu/:id` - Delete item (admin only)
- POST `/api/menu/auto-generate` - Generate sample menu (admin only)

**Orders:**
- POST `/api/orders` - Create order
- GET `/api/orders` - Get all orders (admin only)

**Contact:**
- POST `/api/contact` - Send contact message
- GET `/api/contact` - Get all contacts (admin only)

**Gallery:**
- GET `/api/gallery` - Get all images
- POST `/api/gallery` - Upload image (admin only)
- DELETE `/api/gallery/:id` - Delete image (admin only)

---

## 🆘 TROUBLESHOOTING:

**Error: Cannot find module**
→ Make sure ALL files are uploaded to GitHub
→ Check that folder structure matches above

**Error: MongoDB connection failed**
→ Verify MONGODB_URI in Render environment variables
→ Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0)

**Error: Server crashed**
→ Check Render logs for specific error
→ Verify all environment variables are set

---

## 📞 NEED HELP?

If you see any errors:
1. Check Render logs (click "Logs" tab)
2. Screenshot the error
3. Verify all files are on GitHub
4. Check environment variables are correct

---

## 🎉 YOU'RE DONE!

After uploading this complete backend:
- ✅ All files are included
- ✅ Everything is configured
- ✅ Ready to deploy on Render
- ✅ No missing files!

Just upload to GitHub and deploy to Render!

---

Made with ❤️ for Hotel Chandamama - Vinukonda
