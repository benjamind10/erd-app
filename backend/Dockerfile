# backend/Dockerfile
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json tsconfig.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend files
COPY src ./src

# Build the backend
RUN npm run build

# Expose the port
EXPOSE 4000

# Start the server
CMD ["npm", "start"]
