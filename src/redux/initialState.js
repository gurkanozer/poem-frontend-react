export const initialState = {
  poems: [],
  authors: [],
  genres: [],
  messages: {},
  errors: {},
  auth: {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    isLoading: false,
    user: null,
  },
};
