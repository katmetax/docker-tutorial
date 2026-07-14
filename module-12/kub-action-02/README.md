# Using the declarative approach

## Setup

We have two important resource definition files:
- `deployment.yaml`
- `service.yaml`

To create the deployment & service based on the resource definition file:
```bash
kubectl apply -f=deployment.yaml
kubectl apply -f=service.yaml
```

You can then see the deployment and service running:
```bash
kubectl get deployments
kubectl get services
```

```bash
kubectl get pods
```

And you can expose it and view your application:
```bash
minikube service backend
```