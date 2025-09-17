import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    getUsersRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    getUsersSuccess(state, action) {
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    },
    getUsersFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearError(state) {
      return {
        ...state,
        error: null,
      };
    },
  },
});

const { actions, reducer } = userSlice;

export const {
  getUsersRequest,
  getUsersSuccess,
  getUsersFail,
  clearError,
} = actions;

const frontendUrl = process.env.REACT_APP_FRONTEND_URL;
export const fetchUsers = () => async (dispatch) => {
  try {
    dispatch(getUsersRequest());
    const { data } = await axios.get(`${frontendUrl}/admin/users`); // Replace with your backend endpoint
    dispatch(getUsersSuccess(data.users));
  } catch (error) {
    dispatch(getUsersFail(error.response?.data?.message || "Failed to fetch users"));
  }
};

export default reducer;