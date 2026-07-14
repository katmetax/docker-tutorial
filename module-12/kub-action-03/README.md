# Single config file

## Setup

We can the resource definition files into one file. In this example we have created `master-deployment.yaml`.

Using this file, we can deploy:
```bash
kubectl apply -f=master-deployment.yaml
```

Then expose it:
```bash
minikube service backend
```
