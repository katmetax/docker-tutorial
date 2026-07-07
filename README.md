# Docker & K8s Tutorial

A project to follow along to [Docker & Kubernetes: The Practical Guide by Maximilian Schwarzmüller](https://www.udemy.com/course/docker-kubernetes-the-practical-guide/). After being exposed to Docker & Kubernetes throughout most of my latest years of being a frontend developer, I've decided to actually learn the concepts properly so I can use Docker & K8s with ease myself. I'm sure I will have a WHALE of a time with this course (ba-dum-tsh).

## Docker

### Fundamentals

Docker's purpose is to run things in isolation and separation. It has two main concepts - images and containers.

**Containers**

Where your application runs.

**Images**

These are the blueprints for the containers. It contains code & required tools/runtimes. Multiple containers can be created based on one image.

There are two ways to get/create images:

1. Get one from https://hub.docker.com/. For example you can get Node from here by running:
```bash
docker run node
```
You can then check if this container has been created:
```bash
docker ps -a
```
You can run the container in interactive mode:
```bash
docker run -it node
```

2. Create your own image by using a `Dockerfile`. Then build and run it:
```bash
docker build .
docker run -p [LOCAL_PORT]:[EXPOSED_PORT] [IMAGE_ID]
```

NOTE: Images need to be re-built if there are changes in the code. An image is read-only & cached.

**Layers**

Each instruction in an image creates a separate cacheable layer. These layers facilitate faster image rebuilding and promote easier sharing, making them essential for efficient container management.

When a layer is changed, all subsequent layers get re-run.

---

### Running a container

Run in dettached mode:
```bash
docker run -p [LOCAL_PORT]:[EXPOSED_PORT] -d [IMAGE_ID/IMAGE_NAME]
```

Or re-starting a container:
```bash
docker start [IMAGE_ID/IMAGE_NAME]
```

If you need to see console logs then you need to run in attached mode. You can do this by:
- Using same commands without `-d` or
- Doing `docker attach [IMAGE_ID]` if you already have a running container or
- You can just look at the logs by doing `docker logs [IMAGE_ID]`. You can also add `-f` to tail the logs.

---

### Deleting images and containers

Deleting a container (you cannot delete a running container):
```bash
docker rm [IMAGE_ID] [IMAGE_ID] [IMAGE_ID] # You can delete mulptiple
```

You can also automatically delete a container when it exits (by adding `--rm`):
```bash
docker run -p [LOCAL_PORT]:[EXPOSED_PORT] -d --rm [IMAGE_ID]
```

Deleting an image (you cannot delete images belonging to a container. You have to delete the container first):
```bash
docker images # Lists all the images so you can get the ID
docker rmi [IMAGE_ID] [IMAGE_ID] [IMAGE_ID]
```

Remove all unused images:
```bash
docker image prune
```
---

### Inspecting images

You can see info about the image such as when it was created, containers, OS, layers etc:
```bash 
docker image inspect [IMAGE_ID]
```

---

### Copying files into/from a container

Copy to a container:
```bash
docker cp [LOCAL_DIR_TO_COPY] [IMAGE_NAME]:/[DIR]
```

Copy from a container:
```bash
docker cp [IMAGE_NAME]:/[DIR] [LOCAL_DIR_TO_COPY]
```

---

### Naming and tagging images

You can give your container a custom name. This makes it easier as you don't have to keep looking at all containers to get IDs/names.
```bash
docker run -p [LOCAL_PORT]:[EXPOSED_PORT] -d --rm --name [CONTAINER_NAME] [IMAGE_ID]
```

For images, you can give them a name and a tag. Tags can be handy as a reference point (for example "latest", "version-14").
```bash
docker build -t [NAME]:[TAG]
```
You can then start a container based on that image:
```bash
docker run -p [LOCAL_PORT]:[EXPOSED_PORT] -d --rm --name [CONTAINER_NAME] [IMAGE_NAME]:[IMAGE_TAG]
```

---

### Volumes

Volumes allow you to store data across containers. They are managed by Docker.

You can add an anonymous volume in the `Dockerfile` like so:
```
VOLUME ["/app/storage/path"]
```
You can only access this volume with the `docker volume ls` command as Docker manages this and the volume will be removed when the container is removed.

To create a named volume that you can then acess you need to add intructions to the `docker run` command:
```bash
docker run -p [LOCAL_PORT]:[EXPOSED_PORT] -d --rm --name [CONTAINER_NAME] -v [VOLUME_NAME]:/app/storage/path [IMAGE_NAME]:[IMAGE_TAG]
```
The above will make data persist even if the container is removed as long as you run the container again with the same volume name and path.

So in essence, a named volume is this:
```
-v [VOLUME_NAME]:/app/storage/path
```

**Deleting volumes**

You can delete a volume like so:
```bash
docker volume ls # to see which volumes exist
docker volume rm [VOLUME_NAME]
```

Or if you want to delete all unused volumes you can:
```bash
docker volume prune
```

----

### Bind mounts

When you make changes to your code you have to rebuild your image which is time consuming. To fix this, we can use bind mounts:
```bash
docker run -p [LOCAL_PORT]:[EXPOSED_PORT] -d --rm --name [CONTAINER_NAME] -v [VOLUME_NAME]:/app/storage/path -v $(pwd):/app [IMAGE_NAME]:[IMAGE_TAG]
```
This setup essentially mirrors what you have locally to the docker container.
For this to work you will also need to persist anything that is necessary for the project to run. So for example if you are running a JS app then `node_modules` needs to be persisted otherwise the app will crash. So make sure that you have the below in your `Dockerfile`:
```
VOLUME ["/app/node_modules"]
```

In essence, a bind mount is:
```
-v $(pwd):/app
```

---

### Environment variables

Environment variables can be added to the `Dockerfile` like so:
```
ENV [ENV_VAR_NAME]=[ENV_VAR_VALUE]
```

And it can also be set (or overriden) as part of the `docker run` command by adding `--env [ENV_VAR_NAME]=[ENV_VAR_VALUE]`:
```bash
docker run -p [LOCAL_PORT]:[EXPOSED_PORT] --env [ENV_VAR_NAME]=[ENV_VAR_VALUE] -d --rm --name [CONTAINER_NAME] -v [VOLUME_NAME]:/app/storage/path [IMAGE_NAME]:[IMAGE_TAG]
```
You can also use `-e` instead of `--env`. And if you want to add multiple variables you can chain them like `-e [ENV_VAR_NAME]=[ENV_VAR_VALUE] -e [ENV_VAR_NAME]=[ENV_VAR_VALUE]`.

Or you can point docker to your `.env` file like so:
```bash
docker run -p [LOCAL_PORT]:[EXPOSED_PORT] --env-file ./.env -d --rm --name [CONTAINER_NAME] -v [VOLUME_NAME]:/app/storage/path [IMAGE_NAME]:[IMAGE_TAG]
```

---

### Arguments

You can set arguments in docker that can be changed per build (or rather - image). 

First in the `Dockerfile` make these changes:
```
ARG [ARG_NAME]=[ARG_VALUE]

ENV [ENV_VAR_NAME]=$[ARG_NAME] # notice the dollar sign when referencing the set argument
```

Then you can change the argument value in the build command:
```bash
docker build -t feedback-node:dev --build-arg [ARG_NAME]=[ARG_VALUE] .
```
This can be useful when building different images for dev/production etc.

---

### Network

Out of the box containers can send/receive network requests to/from the WWW. 

To communicate from container to host machine you need to use `host.docker.internal` as the domain.

For container to container requests you need to do a few things...

First you need to create a network:
```bash
docker network create [NETWORK_NAME]
```

Then you can run each of your containers as such:
```bash
docker run -p [LOCAL_PORT]:[EXPOSED_PORT] -d --rm --name [CONTAINER_NAME] --network [NETWORK_NAME] [IMAGE_NAME]:[IMAGE_TAG]
```
Make sure the [NETWORK_NAME] is the one you created and the same for all containers that you want to share a network.

If you need to point your code to another container that shares the same network, you can just use the [NETWORK_NAME] as the domain.

**Pointing a frontend container to a backend container**

Since frontends run in the browser and not in Docker, if you point your frontend calls to a dockerised backend "domain" (i.e. the container name), Docker is not able to replace this domain.

Instead, just use `localhost` as the domain and make sure to run the backend container with a published port so that the frontend can access it (see [module 5 for example](module-5/multi-01/README.md)).

---

### Docker compose

Docker compose is useful for managing multiple containers on the same host. Rather than having to do the build and run commands in the CLI you can create a compose file (`docker-compose.yaml`) instead.

In it, you **must** define the services (containers) and then you can define the published ports, environnment variables, volumes, networks etc.

See [module 6 for example](module-6/compose-01/README.md).

---

### Utility containers

If you want to run a command, or view something that requires a specific environment to run you can do this using Docker rather than installing things on your local machine. See [module 7 for example](module-7/README.md).

---
---

## K8s 

