# Base image
FROM node AS build

# Create app directory
WORKDIR /app

COPY . .

# Install app dependencies && run
RUN npm install && npm run build