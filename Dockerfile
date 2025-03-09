FROM node:18-alpine as client-build

WORKDIR /app/client

# Copy client files and build
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

FROM openjdk:11-jdk-slim as java-build

WORKDIR /app/server/generator

# Copy Java source files
COPY server/generator/src ./src

# Compile Java code
RUN mkdir -p bin && javac -d ./bin src/*.java

FROM node:18-alpine

# Install Java runtime for running the compiled Java code
RUN apk add --no-cache openjdk11-jre

WORKDIR /app

# Copy client and server code
COPY --from=client-build /app/client /app/client
COPY server /app/server

# Copy compiled Java classes
COPY --from=java-build /app/server/generator/bin /app/server/generator/bin

# Install server dependencies
WORKDIR /app/server
RUN npm ci --production

# Expose the port that the server runs on
EXPOSE 5000

# Start the server
CMD ["node", "server.js"] 