# JAngular - Full Stack Application

A full-stack application with Spring Boot backend, Angular frontend, PostgreSQL database, and Keycloak authentication.

## Architecture

- **Frontend**: Angular 21 with Keycloak OIDC integration (Port 4200)
- **Backend**: Spring Boot 4.0 REST API (Port 8080)
- **Database**: PostgreSQL 18 (Port 5432)
- **Auth**: Keycloak 26.0 (Port 8081)

## Prerequisites

- Docker
- Docker Compose

That's it! No need to install Node.js, Java, Maven, or PostgreSQL locally.

## Quick Start

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd jangular
```

### 2. Start the entire stack

```bash
bash start.sh
```

This single command will:
- Start PostgreSQL database
- Initialize both application and Keycloak databases
- Start Keycloak authentication server
- Build and start Spring Boot backend
- Build and start Angular frontend

### 3. Access the applications

- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:8081
- **Keycloak Admin**: http://localhost:8080
  - Admin Username: `admin`
  - Admin Password: `admin`

### 4. Login to the application

Use one of the pre-configured test users:
- **Test User**: `testuser` / `test123`
- **Admin User**: `admin` / `admin123`

## Development Workflow

### Fresh start (removes all data)

```bash
docker-compose down -v
```

### View logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
docker-compose logs -f keycloak
```

### Rebuild after code changes

```bash
# Rebuild specific service
docker-compose up --build backend

# Or rebuild everything
docker-compose up --build
```

## Database Management

### Consistent Setup Across Team

**Everyone gets the same database automatically:**

1. **Init scripts run on first startup**: SQL files in `jangular/init-db/` create databases and seed data
2. **JPA auto-update**: Spring Boot creates/updates tables based on entity definitions
3. **No data file conflicts**: The `jangular/data/` runtime directory is git-ignored

**To share database changes with the team:**
- Update the SQL scripts in `jangular/init-db/`
- Commit the scripts (NOT the data files)
- Team members run `docker-compose down -v && docker-compose up` to get fresh setup

### Database Configuration

- **Application DB**: `myappdb`
  - User: `myuser`
  - Password: `secret`
  - Schema managed by Spring Boot JPA

- **Keycloak DB**: `keycloakdb`
  - Uses same PostgreSQL instance
  - Separate database for Keycloak data

### Connecting to the database

```bash
# Using docker exec
docker exec -it jangular-postgres psql -U myuser -d myappdb

# Or use any PostgreSQL client with:
# Host: localhost
# Port: 5432
# Database: myappdb
# User: myuser
# Password: secret
```

## Keycloak Setup

### Automatic Configuration ✨

**No manual setup required!** The Keycloak realm is automatically imported on first startup.

When you run `docker-compose up`, Keycloak will:
- Create the `jangular` realm
- Configure the `angular-app` OIDC client
- Create test users with roles

### Test Users

The following users are pre-configured for development:

| Username | Password | Roles | Use Case |
|----------|----------|-------|----------|
| `testuser` | `test123` | user | Standard user testing |
| `admin` | `admin123` | admin, user | Admin functionality testing |

### Keycloak Admin Access

- **URL**: http://localhost:8080
- **Admin Username**: `admin`
- **Admin Password**: `admin`

Use the admin console to modify realm settings, add users, or configure additional clients.

## Project Structure

```
jangular/
├── docker-compose.yml              # Main orchestration file
├── jangular/                       # Spring Boot backend
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── pom.xml
│   ├── init-db/                   # Database initialization scripts
│   └── src/
├── angular-keycloak-oidc/         # Angular frontend
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── nginx.conf                 # Production nginx config
│   ├── package.json
│   └── src/
└── README.md
```

## Configuration

### Environment Variables

The application uses environment variables for configuration:

**Backend (application.properties)**:
- `DB_HOST`: Database hostname (default: localhost, docker: postgres)
- `KEYCLOAK_HOST`: Keycloak hostname (default: localhost:8081, docker: keycloak:8080)

**Frontend**:
- Configure Keycloak URLs in `src/app/app.config.ts`

## Team Collaboration

### ✅ What to commit (everyone should have these)

1. **Docker files**: `Dockerfile`, `docker-compose.yml`, `.dockerignore`
2. **Init scripts**: SQL files in `jangular/init-db/` (database setup)
3. **Keycloak config**: `keycloak-config/jangular-realm.json` (realm configuration)
4. **Configuration**: `application.properties`, `nginx.conf`, `.env.example`
5. **Source code**: All application code

### ❌ What NOT to commit (causes conflicts!)

1. **Runtime database data**: `jangular/data/` directory (git-ignored)
2. **Environment files with secrets**: `.env` (git-ignored)
3. **Build artifacts**: `node_modules/`, `target/`, `.angular/`, `dist/` (git-ignored)
4. **IDE files**: `.vscode/`, `.idea/` (git-ignored)

### How everyone gets the same database

Instead of committing database files (which causes conflicts), we use **init scripts**:

1. You configure databases/test data → Update SQL files in `jangular/init-db/`
2. You configure Keycloak → Run `./keycloak-export.sh` to export realm
3. Commit the scripts/config files
4. Teammates pull and run `docker-compose up --build`
5. Init scripts run automatically → Everyone has same environment!

### When pulling changes

```bash
git pull

# Fresh start with new database configuration
docker-compose down -v
docker-compose up --build

# Or keep your local data
docker-compose down
docker-compose up --build
```

### Sharing Keycloak Changes

After modifying Keycloak configuration (new clients, users, roles):

```bash
# Export the current realm configuration
./keycloak-export.sh

# Commit and push the changes
git add keycloak-config/jangular-realm.json
git commit -m "Update Keycloak realm configuration"
git push
```

Team members will automatically get the updated configuration on their next:
```bash
docker-compose down -v
docker-compose up --build
```

## Production Deployment

For production:

1. Change all passwords and secrets
2. Use environment-specific configuration files
3. Enable HTTPS
4. Use proper volume management for database persistence
5. Configure proper Keycloak realm export/import
6. Review security settings in Spring Boot and Keycloak

## License

[Your License]

## Contributors

[Your Team]
