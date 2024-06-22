# Stage 1: Build the React app
FROM node:22-alpine3.19 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the React app
FROM node:22-alpine3.19 AS serve

# Install serve globally
RUN npm install -g serve

# Copy the build output from the previous stage
COPY --from=build /app/build /app/build

# Expose port 3000 to the outside world
EXPOSE 3000

# Start the app
CMD ["serve", "-s", "app/build", "-l", "3000"]
