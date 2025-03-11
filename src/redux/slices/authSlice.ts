import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginResponse } from '../authInterfaces'

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  auth: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  auth: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<LoginResponse>) => {
      state.isAuthenticated = true;
      state.token = action.payload.token ?? null;
      state.auth = action.payload.user?.name ?? null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.auth = null;
    },
  },
});

export const { setUserInfo, logout } = authSlice.actions;
export default authSlice.reducer;