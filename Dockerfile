# Use the official Node.js 14 image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies using PNPM
RUN npm install -g pnpm && pnpm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript app
RUN pnpm run build

# Expose the port on which the app will run
EXPOSE 3000

# Start the app
CMD ["pnpm", "start"]
