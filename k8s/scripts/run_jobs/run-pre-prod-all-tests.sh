#!/bin/bash

echo "Starting all test suites..."

# Run UI tests
echo "Starting UI tests to india, europe and us"
kubectl -n playwright-pre-prod create job --from=cronjob/playwright-ui-tests-europe test-ui-manual-europe-$(date +%s)
kubectl -n playwright-pre-prod create job --from=cronjob/playwright-ui-tests-us test-ui-manual-us-$(date +%s)
kubectl -n playwright-pre-prod create job --from=cronjob/playwright-ui-tests-india test-ui-manual-india-$(date +%s)

# Run API tests
echo "Starting API tests..."
kubectl -n playwright-pre-prod create job --from=cronjob/playwright-api-tests test-api-manual-with-sh-file-$(date +%s)

# Show all running pods
echo "All tests started. Checking status..."
kubectl get pods -l app=playwright-ui-tests
kubectl get pods -l app=playwright-api-tests