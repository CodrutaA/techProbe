# techProbe

## E-comm project for E2E testing POC with Cypress & Playwright

![Tests](https://github.com/CodrutaA/techProbe/actions/workflows/test.yml/badge.svg)

## Arhitecture

- [Application source](./src)

```
-- src
  -- ui
    -- Services
  -- Application
```

- [API tests - tests/api/**/*.spec.js](./tests/api/)
  
- [Cypress tests - cypress/e2e/**/*.cy.js](./cypress/e2e/)

- [Playwright tests - tests/e2e/**/*.spec.js](./tests/e2e/)


## Install project

```bash
npm install
```

## Start server

```bash
npm start
```

## Pipeline

- triggering
  
    - manual
      
    - PR to `main` branch      

## Tests

- API
  
```bash
npm run test:api
```

- Playwright
  
```bash
npm run testplaywright:test
#report is generated to playwright-report/index.html
```

- Cypress
  
```bash
npm run cy
```
