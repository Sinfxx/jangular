export const environment = {
  production: false,
  keycloak: {
    issuer: 'http://localhost:8080/realms/jangular',   // <-- CHANGE
    clientId: 'jangular',                       // <-- CHANGE
  },
  apiBaseUrl: 'http://localhost:8081/api/v1'             // your Spring Boot backend
};
