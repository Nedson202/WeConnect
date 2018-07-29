const { userData, businessData } = require('./mock');

module.exports = {
  'Users can signup on the app': (browser) => {
    browser
      .url('http://localhost:4000/signup')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', userData.username)
      .setValue('input[name=email]', userData.email)
      .setValue('input[name=password]', userData.password)
      .click('#submit-button')
      .pause(2000)
      .assert.urlEquals('http://localhost:4000/dashboard')
      .waitForElementVisible('body', 5000)
      .assert.visible('div')
      .assert.visible('h3');
  },

  'Users should receive an error if any field is missing': (browser) => {
    browser
      .url('http://localhost:4000/signup')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', ' ')
      .setValue('input[name=email]', ' ')
      .setValue('input[name=password]', userData.password)
      .click('#submit-button')
      .waitForElementVisible('.toast-message', 5000)
      .assert.containsText('.toast-message', 'Email cannot be empty or invalid');
  },

  'Users should receive an error if any field is missing during login': (browser) => {
    browser
      .url('http://localhost:4000/login')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', ' ')
      .setValue('input[name=password]', userData.password)
      .click('#submit-button')
      .waitForElementVisible('.toast-message', 5000)
      .assert.containsText('.toast-message', 'Username is required');
  },

  'Users can login to the app and logout': (browser) => {
    browser
      .url('http://localhost:4000/login')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', userData.username)
      .setValue('input[name=password]', userData.password)
      .click('#submit-button')
      .pause(2000)
      .assert.urlEquals('http://localhost:4000/dashboard')
      .waitForElementVisible('#navbar-button', 5000)
      .click('#navbar-button');
  },

  'Users can register a business': (browser) => {
    browser
      .url('http://localhost:4000/registerbusiness')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=name]', businessData.name)
      .setValue('input[name=email]', businessData.email)
      .setValue('input[name=address]', businessData.address)
      .setValue('select[name=category]', 'tech')
      .setValue('select[name=location]', 'lagos')
      .setValue('textarea[name=description]', businessData.description)
      .click('#submit-button')
      .pause(2000)
      .assert.urlEquals('http://localhost:4000/dashboard');
  },

  'Users can filter business': (browser) => {
    browser
      .url('http://localhost:4000/dashboard')
      .waitForElementVisible('.form-inline', 5000)
      .setValue('input[name=query]', 'abuja')
      .setValue('select[name=option]', 'category')
      .click('#search-button')
      .pause(2000);
  },

  'Users cannot filter business without option and query': (browser) => {
    browser
      .url('http://localhost:4000/dashboard')
      .waitForElementVisible('.form-inline', 5000)
      .setValue('input[name=query]', '')
      .setValue('select[name=option]', '')
      .click('#search-button');
  },

  'Users can view business profile': (browser) => {
    browser
      .url('http://localhost:4000/profile/1')
      .waitForElementVisible('body', 5000)
      .assert.visible('div')
      .assert.visible('ul')
      .assert.visible('li')
      .assert.visible('span');
  },

  'Business owner can delete business': (browser) => {
    browser
      .url('http://localhost:4000/profile/1')
      .waitForElementVisible('body', 5000)
      .assert.visible('.btn-danger')
      .click('.btn-danger')
      .pause(2000)
      // .waitForElementVisible('.modal', 5000)
      .assert.visible('#delete-button')
      .click('#delete-button')
      .pause(5000)
      .assert.urlEquals('http://localhost:4000/dashboard')
      .waitForElementVisible('.toast-message', 5000)
      .assert.containsText('.toast-message', 'Business deleted successfully')
      .end();
  }
};