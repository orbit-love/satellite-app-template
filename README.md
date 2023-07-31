# The Orbit Member Directory

## What is it?

This app lets you host a subset of the members in your community and let them share their social profiles & a short bio about themselves. It is ideal for promoting engagement and fostering relationships between members.

![The landing page of the member directory, with Orbit branding.](https://github.com/orbit-love/member-directory/assets/45462299/a1bad632-4437-4aaf-9459-e310e17c04c2)

## Technical Overview

Diagram here...

### Data

[Prisma](https://www.prisma.io/) is used to interface with a Postgres database that exists between the Orbit API and the member directory. This provides control over the data, allowing for manipulation independent of your main data store n Orbit. For example, we've added "bio" and "admin" fields not required by the Orbit application.

Data is fetched from Orbit using the /api/populate-members-table API route. This process fetches members fitting specific criteria (presence of an email and a defined tag in environment variables) and upserts them into Prisma. Members that no longer meet these criteria and still exist in Prisma are removed.

You can review the database schema at prisma/schema.prisma.

helpers/prisma-helpers.js is used for managing interactions with Prisma.

### Authentication

We employ [next-auth](https://next-auth.js.org/) for passwordless authentication management in the directory.

- Customised pages are located under `pages/auth`.
- The custom email template is stored under `helpers/next-auth-helpers.js`.
- Configuration settings are found in `pages/api/auth/[...nextauth].js`. Some significant configuration changes are listed here:

1. Upon a user's sign-in attempt, we first verify their existence in the directory database. This means only listed directory members can access it.

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

Protection for API routes is achieved with higher-order functions defined in `helpers/api-helpers.js`. One such function, `withAuthCheck`, ensures a user is signed in before granting them access to the endpoint. For more details on these, refer to the next section, [API Protection](#api-protection).

### API protection

We utilize higher-order functions to emulate the behavior of Ruby on Rails' `before_action` hooks. To illustrate this, here are two pieces of code that perform similarly:

```
# members_controller.rb

before_action :verify_user_signed_in

def index
  puts "This will only execute if user is signed in"
end

private

def verify_user_signed_in
  # Logic to check user is signed in
end
```

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

In the JavaScript version, the exported handler is enveloped in higher-order functions that operate like before_hooks. If these functions pass, the main request handler is then invoked.

Common validations are stored in `helpers/api-helpers.js` for ease of reuse, such as: "is user signed in?" or "is user an admin?"

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
3. ORBIT_TAG: designates which members in your main Orbit workspace should be tagged to appear in the member directory.
4. ROOT_USER_EMAIL: used to instantiate the initial admin user. This is set via environment variables to prevent misuse upon a new instance deployment.

Fill in these variables appropriately in your `.env` file.

#### For Emails

We use nodemailer and MailHog for email authentication. Install [MailHog](https://github.com/mailhog/MailHog), run the service, and ensure the HTTP server is accessible at [localhost:8025](http://localhost:8025).

If necessary, you can change the email provider configuration in `pages/api/auth/[...nextauth].js` - but just having mailhog running & using the default env vars from the example should be enough to get you up and running.

#### For the Database

The default settings for PostgreSQL are:

1. Host: localhost
2. Port: 5432
3. Username: postgres
4. Password: postgres
5. Database name: member-directory-dev (this can be altered as needed)

Adjust these settings in your `.env` file if your configuration differs.

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

& visit [localhost:3000](http://localhost:3000) to see the directory, and [localhost:8025](http://localhost:8025) to see incoming emails to sign in.

And it's

```
yarn test --watch
```

to run the automated tests in an instance where they hot-reload with changes.

As an admin you should be able to sync members from the UI once you've signed in, which will pull the latest data from Orbit.

## Setting up your own instance

### Branding

Include SEO here
Email colour & styling
Link to PR

### Hosting (Recommended)

Vercel + postgres
Separate DBs staging & prod

## General tips

### Changing the DB structure

Change schema, generate migration. Runs automatically in prod thanks to hook in package.json
