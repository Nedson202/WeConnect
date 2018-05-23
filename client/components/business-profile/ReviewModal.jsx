import React, { Component } from 'react';
import classcat from 'classcat';
import '../../index.scss';

/**
 * @class ReviewModal
 * 
 * @extends {Component}
 */
class ReviewModal extends Component {
  /**
   * @description Creates an instance of ReviewModal.
   * 
   * @param {object} props 
   * 
   * @memberof Profile
   */
  constructor(props){
    super(props);

    this.state = {
      message: '',
      image: "",
      errors: {},
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @description Fetch reviews and business
   * 
   * @param {any} event
   * 
   * @returns {undefined}
   * 
   * @memberof ReviewModal
   */
  onChange(event) {
    if (this.state.errors[event.target.name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[event.target.name];
      this.setState({
        [event.target.name]: event.target.value.toLowerCase(),
        errors
      });
    }
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @description Fetch reviews and business
   * 
   * @param {any} event
   * 
   * @returns {undefined}
   * 
   * @memberof ReviewModal
   */
  onSubmit(event) {
    this.setState({ errors: {}, isLoading: true });
    event.preventDefault();
    this.props.reviewRequest(this.props.params.id, this.state).then(
      () => {
        this.props.addFlashMessage({
          type: 'success',
          message: 'Review posted successfully'
        });
        document.getElementById('close-btn').click();
        this.setState({ message: '', isLoading: false });
      },
      (error) => this.setState({ errors: error.response.data, isLoading: false })
    );
  }

  /**
   * @description Renders the component to the dom
   * 
   * @returns {object} JSX object
   * 
   * @memberof ReviewModal
   */
  render() {
    const { errors, isLoading } = this.state;

    return (
      <div>
        <button
          type="button"
          className="btn btn-outline-success"
          id="permission-button"
          data-toggle="modal"
          data-target="#exampleModalCenter"
        >
          Add  a review
        </button>

        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Add review</h5>
                <button className="close" data-dismiss="modal" aria-label="Close" id="close-btn">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form action="submit" onSubmit={this.onSubmit}>
                  <div className={classcat(["form-group",
                         { "has-error": errors.message }
                       ])}
                  >
                    <label id="control-label">Message</label>
                    <textarea 
                      value={this.state.message}
                      onChange={this.onChange}
                      type="text"
                      name="message"
                      className="form-control"
                      id="control-label"
                      placeholder="Add review"
                      rows="3" 
                    />
                    {errors && <span className="help-block">{errors.message}</span>}
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  disabled={isLoading}
                  type="button"
                  className="btn btn-outline-success"
                  onClick={this.onSubmit}
                >
                  {isLoading ? <span>posting...</span> : <span>post review</span>}
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default ReviewModal;
