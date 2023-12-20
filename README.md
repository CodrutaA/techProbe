# techProbe

![Tests](https://github.com/CodrutaA/techProbe/actions/workflows/test.yml/badge.svg)

## Arhitecture

- [Application source](./src)

```
`-- src
    -- ui
        `-- Services
    `-- Application
```

- [Cypress tests](./cypress/e2e/)

```
`-- cypress
    `-- e2e
        `-- Test files
```

- [Playwright tests](./tests/e2e/)

```
`-- tests
    `-- e2e
        `-- Test files
```

## PIPELINE

## Install project

```bash
npm install
```

## Start server

```bash
npm start
```

## Tests
Tests can be triggered in 2 ways

```
-- manual
-- PR to main branch
```

- [API tests](./tests/api/)
  The API tests verify if the server is up and running (url**/health** check)

```bash
npm run test:api
```

- [Playwright tests](./tests/e2e/)
  If the tests are triggered automatically from the PR the tests will run on a ubuntu machine

```bash
npm run testplaywright:test
```

Report of the tests is generated on
- [Playwright reports](./playwright-report/index.html)
```
`-- playwright-report
    `-- index.html
```

- [Cypress tests](./cypress/e2e/)
- If the tests are triggered automatically from the PR the tests will run on a docker container

```bash
npm run cy:run
```
