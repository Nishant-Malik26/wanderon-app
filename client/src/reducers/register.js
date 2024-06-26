import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setAlertWithRemove } from "./removeAlert";
import Cookies from "js-cookie";

const initialState = {
  isAuthenticated: false,
  loading: true,
  user: null,
};

const Auth = createSlice({
  name: "register",
  initialState,
  reducers: {
    registerSuccess: (state, action) => {
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
    },
    loginSuccess: (state, action) => {
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
    },
    registerFail: (state, action) => {
      Cookies.remove("token");
      return { ...state,  isAuthenticated: false, loading: false };
    },
    loginFail: (state, action) => {
      Cookies.remove("token");
      return { ...state,  isAuthenticated: false, loading: false };
    },
    userLoaded: (state, action) => {
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    },
    authError: (state, action) => {
      Cookies.remove("token");
      return { ...state,  isAuthenticated: false, loading: false };
    },
  },
});

export default Auth.reducer;

export const {
  registerSuccess,
  registerFail,
  userLoaded,
  authError,
  loginSuccess,
  loginFail,
} = Auth.actions;

export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ name, email, password });
    try {
      const res = await axios.post("/api/users", body, config);
      dispatch(registerSuccess(res.data));
      dispatch(loadUser());
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((element) => {
          dispatch(
            setAlertWithRemove({ msg: element.msg, alertType: "danger" })
          );
        });
      }

      dispatch(registerFail());
    }
  };

export const loadUser = () => async (dispatch) => {
  if (Cookies.get("token")) {
    try {
      const res = await axios.get("/api/auth");
      dispatch(userLoaded(res?.data));
    } catch (error) {
      dispatch(authError());
    }
  }
};

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ email, password });
    try {
      const res = await axios.post("/api/auth", body, config);
      dispatch(loginSuccess(res.data));
      dispatch(loadUser());
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((element) => {
          dispatch(
            setAlertWithRemove({ msg: element.msg, alertType: "danger" })
          );
        });
      }

      dispatch(loginFail());
    }
  };

export const logout = () => (dispatch) => {
  Cookies.remove("token");
  dispatch(loginFail());
};
