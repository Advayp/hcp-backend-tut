# HCP Backend

## Setup

The main things to setup are Postgres and migrating your schema to the one defined by this project. Everything else is pretty standard stuff for a NodeJS project.

First, clone the repo:

1. `git clone https://github.com/Advayp/hcp-backend-tut.git`

Install all dependencies:

2. `npm install --legacy-peer-deps`

### Setting up Postgres

Download _Postgres_ from [this link](https://www.postgresql.org/). Make sure to download version 16, since that's the one that works with our version of Prisma. I'd also recommend downloading _pgAdmin_ from [this link](https://www.pgadmin.org/). This makes it easy to create/manage databases.

1. Create a database either through _pgAdmin_ or the _Postgres_ command line (_pgAdmin_ is way easier)
2. Prisma requires a connection string to establish a link to our database. Use the following format to determine your connection string:

```python
"postgresql://[username]:[password]@localhost:[port]/[db-name]?schema=public"
```

3. Create a `.env` file in the root of the github repo with the following information, where `CONNECTION_STRING` is the formatted string from the previous part.

```
DATABASE_URL=CONNECTION_STRING
```

### Setting up Prisma and Migrating

If all the dependencies were installed correctly, you should have access to Prisma's command line tool. To make sure, run `npx prisma`. If there's an error, refer to [Prisma's docs](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/introduction).

Assuming there's no error, you should be able to migrate. To migrate, run:

```
npx prisma migrate dev
```

## Overview

### Creating Endpoints and Working With Routes

We're using NextJS 13 and its functionality to make a Rest API. You can learn about this by looking at the `src/app/api/` folder or by reading Next's [documentation](https://nextjs.org/docs/app/building-your-application/routing/route-handlers).

To play around with the routes currently implemented, run `npm run dev`, which should start the server on port 3000. Then, you can make requests to the following routes (all relative to `localhost:3000`):

<center>

**All Routes and Required Data**
| Route | Method | Data |
| ------------ | ------ | ------------------------------- |
| `/api/hello` | POST | `{info: string}` |
| `/api/test` | GET | N/A |
| `/api/user` | GET | N/A |
| `/api/user` | POST | `{email: string, name: string}` |

</center>

I'd highly recommend creating your own routes to make sure you understand how Next works and to get a better feel for things!

### Prisma

Prisma has two main components to learn:

1. Defining the schema (includes creating fields, tables, and relationships between tables). To learn about this, you can either look at what's implemented in this project or visit [the official docs](https://prisma.io/docs/orm/prisma-schema). I'd also recommend downloading Prisma's extension for Visual Studio Code (if you're using it)
2. Working with Prisma's Javascript client. You can learn about it by again either looking at this project or [the docs](https://www.prisma.io/docs/orm/prisma-client).

### Unit Testing

To get familiar with this, I'd recommend creating your own routes and writing tests for them. You can look at some of the examples I've written and follow along.

There's one main thing to note about how testing with Prisma is done. Instead of making actual calls to the database (which is slow and inconsistent), we mock the client's output to make sure our code is working efficiently.

We do something similar with NextJS, where we just artifically create requests and pass those into our request handlers.

Again, I'd recommend looking at my examples and trying to write your own simple tests.

If needed, here's some more information about testing with Jest, NextJS, and Prisma:

- [Jest Documentation](https://archive.jestjs.io/docs/en/22.x/getting-started.html)
- [Prisma's Testing Documentation](https://www.prisma.io/docs/orm/prisma-client/testing/unit-testing) (we'll be using the singleton pattern, not dependency injection)
- [Testing with NextJS and Jest](https://nextjs.org/docs/pages/building-your-application/testing/jest)
- [Specific Examples of Testing with Next, Prisma, and Jest](https://dev.to/dforrunner/unit-test-nextjs-13-app-router-api-routes-with-jest-and-react-testing-library-with-examples-including-prisma-example-367a)

Make sure to put all your tests in files ending in `.test.ts`. Also, each file header should have the `@jest-environment node` comment to ensure our tests are done in the appropriate context.

## Project Structure and Workflow

<center>

**Relevant Folders and Purpose**
| Folder Name | Role |
| ----------- | ---- |
| `src/app/api` | Houses all the routes for our API |
| `src/__test__` | Stores the singleton necessary for mocking function calls with Prisma |
| `src/lib` | Initializes and exports the Prisma client necessary for interacting with our Postgres database
| `prisma` | Stores the schema for our database and migrations

</center>

### Workflow

Here's what the backend workflow might look like when working with these technologies.

1. Updating the database and migrating (if necessary)
2. Creating a route in `src/app/api` and defining several route handlers.
3. Writing tests for each of those function handlers
4. Push to team repository.
