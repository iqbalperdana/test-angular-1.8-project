# test-angular-1.8-project

This repo is to test development with legacy AngularJS 1.8.x. The main functionality is to display a list of projects with pagination, search, and filter by company and area.

## Assumptions

- The response wrapped in data object and there will be pagination object if the request is paginated.
- Eventhough there are pagination options on client, we will also open to the unpaginated data from server in the event of report generation.
- Due to filter by company and area, there will be API to get the list of companies and areas.

## Design choices

- The server is built with NestJS and TypeORM. NestJS has built-in support for TypeScript and TypeORM. It has also opinionated structure which makes it easier to build the API. It has also built in validation and error handling.
- The client is built with AngularJS 1.8.x as it represents the legacy system that we are trying to test. We use webpack to bundle the assets and run the server.
- Search and filter will be case insensitive and trigger by button click because we want to avoid multiple requests if the filter values not yet ready.
- Search keyword is case insensitive to make it easier for user to search.
- All API endpoints will return the data wrapped in data object and there will be pagination object if the request is paginated.

## Tradeoffs

- The requirement stated to make pagination optional. However, the client side will always use pagination by default. For report generation, we may ignore the pagination settings as report generation might run during off-peak hours.
- The client side will only fetch once during page initialization for available companies and areas to simplify the implementation. For production, we may want to refresh the data periodically to ensure that all available filter values are up to date.

## Server

The server is built with NestJS and TypeORM. It uses SQLite as the database.

To run the server, you need to have Node.js installed.
Copy the `.env.example` to `.env` and fill in the values if any changes required.

Then, you can run the following commands:

```bash
npm install
npm run start
```

### Error handling

Since all parameters are optional, we will not throw error if any of the parameters are missing. We will just ignore them.

However for parameter checking, we use class-validator to validate the parameters.

```typescript
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;
```

The error response will follow standard nestjs error response.

```json
{
  "statusCode": 400,
  "message": [
    "page must be an integer number",
    "page must be greater than or equal to 1"
  ],
  "error": "Bad Request"
}
```

## Client

The client is built with AngularJS 1.8.x. It uses the server API to fetch the data. The client utilize webpack to bundle the assets and run the server.

To run the client, you need to have Node.js installed.
Change the values in `app/app.constants.ts` if any changes required.

Then, you can run the following commands:

```bash
npm install
npm run start
```

## Main Endpoints

- GET /api/projects
  Fetches a list of projects with pagination, search, and filter by company and area.

```json
{
  "data": [
    {
      "projectName": "Project 1",
      "projectStart": "2022-01-01",
      "projectEnd": "2022-01-02",
      "company": "Company 1",
      "description": "Description 1",
      "projectValue": 100,
      "area": "Area 1"
    }
  ],
  "pagination": {
    "total": 1,
    "page": 1,
    "perPage": 10,
    "totalPages": 1
  }
}
```

- GET /api/projects/areas
  Fetches a list of areas.

```json
{
  "data": ["Area 1", "Area 2", "Area 3"]
}
```

- GET /api/companies
  Fetches a list of companies.

```json
{
  "data": ["Company 1", "Company 2", "Company 3"]
}
```
