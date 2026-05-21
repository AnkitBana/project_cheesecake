# 🚀 How to Start All Services - Cheesecake E-Commerce

## Quick Start (Recommended)

### Option 1: Start Everything at Once
```bash
npm run dev
```
This command starts both the API and Client concurrently.

---

## Detailed Setup

### Prerequisites
Make sure you have installed:
- Node.js (v18 or higher)
- Docker Desktop (for PostgreSQL and Redis)
- npm or yarn

### Step 1: Install Dependencies
```bash
# Install all dependencies
npm install
```

### Step 2: Start Database Services (Docker)

#### If you have Docker installed:
```bash
# Start PostgreSQL and Redis
docker compose up -d
```

#### If you DON'T have Docker:
You'll need to install PostgreSQL and Redis locally:
- **PostgreSQL**: Download from https://www.postgresql.org/download/
- **Redis**: Download from https://redis.io/download/

### Step 3: Setup Environment Variables

#### API Environment (.env)
```bash
cd packages/api
cp .env.example .env
```

Edit `packages/api/.env` with your database credentials:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/cheesecake"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-change-this-in-production"
STRIPE_SECRET_KEY="your-stripe-secret-key"
```

#### Client Environment (.env)
```bash
cd packages/client
cp .env.example .env
```

Edit `packages/client/.env`:
```env
VITE_API_URL=http://localhost:3000/api
VITE_STRIPE_PUBLIC_KEY=your-stripe-public-key
```

### Step 4: Generate Prisma Client
```bash
cd packages/api
npx prisma generate
```

### Step 5: Run Database Migrations
```bash
cd packages/api
npx prisma migrate dev
```

### Step 6: Start All Services

#### Option A: Start Everything Together (Recommended)
```bash
# From root directory
npm run dev
```

#### Option B: Start Services Separately

**Terminal 1 - API Server:**
```bash
npm run dev:api
```

**Terminal 2 - Client (Vite):**
```bash
npm run dev:client
```

---

## 🌐 Access the Application

Once all services are running:

- **Frontend (Client)**: http://localhost:5174
- **Backend (API)**: http://localhost:3000
- **API Documentation**: http://localhost:3000/api-docs (if configured)

---

## 🛠️ Troubleshooting

### Issue: "Prisma Client not initialized"
**Solution:**
```bash
cd packages/api
npx prisma generate
```

### Issue: "Can't reach database server"
**Solution:**
1. Make sure Docker is running: `docker ps`
2. Start containers: `docker compose up -d`
3. Check DATABASE_URL in `.env`

### Issue: "Redis connection error"
**Solution:**
1. Make sure Redis is running in Docker
2. Or install Redis locally
3. Check REDIS_URL in `.env`

### Issue: "Port already in use"
**Solution:**
- Frontend (5173/5174): Kill the process using that port
- Backend (3000): Kill the process using that port

**Windows:**
```bash
netstat -ano | findstr :5174
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
lsof -ti:5174 | xargs kill -9
```

### Issue: "Dark mode stuck"
**Solution:**
Open browser console (F12) and run:
```javascript
clearTheme()
```

---

## 📦 Available Scripts

### Root Level
- `npm run dev` - Start both API and Client
- `npm run dev:api` - Start only API server
- `npm run dev:client` - Start only Client
- `npm install` - Install all dependencies

### API Package
- `npm run dev` - Start API in development mode
- `npm run build` - Build API for production
- `npm run start` - Start production API
- `npx prisma studio` - Open Prisma Studio (Database GUI)
- `npx prisma migrate dev` - Run migrations
- `npx prisma generate` - Generate Prisma Client

### Client Package
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

---

## 🐳 Docker Commands

### Start services:
```bash
docker compose up -d
```

### Stop services:
```bash
docker compose down
```

### View logs:
```bash
docker compose logs -f
```

### Restart services:
```bash
docker compose restart
```

### Remove all data (fresh start):
```bash
docker compose down -v
```

---

## 🎯 Development Workflow

1. **Start Docker services** (PostgreSQL + Redis)
   ```bash
   docker compose up -d
   ```

2. **Generate Prisma Client** (first time only)
   ```bash
   cd packages/api && npx prisma generate
   ```

3. **Run migrations** (first time or after schema changes)
   ```bash
   cd packages/api && npx prisma migrate dev
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

5. **Open browser**
   - Navigate to http://localhost:5174

---

## ✅ Verify Everything is Running

### Check Services:
```bash
# Check if Docker containers are running
docker ps

# Should see:
# - postgres container on port 5432
# - redis container on port 6379
```

### Check Ports:
- Frontend: http://localhost:5174 (should show the website)
- API: http://localhost:3000 (should return API response)

### Check Logs:
- Frontend logs: Check Terminal 1
- API logs: Check Terminal 2
- Docker logs: `docker compose logs -f`

---

## 🎉 You're All Set!

The application should now be running with:
- ✅ Beautiful frontend with dark/light mode
- ✅ Working cart system
- ✅ Professional navigation
- ✅ Smooth animations
- ✅ Responsive design

Enjoy building with Cheesecake E-Commerce! 🍰