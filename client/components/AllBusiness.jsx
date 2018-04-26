import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from './Navbar.jsx';
import BusinessList from './BusinessList.jsx';
import Footer from './Footer.jsx';
import { fetchBusinesses } from '../actions/fetchBusinessAction';

class AllBusiness extends Component {
  constructor(props){
    super(props);

    this.state = {
      isLoading: false
    };
  }

  componentWillMount() {
    document.title = 'Business list'
    this.setState({isLoading: true})

    this.props.fetchBusinesses().then(
      () => {
        this.setState({isLoading: false})
      }
    );
  }

  render() {
    const { businesses } = this.props;
    const { isLoading } = this.state;

    if(isLoading) {
      return (
        <div>
          <Navbar />

          <div id="loader"></div>

          <Footer />
        </div>
      );
    }

    return (
      <div>
        <Navbar />

        <BusinessList businesses={businesses}/>

        <Footer />
      </div>
    );
  }
}

AllBusiness.propTypes = {
  businesses: PropTypes.array.isRequired,
  fetchBusinesses: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    businesses: state.businesses
  }
}

export default connect(mapStateToProps, { fetchBusinesses })(AllBusiness);

// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import Navbar from './Navbar.jsx';
// import BusinessList from './BusinessList.jsx';
// import Footer from './Footer.jsx';
// import { fetchBusinesses } from '../actions/fetchBusinessAction';
//
// class AllBusiness extends Component {
//   constructor(props){
//     super(props);
//
//     this.state = {
//       isLoading: false
//     };
//   }
//
//   componentWillMount() {
//     document.title = 'Business list'
//     this.setState({isLoading: true})
//
//     this.props.fetchBusinesses().then(
//       () => {
//         this.setState({isLoading: false})
//       }
//     );
//   }
//
//   render() {
//     const { businesses } = this.props;
//     const { isLoading } = this.state;
//
//     if(isLoading) {
//       return (
//         <div>
//           <Navbar />
//
//           <div id="loader"></div>
//
//           <Footer />
//         </div>
//       );
//     }
//
//     return (
//       <div>
//         <Navbar />
//
//         <BusinessList businesses={businesses}/>
//
//         <Footer />
//       </div>
//     );
//   }
// }
//
// AllBusiness.propTypes = {
//   businesses: PropTypes.array.isRequired,
//   fetchBusinesses: PropTypes.func.isRequired,
// }
//
// function mapStateToProps(state) {
//   return {
//     businesses: state.businesses
//   }
// }
//
// export default connect(mapStateToProps, { fetchBusinesses })(AllBusiness);
