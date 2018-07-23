const path = require('path');
const { userData } = require('./mock');

module.exports = {
  "Users can login to the app and logout": (browser) => {
    browser
      .url('http://localhost:4000/login')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', userData.username)
      .setValue('input[name=password]', userData.password)
      .click('#submit-button');
  },

  "Users should reveive an error if any field is missing": (browser) => {
    browser
      .url('http://localhost:4000/login')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', ' ')
      .setValue('input[name=password]', userData.password)
      .click('#submit-button')
      .waitForElementVisible('.toast-message', 5000)
      .assert.containsText('.toast-message', 'Username is required')
  },

  "Users can signup on the app": (browser) => {
    browser
      .url('http://localhost:4000/signup')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', userData.username)
      .setValue('input[name=email]', userData.email)
      .setValue('input[name=password]', userData.password)
      .click('#submit-button');
  },

  "Users should reveive an error if any field is missing": (browser) => {
    browser
      .url('http://localhost:4000/signup')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', ' ')
      .setValue('input[name=email]', ' ')
      .setValue('input[name=password]', userData.password)
      .click('#submit-button')
      .waitForElementVisible('.toast-message', 5000)
      .assert.containsText('.toast-message', 'Email cannot be empty or invalid')
  }
}