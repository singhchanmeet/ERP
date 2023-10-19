//not in use as of 17 october 2023
export const isAuthenticated = () => {
    // Replace this with your authentication logic
    return localStorage.getItem('token') !== null;
  };
  
  export const login = () => {
    // Replace this with your login logic
    localStorage.setItem('token', 'yourAuthTokenHere');
  };
  
  export const logout = () => {
    // Replace this with your logout logic
    localStorage.removeItem('token');
  };