import React, { Component } from 'react';
import { ToastContainer } from 'react-toastr';
import { connect } from 'react-redux';

let container;
/**
 * @class Flashmessage
 *
 * @extends {Component}
 */
class FlashMessages extends Component {
  /**
 * @description Creates flash messages list.
 *
 * @param {any} nextProps
 *
 * @returns {object} JSX object
 *
 * @memberof FlashMessages
 */
  componentWillReceiveProps(nextProps) {
    const { type, text } = nextProps.messages;

    if (type === 'success') {
      container.success(text);
    }

    if (type === 'error') {
      container.error(text);
    }
  }

  /**
   * @description Renders the component to the dom
   *
   * @returns {object} JSX object
   *
   * @memberof BusinessProfile
   */
  render() {
    return (
      <div className="container">
        <ToastContainer
          ref={ref => container = ref}
          className="toast-top-right"
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  messages: state.flashMessages
});

export default connect(mapStateToProps)(FlashMessages);
