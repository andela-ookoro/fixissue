# Issue Tracker


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


*  Install the app's backend dependencies.Open node.js, naviagte to the directory that contain the application ,then enter the command below:
  `npm install `
* To start the application enter the command below:
  `node.js index.js `
* If the command run  successfully, node.js would display the text below.

  ```
  ----------------------------------------------------------------------
  Issue Tracker running at  http://localhost:1142

  ```

## Description of the Web pages 
* Javasccript files  are in the public/js folder
* CsS files  are in the public/cc folder
* Template files  are in the views folder
The table below showa the routes and thier component
```
    Name          use                                                         js file       template      
    -----------------------------------------------------------------------------------------------------
    signin        Authentication                                              login          sigin
    signout       logout user                                                 
    myqueue       View issue(s) assign to user                                todo           myqueue
    myreport      View issue(s) reported by user                              issuelog       myreport
    opennissue    View open issue(s) reported to admin's department           openissue      openissue
    closeissue    View close issue(s) reported to admin's department          closeissue     closeissue
    profile       View and edit user profile                                  profile        profile
    reportissue   Report a new issue                                          issue          reportissue
    setsession    Start  user setsession
    505           Display error for programm bug                                             505
    404           Display error for wrong routes                                             404
    notify        Send notification to issue owner
  ```



