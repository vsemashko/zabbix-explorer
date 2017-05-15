# ZabbixExplorer

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.2.

##Quick start

run `npm i` to download all required dependencies for client and backend project.
Backend project is located in /backend folder

To run backend you need to configure conf.json file in root of backend folder, with url to mongo db, 
secret key and mailgun configuration for sending mails. 
Example config file is located in `backend/config/config_example.json` file 

To prepare database run `npm run init-db`. It will execute `backend/createDb.js` 
script that will create initial data in configured mongo db. 

## Development server

Run `npm run server` for a backend node server. It will start backend server on port 3001 by default

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
