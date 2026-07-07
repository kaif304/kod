# Kings of Destination Backend

Express + PostgreSQL API for a lead-driven travel package website.

## Highlights

- Feature-based architecture
- Raw SQL with PostgreSQL
- JWT access and refresh token flow
- Role-based admin and manager access
- Lead, package, itinerary, payment, and dashboard APIs
- Manual booking workflow with optional token payment support

## Run locally

1. Copy `.env.example` to `.env`
2. Create the database and run the SQL files in `sql/`
3. Install dependencies with `npm install`
4. Start the API with `npm run dev`

## API base

`/api/v1`

## Default seeded admin

- Email: `admin@kodtravel.com`
- Password: `Admin@12345`

## Folder structure

```text
src/
  config/
  constants/
  middleware/
  features/
    auth/
    dashboard/
    leads/
    packages/
    payments/
  utils/
  app.js
  routes.js
  server.js
sql/
  schema.sql
  seed.sql
```
