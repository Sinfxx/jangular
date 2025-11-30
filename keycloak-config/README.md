# Keycloak Configuration

This directory contains Keycloak realm configuration that should be version controlled and shared with the team.

## Setup

The realm configuration is automatically imported when Keycloak starts (configured in docker-compose.yml).

## Updating Configuration

When you make changes to Keycloak (new clients, users, roles, etc.) that should be shared:

1. Run `./keycloak-export.sh` to export the current realm
2. Commit the updated `myapp-realm.json` file
3. Team members will get the new configuration on next `docker-compose up`

## What's included

- Realm settings
- Clients (including your Angular app client)
- Roles
- Users (with passwords in development)
- Identity providers
- Authentication flows
