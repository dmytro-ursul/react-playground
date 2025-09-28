# 🚀 Railway Monorepo Deployment Guide

This guide explains how to deploy the React Playground as a **monorepo** with separate frontend and backend services on Railway.

## 🏗️ Architecture Overview

```
react-playground/
├── 🎯 Frontend Service (React) → Railway
├── ⚙️  Backend Service (Rails)  → Railway
├── 🗄️  Database Service (PostgreSQL) → Railway
├── railway.toml (backend config)
└── railway-frontend.toml (frontend config)
```

## Prerequisites
- GitHub account with this repository
- Railway account (sign up at railway.app)
- Understanding of Railway monorepo deployment

## Step 1: Deploy Backend Service (Rails API)

### **1.1 Create Backend Service**
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

### **1.2 Configure Backend Service**
- **Service Name**: `react-playground-backend`
- **Builder**: Railpack (auto-detected)
- **Config File**: `railway.toml` ✅ Already configured
- **Root Directory**: `/` (entire repo)

### **1.3 Environment Variables**
Railway automatically provides:
- `DATABASE_URL` (PostgreSQL connection)
- `RAILS_ENV=production`
- `PORT` (dynamic port assignment)

You may need to set manually:
- `RAILS_MASTER_KEY` (for credentials)

### **1.4 Deploy Backend**
- Railway will automatically deploy using `railway.toml`
- Backend will be available at: `https://react-playground-backend-production-[id].railway.app`

## Step 2: Deploy Frontend Service (React App)

### **2.1 Create Frontend Service**
1. **Add New Service**
   - In Railway dashboard, click "New Service"
   - Select "Deploy from GitHub repo"
   - Choose the same repository (`react-playground`)

### **2.2 Configure Frontend Service**
- **Service Name**: `react-playground-frontend`
- **Builder**: Nixpacks (auto-detects React)
- **Config File**: `railway-frontend.toml` ✅ Already configured
- **Root Directory**: `/` (entire repo)

### **2.3 Environment Variables**
Set these in Railway dashboard for the frontend service:
```bash
REACT_APP_API_URL=https://your-backend-service.railway.app/graphql
NODE_ENV=production
```

### **2.4 Deploy Frontend**
- Railway will automatically deploy using `railway-frontend.toml`
- Frontend will be available at: `https://react-playground-frontend-production-[id].railway.app`

## Step 3: Configure Service Communication

### **3.1 Link Services**
1. Get backend URL: `https://react-playground-backend-production-[id].railway.app`
2. Get frontend URL: `https://react-playground-frontend-production-[id].railway.app`

### **3.2 Set Environment Variables**

**Frontend Service:**
```bash
REACT_APP_API_URL=https://react-playground-backend-production-[id].railway.app/graphql
```

**Backend Service:**
```bash
FRONTEND_URL=https://react-playground-frontend-production-[id].railway.app
```

## Step 4: Test Your Deployment

### **4.1 Test Backend**
- **Health check**: `https://your-backend.railway.app/health`
- **GraphQL endpoint**: `https://your-backend.railway.app/graphql`

### **4.2 Test Frontend**
- **React app**: `https://your-frontend.railway.app`
- **API connection**: Check browser console for errors

## Demo Credentials
```
Username: john.doe
Password: password
```

### Backend Issues
- Check Railway logs in the dashboard
- Ensure all gems are in the Gemfile
- Verify Ruby version matches (3.3.5)
- Ensure PostgreSQL service is connected

### Frontend Issues
- Verify `serve` package is installed
- Check build process completes successfully
- Ensure `REACT_APP_API_URL` is set correctly

### CORS Issues
- Update Rails CORS configuration
- Check browser console for CORS errors
- Verify frontend URL is allowed in backend

## Railway Features Used
- ✅ **Monorepo deployment** with separate services
- ✅ **Railpack builder** for Rails backend
- ✅ **PostgreSQL database**
- ✅ **Environment variables**
- ✅ **Health checks**
- ✅ **Automatic deployments**
- ✅ **Smart seeding** (idempotent)
