# 🐳 Docker Services Guide

Complete guide to start and manage Docker services (PostgreSQL + Redis) for the Cheesecake E-Commerce project.

---

## ⚠️ Important Note

**Only PostgreSQL and Redis run in Docker.** The API and frontend run locally with `npm run dev` for better development experience (hot-reload, debugging, etc.).

---

## 📋 Prerequisites

1. **Docker Desktop** must be installed and running
   - Download: https://www.docker.com/products/docker-desktop/
   - Verify installation: `docker --version`
   - Verify Docker Compose: `docker compose version`

2. **Environment files** must be configured
   - Backend: `packages/api/.env` (copy from `.env.example`)
   - Frontend: `packages/client/.env` (copy from `.env.example`)

---

## 🚀 Quick Start (Recommended)

### Step 1: Start Docker Services (PostgreSQL + Redis Only)

Open PowerShell/Terminal in the project root directory and run:

```powershell
docker compose up -d
```

**What this does:**
- `-d` flag runs containers in detached mode (background)
- Starts **PostgreSQL** on port `5432`
- Starts **Redis** on port `6379`
- Creates persistent volumes for data storage
- **Does NOT start the API** (you'll run that with npm)

**Expected output:**
```
[+] Running 3/3
 ✔ Network project_cheesecake_default    Created
 ✔ Container cheesecake-postgres         Started
 ✔ Container cheesecake-redis            Started
```

**Note:** If you see "cheesecake-api" in the output, that's optional and not needed for development.

### Step 2: Verify Services are Running

```powershell
docker compose ps
```

**Expected output:**
```
NAME                  IMAGE           STATUS          PORTS
cheesecake-postgres   postgres:16     Up 10 seconds   0.0.0.0:5432->5432/tcp
cheesecake-redis      redis:7-alpine  Up 10 seconds   0.0.0.0:6379->6379/tcp
```

### Step 3: Run Database Migrations

Navigate to the API directory and run Prisma migrations:

```powershell
cd packages/api
npx prisma migrate dev --name init
```

**What this does:**
- Creates the `cheesecake_db` database
- Creates all tables (Users, Products, Orders, Cart, etc.)
- Generates Prisma Client

**Expected output:**
```
✔ Generated Prisma Client
✔ Applied migration: 20260521_init
```

### Step 4: Start Development Servers

Return to project root and start the app:

```powershell
cd ../..
npm run dev
```

**What this does:**
- Starts backend API on `http://localhost:3001`
- Starts frontend on `http://localhost:5173`
- Enables hot-reload for both

---

## 📊 Service Details

### PostgreSQL Database
- **Container name:** `cheesecake-postgres`
- **Port:** `5432`
- **Database:** `cheesecake_db`
- **Username:** `postgres`
- **Password:** `postgres123`
- **Connection URL:** `postgresql://postgres:postgres123@localhost:5432/cheesecake_db`

### Redis Cache
- **Container name:** `cheesecake-redis`
- **Port:** `6379`
- **No password** (development only)
- **Connection URL:** `redis://localhost:6379`

---

## 🛠️ Common Commands

### Start Services
```powershell
# Start in background (detached mode)
docker compose up -d

# Start with logs visible
docker compose up

# Start specific service only
docker compose up -d postgres
docker compose up -d redis
```

### Stop Services
```powershell
# Stop all services (keeps data)
docker compose stop

# Stop and remove containers (keeps data in volumes)
docker compose down

# Stop and remove everything including volumes (⚠️ deletes all data)
docker compose down -v
```

### View Logs
```powershell
# View all logs
docker compose logs

# Follow logs in real-time
docker compose logs -f

# View logs for specific service
docker compose logs postgres
docker compose logs redis

# Follow logs for specific service
docker compose logs -f postgres
```

### Check Service Status
```powershell
# List running containers
docker compose ps

# List all containers (including stopped)
docker compose ps -a

# Check resource usage
docker stats
```

### Restart Services
```powershell
# Restart all services
docker compose restart

# Restart specific service
docker compose restart postgres
docker compose restart redis
```

---

## 🔧 Database Management

### Access PostgreSQL CLI
```powershell
docker compose exec postgres psql -U postgres -d cheesecake_db
```

**Useful SQL commands:**
```sql
-- List all tables
\dt

-- Describe a table
\d users

-- View all users
SELECT * FROM users;

-- Exit
\q
```

### Access Redis CLI
```powershell
docker compose exec redis redis-cli
```

**Useful Redis commands:**
```
# Test connection
PING

# List all keys
KEYS *

# Get a value
GET key_name

# Clear all data
FLUSHALL

# Exit
exit
```

### Run Prisma Studio (Database GUI)
```powershell
cd packages/api
npx prisma studio
```

Opens at `http://localhost:5555` - Visual database browser and editor.

---

## 🔄 Reset Database

### Option 1: Reset with Migrations (Recommended)
```powershell
cd packages/api

# Reset database and reapply migrations
npx prisma migrate reset

# This will:
# 1. Drop the database
# 2. Create a new database
# 3. Apply all migrations
# 4. Run seed data (if configured)
```

### Option 2: Fresh Start
```powershell
# Stop and remove all containers and volumes
docker compose down -v

# Start services again
docker compose up -d

# Run migrations
cd packages/api
npx prisma migrate dev --name init
```

---

## 🐛 Troubleshooting

### Problem: "Port already in use"

**Error:** `Bind for 0.0.0.0:5432 failed: port is already allocated`

**Solution:**
```powershell
# Check what's using the port
netstat -ano | findstr :5432

# Stop the process or change port in docker-compose.yml
# Change "5432:5432" to "5433:5432" for PostgreSQL
```

### Problem: "Cannot connect to database"

**Error:** `FATAL: database "cheesecake" does not exist`

**Solution:**
```powershell
# Run migrations to create database
cd packages/api
npx prisma migrate dev --name init
```

### Problem: "Docker daemon not running"

**Error:** `Cannot connect to the Docker daemon`

**Solution:**
1. Open Docker Desktop application
2. Wait for it to fully start (whale icon in system tray)
3. Try command again

### Problem: "Permission denied"

**Error:** `permission denied while trying to connect to the Docker daemon socket`

**Solution:**
- **Windows:** Run PowerShell as Administrator
- **Linux/Mac:** Add user to docker group: `sudo usermod -aG docker $USER`

### Problem: Services won't start

**Solution:**
```powershell
# View detailed logs
docker compose logs

# Remove and recreate containers
docker compose down
docker compose up -d --force-recreate

# Check Docker Desktop for errors
```

---

## 📦 Data Persistence

### Where is data stored?

Docker volumes store data persistently:

```powershell
# List volumes
docker volume ls

# Inspect volume
docker volume inspect project_cheesecake_postgres_data
docker volume inspect project_cheesecake_redis_data
```

### Backup Database

```powershell
# Create backup
docker compose exec postgres pg_dump -U postgres cheesecake_db > backup.sql

# Restore backup
docker compose exec -T postgres psql -U postgres cheesecake_db < backup.sql
```

---

## 🎯 Complete Workflow

### Daily Development Workflow

1. **Start Docker services (PostgreSQL + Redis):**
   ```powershell
   docker compose up -d
   ```

2. **Start development servers (API + Frontend):**
   ```powershell
   npm run dev
   ```

3. **Work on your code** (hot-reload enabled)

4. **Stop when done:**
   ```powershell
   # Stop dev servers: Ctrl+C
   
   # Stop Docker (optional - can leave running)
   docker compose stop
   ```

### First-Time Setup Workflow

1. **Clone/create project**
2. **Install dependencies:** `npm install`
3. **Configure environment files** (`.env` in both packages)
4. **Start Docker (PostgreSQL + Redis only):** `docker compose up -d`
5. **Run migrations:** `cd packages/api && npx prisma migrate dev`
6. **Start dev servers (API + Frontend):** `npm run dev`
7. **Open browser:** `http://localhost:5173`

### ⚠️ Common Mistake to Avoid

**DON'T run:** `docker compose up -d api`

This tries to build and run the API in Docker, which is unnecessary for development. The API runs better locally with `npm run dev` because:
- ✅ Faster hot-reload
- ✅ Better debugging
- ✅ Direct access to logs
- ✅ No build time

**DO run:** `docker compose up -d` (without specifying services)

This starts only PostgreSQL and Redis, which is what you need.

---

## 🔐 Production Considerations

⚠️ **Important:** The current Docker setup is for **development only**.

For production:

1. **Use managed services:**
   - PostgreSQL: Neon, Supabase, AWS RDS
   - Redis: Upstash, Redis Cloud, AWS ElastiCache

2. **Update environment variables:**
   - Use production database URLs
   - Use strong passwords
   - Enable SSL/TLS connections

3. **Don't expose ports publicly:**
   - Use internal networking
   - Configure firewalls
   - Use VPCs/private networks

---

## 📚 Additional Resources

- **Docker Compose Docs:** https://docs.docker.com/compose/
- **PostgreSQL Docs:** https://www.postgresql.org/docs/
- **Redis Docs:** https://redis.io/docs/
- **Prisma Docs:** https://www.prisma.io/docs/

---

## ✅ Health Check

Run this to verify everything is working:

```powershell
# 1. Check Docker services
docker compose ps

# 2. Check database connection
cd packages/api
npx prisma db pull

# 3. Start dev servers
cd ../..
npm run dev

# 4. Open browser
# Frontend: http://localhost:5173
# Backend: http://localhost:3001/api/health
```

If all steps succeed, you're ready to develop! 🎉

---

**Need help?** Check the troubleshooting section or review the logs with `docker compose logs -f`