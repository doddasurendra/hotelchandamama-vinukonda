const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'No authentication token, access denied' 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Check if user is admin
    if (user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied. Admin only.' 
      });
    }

    // Add user to request
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token' 
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Token expired' 
      });
    }

    res.status(500).json({ 
      success: false, 
      message: 'Server error during authentication' 
    });
  }
};

module.exports = authMiddleware;
```

---

## 🔧 **HOW TO UPDATE ON GITHUB:**

### **Method 1: Edit Directly on GitHub (Easiest)**

1. Go to: https://github.com/doddasurendra/hotelchandamama-vinukonda/blob/main/BACKEND/middleware/auth.js

2. Click the **pencil icon** (✏️) to edit

3. **Delete everything** in the file

4. **Copy-paste** the complete code above

5. Scroll down and click **"Commit changes"**

6. Render will auto-deploy!

---

### **Method 2: Using GitHub Desktop**

1. Open your `backend/middleware/auth.js` file on your computer

2. Delete all content

3. Copy-paste the complete code above

4. Save the file

5. Open **GitHub Desktop**

6. You'll see `auth.js` modified

7. Commit: "Fix auth middleware"

8. Click **"Push origin"**

9. Render will auto-deploy!

---

## ⚡ **AFTER UPDATING:**

1. Render will detect the new commit and **auto-deploy**

2. Wait 3-5 minutes

3. Check Render logs - should see:
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
```

4. Visit: `https://hotelchandamama-vinukonda.onrender.com`

5. Should show: `{"success":true,"message":"Hotel Chandamama API is running"}`

---

## 📋 **VERIFY ALL BACKEND FILES ARE CORRECT:**

Make sure these files exist on GitHub with correct code:
```
BACKEND/
├── middleware/
│   └── auth.js          ✅ (Full code - not just 3 lines!)
│
├── models/
│   ├── User.js          ✅
│   ├── MenuItem.js      ✅
│   ├── Order.js         ✅
│   ├── Contact.js       ✅
│   └── Gallery.js       ✅
│
├── controllers/
│   ├── authController.js
│   ├── menuController.js
│   ├── orderController.js
│   ├── contactController.js
│   └── galleryController.js
│
├── routes/
│   ├── authRoutes.js
│   ├── menuRoutes.js
│   ├── orderRoutes.js
│   ├── contactRoutes.js
│   └── galleryRoutes.js
│
├── utils/
│   └── cloudinary.js
│
├── scripts/
│   └── createAdmin.js
│
├── server.js
└── package.json
