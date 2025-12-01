#!/bin/bash

echo "🚀 Starting JAngular Full Stack Application..."
echo ""
echo "This will start:"
echo "  - PostgreSQL Database (port 5432)"
echo "  - Keycloak Auth Server (port 8080)"
echo "  - Spring Boot Backend (port 8080)"
echo "  - Angular Frontend (port 4200)"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Error: Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Error: docker-compose is not installed. Please install it and try again."
    exit 1
fi

echo "✅ Docker is running"
echo ""

# Ensure Keycloak temporary transaction directory exists
echo "🔧 Preparing Keycloak temporary transaction store..."
mkdir -p /tmp/tx-object-store
chmod 777 /tmp/tx-object-store
echo "✅ /tmp/tx-object-store ready"
echo ""

echo "📦 Building and starting services..."
echo "(This may take a few minutes on first run)"
echo ""

# Start services
docker-compose up --build

# Note: This script will keep running and show logs
# Press Ctrl+C to stop all services
