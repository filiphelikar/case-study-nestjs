# BE - NestJS

## Technologies

- NodeJS 18+
- NestJS 10 (https://nestjs.com/)
- Typescript
- Package manager pnpm (https://pnpm.io/)
- Testing framework Jest (https://jestjs.io/)
- git
- MySQL

## Overview

This project demonstrates a basic CRUD application for managing customer records using NestJS. It includes essential CRUD operations and a simple structure to manage data.

### Application Structure

- **AppModule**: Main module that starts the application and imports `CustomersModule`.
  - **CustomersController**: HTTP controller that calls `CustomersService`.
- **CustomersModule**: Module for managing customers.
  - **CustomersService**: Service that handles database operations.

### Endpoints

The application exposes the following HTTP endpoints:

- **DOC /api**: Swagger documentation.
- **GET /api/customers**: List all customers.
- **GET /api/customers/:id**: Get customer details by ID.
- **POST /api/customers**: Create a new customer.
- **PATCH /api/customers/:id**: Update a customer by ID.

### Running the Application

1. **Install dependencies**: Run `pnpm install`.
2. **Start the application**: Run `pnpm run start`.

### Running Tests

To execute tests, run:

```bash
pnpm run test
```

### Bonus Features

- The repository includes multiple commits following [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).
- Environment variables are loaded from a `.env` file using [dotenv](https://www.npmjs.com/package/dotenv).
- `CustomersService` has been pre-filled with random data using [faker](https://github.com/faker-js/faker).
- Tests include mocks for `CustomersController` & `CustomersService`.
- Interactive API documentation is generated from code using [OpenAPI](https://docs.nestjs.com/openapi/introduction).
- Integration with a relational SQL database.
