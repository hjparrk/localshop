import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  role: null,
};

export const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export default userSlice.reducer;

export const { setUser, setIsAuthenticated, setLoading, setRole } =
  userSlice.actions;
