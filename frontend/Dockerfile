# Use Node.js to build the Next.js app
FROM node:16 AS builder

# Set the working directory
WORKDIR /app

# Copy dependencies configuration
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code and build
COPY . .
RUN npm run build

# Use Node.js as the production environment
FROM node:16

# Set working directory
WORKDIR /app

# Copy the built Next.js app from the builder
COPY --from=builder /app ./

# Expose the Next.js port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
