# Docker Tutorial

A project to follow along to [Docker & Kubernetes: The Practical Guide by Maximilian Schwarzmüller](https://www.udemy.com/course/docker-kubernetes-the-practical-guide/). After being exposed to Docker & Kubernetes throughout most of my latest years of being a frontend developer, I've decided to actually learn the concepts properly so I can use Docker & K8s with ease myself. I'm sure I will have a WHALE of a time with this course (ba-dum-tsh).

## Fundamentals

Docker has two main concepts - images and containers.

### Containers

Where your application runs.

### Images

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

### Layers

Each instruction in an image creates a separate cacheable layer. These layers facilitate faster image rebuilding and promote easier sharing, making them essential for efficient container management.

## Running a container

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


## Deleting images and containers

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

## Inspecting images

You can see info about the image such as when it was created, containers, OS, layers etc:
```bash 
docker image inspect [IMAGE_ID]
```

## Copying files into/from a container

Copy to a container:
```bash
docker cp [LOCAL_DIR_TO_COPY] [IMAGE_NAME]:/[DIR]
```

Copy from a container:
```bash
docker cp [IMAGE_NAME]:/[DIR] [LOCAL_DIR_TO_COPY]
```

## Naming and tagging images

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
