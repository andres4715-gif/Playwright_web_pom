#!/bin/bash
set -e

ENVIRONMENT=$1

if [ -z "$ENVIRONMENT" ]; then
  echo "Usage: ./deploy.sh [qa|pre-prod|prod]"
  exit 1
fi

case $ENVIRONMENT in
  qa|pre-prod|prod)
    echo "Deploying to $ENVIRONMENT environment..."
    ;;
  *)
    echo "Invalid environment: $ENVIRONMENT"
    echo "Valid environments: qa, pre-prod, prod"
    exit 1
    ;;
esac

# Build kustomization
echo "Building kustomization for $ENVIRONMENT..."
kubectl kustomize environments/$ENVIRONMENT > /tmp/playwright-$ENVIRONMENT.yaml

# Dry run
echo "Running dry-run..."
kubectl apply --dry-run=client -f /tmp/playwright-$ENVIRONMENT.yaml

# Confirm deployment
read -p "Continue with deployment to $ENVIRONMENT? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Deployment cancelled."
  exit 1
fi

# Apply configuration
echo "Applying configuration..."
kubectl apply -f /tmp/playwright-$ENVIRONMENT.yaml

# Wait for deployments
echo "Waiting for deployments to be ready..."
kubectl -n playwright-$ENVIRONMENT wait --for=condition=available --timeout=300s deployment/playwright-dashboard

echo "Deployment to $ENVIRONMENT completed successfully!"
kubectl -n playwright-$ENVIRONMENT get all