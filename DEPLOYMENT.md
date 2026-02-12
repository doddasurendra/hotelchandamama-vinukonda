# Deployment Guide - Hotel Chandamama

## Prerequisites

1. GitHub account (free)
2. MongoDB Atlas account (free)
3. Vercel account (free)
4. Render account (free)
5. Cloudinary account (free - for images)

## Step 1: MongoDB Atlas Setup (Database)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free account
3. Create a new cluster (M0 Free tier)
4. Create database user:
   - Username: `hotelchandamama`
   - Password: Generate strong password
5. Network Access:
   - Add IP: `0.0.0.0/0` (Allow from anywhere)
6. Get connection string:
   - Click "Connect" → "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password
   - Replace `<dbname>` with `hotel-chandamama`

**Example:**
```
mongodb+srv://hotelchandamama:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/hotel-chandamama?retryWrites=true&w=majority
```

## Step 2: Cloudinary Setup (Image Storage)

1. Go to https://cloudinary.com/users/register/free
2. Sign up for free account
3. Get credentials from dashboard:
   - Cloud Name
   - API Key
   - API Secret

## Step 3: Push to GitHub

1. Create new repository on GitHub:
   - Repository name: `hotelchandamama-vinukonda`
   - Visibility: Public (or Private)

2. Push your code:

```bash
cd /home/claude/hotel-chandamama
git init
git add .
git commit -m "Initial commit - Hotel Chandamama Restaurant System"
git branch -M main
git remote add origin https://github.com/doddasurendra/hotelchandamama-vinukonda.git
git push -u origin main
```

## Step 4: Deploy Backend to Render

1. Go to https://render.com and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name:** `hotel-chandamama-api`
   - **Environment:** Node
   - **Region:** Singapore (closest to India)
   - **Branch:** main
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && npm start`
   - **Instance Type:** Free

5. Add Environment Variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_key_min_32_chars
   NODE_ENV=production
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   PORT=5000
   ```

6. Click "Create Web Service"
7. Wait for deployment (5-10 minutes)
8. Copy your API URL (e.g., `https://hotel-chandamama-api.onrender.com`)

## Step 5: Deploy Frontend to Vercel

1. Go to https://vercel.com and sign up with GitHub
2. Click "Add New Project"
3. Import your repository
4. Configure:
   - **Project Name:** `hotel-chandamama`
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

5. Add Environment Variable:
   ```
   VITE_API_URL=https://hotel-chandamama-api.onrender.com
   ```

6. Click "Deploy"
7. Wait for deployment (2-3 minutes)
8. You'll get URL like: `https://hotel-chandamama.vercel.app`

## Step 6: Custom Domain (Optional)

### For Vercel (Frontend):
1. Go to project settings → Domains
2. Add: `www.hotelchandamama-vinukonda.com`
3. Follow DNS configuration instructions

### For Render (Backend):
1. Go to service settings → Custom Domains
2. Add: `api.hotelchandamama-vinukonda.com`
3. Follow DNS configuration instructions

## Step 7: Domain Configuration

Add these DNS records to your domain provider:

```
Type    Name    Value
CNAME   www     cname.vercel-dns.com
CNAME   api     your-render-service.onrender.com
A       @       76.76.21.21 (Vercel IP)
```

## Step 8: Initialize Admin Account

1. Access your backend URL + `/api/admin/init`
2. This will create initial super admin account:
   - Email: admin@hotelchandamama.com
   - Password: ChangeMeNow123!
3. **IMPORTANT:** Change password immediately after first login

## Step 9: Configure Auto-Deploy

Both Vercel and Render automatically deploy when you push to GitHub main branch.

To manually trigger:
- Vercel: Go to Deployments → Redeploy
- Render: Go to Manual Deploy → Deploy latest commit

## Monitoring & Maintenance

### Free Tier Limitations:

**MongoDB Atlas (Free):**
- 512 MB storage
- Shared CPU
- 100 connections
- Good for starting

**Render (Free):**
- 750 hours/month
- Sleeps after 15 min inactivity
- Wakes up automatically
- First request takes 30-60 seconds

**Vercel (Free):**
- Unlimited bandwidth
- 100 GB-hours execution
- Auto-scaling
- Global CDN

### Monitoring:

1. **Uptime Monitoring:**
   - Use UptimeRobot (free): https://uptimerobot.com
   - Monitor both frontend and backend

2. **Error Tracking:**
   - Check Render logs for backend errors
   - Check Vercel logs for frontend errors

3. **Database:**
   - Monitor in MongoDB Atlas dashboard
   - Set up alerts for high usage

## Backup Strategy

1. **Database Backup:**
   - MongoDB Atlas free tier includes automated backups
   - Additional manual backups: Use `mongodump` weekly

2. **Code Backup:**
   - GitHub is primary backup
   - Keep local copy

3. **Images:**
   - Cloudinary provides backup
   - Download critical images monthly

## Troubleshooting

### Backend not responding:
- Check Render logs
- Verify environment variables
- Check MongoDB connection

### Frontend not loading:
- Check Vercel deployment logs
- Verify API URL in environment variables
- Check browser console

### Database connection error:
- Verify IP whitelist (0.0.0.0/0)
- Check connection string
- Verify database user credentials

## Security Checklist

- [ ] Changed default admin password
- [ ] Set strong JWT_SECRET
- [ ] MongoDB has strong password
- [ ] IP whitelist configured
- [ ] HTTPS enabled (automatic on Vercel/Render)
- [ ] Environment variables secured
- [ ] No sensitive data in code

## Cost Breakdown (All FREE!)

| Service | Plan | Cost |
|---------|------|------|
| MongoDB Atlas | M0 Free | $0/month |
| Render | Free | $0/month |
| Vercel | Hobby | $0/month |
| Cloudinary | Free | $0/month |
| GitHub | Free | $0/month |
| **Total** | | **$0/month** |

## Support

For deployment issues:
1. Check service status pages
2. Review documentation
3. Contact respective support:
   - MongoDB: https://support.mongodb.com
   - Render: https://render.com/docs
   - Vercel: https://vercel.com/support

## Next Steps

After successful deployment:
1. Test all features
2. Add menu items
3. Upload gallery images
4. Configure payment methods
5. Set up Google My Business
6. Add to Google Maps
7. Share QR codes with customers

---

**Congratulations! Your restaurant management system is now live! 🎉**
