# Keycloak Configuration

This directory contains Keycloak realm configuration that is version controlled and shared with the team.

## Automatic Import

The realm configuration (`jangular-realm.json`) is **automatically imported** when Keycloak starts. This is configured in `docker-compose.yml` with:
- Volume mount: `./keycloak-config:/opt/keycloak/data/import:ro`
- Command flag: `start-dev --import-realm`

**This means:**
- ✅ New developers get a fully configured Keycloak instantly
- ✅ No manual realm creation or client configuration needed
- ✅ Test users are pre-configured and ready to use

## Updating Configuration

When you make changes to Keycloak (new clients, users, roles, etc.) that should be shared:

1. Make your changes in the Keycloak admin console
2. Run `../keycloak-export.sh` to export the current realm
3. Commit the updated `jangular-realm.json` file
4. Push to the repository

Team members will get the new configuration on their next:
```bash
docker-compose down -v
docker-compose up --build
```

## What's Included

The realm configuration includes:

- **Realm settings**: `jangular` realm with appropriate security settings
- **Clients**: `angular-app` OIDC client configured for the Angular frontend
- **Roles**: `user` and `admin` roles
- **Test Users**:
  - `testuser` / `test123` (user role)
  - `admin` / `admin123` (admin + user roles)
- **OIDC Configuration**: Standard flow, PKCE, proper redirect URIs

## Fresh Start

If you need to completely reset Keycloak to the imported configuration:

```bash
docker-compose down -v
docker-compose up keycloak
```

This removes all runtime data and re-imports the realm from this configuration file.
