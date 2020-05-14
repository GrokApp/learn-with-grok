import jwtDecode from 'jwt-decode';

export function isLoggedIn() {
  let token = localStorage.getItem('accessToken');
  if (token && token !== 'undefined') {
      let tokenExpiration = jwtDecode(token).exp;
      let dateNow = new Date();

      if (tokenExpiration < dateNow.getTime()/1000) {
          return false;
      } else {
          return true;
      }
  }

  return false;
}
