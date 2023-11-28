import Types from "../types/auth";
import Cookies from "js-cookie";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const AuthReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case Types.SET_USER_DATA_STARTED:
    case Types.SIGNUP_STARTED:
      return {
        ...state,
        loading: true,
      };
    case Types.SET_USER_DATA_SUCCESS:
      Cookies.set("user", payload.user);
      return {
        ...state,
        user: payload.user,
        loading: false,
      };
    case Types.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case Types.SET_USER_DATA_FAILED:
    case Types.SIGNUP_FAILED:
      return {
        ...state,
        loading: false,
        error: payload.error,
      };
    case Types.LOG_OUT_USER: {
      Cookies.remove("user");
      return {
        ...state,
        user: null,
      };
    }
    default:
      return state;
  }
};

export default AuthReducer;
