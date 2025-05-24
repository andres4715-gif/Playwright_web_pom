# Playwright WEB automation Framework
![Screenshot 2025-05-13 at 22 27 09](https://github.com/user-attachments/assets/2bf66f8b-18b3-459d-8edb-bc1325303d6b)

# Folder structure
```
PLAYWRIGHT_WEB_POM/
├── .github/                    # GitHub configuration (actions, workflows)
├── dist/                       # Compiled output directory
├── k8s/                        # Kubernetes configuration files
│   ├── configmap.yaml
│   ├── cronjob.yaml
│   ├── deployment.yaml
│   ├── ingress.yaml
│   ├── persistentvolumeclaim.yaml
│   └── service.yaml
├── node_modules/               # Node.js dependencies
├── playwright-report/          # Generated test reports
├── src/                        # Source code directory
│   ├── fixtures/               # Test fixtures and data
│   │   └── pageFixtures.ts     # Page object fixtures
│   ├── pages/                  # Page Object Models
│   │   ├── BasePage.ts         # Base page with common methods
│   │   └── HomePage.ts         # Home page implementation
│   └── tests/                  # Test files
│       ├── api/                # API tests
│       │   ├── pages/          # API page objects
│       │   │   ├── basePage.ts
│       │   │   └── jsonPlaceholderPage.ts
│       │   ├── tests/          # API test files
│       │   └── types/          # Type definitions for API
│       │       └── api.types.ts
│       │   ├── basic_api_testing/   # Basic API test examples
│       │   │   ├── jsonplaceholder_basicExample1.spec.ts
│       │   │   └── jsonplaceholder_basicExample2.spec.ts
│       └── ui/                 # UI tests
│           └── navigation.spec.ts  # Navigation test file
├── test-results/               # Test execution artifacts
├── .gitignore                  # Git ignore file
├── docker-compose.yml          # Docker Compose configuration
├── Dockerfile                  # Docker configuration
├── package-lock.json           # Node.js dependencies lock file
├── package.json                # Project configuration and scripts
├── playwright.config.ts        # Playwright configuration
├── README.md                   # Project documentation
└── tsconfig.json               # TypeScript configuration        
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