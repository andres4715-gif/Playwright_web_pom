# Playwright WEB automation Framework


```
playwright-ts-framework/
├── tests/                  
│   ├── ui/                
│   │   ├── login.spec.ts
│   │   ├── registration.spec.ts
│   │   ├── navigation.spec.ts
│   │   └── cart.spec.ts
│   └── api/                
│       └── account.spec.ts
├── pages/                  
│   ├── BasePage.ts         
│   ├── HomePage.ts
│   ├── LoginPage.ts
│   ├── RegistrationPage.ts
│   └── ProductPage.ts      
├── fixtures/               
│   └── pageFixtures.ts
├── utils/                  
│   └── apiHelper.ts        
├── playwright-report/      
├── test-results/           
├── node_modules/           
├── .gitignore              
├── package.json            
├── playwright.config.ts    
└── tsconfig.json           
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
$ npx playwright test --project=chromium --grep 'SHIELD-649' --headed --debug
```

# TO DO ✅
- [ ] Create .env file and implement it
- [ ] inherit from Base page in the other pages
- [ ] Implement a logger