import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginResponse } from '../authInterfaces'
import LocalStorageHelper from '@/utils/localStorageHelper';

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  name: string | null;
  email: string | null;
  nextRoutePath: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  name: null,
  email: null,

  nextRoutePath: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserLoginStatus_fromLocalStorage: (state) => {
      const userLoginStatus = LocalStorageHelper.get<any>("userLoginStatus")
      if (!userLoginStatus) return
      const {
        isAuthenticated,
        token,
        name,
        email
      } = userLoginStatus

      state.isAuthenticated = isAuthenticated ?? false;
      state.token = token ?? null;
      state.name = name ?? null;
      state.email = email ?? null;
    },
    setUserInfo: (state, action: PayloadAction<LoginResponse>) => {
      state.isAuthenticated = true;
      state.token = action.payload.token ?? null;
      state.name = action.payload.user?.name ?? null;
      state.email = action.payload.user?.email ?? null;

      const params = {
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        name: state.name,
        email: state.email
      }
      LocalStorageHelper.set("userLoginStatus", params)
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.name = null;
      state.email = null
      state.nextRoutePath = null

      LocalStorageHelper.remove("userLoginStatus")
    },
    setNextRoutePath: (state, action: PayloadAction<string | null>) => {
      state.nextRoutePath = action.payload
    }
  },
});

export const { setUserLoginStatus_fromLocalStorage, setUserInfo, logout, setNextRoutePath } = authSlice.actions;
export default authSlice.reducer;