# Base image
FROM node:latest

# Create app directory
WORKDIR /app

# Install app dependencies

COPY package*.json ./

RUN npm install -g npm@9.6.2
RUN npm install 


COPY . .

# Run app
RUN npm run build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]