import Types from "../types/auth";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL || "https://task-tracker-backend-zzyu.onrender.com";
export const setUser = (user) => {
  return async function (dispatch) {
    dispatch({
      type: Types.SET_USER_DATA_STARTED,
    });
    try {
      const { data } = await axios.post(`${baseUrl}/users/login`, user);
      const userData = { jwtToken: data.jwtToken, ...data.userDetails };
      dispatch({
        type: Types.SET_USER_DATA_SUCCESS,
        payload: {
          user: userData,
        },
      });
    } catch (error) {
      dispatch({
        type: Types.SET_USER_DATA_FAILED,
        payload: {
          error,
        },
      });
    }
  };
};

export const signUpUser = (user) => {
  return async function (dispatch) {
    dispatch({
      type: Types.SIGNUP_STARTED,
    });
    try {
      await axios.post(`${baseUrl}/users`, user);
      dispatch({
        type: Types.SIGNUP_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: Types.SIGNUP_FAILED,
        payload: {
          error,
        },
      });
    }
  };
};

export const logOutUser = () => {
  return async function (dispatch) {
    dispatch({
      type: Types.LOG_OUT_USER,
    });
  };
};
