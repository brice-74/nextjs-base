# NextJS Base Front-end

[![Quality Assurance](https://github.com/brice-74/nextjs-base/actions/workflows/qa.yml/badge.svg)](https://github.com/brice-74/nextjs-base/actions/workflows/qa.yml)

This project is a simple front-end application for logging in and watching your active sessions.
It goes hand in hand with an API such as [Golang Base API](https://github.com/brice-74/golang-base-api)

## Requirements

You will need [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed on your machine.

## Usage

:cd: Install depandances:

```bash
npm install
````

#### Development

:point_right: Copy the `.env.example` file in a new `.env.development` file and replace path to the json model.

:runner: Run development application:

```bash
npm run dev
````
#### Production

:point_right: Copy the `.env.example` file in a new `.env.production` file and replace path to the json model.

:hammer: Build production application:

```bash
npm run build
````

:runner: Run production application:

```bash
npm run start
````