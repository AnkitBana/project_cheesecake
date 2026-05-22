# 🔧 Maintenance & Updates Guide

Guide for keeping the Cheesecake E-Commerce project updated and secure.

---

## 📊 Current Status

After running `npm install`, you may see:
- ✅ **470 packages installed** successfully
- ⚠️ **8 vulnerabilities** (2 moderate, 6 high)
- ⚠️ **Deprecated packages** warnings

**Don't panic!** Most of these are in development dependencies and don't affect production.

---

## 🔒 Security Vulnerabilities

### Check Vulnerabilities

```powershell
npm audit
```

This shows detailed information about each vulnerability.

### Fix Non-Breaking Issues

```powershell
npm audit fix
```

This updates packages to safe versions without breaking changes.

### Fix All Issues (⚠️ May Break Things)

```powershell
npm audit fix --force
```

**Warning:** This may introduce breaking changes. Test thoroughly after running.

### Recommended Approach

1. **For Development:** Leave as-is, vulnerabilities are mostly in dev dependencies
2. **Before Production:** Run `npm audit fix` and test
3. **For Critical Issues:** Update specific packages manually

---

## 📦 Deprecated Packages

### Current Deprecated Packages

1. **inflight@1.0.6** - Used by older npm/glob versions
2. **glob@7.2.3** - Old version with security issues
3. **rimraf@3.0.2** - Old version
4. **@humanwhocodes/object-schema** - ESLint dependency
5. **@humanwhocodes/config-array** - ESLint dependency
6. **multer@1.4.5-lts.2** - File upload library
7. **eslint@8.57.1** - Linting tool

### How to Update

#### Update Multer (File Uploads)

```powershell
cd packages/api
npm install multer@latest
npm install --save-dev @types/multer@latest
```

#### Update ESLint

```powershell
# Root level
npm install --save-dev eslint@latest

# API
cd packages/api
npm install --save-dev eslint@latest

# Client
cd ../client
npm install --save-dev eslint@latest
```

#### Update Other Dependencies

```powershell
# Check outdated packages
npm outdated

# Update all to latest (careful!)
npm update

# Update specific package
npm install package-name@latest
```

---

## 🔄 Update npm Itself

### Current Version Check

```powershell
npm --version
```

### Update npm (Recommended)

```powershell
npm install -g npm@latest
```

**Current:** npm 10.8.2  
**Latest:** npm 11.15.0

**Benefits:**
- Faster installs
- Better security
- Bug fixes
- New features

---

## 📋 Regular Maintenance Checklist

### Weekly (During Active Development)

- [ ] Check for security advisories: `npm audit`
- [ ] Update dev dependencies: `npm update --dev`
- [ ] Test after updates

### Monthly

- [ ] Check outdated packages: `npm outdated`
- [ ] Update non-breaking changes: `npm update`
- [ ] Review and update deprecated packages
- [ ] Run full test suite

### Before Production Deploy

- [ ] Run `npm audit fix`
- [ ] Update all critical vulnerabilities
- [ ] Test thoroughly
- [ ] Update npm to latest: `npm install -g npm@latest`
- [ ] Regenerate lock file: `rm package-lock.json && npm install`
- [ ] Run production build: `npm run build`

---

## 🎯 Specific Package Updates

### Update Prisma

```powershell
cd packages/api
npm install prisma@latest @prisma/client@latest
npx prisma generate
```

### Update React & Vite

```powershell
cd packages/client
npm install react@latest react-dom@latest
npm install --save-dev vite@latest
npm install --save-dev @vitejs/plugin-react@latest
```

### Update TypeScript

```powershell
# Root
npm install --save-dev typescript@latest

# API
cd packages/api
npm install --save-dev typescript@latest

# Client
cd ../client
npm install --save-dev typescript@latest
```

### Update Tailwind CSS

```powershell
cd packages/client
npm install --save-dev tailwindcss@latest postcss@latest autoprefixer@latest
```

---

## 🐛 Troubleshooting Updates

### Problem: Breaking Changes After Update

**Solution:**
```powershell
# Restore from git
git checkout package.json package-lock.json
npm install

# Or restore from backup
cp package.json.backup package.json
npm install
```

### Problem: Peer Dependency Conflicts

**Solution:**
```powershell
# Use legacy peer deps
npm install --legacy-peer-deps

# Or force install
npm install --force
```

### Problem: Lock File Conflicts

**Solution:**
```powershell
# Delete and regenerate
rm package-lock.json
rm -rf node_modules
npm install
```

---

## 📊 Dependency Management Best Practices

### 1. Use Exact Versions in Production

In `package.json`, use exact versions for critical packages:

```json
{
  "dependencies": {
    "express": "4.18.2",  // Exact version
    "react": "^18.2.0"     // Allow minor updates
  }
}
```

### 2. Keep Lock File in Git

Always commit `package-lock.json` to ensure consistent installs.

### 3. Test After Updates

```powershell
# Run tests
npm test

# Run dev servers
npm run dev

# Build for production
npm run build
```

### 4. Update Gradually

Don't update everything at once. Update and test:
1. Development dependencies first
2. Non-critical dependencies
3. Critical dependencies last

### 5. Read Changelogs

Before major updates, check:
- Package changelog/release notes
- Breaking changes
- Migration guides

---

## 🔐 Security Best Practices

### 1. Regular Audits

```powershell
# Weekly
npm audit

# Check specific package
npm audit --package=package-name
```

### 2. Use Snyk (Optional)

```powershell
# Install Snyk CLI
npm install -g snyk

# Test for vulnerabilities
snyk test

# Monitor continuously
snyk monitor
```

### 3. Dependabot (GitHub)

Enable Dependabot in your GitHub repository:
1. Go to repository Settings
2. Security & analysis
3. Enable Dependabot alerts
4. Enable Dependabot security updates

### 4. Keep Node.js Updated

```powershell
# Check current version
node --version

# Update Node.js
# Download from: https://nodejs.org/
```

---

## 📈 Performance Optimization

### Reduce Package Size

```powershell
# Analyze bundle size
cd packages/client
npm run build
npx vite-bundle-visualizer

# Remove unused dependencies
npm prune
```

### Use Production Builds

```powershell
# Build optimized version
npm run build

# Test production build locally
npm run preview
```

---

## 🎓 Learning Resources

- **npm Docs:** https://docs.npmjs.com/
- **Semantic Versioning:** https://semver.org/
- **npm Security:** https://docs.npmjs.com/auditing-package-dependencies-for-security-vulnerabilities
- **Snyk:** https://snyk.io/learn/

---

## ✅ Quick Commands Reference

```powershell
# Check for updates
npm outdated

# Update all packages (safe)
npm update

# Update specific package
npm install package-name@latest

# Check vulnerabilities
npm audit

# Fix vulnerabilities (safe)
npm audit fix

# Fix all (may break)
npm audit fix --force

# Clean install
rm -rf node_modules package-lock.json
npm install

# Update npm itself
npm install -g npm@latest
```

---

## 🚀 Recommended Action Plan

### Right Now (Optional)
```powershell
# Update npm
npm install -g npm@latest

# Fix safe vulnerabilities
npm audit fix
```

### Before Production (Required)
```powershell
# Full security check
npm audit

# Fix all safe issues
npm audit fix

# Test thoroughly
npm run build
npm test
```

### Ongoing (Monthly)
```powershell
# Check for updates
npm outdated

# Update dev dependencies
npm update --dev

# Test
npm run dev
```

---

**Remember:** The project works perfectly as-is. These updates are for long-term maintenance and security, not immediate requirements.