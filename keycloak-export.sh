#!/bin/bash
# Export Keycloak realm configuration
# Run this whenever you make changes to Keycloak that should be shared with the team

set -e

echo "Exporting Keycloak realm configuration..."

# Check if Keycloak container is running
if ! docker ps | grep -q jangular-keycloak; then
  echo "❌ Error: Keycloak container is not running"
  echo "Start it with: docker-compose up keycloak"
  exit 1
fi

# Export the realm
docker exec jangular-keycloak /opt/keycloak/bin/kc.sh export \
  --dir /tmp/keycloak-export \
  --realm jangular \
  --users realm_file

# Copy the exported file
docker cp jangular-keycloak:/tmp/keycloak-export/jangular-realm.json ./keycloak-config/jangular-realm.json

echo "✅ Keycloak realm exported to keycloak-config/jangular-realm.json"
echo "Commit this file to share Keycloak configuration with your team"
