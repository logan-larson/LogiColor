# Deploying LogiColor to Coolify

This document provides instructions for deploying the LogiColor application to a Coolify server using Docker Compose.

## Prerequisites

- A Coolify server with Docker and Docker Compose installed
- Git access to the repository

## Configuration Steps

1. **Update Environment Variables**

   Before deployment, update the following environment variables in `docker-compose.yml`:

   ```yaml
   environment:
     - NODE_ENV=production
     - ALLOWED_ORIGIN=https://yourdomain.com  # Replace with your actual domain
   ```

2. **Prepare for Coolify Deployment**

   - Make sure your Coolify server has access to the repository
   - Configure Coolify to use the `docker-compose.yml` file in the repository

## Manual Deployment Steps (Alternative)

If you prefer to deploy manually instead of using Coolify's Git integration:

1. Clone the repository to your server:
   ```
   git clone https://github.com/yourusername/LogiColor.git
   cd LogiColor
   ```

2. Build and start the containers:
   ```
   docker-compose up -d
   ```

3. The application should now be running at port 5000 on your server.

## Deployment File Structure

- `Dockerfile`: Builds the application, including compiling the Java code and building the client
- `docker-compose.yml`: Configures the service and its environment
- `.dockerignore`: Excludes unnecessary files from the Docker build

## Maintenance

To update the application:

1. Pull the latest changes:
   ```
   git pull
   ```

2. Rebuild and restart the containers:
   ```
   docker-compose down
   docker-compose up -d --build
   ```

## Troubleshooting

- **Issue**: Application fails to start
  **Solution**: Check the logs with `docker-compose logs`

- **Issue**: Java compilation errors
  **Solution**: Verify that the Java source files in `server/generator/src` are valid

- **Issue**: CORS errors
  **Solution**: Ensure the `ALLOWED_ORIGIN` environment variable is set correctly 