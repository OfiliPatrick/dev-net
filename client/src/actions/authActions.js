import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode'; // To decode jwt tokens that are in base 64 encoded

//Actions are the only source of information to your store
import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Register User
//dispatch is from redux-thunk
//dispatch is a fuction of the redux store
//dispatch is the next keyword after the first arrow function ...it is the only way to change state.54
export const registerUser = (userData, history) => dispatch => {
  // axios takes in an endpoint an object.
  console.log(userData)
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      //dispatch takes in objects as arguments
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post('api/users/login', userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // local storage is a browser API that allows a browser to save data in the browser.
      // Set token to ls
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
