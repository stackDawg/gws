# Get Well Soon Card App

## Overview
A "Get Well Soon" digital card application with swipeable pages, animated messages, and a pink/hearts theme. Built with React frontend and Express backend, using PostgreSQL for message storage.

## Recent Changes
- 2026-02-17: Initial import and setup in Replit environment. Installed dependencies, created database, pushed schema, configured workflows and deployment.

## Project Architecture
- **Frontend**: React 18 + TypeScript, Vite, Tailwind CSS, Radix UI, Framer Motion
- **Backend**: Express 5, TypeScript (tsx), serves both API and frontend on port 5000
- **Database**: PostgreSQL with Drizzle ORM
- **Build**: Vite for client, esbuild for server bundling

### Directory Structure
- `client/` - React frontend (Vite root)
  - `src/` - Components, hooks, pages, styles
  - `public/` - Static assets
- `server/` - Express backend
  - `index.ts` - Entry point, binds to port 5000
  - `routes.ts` - API routes + seed data
  - `storage.ts` - Database storage layer
  - `vite.ts` - Vite dev middleware setup
  - `static.ts` - Production static file serving
- `shared/` - Shared types and schemas (Drizzle schema, route definitions)
- `script/build.ts` - Production build script

### Key Commands
- `npm run dev` - Development server (port 5000)
- `npm run build` - Production build
- `npm run start` - Production server
- `npm run db:push` - Push Drizzle schema to database

### API Endpoints
- `GET /api/messages` - List all messages
- `GET /api/messages/:pageNumber` - Get message by page number
