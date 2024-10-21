FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy the compiled JavaScript code from the builder stage
COPY dist ./dist

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]