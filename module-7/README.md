# Running an environment in an isolated container

If you want to run a command, or view something that requires a specific environment to run you can do this using Docker. 

Say for example that you don't have Node installed on your machine (you probably do but for the sake of this example you don't). 

## Option 1

Create and run the container:
```bash
docker run -it -d --name node-instance node
```

Then you can create a `package.json`:
```bash
docker exec -it node-instance npm init
```

Or you can do:
```bash
docker run -it node npm init
```

## Option 2

Use a `Dockerfile` and then build the image:
```bash
docker build -t node-util .
```

Then you can run it, bind it to the host machine and npm init:
```bash
docker run -it -v $(pwd):/app node-util npm init
```
This will allow the `package.json` to be created in the container and then it will be copied to your host machine.

If there is an `ENTRYPOINT` in the `Dockerfile` (which in this case there is), you can skip having to specify `npm` in the run:
```bash
docker run -it -v $(pwd):/app node-util init
```

## Option 3

You can use docker-compose:
```bash
docker-compose run --rm npm init
```