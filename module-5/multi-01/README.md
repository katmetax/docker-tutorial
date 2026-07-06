## Backend setup

Build the backend image:
```bash
docker build -t goals .
```

Create the shared network:
```bash
docker network create goals-net
```

Create and run the mongodb container based on the official mongo image (volume path taken from the mongo official docker page):
```bash
docker run -d --rm --name mongodb -v data:/data/db --network goals-net mongo
```
You can also add username and password authentication but I didn't here to keep things simple.
 
Run the backend container:
```bash
docker run -d --rm --name goals-backend -p 80:80 -v logs:/app/logs -v $(pwd):/app --network goals-net goals 
```

## Frontend setup

Build the frontend image:
```bash
docker build -t goals-react ./frontend
```

Run the frontend container (the `-it` command is there for CRA to work):
```bash
docker run --name goals-fe --rm -p 3000:3000 -v $(pwd)/frontend/src:/app/src -it goals-react
```