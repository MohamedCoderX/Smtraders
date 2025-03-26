import axios from "axios";
import {
  clearError,
  forgotPasswordFail,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  loadUserFail,
  loadUserRequest,
  loadUserSuccess,
  loginFail,
  loginRequest,
  loginSucess,
  logoutFail,
  logoutSuccess,
  registerFail,
  registerRequest,
  registerSuccess,
  resetPasswordFail,
  resetPasswordRequest,
  resetPasswordSuccess,
} from "../slices/authslice";

// Load environment variable
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// ✅ LOGIN
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const { data } = await axios.post(`${API_BASE_URL}/login`, { email, password }, { withCredentials: true });
    dispatch(loginSucess(data));
  } catch (error) {
    dispatch(loginFail(error.response?.data?.message || "Login failed"));
  }
};

// ✅ REGISTER
export const register = (userData) => async (dispatch) => {
  try {
    dispatch(registerRequest());
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(`${API_BASE_URL}/register`, userData, config);
    dispatch(registerSuccess(data));
  } catch (error) {
    dispatch(registerFail(error.response?.data?.message || "Registration failed"));
  }
};

// ✅ LOAD USER
export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());
    const { data } = await axios.get(`${API_BASE_URL}/myprofile`, { withCredentials: true });
    dispatch(loadUserSuccess(data));
  } catch (error) {
    dispatch(loadUserFail(error.response?.data?.message || "Failed to load user"));
  }
};

// ✅ LOGOUT
export const logout = () => async (dispatch) => {
  try {
    await axios.get(`${API_BASE_URL}/logout`, { withCredentials: true });
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFail(error.response?.data?.message || "Logout failed"));
  }
};

// ✅ FORGOT PASSWORD
export const forgotPassword = (formData) => async (dispatch) => {
  try {
    dispatch(forgotPasswordRequest());
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(`${API_BASE_URL}/password/forgot`, formData, config);
    dispatch(forgotPasswordSuccess(data));
  } catch (error) {
    dispatch(forgotPasswordFail(error.response?.data?.message || "Forgot password failed"));
  }
};

// ✅ RESET PASSWORD
export const resetPassword = (formData, token) => async (dispatch) => {
  try {
    dispatch(resetPasswordRequest());
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(`${API_BASE_URL}/password/reset/${token}`, formData, config);
    dispatch(resetPasswordSuccess(data));
  } catch (error) {
    dispatch(resetPasswordFail(error.response?.data?.message || "Reset password failed"));
  }
};

// ✅ CLEAR AUTH ERROR
export const clearAuthError = (dispatch) => {
  dispatch(clearError());
};
