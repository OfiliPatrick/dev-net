import React, { Component } from 'react';
import FormField from '../components/FormField'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';  
import { connect } from 'react-redux';
import { registerUser } from '../actions/authActions';

class Register extends Component {
  constructor() {
    super();
    // Kept the state in register component because its a form and its data is not needed outside the component
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };

    // you do this inside the constructor function
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard'); // history is a library in react router... it is for programmatic navgation
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    // console.log(e.target.value)
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();


   const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    // console.log(newUser)

    // You pass in history so that you can redirect
    this.props.registerUser(newUser, this.props.history);
  } 



  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevNet account
              </p>
              <form onSubmit={this.onSubmit}>
              <FormField
                 placeholder = "Name"
                 name = "name" 
                 onChange = {this.onChange}
                 error = {errors.email}
                 value = {this.state.name}   
                 />
                 <FormField
                 placeholder = "Email Address"
                 name = "email" 
                 info = "Use a Gravatar email if you want a gravatar"
                 type = "email"
                 onChange = {this.onChange}
                 error = {errors.email}
                 value = {this.state.email}   
                 />
                 <FormField
                 placeholder = "Password"
                 name = "password" 
                 type = "password"
                 onChange = {this.onChange}
                 error = {errors.password}
                 value = {this.state.password}
                 />
                 
                 <FormField
                 placeholder = "Confirm password"
                 name = "password2" 
                 type = "password"
                 onChange = {this.onChange}
                 error = {errors.password2}
                 value = {this.state.password2}
                 />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

// This allows the components to access what ever is in the state as props e.g this.props.auth
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register)); //withRouter gives the register component the ability to redirect the user
// by giving it the this.props.history.push command
