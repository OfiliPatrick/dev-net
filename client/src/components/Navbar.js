// Allows to use class navbar extends component instead of class navbar extends ...it also allows to use just the tools needed 
// for the react component instead of the whole react source code. This helps us to achieve smaller bundling during depolyment
// The curly braces after the import (named export) means you want to import something specific that has the name link from the 'react' module
// The normal way would be import component from 'react' (default export) but then component could have been anything , a function, object ,variable anything with
//another value instead of the actual component variable we need
import React, { Component } from 'react'; 
import { Link } from 'react-router-dom'; // to provide links to stuff...basically an anchor tag with an href

// proptypes allow us to manage the props of an application that has a lot of child componenents. Its a dictionary that shows and validates the kind of props the comp needs
import PropTypes from 'prop-types'; // props is how a parent components communicates with its child component...how it passes data to it

import { connect } from 'react-redux'; //To connect the react component to the redux 
import { logoutUser } from '../actions/authActions';
import {clearCurrentProfile} from  '../actions/profileActions'

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault(); // this prevents the event from carrying out its default action, instead use our custom logoutuser action.
    this.props.clearCurrentProfile()
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    // if user is logged in
    const authLinks = (
      <ul className="navbar-nav ml-auto">
         <li className="nav-item">
          <Link className="nav-link" to="/feed">
            Post Feed
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <a
            href="/"
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: '25px', marginRight: '5px' }}
              title="You must have a Gravatar connected to your email to display an image"
            />{' '}
            Logout
          </a>
        </li>
      </ul>
    );

    //if user is logged out
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            DevNet
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  {' '}
                  Developers
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}


Navbar.propTypes = { //Proptypes is an object showing the props navbar will need and in what form
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};


//This is a function that returns in the form of an object or function the data that the connected component needs from the store everytime the store updates.
const mapStateToProps = state => ({
  auth: state.auth
});

//to actually connect the component to redux 
export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(Navbar);
