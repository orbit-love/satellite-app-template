# Creating new satellite apps

- [Creating new satellite apps](#creating-new-satellite-apps)
  - [What is this?](#what-is-this)
- [Local Setup](#local-setup)
  - [Environment Variables](#environment-variables)
    - [For Orbit](#for-orbit)
    - [For Emails](#for-emails)
    - [For the Database](#for-the-database)
    - [For next-auth](#for-next-auth)
  - [Initial data](#initial-data)
  - [Running the server, logging in](#running-the-server-logging-in)
- [Technical Overview](#technical-overview)
  - [Data](#data)
  - [Authentication](#authentication)
    - [Securing Frontend Pages](#securing-frontend-pages)
    - [Securing API Endpoints](#securing-api-endpoints)
  - [API protection](#api-protection)
- [Setting up your own instance](#setting-up-your-own-instance)
  - [Branding](#branding)
    - [Update brand colours](#update-brand-colours)
    - [Update brand images](#update-brand-images)
  - [Update SEO](#update-seo)
  - [Hosting (Recommended)](#hosting-recommended)
- [General tips](#general-tips)
  - [Changing the DB structure](#changing-the-db-structure)

## What is this?

This is a template repo to let you quickly scaffold new satellite apps. By default it has:

1. Passwordless authentication with next-auth
2. A database that stores member names, emails, avatars, and an "admin" flag
3. An API route to instantiate the first admin method
4. An API route and admin-only button to fetch members from Orbit
5. Basic SEO (which will need to be updated!)
6. Testing frameworks set up, with `react-testing-library` for component tests & `jest` for everything else

![The login page of this app, with a call to action to update the template text](https://github.com/orbit-love/member-directory/assets/45462299/6478ba94-0a17-4e50-a06e-2902bcac127c)

## Local Setup

To ensure a smooth development experience, a few elements need to be set up:

### Environment Variables

You can create an environment variables file from the provided example file using the following command:

```
cp .env.example .env
```

And we'll go through each key section with additional context & any required setup now:

#### For Orbit

Four environment variables are needed to connect to your Orbit workspace:

1. API_KEY: the user or workspace-scope API key for fetching data from Orbit.
2. WORKSPACE_SLUG: identifies which workspace to source data from.
3. ROOT_USER_EMAIL: used to instantiate the initial admin user. This is set via environment variables to prevent misuse upon a new instance deployment.

Fill in these variables appropriately in your `.env` file.

#### For Emails

We use nodemailer and MailHog for email authentication. Install [MailHog](https://github.com/mailhog/MailHog), run the service, and ensure the HTTP server is accessible at [localhost:8025](http://localhost:8025).

If necessary, you can change the email provider configuration in [pages/api/auth/[...nextauth].js](https://github.com/orbit-love/member-directory/blob/main/pages/api/auth/%5B...nextauth%5D.js) - but just having mailhog running & using the default env vars from the example should be enough to get you up and running.

#### For the Database

The default settings for PostgreSQL are:

1. Host: localhost
2. Port: 5432
3. Username: postgres
4. Password: postgres
5. Database name: member-directory-dev (this can be altered as needed)

Adjust these settings if your configuration differs.

With this information, you can populate the environment variable as guided. This example would be:

```
POSTGRES_PRISMA_URL=postgresql://postgres:postgres@localhost:5432/member-directory-dev?schema=public
```

And now to set up the database, execute these commands:

```
npx prisma db push
npx prisma generate
```

#### For next-auth

Set the Next-Auth configuration variables in your `.env` file. The secret can be any random string, and the URL should point to your local server (http://localhost:3000).

This should be all you need to run the app and receive emails, but you still won't be able to sign in without any data. So...

### Initial data

There is a convenient API route for initialising your first admin user.

Send a POST request to `localhost:3000/api/initialise-admin-member`. If it responds with a 200 OK & a created member object, you're all set to log in & move on to the next step.

### Running the server, logging in

Right, I feel like that was a lot 😪 But don't worry, that's all one-time setup. From now-on you should be clear to just:

```
yarn dev
```

& visit [localhost:3000](http://localhost:3000) to see the template, and [localhost:8025](http://localhost:8025) to see incoming emails to sign in.

And it's

```
yarn test --watch
```

to run the automated tests in an instance where they hot-reload with changes.

As an admin you should be able to sync members from the UI once you've signed in, which will pull the latest data from Orbit.

## Technical Overview

![](https://github.com/orbit-love/member-directory/assets/45462299/d288df3a-7bc3-445c-93aa-87e6967379d3)

### Data

[Prisma](https://www.prisma.io/) is used to interface with a Postgres database that exists between the Orbit API and the member directory. This provides control over the data, allowing for manipulation independent of your main data store in Orbit. For example, we've added an "admin" field not required by the Orbit application.

Data is fetched from Orbit using the `/api/populate-members-table` API endpoint. This will sync the Prisma database with members from Orbit if they have an email, which is required for them to sign in.

You can review the database schema at [prisma/schema.prisma](https://github.com/orbit-love/member-directory/blob/main/prisma/schema.prisma).

[helpers/prisma-helpers.js](https://github.com/orbit-love/member-directory/blob/main/helpers/prisma-helpers.js) is used for managing interactions with Prisma.

### Authentication

We use [next-auth](https://next-auth.js.org/) for passwordless authentication management.

- Customised pages are located under [pages/auth](https://github.com/orbit-love/member-directory/tree/main/pages/auth).
- The custom email template is stored under [helpers/next-auth-helpers.js](https://github.com/orbit-love/member-directory/blob/main/helpers/next-auth-helpers.js).
- Configuration settings are found in [pages/api/auth/[...nextauth].js](https://github.com/orbit-love/member-directory/blob/main/pages/api/auth/%5B...nextauth%5D.js). Some significant configuration changes are listed here:

1. When users try to sign-in, we first verify their existence in the Prisma database. This means only listed members can access it.

2. If a user **not** listed in the directory tries to sign in, we redirect them to the "Verify Request" page, not the error page. This prevents exposing which email addresses are in the directory. The check is repeated on the frontend, with the following code block from the authentication error page:

```
# pages/auth/error.js

if (error === "AccessDenied") {
router.replace("/auth/verify-request");
}
```

3. Once a user signs in, we set the "admin" flag in the session object based on their admin status in the database. This allows us to modify the UI based on whether a member is an admin or not.

#### Securing Frontend Pages

The app has two layouts: LayoutAuthenticated and LayoutUnauthenticated. All pages utilize one of these layouts. Both have a hook that runs on load, fetching the current session and performing the appropriate redirection:

- Unauthenticated users attempting to access a protected page are redirected to the login page.
- Authenticated users trying to access an unauthenticated page are redirected to the full directory.

#### Securing API Endpoints

Protection for API routes is achieved with higher-order functions defined in [helpers/api-helpers.js](https://github.com/orbit-love/member-directory/blob/main/helpers/api-helpers.js). One such function, `withAuthCheck`, ensures a user is signed in before granting them access to the endpoint. For more details on these, refer to the next section, [API Protection](#api-protection).

### API protection

We utilise higher-order functions to perform common API protections - these are inspired by Ruby on Rails `before_action` hooks, if you are familiar. Here is a sample API route with a "withAuthCheck" protection to illustrate how the pieces work together:

```
# members.js

async function handle(req, res) {
  // Do something
}

const withAuthCheck = async () => {
  return async (req, res) => {
    // Logic to check user is signed in

    // If the check passed, call the actual handler
    return handler(req, res);
  };
}

export default withAuthCheck(withMethodCheck(handle));
```

`handle`, the main logic of the endpoint, is enveloped in higher-order functions that operate like before_hooks. If these functions pass, the main request handler is then invoked.

Common validations are stored in [helpers/api-helpers.js](https://github.com/orbit-love/member-directory/blob/main/helpers/api-helpers.js) for ease of reuse, such as: "is user signed in?" or "is user an admin?"

## Setting up your own instance

### Branding

We aim to keep this app flexible, and require minimal changes to switch over the branding.

#### Update brand colours

You can update the brand colors in the [tailwind.config.js](https://github.com/orbit-love/member-directory/blob/main/tailwind.config.js#L30) file by modifying these variables:

```
accent: "#6C4DF6"
"accent-highlight": "#5B41CF"
dark: "#1E2124"
"dark-highlight": "#3A4045"
light: "#FFFFFF"
"light-highlight": "#D3D6DA"
```

Each color variable is documented in the same file for ease of reference.

**Important** You will also need to copy-paste the "accent" value into the brandColor variable in helpers/next-auth-helpers.js. This will be used to colour the button in the email templates.

### Update brand images

Replace the following three images to the [public/](https://github.com/orbit-love/member-directory/tree/main/public) directory:

1. `brand-icon-dark.svg`, which will be shown in the header bar on light theme screens
2. `brand-icon-light.svg`, which will be shown in the header bar on dark theme screens
3. `brand-logo-background.png`, which will be show in SEO metadata when you share links to your directory & will be used as a favicon.

### Update SEO

All SEO for the app is configured using `next-seo`, and lives under [next-seo.config.js](https://github.com/orbit-love/member-directory/blob/main/next-seo.config.js). This is heavily based on a specific customer, so make sure you double-check everything here to reflect your organisation instead.

The `brand-logo-background` image is referenced twice here, but it **must be an absolute URL**. You can achieve this by uploading it to a location that provides a URL for fetching the image in the future (such as a Cloudinary instance), or by referencing it from the production run of this app, e.g., `www.my-member-directory.com/brand-logo-background.png`. Just remember, this URL won't be valid until the image is uploaded to production.

### Hosting (Recommended)

We have used Vercel to host the app due to it's [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) plugin - obviously this aligns very nicely with our infrastructure, where we need a lightweight DB to sit between the directory & Orbit.

It makes hosting the directory a breeze. You'll need to create the new Vercel project & set up certain env vars like we did in [Environment Variables](#environment-variables), with two differences:

1. You'll need to bring in mailer env vars from the mailer host of your choice instead of mailhog
2. You can completely ignore the postgres env vars, as Vercel will provide those for us :)

There is a very convenient [Quickstart Guide](https://vercel.com/docs/storage/vercel-postgres/quickstart) for Vercel Postgres, which I won't bother repeating here. But I would recommend setting up separate instances for production & staging, and you won't need one for development since we're using the database on your machine which will be much faster.

## General tips

### Changing the DB structure

To change the database structure, for example if you want to add a new field to members, you must... Change the database structure :P You update the [schema.prisma](https://github.com/orbit-love/member-directory/blob/main/prisma/schema.prisma) file & then it will generate migrations for you, rather than the other way around.

Say you add the following to the members table:

```
// prisma/schema.prisma

// ...

model Member {
  id    Int     @id @default(autoincrement())
  // ...
  testAccount Boolean @default(false)
}

// ...
```

You then run:

```
npx prisma migrate dev # this will prompt you for a name for the migration
npx prisma generate
```

And the change will apply to your development DB!

Changes are applied automatically in staging & production environments thanks to the following line in the package.json:

```
"vercel-build": "prisma generate && prisma migrate deploy && next build"
```
