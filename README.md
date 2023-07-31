# The Orbit Member Directory

## What is it?

This app lets you host a subset of the members in your community and let them share their social profiles & a short bio about themselves. It is ideal for promoting engagement and fostering relationships between members.

![The landing page of the member directory, with Orbit branding.](https://github.com/orbit-love/member-directory/assets/45462299/a1bad632-4437-4aaf-9459-e310e17c04c2)

## Technical Overview

### Data

Prisma, what & why?, syncing from orbit

### Authentication

mailhog, next-auth, how we verify member is in directory, where pages live, how we redirect authneticated/unauthenticated pages

### API protection

Higher-order functions

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
