//Default export is used when you have one 
// thing or object in your file.... the file 
//will have just one default export

//While export const is used when you have multiple
//things or objects in your file ...The file will have multiple
// export consts

import axios from 'axios';

const setAuthToken = token => {
  if (token) {

    // Apply to every request and the default header to the token
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
