# backend

![node-current](https://img.shields.io/node/v/typescript)

## Description

API to manage all app interactions

## Requirements

- [nest-cli](https://docs.nestjs.com/cli/overview)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov

# test coverage report
$ npm run test:covr
```

## Environment Variables (Local)

Create `.env` file with the following variables

```
DATABASE_URL=
```

## Modules

Use nest-cli to create modules, controllers, and services

```bash
nest g mo <module name>
```

```bash
nest g co <controller name>
```

```bash
nest g s <service name>
```

## Database: PostgreSQL

Run postgres seeds

```bash
npm run seed
```

Run postgres visualizer

```bash
npx prisma studio
```

## Contributions

- Follow REST architecture
- Use plural endpoints `/cases`
- Use kebab case for endpoints `/case-visits`
- Use PascalCase | singular names for db tables `Case`
- Use camelCase for Prisma columns but snake case for postgres columns `userId: String @map('user_id')`
- Body request type names -> CaseRequest
- Query params type names -> CaseQuery
- DTO type names -> CaseDTO
- Avoid type `any`
- Check for spelling errors
- Squash commits
- Write clean and meaningful commits/comments

## Built with

- [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
