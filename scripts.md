
# Scripts Documentation

## Overview
This document provides detailed information about all available npm scripts in the CSM Smart Connect project.

## Available Scripts

| Script | Description | Parameters | Example | Troubleshooting |
|--------|-------------|------------|---------|-----------------|
| `npm run dev` | Starts development server with hot module replacement | None | `npm run dev` | **Port 5000 in use:** Kill process with `lsof -ti:5000 \| xargs kill` |
| `npm run build` | Builds the application for production deployment | None | `npm run build` | **Build fails:** Check TypeScript errors with `npm run check` |
| `npm run start` | Starts the production server | None | `npm run start` | **Server won't start:** Ensure build completed successfully |
| `npm run check` | Runs TypeScript type checking without emitting files | None | `npm run check` | **Type errors:** Fix TypeScript issues in reported files |
| `npm run db:push` | Pushes database schema changes using Drizzle Kit | None | `npm run db:push` | **Database connection failed:** Verify DATABASE_URL in .env |

## Detailed Script Information

### Development Scripts

#### `npm run dev`
**Purpose:** Starts the development environment with hot reload capability

**Process:**
1. Sets NODE_ENV to 'development'
2. Starts Express server via tsx (TypeScript execution)
3. Enables Vite hot module replacement
4. Serves on port 5000

**Expected Output:**
```
> rest-express@1.0.0 dev
> NODE_ENV=development tsx server/index.ts

10:29:32 AM [express] serving on port 5000
```

**Common Issues:**
- **Port already in use:** Another process is using port 5000
  ```bash
  # Solution: Kill the process
  lsof -ti:5000 | xargs kill
  npm run dev
  ```
- **Module not found:** Dependencies may not be installed
  ```bash
  # Solution: Reinstall dependencies
  rm -rf node_modules package-lock.json
  npm install
  npm run dev
  ```

### Production Scripts

#### `npm run build`
**Purpose:** Creates optimized production build

**Build Process:**
1. **Frontend Build:** Vite builds React application to `dist/`
2. **Backend Build:** esbuild bundles server code
3. **Optimization:** Minification, tree-shaking, and asset optimization

**Build Configuration:**
- **Platform:** Node.js (server)
- **Format:** ESM (ES Modules)
- **External packages:** Excluded from bundle
- **Output:** `dist/` directory

**Expected Output:**
```
> rest-express@1.0.0 build
> vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

vite v5.4.14 building for production...
✓ 150 modules transformed.
dist/index.html                   0.46 kB │ gzip:  0.30 kB
dist/assets/index-abc123.css      156.24 kB │ gzip: 23.45 kB
dist/assets/index-def456.js       678.90 kB │ gzip: 234.56 kB
✓ built in 3.45s

  dist/index.js  123.45 kB

⚡ Done in 4567ms
```

**Troubleshooting:**
- **TypeScript errors:** Run `npm run check` first
- **Memory issues:** Increase Node.js memory: `NODE_OPTIONS="--max-old-space-size=4096" npm run build`
- **Asset loading errors:** Check file paths and public directory structure

#### `npm run start`
**Purpose:** Runs the production server using built files

**Prerequisites:**
- Must run `npm run build` first
- Production environment variables configured

**Expected Output:**
```
> rest-express@1.0.0 start
> NODE_ENV=production node dist/index.js

[Server] Production server running on port 5000
```

### Quality Assurance Scripts

#### `npm run check`
**Purpose:** Performs TypeScript type checking without compilation

**Benefits:**
- Fast type validation
- Catches type errors early
- No file output (noEmit: true)
- IDE-independent checking

**Expected Output (Success):**
```
> rest-express@1.0.0 check
> tsc

✓ Type checking completed successfully
```

**Expected Output (Errors):**
```
> rest-express@1.0.0 check
> tsc

src/components/SocialMedia.tsx:45:12 - error TS2339: Property 'invalidProp' does not exist on type 'SocialMediaProps'.

45     return invalidProp.map(item => (
              ~~~~~~~~~~~

Found 1 error in src/components/SocialMedia.tsx:45
```

### Database Scripts

#### `npm run db:push`
**Purpose:** Synchronizes database schema with Drizzle schema definitions

**Process:**
1. Reads schema from `shared/schema.ts`
2. Generates SQL migrations
3. Applies changes to connected database
4. Updates database structure

**Expected Output:**
```
> rest-express@1.0.0 db:push
> drizzle-kit push

📦 Schema changes detected:
  • Table 'users' - Added column 'created_at'
  • Table 'posts' - Modified column 'content' (varchar → text)

✅ Database schema updated successfully
```

**Environment Requirements:**
- `DATABASE_URL` must be configured
- PostgreSQL database must be accessible
- Valid connection credentials

**Troubleshooting:**
- **Connection failed:** Verify DATABASE_URL format: `postgresql://user:pass@host:port/db`
- **Permission denied:** Ensure database user has schema modification privileges
- **Schema conflicts:** Check for manual database changes that conflict with schema

## Script Execution Best Practices

### Development Workflow
```bash
# 1. Start development
npm run dev

# 2. Type check during development
npm run check

# 3. Database schema updates
npm run db:push
```

### Production Deployment
```bash
# 1. Type check
npm run check

# 2. Build application
npm run build

# 3. Start production server
npm run start
```

### Debugging Scripts

**Enable Debug Logging:**
```bash
DEBUG=express:* npm run dev
```

**TypeScript Watch Mode:**
```bash
npx tsc --watch --noEmit
```

**Database Schema Inspection:**
```bash
npx drizzle-kit introspect:pg
```

## Environment-Specific Considerations

### Development Environment
- Hot reload enabled
- Source maps available
- Detailed error messages
- Development API endpoints

### Production Environment
- Optimized bundles
- Compressed assets
- Production logging
- Security headers enabled

## Performance Monitoring

**Build Time Optimization:**
- Monitor bundle sizes in build output
- Use build analyzers for large bundles
- Consider code splitting for large applications

**Runtime Performance:**
- Monitor memory usage during development
- Check for memory leaks with long-running dev server
- Profile build times for CI/CD optimization
