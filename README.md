[![Build Status](https://travis-ci.org/Nedson202/WeConnect.svg?branch=server)](https://travis-ci.org/Nedson202/WeConnect)
[![Coverage Status](https://coveralls.io/repos/github/Nedson202/WeConnect/badge.svg?branch=api-documentation)](https://coveralls.io/github/Nedson202/WeConnect?branch=api-documentation)
[![Maintainability](https://api.codeclimate.com/v1/badges/6808b37fda49d6be7e63/maintainability)](https://codeclimate.com/github/Nedson202/WeConnect/maintainability)

# WeConnect
WeConnect provides a platform that brings businesses and individuals together. This platform creates awareness for businesses and gives the users the ability to write reviews about the businesses they have interacted with. 

# Table of Contents
1. [Tech stack used](https://github.com/Nedson202/WeConnect#tech-stack-used)
2. [Getting started](https://github.com/Nedson202/WeConnect#getting-started)
3. [API endpoints](https://github.com/Nedson202/WeConnect#api-endpoints)
2. [License](https://github.com/Nedson202/WeConnect#license)

## Tech stack used
Weconnect currently uses [MaterializeCss](https://materializecss.com) for its template coupled with NodeJs/ExpressJs, Postgresql and Sequelize on the back-end. 
The template is currently hosted on github using gh-pages and the API documentation on heroku. See links below
* [View the template live](https://nedson202.github.io/WeConnect/template/index.html)
* [Api documentation](https://weconnect-api-service.herokuapp.com/api-docs)
* [project Tracker Board](https://www.pivotaltracker.com/n/projects/2153373)

## Getting started
To get this project up and running on your local machine is pretty easy. Follow the steps below to complete the setup
* **Install NodeJs:** Skip this step if you already have **NodeJS** installed. For those who don't, you can head to [Download | Node.js](https://nodejs.org/en/download/)

* **Clone this repo:** Open **cmd(command prompt)** for windows users, **terminal** for linux and mac users. 
    
      git clone https://github.com/Nedson202/WeConnect.git

* **Install global packages:** This package is responsible for watching file changes and restarting the app server. In the terminal/cmd run

      npm install -g nodemon

* **Install project dependencies:** Enter the following in your terminal/cmd to change into the directory of the cloned repo and install all app dependencies

      cd WeConnect
      npm install
    
* **Install postman:** Postman is an app used to test api endpoints. Get its chrome extension [here](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en)
    
* **Start the app:** Enter the following in your terminal/cmd to start the app server
    
      npm start
    
* **Run the tests**

      npm test server/test
      
* **Open postman**

      GET http://localhost:4000
      
## API endpoints
      POST localhost:4000/api/v1/auth/signup      [User signup]
      POST localhost:4000/api/v1/auth/login       [User login
      POST localhost:4000/api/v1/businesses       [Register a business]
      GET  localhost:4000/api/v1/businesses       [Get all business]
      GET  localhost:4000/api/v1/businesses/:businessId       [Get a business by its id]
      PUT  localhost:4000/api/v1/businesses/:businessId       [Update a business by its id]        
    DELETE localhost:4000/api/v1/businesses/:businessId       [Delete a business by its id]
      GET  localhost:4000/api/v1/businesses?location=location         [Get a business by location]
      GET  localhost:4000/api/v1/businesses?category=category         [Get a business by category]
      POST localhost:4000/api/v1/businesses/:businessId/reviews       [Post a review for a business]
      GET  localhost:4000/api/v1/businesses/:businessId/reviews       [Get all reviews under a business]
   
   * **Additional notes for api-endpoints:** **:businessId** should be replaced with the Id of the business **1** for instance. The endpoint for location and category, when passed into postman will look thus:
          
          GET  localhost:4000/api/v1/businesses?location=lagos         [Get a business by location]
          GET  localhost:4000/api/v1/businesses?category=sports        [Get a business by category]  
      
## License
The MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
