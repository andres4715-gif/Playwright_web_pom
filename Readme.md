# Playwright WEB automation Framework
![stk8sqYZ_400x400](https://github.com/user-attachments/assets/3750dd27-a4e0-4167-b470-1974240570ce)


# Folder structure
```
🗂️ PLAYWRIGHT_WEB_POM/
📁 .github/workflows
📁 dist
📁 k8s
├── 📁 base
│   ├── 📄 cronjob-api-tests.yaml
│   ├── 📄 cronjob-ui-tests.yaml
│   ├── 📄 deployment.yaml
│   ├── 📄 ingress.yaml
│   ├── 📄 kustomization.yaml
│   ├── 📄 playwright-api-reports-service.yaml
│   ├── 📄 playwright-ui-reports-service.yaml
│   └── 📄 service.yaml
├── 📁 environments
│   ├── 📁 pre-prod
│   ├── 📁 prod
│   └── 📁 qa
├── 📁 scripts
│   └── 📄 deploy.sh
📄 README.md
📁 node_modules
📁 playwright-report
📁 src
├── 📁 fixtures
├── 📁 pages
└── 📁 tests
📁 test-results
📄 .gitignore
📄 docker-compose.yml
📄 Dockerfile
📄 package-lock.json
📄 package.json
📄 playwright.config.ts
📄 Readme.md
📄 tsconfig.json
    
```

## How to run: 

```shell
Execute all existing test: 
$ npm run test:ui


Execute UI Test: 
$ npm run test:api


Execute with a specific browser: 
npm run test:chrome / npm run test:firefox / npm run test:webkit

Execute UI with visible browser: 
$ npm run test:headed

See the latest report: 
$ npm run npm run report
```

## Command line to run with Debugging. 
```shell
$ npx playwright test --project=chromium --grep @ui --headed --debug

Example: 
$ npx playwright test --project=chromium --grep 'should navigate to specific visual studio Company' --headed --debug
```

# TO DO ✅
- [ ] Create .env file and implement it
- [ ] Implement a logger
- [ ] Check how implement fixtures
- [ ] Edit the codegen script from package.json
- [X] inherit from Base page in the other pages
- [X] API Implementation

# TO DO KUBERNETES ✅ 
- [X] How to run Kubernetes in the UI
- [X] Create a .github/workflows/playwright.yml file to run with GitHub Actions
- [X] Check why is necessary the Kubernetes file in this folder
- [X] How can I run just using docker and docker-compose?
- [X] Using Kubernetes Runs a Pod for ui tests and another Pod for API tests
- [X] Install and interact whit cluster using LENS APP
- [ ] Make a bucked in AWS for testing purposes and Upload Reports to External Storage
- [ ] Implement namespace with configuration file in K8s/ one for UI and other to API
- [ ] Make some .sh files to run manual jobs
- [ ] Add in the readme file how run a manual execution
- [ ] Improve this file: deployment.yaml in the report html section 
- [ ] Get information about deployment process because it is not visible on Lens IDE
- [ ] Create additional environments to move QA, Pre-prod and Prod.
- [ ] Export the public ip to be able to see the reports in a public IP
- [ ] Improve Deployment file adding the HTML in other file
- [ ] Try to execute test cases using kubernetes each pull request 
- [ ] Create environment variables and use it in cron files to execute test
- [ ] Understand this file: deploy.sh
