const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },
  publicId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Gallery', gallerySchema);
```

---

### **After Creating All 5 Files:**

1. Go back to **Render dashboard**
2. Your service will **auto-deploy** (detects new commits)
3. OR click **"Manual Deploy"** → **"Deploy latest commit"**
4. Wait 3-5 minutes
5. Check logs - should see: ✅ **"Your service is live"**

---

## 🎯 **VERIFY ALL FILES ARE ON GITHUB:**

Go to: https://github.com/doddasurendra/hotelchandamama-vinukonda

You should see this structure:
```
hotelchandamama-vinukonda/
├── controllers/     ✅
├── models/          ✅ (Must have 5 files)
│   ├── User.js
│   ├── MenuItem.js
│   ├── Order.js
│   ├── Contact.js
│   └── Gallery.js
├── routes/          ✅
├── middleware/      ✅
├── utils/           ✅
├── scripts/         ✅
├── server.js        ✅
└── package.json     ✅
```

---

## ✅ **AFTER FIX:**

Your backend should deploy successfully and you'll see:
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
