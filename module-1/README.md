# Module 1

## Basic Setup

First build the bundle:
```bash
docker build .
```

Then based on the output you should get an image ID that starts with "sha256:". Copy this image ID and use it with the below command:
```bash
docker run -p [PORT]:[PORT] [IMAGE_ID] # -p publishes the port and routes the docker container port to our host machine's port otherwise it's a locked network container and it won't be reachable from outside
```

Now your site should be accessible from the browser by going to http://localhost:[PORT]/ .

To stop the container open a new terminal and type the following commands:
```bash
docker ps # this will list all running containers and their assigned names
docker stop [ASSIGNED_NAME]
```
