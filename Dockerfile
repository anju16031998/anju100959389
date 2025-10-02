# Use a small, fast Node image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install only production dependencies first (better cache)
COPY package*.json ./
RUN npm ci --only=production

# Copy the rest of the source
COPY . .

# Cloud Run listens on 0.0.0.0:8080
ENV PORT=8080
EXPOSE 8080

# Start the app (uses "start" from package.json)
CMD ["npm", "start"]
