# our starting image from the docker hub
FROM node

# Sets the working directory in the docker container
WORKDIR /app

COPY package.json /app

# Performance enhancement: Putting this before the COPY . /app stops the packages from re-installing every time we build
RUN npm install

# Copy from/to:
# First dot: the same folder as the Dockerfile (excludes the Dockerfile)
# /app (or can be ./): the folder in which to store them in the container. This gets created if it doesn't exist.
COPY . /app

# OPTIONAL: Export the right port based on our project. The actual port instruction needs to be done in the CLI.
EXPOSE 80

# Gets executed when a container is started based on this image. The CMD should always be the last instruction.
CMD ["node", "server.js"] 
