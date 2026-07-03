FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ARG DEFAULT_PORT=80

# This sets the PORT environment variable
ENV PORT=$DEFAULT_PORT

EXPOSE $PORT

VOLUME ["app/node_modules"]

CMD ["npm", "start"]