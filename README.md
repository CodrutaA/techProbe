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

- [API tests](./tests/api/)

```bash
npm run test:api
```

- [Playwright tests](./tests/e2e/)

```bash
npm run testplaywright:test
```

- [Cypress tests](./cypress/e2e/)

```bash
npm run cy:run
```
