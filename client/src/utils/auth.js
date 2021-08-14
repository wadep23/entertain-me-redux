import decode from "jwt-decode";

class AuthData {
  // Grab data saved in token
  getUserData() {
    // Checks to see if there is a saved token and if it is valid
    const token = this.retrieveToken();

    // Using type coersion to check if token is not undefined and is not expired
    return !!token && !this.isTokenExpired(token);
  }

  // check if token is expired
  isTokenExpired(token) {
    try {
      const decodedToken = decode(token);
      if (decodedToken.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  // get token from local storage
  retrieveToken() {
    return localStorage.getItem("user_token");
  }

  // Set token to localStorage
  login(userToken) {
    localStorage.setItem("user_token", userToken);
    window.location.assign("/");
  }

  // Clears token and logouts
  logout() {
    localStorage.removeItem("user_token");
    window.location.assign("/");
  }
}

export default new AuthData();
