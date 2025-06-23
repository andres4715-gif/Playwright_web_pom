# Playwright WEB automation Framework
![playwright](https://github.com/user-attachments/assets/01065d4a-6d06-46e9-85c0-fa9519702e47)

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

## Local Execution: 

```shell
Execute UI test: 
$ npm run test:ui

Execute API Test: 
$ npm run test:api

Execute UI test with a specific browser: 
npm run test:chrome / npm run test:firefox / npm run test:webkit

Execute UI with visible browser: 
$ npm run test:headed:ui

See the latest report: 
$ npm run report
```

## Command line to run in local with Debugging. 
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
- [X] Create additional environments to move QA, Pre-prod and Prod.
- [X] Make some .sh files to run manual jobs
- [X] Add in the readme file how run a manual execution
- [ ] Make a bucked in AWS for testing purposes and Upload Reports to External Storage
- [ ] Export the public ip to be able to see the reports in a public IP
- [ ] Improve this file: deployment.yaml in the report html section 
- [ ] Get information about deployment process because it is not visible on Lens IDE
- [ ] Improve Deployment file adding the HTML in other file
- [ ] Try to execute test cases using kubernetes each pull request 
- [ ] Edit this file k8s/scripts/run-all-tests.sh to obtain env form environment variables 
- [ ] Check if this Readme file k8s/Readme.md needs some changes
- [ ] Create environment variables and use it in cron files to execute test
- [ ] Understand this file: deploy.sh
- [ ] Check how to run whole environments just using this file: k8s/scripts/deploy.sh

# FIX Kubernetes config files: 
- [ ] Check the API and UI Report is running in this port: 9323 but, if you want both in the browser is not possible for this error:
   > E0525 14:37:00.757503   39397 portforward.go:424] "Unhandled Error" err=<
        an error occurred forwarding 2020 -> 2020: error forwarding port 2020 to pod ef6017de569218d7be1c2f6a429413a73a848d49c281d0a718b03435c08d97dd, uid : exit status 1: 2025/05/25 19:37:00 socat[119705] E connect(5, AF=2 127.0.0.1:2020, 16): Connection refused

- [ ] Check the Dashboard results in: http://localhost:8080/#
  > 404 Not Found</title></head>


