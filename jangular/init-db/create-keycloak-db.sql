-- init-db/create-keycloak-db.sql
-- This script runs when the PostgreSQL container first starts
-- It creates the separate database for Keycloak

-- Create keycloak database
CREATE DATABASE keycloakdb;

-- The main application database (myappdb) is already created by POSTGRES_DB env var
-- Tables will be created automatically by Spring Boot JPA
