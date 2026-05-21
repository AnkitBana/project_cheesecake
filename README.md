# 🍰 Cheesecake E-Commerce Platform

A modern, full-stack e-commerce platform built with React, TypeScript, Node.js, Express, and PostgreSQL.

## 🏗️ Architecture

**Three-tier web application:**
- **Client Layer**: React 18 + TypeScript + Vite + Tailwind CSS
- **API Layer**: Node.js 20 + Express + TypeScript
- **Data Layer**: PostgreSQL 16 + Redis 7

## 🚀 Tech Stack

### Frontend
- React 18 with TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- React Query / TanStack Query (server state)
- Zustand (global state)
- React Router v6 (routing)
- Axios (HTTP client)
- Stripe.js (payments)

### Backend
- Node.js 20 + Express
- TypeScript
- Prisma ORM
- JWT Authentication (access 15m / refresh 7d)
- Zod (validation)
- Helmet + CORS (security)
- express-rate-limit (DDoS protection)
- Winston (logging)
- Multer + Cloudinary (file uploads)
- Stripe SDK (payments)
- SendGrid (emails)

### Database & Cache
- PostgreSQL 16 (primary database)
- Redis 7 (sessions & caching)
- Prisma migrations

### Infrastructure
- Docker Compose (local development)
- GitHub Actions (CI/CD)
- Vercel (frontend deployment)
- Render/Railway (API deployment)
- Neon/Supabase (PostgreSQL hosting)
- Upstash (Redis hosting)

## 📁 Project Structure

```
cheesecake-ecommerce/
├── packages/
│   ├── api/                 # Backend Express API
│   │   ├── src/
│   │   │   ├── config/      # Configuration files
│   │   │   ├── controllers/ # Route controllers
│   │   │   ├── middleware/  # Express middleware
│   │   │   ├── models/      # Business logic
│   │   │   ├── routes/      # API routes
│   │   │   ├── services/    # External services
│   │   │   ├── types/       # TypeScript types
│   │   │   ├── utils/       # Utility functions
│   │   │   └── index.ts     # Entry point
│   │   ├── prisma/          # Database schema & migrations
│   │   ├── tests/           # API tests
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
│       │   ├── utils/       # Utility functions
│       │   ├── App.tsx      # Root component
│       │   └── main.tsx     # Entry point
│       ├── public/          # Static assets
│       └── package.json
│
├── docker-compose.yml       # Docker services
├── .gitignore
├── package.json             # Root package.json (workspaces)
└── README.md
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 20+
- Docker & Docker Compose
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cheesecake-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start Docker services (PostgreSQL & Redis)**
   ```bash
   npm run docker:up
   ```

4. **Set up environment variables**
   
   Create `.env` files in both `packages/api` and `packages/client`:
   
   **packages/api/.env:**
   ```env
   NODE_ENV=development
   PORT=3001
   
   # Database
   DATABASE_URL=postgresql://cheesecake:cheesecake_dev_password@localhost:5432/cheesecake_db
   
   # Redis
   REDIS_URL=redis://:cheesecake_redis_password@localhost:6379
   
   # JWT
   JWT_ACCESS_SECRET=your-super-secret-jwt-access-key-change-in-production
   JWT_REFRESH_SECRET=your-super-secret-jwt-refresh-key-change-in-production
   JWT_ACCESS_EXPIRES_IN=15m
   JWT_REFRESH_EXPIRES_IN=7d
   
   # Stripe
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   
   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   
   # SendGrid
   SENDGRID_API_KEY=your_sendgrid_api_key
   SENDGRID_FROM_EMAIL=noreply@cheesecake.com
   
   # CORS
   CORS_ORIGIN=http://localhost:5173
   ```
   
   **packages/client/.env:**
   ```env
   VITE_API_URL=http://localhost:3001/api
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
   ```

5. **Run database migrations**
   ```bash
   npm run prisma:migrate
   ```

6. **Generate Prisma client**
   ```bash
   npm run prisma:generate
   ```

7. **Start development servers**
   ```bash
   npm run dev
   ```
   
   This will start:
   - API server: http://localhost:3001
   - Client app: http://localhost:5173

## 📝 Available Scripts

### Root Level
- `npm run dev` - Start both API and client in development mode
- `npm run dev:api` - Start only the API server
- `npm run dev:client` - Start only the client app
- `npm run build` - Build both packages for production
- `npm run docker:up` - Start Docker services
- `npm run docker:down` - Stop Docker services
- `npm run docker:logs` - View Docker logs
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio

### API Package
```bash
cd packages/api
npm run dev          # Start dev server with hot reload
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

## 🔐 Authentication Flow

1. User registers/logs in → API issues JWT access token (15m) + refresh token (7d)
2. Client stores tokens securely
3. All API requests include `Authorization: Bearer <access_token>`
4. When access token expires, client uses refresh token to get new access token
5. Refresh token rotation on each use for security

## 🗄️ Database Schema

Key entities:
- **Users**: Customer accounts with authentication
- **Products**: Cheesecake products with variants
- **Categories**: Product categorization
- **Orders**: Customer orders with line items
- **Cart**: Shopping cart items
- **Reviews**: Product reviews and ratings
- **Addresses**: Shipping and billing addresses

## 🚢 Deployment

### Frontend (Vercel)
1. Connect GitHub repository to Vercel
2. Set build command: `npm run build:client`
3. Set output directory: `packages/client/dist`
4. Add environment variables

### Backend (Render/Railway)
1. Connect GitHub repository
2. Set build command: `npm run build:api`
3. Set start command: `npm run start --workspace=@cheesecake/api`
4. Add environment variables
5. Provision PostgreSQL and Redis add-ons

## 🧪 Testing

```bash
# Run API tests
cd packages/api
npm run test

# Run client tests
cd packages/client
npm run test
```

## 📚 API Documentation

API documentation is available at `/api/docs` when running the development server.

Key endpoints:
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/products` - List products
- `GET /api/products/:id` - Get product details
- `POST /api/cart` - Add to cart
- `POST /api/orders` - Create order
- `POST /api/payments/create-intent` - Create Stripe payment intent

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

Built with modern web technologies and best practices for scalability, security, and developer experience.