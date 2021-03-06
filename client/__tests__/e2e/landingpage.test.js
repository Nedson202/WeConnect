module.exports = {
  LandingPage: (browser) => {
    browser
      .url('http://localhost:4000')
      .waitForElementVisible('body', 5000)
      .assert.visible('h1')
      .assert.visible('h3')
      .assert.containsText('h1', 'Welcome to WeConnect')
      .assert.containsText('h3', 'Here, we make it easier for you to reach businesses faster')
      .assert.visible('footer')
      .assert.containsText('#explore-button', 'Explore')
      .click('#explore-button')
      .assert.urlEquals('http://localhost:4000/businesses');
    browser.end();
  }
};