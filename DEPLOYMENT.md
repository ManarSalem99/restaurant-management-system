# Deployment Guide

This guide will help you deploy both the backend and frontend to cloud platforms.

## Option 1: Render (Recommended - All-in-one)

### Deploy Backend (NestJS) to Render

1. **Create a Render Account**
   - Go to https://render.com
   - Sign up for free account

2. **Prepare Backend for Deployment**
   - Update `backend/src/main.ts` to use environment variables:
     ```typescript
     const PORT = process.env.PORT || 3000;
     const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
     
     app.enableCors({
       origin: FRONTEND_URL,
       credentials: true,
     });
     ```

3. **Create `backend/render.yaml`** (optional but helpful)
   ```yaml
   services:
     - type: web
       name: restaurant-backend
       env: node
       plan: free
       buildCommand: cd backend && npm install && npm run build
       startCommand: cd backend && npm run start:prod
       envVars:
         - key: NODE_ENV
           value: production
         - key: DATABASE_URL
           fromDatabase:
             name: restaurant-db
             property: connectionString
   ```

4. **Deploy on Render**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository
   - Configure:
     - **Name**: restaurant-backend
     - **Environment**: Node
     - **Build Command**: `cd backend && npm install && npm run build`
     - **Start Command**: `cd backend && npm run start:prod`
     - **Root Directory**: leave empty
   - Add Environment Variables:
     - `NODE_ENV=production`
     - `JWT_SECRET=your-secret-key-here` (generate a strong secret)
     - `FRONTEND_URL=https://your-frontend-url.onrender.com` (update after frontend deploy)

5. **Database Setup**
   - In production, consider using Render PostgreSQL (free tier)
   - Or use a managed SQLite service, or keep SQLite for simplicity

### Deploy Frontend (React/Vite) to Render

1. **Update API Configuration**
   - Update `frontend/src/services/api.js`:
     ```javascript
     const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
     ```

2. **Create `frontend/.env.production`**
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```

3. **Deploy on Render**
   - Click "New +" → "Static Site"
   - Connect GitHub repository
   - Configure:
     - **Name**: restaurant-frontend
     - **Build Command**: `cd frontend && npm install && npm run build`
     - **Publish Directory**: `frontend/dist`
     - **Root Directory**: leave empty
   - Add Environment Variable:
     - `VITE_API_URL=https://your-backend-url.onrender.com`

---

## Option 2: Vercel (Frontend) + Railway (Backend)

### Deploy Backend to Railway

1. **Sign up at Railway** (https://railway.app)
2. **New Project** → **Deploy from GitHub**
3. **Select repository** → **Configure**
   - Root Directory: `backend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start:prod`
4. **Add Environment Variables**:
   - `NODE_ENV=production`
   - `JWT_SECRET=your-secret-key`
   - `PORT=3000`
5. **Get the deployed URL** (e.g., `https://your-app.railway.app`)

### Deploy Frontend to Vercel

1. **Sign up at Vercel** (https://vercel.com)
2. **New Project** → **Import Git Repository**
3. **Configure**:
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Environment Variables**:
   - `VITE_API_URL=https://your-backend.railway.app`
5. **Deploy**

---

## Option 3: Netlify (Frontend) + Render (Backend)

Similar to Option 2, but use Netlify for frontend:
- Follow Render backend steps from Option 1
- Use Netlify for frontend (similar to Vercel steps)

---

## Important Notes

### ✅ Code Already Updated for Deployment!

The code has been updated to support environment variables:
- ✅ Backend CORS uses `FRONTEND_URL` environment variable
- ✅ Backend JWT secret uses `JWT_SECRET` environment variable
- ✅ Frontend API URL uses `VITE_API_URL` environment variable

### Environment Variables Needed

**Backend (set in Render/Railway/etc.):**
- `FRONTEND_URL` - Your frontend deployment URL (e.g., `https://restaurant-app.onrender.com`)
- `JWT_SECRET` - A strong random string for JWT signing (e.g., generate with: `openssl rand -base64 32`)
- `PORT` - Usually auto-set by platform, but defaults to 3000
- `NODE_ENV=production`

**Frontend (set in Vercel/Netlify/etc.):**
- `VITE_API_URL` - Your backend deployment URL (e.g., `https://restaurant-backend.onrender.com`)

### Testing After Deployment

1. Check backend health: `https://your-backend-url.onrender.com` (should return 404 or your app response)
2. Test frontend: Visit the deployed frontend URL
3. Test API calls: Try registering/logging in

---

## Quick Deploy Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] CORS configured correctly
- [ ] Environment variables set
- [ ] API URL updated in frontend
- [ ] Test registration/login
- [ ] Test CRUD operations
- [ ] Share public URLs with teacher

---

## Recommended: Render (Easiest)

Render is recommended because:
- Free tier available
- Easy deployment
- Can host both backend and frontend
- Good documentation
- Automatic SSL certificates
