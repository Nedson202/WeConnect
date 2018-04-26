import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classcat from 'classcat';
import '../../index.css';

class ReviewModal extends Component {

  constructor(props){
    super(props);

    this.state = {
      message: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    if (!!this.state.errors[e.target.name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[e.target.name];
      this.setState({
        [e.target.name]: e.target.value.toLowerCase(),
        errors
      });
    }
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    this.setState({ errors: {} });
    e.preventDefault();
      this.props.reviewRequest(this.props.params.id, this.state).then(
        () => {
          this.props.addFlashMessage({
            type: 'success',
            message: 'Review posted successfully'
          });
          document.getElementById('close').click();
        },
        (error) => this.setState({ errors: error.response.data, isLoading: false }),
      );
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
          <button type="button" class="btn btn-outline-success" data-toggle="modal"
            id="permission-button" data-target="#exampleModalCenter">
            Add  a review
          </button>

          <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">Add review</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                    <form action="submit" onSubmit={this.onSubmit}>
                      <div className={classcat(["form-group",
                         { "has-error": errors.message }
                       ])}>
                        <label for="control-label" id="control-label">Message</label>
                        <input
                          value={this.state.message}
                          onChange={this.onChange}
                          type="text"
                          name="message"
                          className="form-control"
                          id="control-label" placeholder="review"/>
                        {errors && <span className="help-block">{errors.message}</span>}
                        <p>Not logged in?
                        <Link to="/login">login </Link>to continue</p>
                      </div>
                    </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-outline-success" onClick={this.onSubmit}>Save changes</button>
                </div>
              </div>
            </div>
          </div>


      </div>
    );
  }
}

export default ReviewModal;

// <p>
//   <button class="btn btn-outline-success" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
//     Add review
//   </button>
// </p>
// <div className="collapse col-lg-8 offset-lg-l2" id="collapseExample">
//   <form action="submit" onSubmit={this.onSubmit}>
//     <div className={classcat(["form-group",
//        { "has-error": errors.message }
//      ])}>
//       <label for="control-label" id="control-label">Message</label>
//       <input
//         value={this.state.message}
//         onChange={this.onChange}
//         type="text"
//         name="message"
//         className="form-control"
//         id="control-label" placeholder="review" required/>
//       {errors && <span className="help-block">{errors.message}</span>}
//     </div>
//     <button type="submit" className="btn btn-outline-success" id="submit-button">Submit review</button>
//   </form>
// </div>
