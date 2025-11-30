#!/bin/bash
# Export Keycloak realm configuration
# Run this whenever you make changes to Keycloak that should be shared with the team

echo "Exporting Keycloak realm configuration..."

docker exec jangular-backend /opt/keycloak/bin/kc.sh export \
  --dir /tmp/keycloak-export \
  --users realm_file

docker cp jangular-backend:/tmp/keycloak-export/jangular-realm-realm.json ./keycloak-config/jangular-realm.json

echo "✅ Keycloak realm exported to keycloak-config/myapp-realm.json"
echo "Commit this file to share Keycloak configuration with your team"
