[![Build Status](https://travis-ci.org/Nedson202/WeConnect.svg?branch=develop)](https://travis-ci.org/Nedson202/WeConnect)
[![Coverage Status](https://coveralls.io/repos/github/Nedson202/WeConnect/badge.svg?branch=develop)](https://coveralls.io/github/Nedson202/WeConnect?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/6808b37fda49d6be7e63/maintainability)](https://codeclimate.com/github/Nedson202/WeConnect/maintainability)

# WeConnect
WeConnect provides a platform that brings businesses and individuals together. This platform creates awareness for businesses and gives the users the ability to write reviews about the businesses they have interacted with. 
It has the following features:

#### Non registered users
* User Signup
* Filter businesses by location, category or name
* View businesses
* View reviews

#### Registered users
* User Signin
* Add business
* Update business
* Delete business
* Review and rate a business
* Edit a review
* Delete a review


# Table of Contents
1. [Technologies](https://github.com/Nedson202/WeConnect#technologies)
2. [Installation Setup](https://github.com/Nedson202/WeConnect#installation-setup)
3. [Api documentation](https://github.com/Nedson202/WeConnect#api-documentation)
4. [Coding style](https://github.com/Nedson202/WeConnect#coding-style)
5. [Dependencies](https://github.com/Nedson202/WeConnect#dependencies)
6. [Language](https://github.com/Nedson202/WeConnect#language)
7. [Author](https://github.com/Nedson202/WeConnect#author)
8. [License](https://github.com/Nedson202/WeConnect#license)


## Technologies
* NodeJs
* Express
* Sequelize
* Postgresql
* React
* Redux

## Installation Setup
Getting this project up and running on your local machine is pretty easy. Follow the steps below to complete the setup
* **Install global packages:** Skip this step if you have **NodeJS and postgresql** installed. For those who don't, you can head to [Node.js](https://nodejs.org/en/download/) and [Postgresql](https://www.postgresql.org/download/) to download.
    
* **Additional setup:** This app uses the dotenv npm package to load environment variables. For more info visit [dotenv](https://www.npmjs.com/package/dotenv). Rename **.env_example** file to **.env**, open the .env file and rename your username and password according to your postgresql setup, you can also rename your jwt secret. Run on your terminal/cmd

      open pgAdmin and create two databases. 
      weconnect-api(for app development) and weconnect_test(for running tests)

* **Clone this repo:** Open **cmd(command prompt)** for windows users, **terminal** for linux and mac users. 
    
      git clone https://github.com/Nedson202/WeConnect.git

* **Install project dependencies:** Enter the following in your terminal/cmd to change into the directory of the cloned repo and install all app dependencies

      change directory to cloned repo (WeConnect)
      npm i
      
* **Start the app:** Enter the following on your terminal/cmd to start the app
    
      npm run start-dev
      
* **Open browser**

      Run http://localhost:4000 on the address bar
      
## Test
 You can use the following to run tests:
* Backend:      `npm run test`
* Frontend:     `npm run test:client`


## Api Documentation
Click [here](https://weconnect-samson.herokuapp.com/api-docs/) to view the api documentation 

## Coding Style
* Airbnb style guide

## Dependencies
Click [here](https://github.com/Nedson202/WeConnect/blob/develop/package.json) to view dependencies

## Language
* Javascript
      
## Author

    NEGEDU SAMSON
      
## License

MIT © Negedu Samson

Licensed under the [MIT LICENSE](https://github.com/Nedson202/WeConnect/blob/develop/LICENSE)
