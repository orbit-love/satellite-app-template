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

## Running locally

### Database setup

Creating pg db, syncing it with prisma, generating new prisma client
Link to docs

### Emails

Mailhog, verifying mailhog running, viewing server

### Env vars

Copy example, fill in

### Running the server

"for future instances you won't have to worry about this"
Tests

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
