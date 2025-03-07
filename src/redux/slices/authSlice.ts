import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  auth: string | null;
  useName: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  auth: null,
  useName: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<{ token: string; auth: string; useName: string }>) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.auth = action.payload.auth;
      state.useName = action.payload.useName;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.auth = null;
      state.useName = null;
    },
  },
});

export const { setUserInfo, logout } = authSlice.actions;
export default authSlice.reducer;