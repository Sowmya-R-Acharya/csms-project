# Deployment Guide

This project has three deployable parts:

- `csms-frontend`: React/Vite static site
- `csms-backend`: Spring Boot API
- MySQL database

## Recommended Setup

Use:

- Netlify for the frontend
- Render or Railway for the Spring Boot backend
- Railway, Aiven, PlanetScale, or another hosted MySQL provider for MySQL

## 1. Create The MySQL Database

Create a hosted MySQL database, then import:

```sql
database/csms_db.sql
```

Save these values from your database provider:

- host
- port
- database name
- username
- password

The backend `DATABASE_URL` should look like:

```text
jdbc:mysql://HOST:PORT/DATABASE_NAME?useSSL=true&serverTimezone=UTC&allowPublicKeyRetrieval=true
```

## 2. Deploy Backend

Create a web service from this GitHub repo.

Backend settings:

```text
Root directory: csms-backend
Build command: mvn clean package -DskipTests
Start command: java -jar target/csms-backend-0.0.1-SNAPSHOT.jar
```

If your platform supports Docker, you can also deploy using:

```text
Root directory: csms-backend
Dockerfile path: Dockerfile
```

Environment variables:

```text
PORT=8081
DATABASE_URL=jdbc:mysql://HOST:PORT/DATABASE_NAME?useSSL=true&serverTimezone=UTC&allowPublicKeyRetrieval=true
DATABASE_USERNAME=your_mysql_username
DATABASE_PASSWORD=your_mysql_password
CORS_ALLOWED_ORIGINS=https://your-frontend-site.netlify.app,http://localhost:5173
SHOW_SQL=false
```

After deploy, your API base URL will be:

```text
https://your-backend-url/api
```

## 3. Deploy Frontend

Create a Netlify site from this GitHub repo.

Frontend settings:

```text
Base directory: csms-frontend
Build command: npm run build
Publish directory: dist
```

Environment variable:

```text
VITE_API_BASE_URL=https://your-backend-url/api
```

After changing environment variables, redeploy the frontend.

## 4. Update Backend CORS

Once Netlify gives you the final frontend URL, update the backend environment variable:

```text
CORS_ALLOWED_ORIGINS=https://your-frontend-site.netlify.app,http://localhost:5173
```

Then redeploy the backend.
