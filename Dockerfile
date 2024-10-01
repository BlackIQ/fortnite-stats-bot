# Use the Node base image as the build stage
FROM node:alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY . .

# Install dependencies
RUN npm install

# Start the Next.js application
CMD ["npm", "start"]
