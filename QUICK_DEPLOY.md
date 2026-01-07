# Quick Deployment Guide

I've prepared all the configuration files. Follow these steps to deploy:

## Option 1: Render (Easiest - Both Backend & Frontend)

### Step 1: Push to GitHub (if not already)
```bash
git init
git add .
git commit -m "Initial commit - Ready for deployment"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Deploy Backend to Render

1. **Go to https://render.com** and sign up/login
2. Click **"New +"** → **"Web Service"**
3. **Connect your GitHub repository**
4. Select your repository
5. Configure:
   - **Name**: `restaurant-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install && npm run build`
   - **Start Command**: `cd backend && npm run start:prod`
   - **Plan**: Free
6. Click **"Advanced"** and add Environment Variables:
   ```
   NODE_ENV=production
   JWT_SECRET=generate-a-strong-random-string-here
   FRONTEND_URL=https://restaurant-frontend.onrender.com
   ```
   (Generate JWT_SECRET: Use an online generator or `openssl rand -base64 32`)
7. Click **"Create Web Service"**
8. Wait for deployment (5-10 minutes)
9. **Copy your backend URL** (e.g., `https://restaurant-backend.onrender.com`)

### Step 3: Deploy Frontend to Render

1. In Render, click **"New +"** → **"Static Site"**
2. Connect your **same GitHub repository**
3. Configure:
   - **Name**: `restaurant-frontend`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`
4. Add Environment Variable:
   ```
   VITE_API_URL=https://restaurant-backend.onrender.com
   ```
   (Use your actual backend URL from Step 2)
5. Click **"Create Static Site"**
6. Wait for deployment (3-5 minutes)
7. **Copy your frontend URL** (e.g., `https://restaurant-frontend.onrender.com`)

### Step 4: Update Backend CORS

1. Go back to your **backend service** in Render
2. Go to **"Environment"** tab
3. Update `FRONTEND_URL` to your actual frontend URL:
   ```
   FRONTEND_URL=https://restaurant-frontend.onrender.com
   ```
4. Click **"Save Changes"** - This will trigger a redeploy

### Step 5: Test

1. Visit your frontend URL
2. Try registering a new user
3. Try logging in
4. Test CRUD operations

---

## Option 2: Vercel (Frontend) + Railway (Backend)

### Deploy Backend to Railway

1. Go to **https://railway.app** and sign up
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your repository
4. Add Service → Select your repo
5. In Settings:
   - Set **Root Directory**: `backend`
   - Add Environment Variables:
     ```
     NODE_ENV=production
     JWT_SECRET=generate-strong-random-string
     PORT=3000
     ```
6. Generate Domain → Copy the URL
7. Add Environment Variable:
   ```
   FRONTEND_URL=your-vercel-url.vercel.app
   ```

### Deploy Frontend to Vercel

1. Go to **https://vercel.com** and sign up
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variable:
   ```
   VITE_API_URL=https://your-backend.railway.app
   ```
6. Click **"Deploy"**
7. Copy your Vercel URL

### Update Backend CORS
- Update `FRONTEND_URL` in Railway to your Vercel URL

---

## Quick Deploy Script

I've created a `render.yaml` file in the root. If you use Render, you can:

1. In Render dashboard, click **"New +"** → **"Blueprint"**
2. Connect your GitHub repo
3. Render will read `render.yaml` automatically
4. Update environment variables after first deployment

---

## Verification Checklist

After deployment:
- [ ] Backend URL is accessible
- [ ] Frontend URL is accessible  
- [ ] Can register a new user
- [ ] Can login
- [ ] Can create restaurants (as admin)
- [ ] Can create menu items (as admin)
- [ ] Can place orders (as customer)
- [ ] CORS is working (no errors in browser console)

---

## Troubleshooting

**Backend won't start:**
- Check build logs in Render
- Ensure `start:prod` script exists
- Check environment variables are set

**Frontend can't connect to backend:**
- Verify `VITE_API_URL` is set correctly
- Check backend URL is accessible
- Ensure CORS allows your frontend URL

**CORS errors:**
- Update `FRONTEND_URL` in backend environment variables
- Restart backend service

---

## Your Deployment URLs (Fill in after deployment)

**Backend URL**: `https://____________________`
**Frontend URL**: `https://____________________`

Share these URLs with your teacher!
