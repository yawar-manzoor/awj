# Build stage
FROM node:18-alpine AS build

# Set working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Production stage (using Nginx to serve static files)
FROM nginx:alpine

# Copy built files from the build stage to Nginx's web root directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port that Nginx is listening on
EXPOSE 80

# Nginx will automatically serve the static files, no need for CMD here
