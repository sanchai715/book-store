# Use the Node.js LTS version
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY ../package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application to the container
COPY . .

# Expose the application's port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
