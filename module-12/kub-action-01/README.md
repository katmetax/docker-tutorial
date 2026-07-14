# Using the imperative approach

## Setup

Build the Docker image:
```bash
docker build -t kub-first-app . 
```

Start minikube if it's not already started:
```bash
minikube start --driver=docker
```

In DockerHub create a new repo, tag and push your Docker image to that repo (remote - you'll have to create an account):
```bash
docker tag kub-first-app [username]/kub-first-app
docker push [username]/kub-first-app
```

Then create a new deployment object:
```bash
kubectl create deployment first-app --image=[username]/kub-first-app
```

To check if it was successful you can do:
```bash
kubectl get deployments
```
It should say 1/1 READY. If it says 0/1 READY then something went wrong.

You can also check the pods:
```bash
kubectl get pods
```
You should see STATUS of running.

You can also check everything in the dashboard:
```bash
minikube dashboard
```

Here is a diagram that explains what is happening behind the scenes:

![img](.github/screenshots/k8s_deployment.png)


Now, let's create a service:
```bash
kubectl expose deployment first-app --type=LoadBalancer --port=8080
```

To check it was created:
```bash
kubectl get services
```
You should see 2 services. Once created by K8s and the one we created.

Then you can view your app:
```bash
minikube service first-app
```