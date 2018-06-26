import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
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
      rating: 0,
      errors: {},
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onStarClick = this.onStarClick.bind(this);
  }
  /**
   * @description Fetch reviews and business
   *
   * @param {any} event
   *
   * @param {any} rating
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
   * @param {any} nextValue
   *
   * @param {any} prevValue
   *
   * @param {any} name
   *
   * @returns {undefined}
   *
   * @memberof ReviewModal
   */
  onStarClick(nextValue) {
    this.setState({rating: nextValue});
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
        this.props.fetchReviews(this.props.params.id);
        this.props.fetchBusinessById(this.props.params.id);
        this.props.addFlashMessage({
          type: 'success',
          text: 'Review posted successfully'
        })
        document.getElementById('close-me').click();
        this.setState({ message: '', rating: 0, isLoading: false });
      },
      (err) => {
        this.setState({ errors: err.response.data, isLoading: false });
        if(err.response.data) {
          this.state.errors.map(error => {
            this.props.addFlashMessage({
              type: 'error',
              text: error
            })
          })
        }
      }
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
    const { isLoading, rating } = this.state;

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
                <button className="close" data-dismiss="modal" aria-label="Close" id="close-me">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
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
                </div>
                <StarRatingComponent
                  name="rate1"
                  starCount={5}
                  value={rating}
                  onStarClick={this.onStarClick}
                />
              </div>
              <div className="modal-footer">
                <button
                  disabled={isLoading}
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
