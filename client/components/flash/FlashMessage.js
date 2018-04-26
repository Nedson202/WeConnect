import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classcat from 'classcat';

class FlashMessage extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.deleteFlashMessage(this.props.message.id);
  }

  render(){
    setTimeout(function() {
      const btn = document.getElementById('btn-close');
      btn.click();
    }, 3000);

    const { id, type, text } = this.props.message;
    return(
      <div className={classcat(["alert", {
          'alert-success': type === 'success',
          'alert-danger': type === 'error'
        }
        ]
      )}>
        <button onClick={this.onClick} className="close" id='btn-close'><span>&times;</span></button>
        {text}
      </div>
    );
  }
}

FlashMessage.propTypes = {
  message: PropTypes.object.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired
}

export default FlashMessage;
