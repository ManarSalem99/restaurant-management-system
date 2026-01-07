# Automated Deployment Checklist

Follow this checklist to deploy your project:

## Pre-Deployment Setup

- [ ] Code is in a GitHub repository
- [ ] All changes are committed and pushed
- [ ] You have accounts on chosen platforms (or ready to sign up)

## Deployment Steps

### Render Deployment (Recommended)

1. **Sign up at https://render.com** (Free tier available)
2. **Deploy Backend:**
   - New → Web Service
   - Connect GitHub
   - Use these settings:
     - Name: `restaurant-backend`
     - Build: `cd backend && npm install && npm run build`
     - Start: `cd backend && npm run start:prod`
   - Add environment variables (see below)
   - Deploy!

3. **Deploy Frontend:**
   - New → Static Site  
   - Connect GitHub
   - Use these settings:
     - Name: `restaurant-frontend`
     - Build: `cd frontend && npm install && npm run build`
     - Publish: `frontend/dist`
   - Add `VITE_API_URL` = your backend URL
   - Deploy!

4. **Update Backend CORS:**
   - Go to backend service
   - Update `FRONTEND_URL` to your frontend URL
   - Redeploy

## Environment Variables Needed

### Backend:
```
NODE_ENV=production
JWT_SECRET=your-strong-secret-key-here
FRONTEND_URL=https://your-frontend-url.onrender.com
```

### Frontend:
```
VITE_API_URL=https://your-backend-url.onrender.com
```

## Generate JWT Secret

Use one of these methods:
- Online: https://generate-secret.vercel.app/32
- Command: `openssl rand -base64 32`
- Or just use a long random string

## Time Estimate

- Sign up: 2 minutes
- Backend deployment: 10 minutes
- Frontend deployment: 5 minutes  
- Configuration: 5 minutes
- Testing: 5 minutes

**Total: ~30 minutes**

## After Deployment

1. Test the deployed application
2. Copy your public URLs
3. Share with your teacher!
