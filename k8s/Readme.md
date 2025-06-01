![image](https://github.com/user-attachments/assets/a86857cd-87b4-44c6-ad88-5c7c7f58002d)

# 🚀 Deployment Commands: 

# 👷🏻‍♂️ Deploy: 
```shell
QA: ./scripts/deploy.sh qa
PRE-PROD: ./scripts/deploy.sh pre-prod
PROD: ./scripts/deploy.sh prod
```

# 🖥️ Check specific environment
```shell
$ kubectl -n <NAME_SPACE> get all
$ kubectl -n <NAME_SPACE> get cronjobs
$ kubectl -n <NAME_SPACE> get pods
```

# 📈 View logs
```shell
$ kubectl -n <NAME_SPACE> logs -l app=playwright-ui-tests
$ kubectl -n <NAME_SPACE> logs -l app=playwright-api-tests
```

# 🛜 Port forward to access reports
```shell
$ kubectl -n <NAME_SPACE> port-forward service/playwright-dashboard-service 8080:80
```

# ☑️ Best Practices

```text
1. Namespace Naming Convention: Use consistent naming like app-environment
2. Resource Quotas: Set limits per namespace to prevent resource exhaustion
3. Image Tags: Use different tags per environment (qa, pre-prod, semantic versioning for prod)
4. Secrets Management: Use external secret managers or sealed secrets
5. Monitoring: Set up namespace-specific monitoring and alerting
6. Backup Strategy: Regular backups of configurations and test results
7. Access Control: Implement proper RBAC for each environment
```

# Key Benefits of This Approach
```text
1. Complete Environment Isolation: Each environment (QA, pre-prod, prod) runs in its own namespace, preventing any cross-environment interference.
   
2. Configuration Management: Using Kustomize allows you to maintain a single base configuration while easily customizing per environment (schedules, resource limits, hostnames).

3. Progressive Deployment: The deploy script ensures you can safely promote through environments: QA → Pre-Prod → Prod.

4. Flexible Testing Schedules:

   * QA: Every 30 minutes (rapid feedback)
   * Pre-Prod: Every 2 hours (balance between coverage and resources)
   * Prod: Daily at scheduled times (stable monitoring)
```

# 🚚 Quick Start

## Reorganize your files according to the directory structure
- Apply to QA first:
```shell
$ kubectl apply -k environments/qa/
$ kubectl apply -k environments/pre-prod/
$ kubectl apply -k environments/prod/
```

## ✅ Verify everything works:
```shell
$ kubectl -n <NAME_SPACE> get all
```

## 💨 Access the dashboard:
```shell
$ kubectl -n <NAME_SPACE> port-forward service/playwright-dashboard-service 8080:80
```
___
# 💣 Minikube with Kubectl from scratch ✅

## `Minikube`

1️⃣ If you already have a `Minikube` cluster running, you can continue using this cluster, or you can delete it and start a new process. The command to delete the Minikube `cluster` is:

```shell
$ minikube delete

Output: 

🔥  Deleting "minikube" in docker ...
🔥  Removing /Users/ariosm/.minikube/machines/minikube ...
💀  Removed all traces of the "minikube" cluster.
```

2️⃣ Then, you should start the Minikube process using the Docker driver; for this, you can add this command line to a terminal.

```shell
# This command make a VM of Docker if this is available, 
# and I make a local cluster of Kubernetes

$ minikube start --driver=docker
```

3️⃣ Then you would need to evaluate the environment. To do this, you can add this command line to a terminal. 
```shell
$ eval $(minikube docker-env)
```
4️⃣ Docker build
```shell
$ docker build -t my-playwright-app:v1 .
```
5️⃣ Then you should apply the Kubernetes config files to be ready before executing a new job, taking into account that in this example we have three environments: QA, PRE-PROD, and PROD.  The command line to do it for the QA environment is:  

```shell
$ kubectl apply -k k8s/environments/qa


******************
***Other Option***
******************

NOTE: If you have a simple k8s setup you can use a regular command line like: 

$ kubectl apply -f k8s/deployment.yaml
$ kubectl apply -f k8s/service.yaml
$ kubectl apply -f k8s/configmap.yaml
$ kubectl apply -f k8s/ingress.yaml
$ kubectl apply -f k8s/cronjob.yaml
$ kubectl apply -f k8s/persistentvolumeclaim.yaml

Just the simply command line, if you need to apply all of them. 
$ kubectl apply -f k8s/
```

6️⃣ Then you should enable the addons ingress using this command line: 
```shell
$ minikube addons enable ingress
```

## 🚀 Manually Trigger Jobs for Testing
Let's create jobs manually to see what's happening:

```shell
# Create a test job for UI tests
$ kubectl -n playwright-qa create job --from=cronjob/playwright-ui-tests test-ui-manual-$(date +%s)

# Create a test job for API tests
$ kubectl -n playwright-qa create job --from=cronjob/playwright-api-tests test-api-manual-$(date +%s)

NOTE: 
The $(date +%s) adds a timestamp to make the job name unique.

# Watch the pods
$ kubectl -n playwright-qa get pods -w

```

🔍 📚 Check Pod Status

```# Get all pods including the test pods
kubectl -n playwright-qa get pods

# Get detailed information about the test pods
kubectl -n playwright-qa describe pod -l app=playwright-ui-tests
kubectl -n playwright-qa describe pod -l app=playwright-api-tests
```


👷🏻‍♂️👷🏻‍♂️🏃🏼‍♂️ Framework and k8s under constrution ⚙️🪚
