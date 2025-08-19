# 🚀 Railway Deployment Guide

## Prerequisites
- GitHub account with this repository
- Railway account (sign up at railway.app)

## Step 1: Deploy to Railway

1. **Sign up for Railway**
   - Go to [railway.app](https://railway.app)
   - Sign up with your GitHub account

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose this repository (`react-playground`)

3. **Add PostgreSQL Database**
   - In your Railway dashboard, click "New Service"
   - Select "PostgreSQL"
   - Railway will automatically create a database

4. **Configure Environment Variables**
   Railway will automatically set most variables, but verify these are present:
   ```
   RAILS_ENV=production
   RAILS_SERVE_STATIC_FILES=true
   RAILS_LOG_TO_STDOUT=true
   DATABASE_URL=(automatically set by Railway)
   ```

5. **Deploy**
   - Railway will automatically detect Rails and use Nixpacks
   - The build process will run `bundle install` and `rails db:migrate`
   - Seeds will be run automatically via the release command
   - No Docker configuration needed - Nixpacks handles everything!

## Step 2: Update Frontend

After successful deployment, update your React app's API URL:

1. **Get your Railway URL**
   - In Railway dashboard, find your app's URL (e.g., `https://your-app-name.railway.app`)

2. **Update React API Configuration**
   ```javascript
   // In src/components/todoList/services/apiSlice.ts
   url: "https://your-app-name.railway.app/graphql"
   
   // In src/client.js  
   uri: 'https://your-app-name.railway.app/graphql'
   ```

3. **Redeploy Frontend**
   ```bash
   npm run deploy
   ```

## Step 3: Test Your Deployment

1. **Visit your Railway app URL**
2. **Test health check**: `https://your-app-name.railway.app/health`
3. **Test GraphQL endpoint**: `https://your-app-name.railway.app/graphql`
4. **Test from your GitHub Pages frontend**

## Demo Credentials
```
Username: john.doe
Password: password
```

## Troubleshooting

### Build Fails
- Check Railway logs in the dashboard
- Ensure all gems are in the Gemfile
- Verify Ruby version matches (3.3.5)

### Database Issues
- Ensure PostgreSQL service is connected
- Check DATABASE_URL environment variable
- Verify migrations ran successfully

### CORS Issues
- Ensure your GitHub Pages URL is in the CORS origins
- Check browser console for CORS errors

### App Won't Start
- Check health endpoint: `/health`
- Review Railway logs
- Ensure all environment variables are set

## Railway Features Used
- ✅ Nixpacks automatic Rails detection
- ✅ PostgreSQL database
- ✅ Environment variables
- ✅ Health checks
- ✅ Automatic deployments
- ✅ Release commands (migrations)
- ✅ Zero-config deployment

## Cost
- Railway offers $5/month in free credits
- This app should stay within free tier limits
- Monitor usage in Railway dashboard
