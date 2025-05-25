# Deployment Commands: 

# Deploy to QA
```shell
$ ./scripts/deploy.sh qa
```


# Deploy to Pre-Prod
```shell
$ ./scripts/deploy.sh pre-prod
```

# Deploy to Production
```shell
$ ./scripts/deploy.sh prod
```

# Check specific environment
```shell
$ kubectl -n playwright-qa get all
$ kubectl -n playwright-pre-prod get cronjobs
$ kubectl -n playwright-prod get pods
```

# View logs
```shell
$ kubectl -n playwright-qa logs -l app=playwright-ui-tests
$ kubectl -n playwright-pre-prod logs -l app=playwright-api-tests
```

# Port forward to access reports
```shell
$ kubectl -n playwright-qa port-forward service/playwright-dashboard-service 8080:80
```

# Best Practices

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

# Quick Start

## Reorganize your files according to the directory structure
- Apply to QA first:
```shell
$ bashkubectl apply -k environments/qa/
```

## Verify everything works:
```shell
$ bashkubectl -n playwright-qa get all
```

## Access the dashboard:
```shell
$ bashkubectl -n playwright-qa port-forward service/playwright-dashboard-service 8080:80
```