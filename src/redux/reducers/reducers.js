import { ADMIN, USER } from "../types/types";

const initialState = {
  admin: false,
  token: "",
};

const adminReducer = (state = initialState, action) => {
  if (action.type === ADMIN) {
    return {
      admin: true,
      token: action.payload,
    };
  }
  if (action.type === USER) {
    return {
      admin: false,
      token: "",
    };
  }
  return state;
};

export default adminReducer;
