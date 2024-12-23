# Use Node.js as the base image
FROM node:16

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire codebase
COPY . .

# Expose the backend port
EXPOSE 5000

# Run the application
CMD ["npm", "start"]
