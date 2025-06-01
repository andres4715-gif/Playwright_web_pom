#!/bin/bash

# Apply the Kubernetes config file FOR QA, PRE-PROD and PROD ENVIRONMENTS: 
echo "Applying the Kubernetes config files for [QA, PRE-PROD, PROD]"
echo "****** Applying the Kubernetes config files for --- QA ---"
kubectl apply -k k8s/environments/qa
echo "****** Applying the Kubernetes config files for --- PRE-PROD ---"
kubectl apply -k k8s/environments/pre-prod
echo "****** Applying the Kubernetes config files for --- PROD ---"
kubectl apply -k k8s/environments/prod