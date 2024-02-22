const initialState = {
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return action.payload;
    case "LOGGOUT":
      return action.payload;
    default:
      return state;
  }
};
export default userReducer;
