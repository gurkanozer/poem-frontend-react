export const setConfig = (getState) => {
  //Get token from state
  const token = getState().auth.token;
  //Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  //If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `bearer ${token}`;
  }
  return config;
};
