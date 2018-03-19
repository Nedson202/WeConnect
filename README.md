[![Build Status](https://travis-ci.org/Nedson202/WeConnect.svg?branch=server)](https://travis-ci.org/Nedson202/WeConnect)
[![Coverage Status](https://coveralls.io/repos/github/Nedson202/WeConnect/badge.svg?branch=api-documentation)](https://coveralls.io/github/Nedson202/WeConnect?branch=api-documentation)
[![Maintainability](https://api.codeclimate.com/v1/badges/6808b37fda49d6be7e63/maintainability)](https://codeclimate.com/github/Nedson202/WeConnect/maintainability)

# WeConnect
WeConnect provides a platform that brings businesses and individuals together. This platform creates awareness for businesses and gives the users the ability to write reviews about the businesses they have interacted with. 

## How the server works

NB: currently this api uses dummy in-memory data to carry out actions on API endpoints

### List of available endpoints are as follows
* api/v1/auth/signup  
**Responsible for signing up user ---- POST request**
* api/v1/auth/login   
**Responsible for login user into the application ---- POST request**
* api/v1/businesses  
**This route is responsible for business registration ---- POST request**
* api/v1/businesses  
**This route gets all registered business ---- GET request**
* api/v1/businesses/:businessId
**Endpoint to get a business by its Id ---- DELETE request**
* api/v1/businesses/:businessId
 **Endpoint to update a business by its Id ---- DELETE request**
* api/v1/businesses/:businessId
**Endpoint to delete a business by its Id ---- DELETE request**
* api/v1/businesses/:businessId/reviews/
**Endpoint to post a review under a business ---- POST request**
* api/v1/businesses/:businessId/reviews/
**Endpoint to get all reviews under a business ---- GET request**
* api/v1/businesses?location=location
**Endpoint to get businesses by location**
* api/v1/businesses?location=location
**Endpoint to get businesses by location**

### Getting started
    Do git clone https://github.com/Nedson202/WeConnect.git
    cd WeConnect/server && npm install --- to install all app dependencies
    npm start --- to start the app
    
    To run the tests,
    npm test
    
    To test the api endpoints, you need to have postman installed to perform all actions
    All the api endpoints is listed above.
    
    Example:
    GET  localhost:4000/api/v1/businesses
