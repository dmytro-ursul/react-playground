# 🚀 Railway Monorepo Setup Checklist

## Quick Setup Guide

### **Step 1: Deploy Backend Service**
1. ✅ Go to Railway dashboard
2. ✅ Create new project from GitHub repo
3. ✅ Add PostgreSQL database service
4. ✅ Railway auto-detects Rails (Railpack builder)
5. ✅ Uses `railway.toml` configuration
6. ✅ Set `RAILS_MASTER_KEY` if needed
7. ✅ Deploy and get backend URL

### **Step 2: Deploy Frontend Service**
1. ⚠️ **Add NEW service** to same project
2. ⚠️ Select same GitHub repository
3. ⚠️ Railway will detect React
4. ⚠️ Uses `railway-frontend.toml` configuration
5. ⚠️ Set environment variable: `REACT_APP_API_URL=https://your-backend.railway.app/graphql`
6. ⚠️ Deploy and get frontend URL

### **Step 3: Configure Communication**
1. ⚠️ Update Rails CORS to allow frontend URL
2. ⚠️ Test backend health: `/health`
3. ⚠️ Test GraphQL endpoint: `/graphql`
4. ⚠️ Test frontend connects to backend

## Key Files

### ✅ `railway.toml` (Backend)
- Configured for Rails API
- Uses `db:prepare` (idempotent)
- Health check on `/health`

### ✅ `railway-frontend.toml` (Frontend)
- Configured for React build
- Uses `serve` for static hosting
- Health check on `/`

### ✅ `package.json`
- Added `serve` dependency
- Ready for production build

## Environment Variables

### Backend Service
```bash
DATABASE_URL=postgresql://... (auto)
RAILS_ENV=production (auto)
PORT=... (auto)
RAILS_MASTER_KEY=... (manual)
```

### Frontend Service
```bash
REACT_APP_API_URL=https://your-backend.railway.app/graphql (manual)
NODE_ENV=production (auto)
PORT=... (auto)
```

## Final Architecture

```
Railway Project: react-playground
├── 🎯 Frontend Service
│   ├── Builder: Railpack
│   ├── Config: railway-frontend.toml
│   └── URL: https://frontend-[id].railway.app
├── ⚙️ Backend Service  
│   ├── Builder: Railpack
│   ├── Config: railway.toml
│   └── URL: https://backend-[id].railway.app
└── 🗄️ PostgreSQL Database
    └── Auto-connected to backend
```

## Next Steps

1. **Deploy backend first** - Get the backend URL
2. **Deploy frontend second** - Set backend URL in frontend env vars
3. **Set frontend URL** - Add frontend URL to backend env vars for CORS
4. **Test the connection** - Verify GraphQL communication works
5. **Monitor costs** - Should stay within $5/month free tier

## Demo Credentials
```
Username: john.doe
Password: password
```
