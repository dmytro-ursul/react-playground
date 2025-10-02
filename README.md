# 🚀 React Playground - Rails Backend

This is the **Rails GraphQL API backend** for the React Playground application. The frontend has been moved to a separate repository for better organization.

## 📁 Project Structure

```
react-playground/          # Rails Backend (this repo)
├── app/                  # Rails application
├── config/              # Configuration
├── db/                  # Database migrations & schema
└── lib/                 # Custom tasks

../react-playground-front/ # React Frontend (separate directory)
├── src/                 # React components
├── public/              # Static assets
└── package.json         # Frontend dependencies
```

## 🚀 Live Demo

**Deployed on Railway** - Full-stack application with separate frontend and backend services.

## 🎯 Features

- ✅ **GraphQL API**: Modern API with GraphQL
- 🔐 **Authentication**: JWT-based authentication
- 📋 **Task Management**: CRUD operations for tasks and projects
- 🗄️ **PostgreSQL**: Robust database with migrations
- 🚀 **Railway Ready**: Configured for Railway deployment

## 🔧 Demo Credentials

```
Username: john.doe
Password: Password123!
```

**Note:** Password now requires strong password validation (uppercase, lowercase, digit, and special character).

## 🛠️ Tech Stack

- **Ruby on Rails 7** with GraphQL
- **PostgreSQL** database
- **JWT** authentication
- **Railway** deployment platform

## 🏃‍♂️ Quick Start

### Backend (Rails API)
```bash
bundle install
rails db:setup
rails server
```

### Frontend (React App)
```bash
cd ../react-playground-front
npm install
npm start
```

## 🛠️ Development Commands

### Backend (Rails API)

```bash
# Install dependencies
bundle install

# Setup database
rails db:setup

# Run migrations
rails db:migrate

# Seed database with demo data
rails db:seed

# Start Rails server
rails server

# Run tests
bundle exec rspec

# Rails console
rails console

# Check routes
rails routes
```

### Frontend (React App)

```bash
# Navigate to frontend directory
cd ../react-playground-front

# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build
```

## 🚀 API Endpoints

### GraphQL Endpoint
- **URL**: `http://localhost:3000/graphql`
- **GraphiQL**: `http://localhost:3000/graphiql` (development only)

### Health Check
- **URL**: `http://localhost:3000/health`

### Authentication
- **Login**: POST to `/sessions`

## 🗄️ Database Schema

The application uses PostgreSQL with the following main models:
- **User**: Authentication and user management
- **Project**: Task organization
- **Task**: Individual todo items

## 🚢 Deployment

This backend is configured for Railway deployment. See `RAILWAY_DEPLOYMENT.md` for detailed deployment instructions.

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `RAILS_MASTER_KEY`: Rails credentials key
- `RAILS_ENV`: Environment (production)

## 📚 Learn More

- [Ruby on Rails Guides](https://guides.rubyonrails.org/)
- [GraphQL Ruby](https://graphql-ruby.org/)
- [Railway Documentation](https://docs.railway.app/)
