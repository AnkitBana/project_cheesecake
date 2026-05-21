# 🍰 Cheesecake E-Commerce - Setup Guide

Complete setup instructions for the Cheesecake E-Commerce platform.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 20+ ([Download](https://nodejs.org/))
- **npm** 9+ (comes with Node.js)
- **Docker Desktop** ([Download](https://www.docker.com/products/docker-desktop))
- **Git** ([Download](https://git-scm.com/))

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Project_cheesecake
```

### 2. Install Dependencies

Install dependencies for both API and client:

```bash
npm install
```

This will install dependencies for the root workspace and all packages.

### 3. Start Docker Services

Start PostgreSQL and Redis using Docker Compose:

```bash
npm run docker:up
```

This will start:
- PostgreSQL on port 5432
- Redis on port 6379

To stop the services:
```bash
npm run docker:down
```

### 4. Configure Environment Variables

#### Backend API

Create `packages/api/.env` from the example:

```bash
cp packages/api/.env.example packages/api/.env
```

Edit `packages/api/.env` and update the following:

```env
NODE_ENV=development
PORT=3001

# Database (use Docker values or your own)
DATABASE_URL=postgresql://cheesecake:cheesecake_dev_password@localhost:5432/cheesecake_db

# Redis
REDIS_URL=redis://:cheesecake_redis_password@localhost:6379

# JWT Secrets (CHANGE THESE!)
JWT_ACCESS_SECRET=your-super-secret-jwt-access-key-change-in-production
JWT_REFRESH_SECRET=your-super-secret-jwt-refresh-key-change-in-production

# Stripe (get from https://dashboard.stripe.com/test/apikeys)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Cloudinary (optional, get from https://cloudinary.com/)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# SendGrid (optional, get from https://sendgrid.com/)
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=noreply@cheesecake.com

# CORS
CORS_ORIGIN=http://localhost:5173
```

#### Frontend Client

Create `packages/client/.env` from the example:

```bash
cp packages/client/.env.example packages/client/.env
```

Edit `packages/client/.env`:

```env
VITE_API_URL=http://localhost:3001/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

### 5. Set Up Database

Generate Prisma client and run migrations:

```bash
npm run prisma:generate
npm run prisma:migrate
```

This will:
- Generate the Prisma client
- Create all database tables
- Apply the schema to PostgreSQL

### 6. Start Development Servers

Start both API and client in development mode:

```bash
npm run dev
```

This will start:
- **API Server**: http://localhost:3001
- **Client App**: http://localhost:5173

Or start them individually:

```bash
# Start API only
npm run dev:api

# Start client only
npm run dev:client
```

## 🗄️ Database Management

### View Database with Prisma Studio

```bash
npm run prisma:studio
```

Opens Prisma Studio at http://localhost:5555 to view and edit data.

### Create a New Migration

After modifying `packages/api/prisma/schema.prisma`:

```bash
cd packages/api
npx prisma migrate dev --name your_migration_name
```

### Reset Database

⚠️ **Warning**: This will delete all data!

```bash
cd packages/api
npx prisma migrate reset
```

## 📦 Building for Production

### Build Both Packages

```bash
npm run build
```

### Build Individually

```bash
# Build API
npm run build:api

# Build Client
npm run build:client
```

## 🐳 Docker Deployment

### Build API Docker Image

```bash
cd packages/api
docker build -t cheesecake-api .
```

### Run with Docker Compose (Full Stack)

```bash
docker-compose --profile full-stack up
```

This starts PostgreSQL, Redis, and the API server.

## 🧪 Testing

### Run API Tests

```bash
cd packages/api
npm test
```

### Run Client Tests

```bash
cd packages/client
npm test
```

## 📝 Available Scripts

### Root Level

- `npm run dev` - Start both API and client
- `npm run dev:api` - Start API server only
- `npm run dev:client` - Start client app only
- `npm run build` - Build both packages
- `npm run docker:up` - Start Docker services
- `npm run docker:down` - Stop Docker services
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio

### API Package

```bash
cd packages/api
npm run dev          # Start with hot reload
npm run build        # Build for production
npm run start        # Start production server
npm run test         # Run tests
npm run lint         # Lint code
```

### Client Package

```bash
cd packages/client
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Lint code
```

## 🔧 Troubleshooting

### Port Already in Use

If ports 3001, 5173, 5432, or 6379 are in use:

1. Stop the conflicting service
2. Or change ports in `.env` files and `docker-compose.yml`

### Database Connection Error

1. Ensure Docker services are running: `docker ps`
2. Check DATABASE_URL in `packages/api/.env`
3. Restart Docker: `npm run docker:down && npm run docker:up`

### Prisma Client Not Generated

```bash
npm run prisma:generate
```

### TypeScript Errors

The TypeScript errors you see are expected until dependencies are installed:

```bash
npm install
```

### Clear Node Modules and Reinstall

```bash
# Windows PowerShell
Remove-Item -Recurse -Force node_modules, packages/*/node_modules
npm install

# Linux/Mac
rm -rf node_modules packages/*/node_modules
npm install
```

## 🌐 API Endpoints

Once running, the API will be available at:

- **Base URL**: http://localhost:3001/api
- **Health Check**: http://localhost:3001/api/health
- **API Documentation**: http://localhost:3001/api/docs (to be implemented)

### Key Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user (protected)
- `GET /api/products` - List products
- `GET /api/products/:id` - Get product details
- `POST /api/cart/items` - Add to cart (protected)
- `POST /api/orders` - Create order (protected)

## 🔐 Authentication Flow

1. User registers or logs in
2. API returns access token (15min) and refresh token (7 days)
3. Client stores tokens in localStorage
4. All protected requests include `Authorization: Bearer <access_token>`
5. When access token expires, client uses refresh token to get new tokens
6. Refresh tokens are rotated on each use for security

## 📚 Project Structure

```
Project_cheesecake/
├── packages/
│   ├── api/                 # Backend Express API
│   │   ├── src/
│   │   │   ├── config/      # Configuration
│   │   │   ├── controllers/ # Route controllers
│   │   │   ├── middleware/  # Express middleware
│   │   │   ├── routes/      # API routes
│   │   │   ├── services/    # Business logic
│   │   │   ├── types/       # TypeScript types
│   │   │   ├── utils/       # Utilities
│   │   │   └── validators/  # Zod schemas
│   │   ├── prisma/          # Database schema
│   │   └── package.json
│   │
│   └── client/              # Frontend React app
│       ├── src/
│       │   ├── api/         # API client
│       │   ├── components/  # React components
│       │   ├── hooks/       # Custom hooks
│       │   ├── pages/       # Page components
│       │   ├── store/       # Zustand stores
│       │   ├── styles/      # Global styles
│       │   ├── types/       # TypeScript types
│       │   └── utils/       # Utilities
│       └── package.json
│
├── docker-compose.yml       # Docker services
├── package.json             # Root workspace config
├── README.md                # Project overview
└── SETUP.md                 # This file
```

## 🎯 Next Steps

1. **Implement Product Management**: Create services and controllers for products
2. **Build UI Components**: Create reusable React components
3. **Add Authentication UI**: Build login/register forms
4. **Implement Cart Functionality**: Complete cart operations
5. **Integrate Stripe**: Set up payment processing
6. **Add Product Images**: Configure Cloudinary for image uploads
7. **Email Notifications**: Set up SendGrid for transactional emails
8. **Testing**: Write unit and integration tests
9. **Documentation**: Add API documentation with Swagger/OpenAPI

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Write/update tests
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For issues and questions:
- Check the troubleshooting section above
- Review the README.md
- Check existing GitHub issues
- Create a new issue with detailed information

---

Happy coding! 🚀