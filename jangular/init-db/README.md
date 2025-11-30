# Database Initialization Scripts

This directory contains SQL scripts that run automatically when the PostgreSQL container is first created.

## Files

- `create-keycloak-db.sql`: Creates the keycloakdb database for Keycloak
- `seed-data.sql`: Insert test/development data (add your shared test data here)

## How it works

1. The PostgreSQL Docker image automatically runs all `.sql` and `.sh` files in `/docker-entrypoint-initdb.d/` on first startup
2. These scripts only run if the data directory is empty (first time setup)
3. The main application database `myappdb` is created via the `POSTGRES_DB` environment variable
4. Database schemas are managed by Spring Boot JPA (hibernate.ddl-auto=update)

## Team Collaboration

**All developers get the same database setup:**
1. Clone the repo
2. Run `docker-compose up`
3. Init scripts create the same databases and seed data
4. Everyone works with identical development environment

**Important:**
- ✅ COMMIT: Init scripts (`.sql` files)
- ❌ DON'T COMMIT: Runtime data (`jangular/data/` directory)
- The `data/` directory is git-ignored to prevent conflicts
- To share data changes: update the seed scripts, not the data files

## Development Workflow

- First run: Database is initialized from scratch
- Subsequent runs: Data persists while containers are running
- `docker-compose down`: Removes containers but preserves data
- `docker-compose down -v`: Removes containers AND data (fresh start)
