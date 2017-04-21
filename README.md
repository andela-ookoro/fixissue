# Issue Tracker

[![Build Status](https://travis-ci.org/andela-lkabui/checkpoint4.svg?branch=develop)](https://travis-ci.org/andela-lkabui/checkpoint4)
[![Coverage Status](https://coveralls.io/repos/github/andela-lkabui/checkpoint4/badge.svg?branch=develop)](https://coveralls.io/github/andela-lkabui/checkpoint4?branch=develop)
[![Code Issues](https://www.quantifiedcode.com/api/v1/project/54a4decaa92b4d2483d7a1c3c42f79c0/badge.svg)](https://www.quantifiedcode.com/app/project/54a4decaa92b4d2483d7a1c3c42f79c0)

## Introduction
*  **`Issue Tracker`** is a node Powered Issue resolving web Application.
*  It has the following features;
  * User signup via  email or third party authentication; Facebook,Git,Twitter,Google
  * Login via email or third party authentication; Facebook,Git,Twitter,Google
  * Enable user raise a issue called ticket
  * An admin can assign issue to staff in the same department
  * An admin can close or reopen an issue ticket
  * A user would be notified via mail or SMS
  * An admin can view open and close issue
*  Click [here](https://issuetrackerh20.herokuapp.com/) to access the app on Heroku

## Dependencies

### Back End Dependencies
*  This app's functionality depends on multiple node packages including;
  *  **[body-parser](https://www.npmjs.com/package/body-parser)** - This framework is used to read request data from client.
  *  **[Express](https://expressjs.com/)** - This is the framework that serves route and manage the entire routing system
  *  **[Express3-handlebars](https://www.npmjs.com/package/express3-handlebars)** - This is the template engine used in the application.
  *  **[Firebase](https://firebase.google.com/)** - This is the remote database system used to store data.
  *  **[Jusibeb](https://jusibe.com/)** - This is an api used to send SMS.
  *  **[Nodemailer](https://nodemailer.com/)** - This package provides mailing feature.

## Front End Dependencies
*  **[BootStrap](https://www.bootstrapcdn.com/)** - The styling template engine used

## Installation and setup
*  Navigate to a directory of choice on `terminal`.
*  Clone this repository on that directory.
  *  Using SSH;

    >`git clone git@github.com:celelstine/bc-20-issuetrackersystem.git`

  *  Using HTTP;

    >`https://github.com/celelstine/bc-20-issuetrackersystem.git`


*  Install the app's backend dependencies.On node enter.
  *  `npm install `

