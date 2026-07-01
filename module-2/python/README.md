# Module 2 - Python

## Setup

First build the bundle:
```bash
docker build .
```

Then run the container in interactive terminal mode as the project expects some input:
```bash
docker run -it [IMAGE_ID]
```

If you've stopped the container, to restart it you can do:
```bash
docker start -a -i [IMAGE_ID]
```