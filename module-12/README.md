# Running K8s on your local machine

First install the K8s CLI tool:
```bash
brew install kubectl
```

Then install minikube which wil allow you to run K8s locally:
```bash
brew install minikube
```

Then set the minikube drive to docker:
```bash
minikube start --driver=docker
```

Check everything went smoothly:
```bash
minikube status
```
It should output something like this:
```
type: Control Plane
host: Running
kubelet: Running
apiserver: Running
kubeconfig: Configured
```

Then launch the minikube dashboard:
```bash
minikube dashboard
```