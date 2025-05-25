#!/bin/bash

echo "Starting all test suites..."

# Run UI tests
echo "Starting UI tests..."
kubectl -n playwright-qa create job --from=cronjob/playwright-ui-tests test-ui-manual-with-sh-file-$(date +%s)

# Run API tests
echo "Starting API tests..."
kubectl -n playwright-qa create job --from=cronjob/playwright-api-tests test-api-manual-with-sh-file-$(date +%s)

# Show all running pods
echo "All tests started. Checking status..."
kubectl get pods -l app=playwright-ui-tests
kubectl get pods -l app=playwright-api-tests