import React, { Component } from 'react';
import Main from './Main';

/**
 * @class App
 *
 * @extends {Component}
 */
class App extends Component {
  /**
   * @description Set page document title   *
   * @returns {undefined}
   *
   * @memberof App
   */
  componentDidMount() {
    document.title = 'Welcome to WeConnect';
  }

  /**
   * @description Renders the component to the dom
   *
   * @returns {object} JSX object
   *
   * @memberof App
   */
  render() {
    return (
      <div>
        <div id="background-image" />
        <Main />
      </div>
    );
  }
}

export default App;
