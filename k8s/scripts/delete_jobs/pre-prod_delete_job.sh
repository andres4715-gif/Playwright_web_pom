#!/bin/bash

# Deleting all the jobs to clear the cluster
echo "Delete job --all for [PRE-PROD ENVIRONMENT]..."
kubectl delete -n playwright-pre-prod jobs --all

# Show all running pods
echo "All tests started. Checking status..."
kubectl get pods -l app=playwright-ui-tests
kubectl get pods -l app=playwright-api-tests