import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from './services/api'; // 這是 RTK Query 的 API slice
import authReducer from './slices/authSlice.ts';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer, // 註冊 RTK Query reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware), // 添加 RTK Query 的 middleware
});

// 啟用 RTK Query 的自動 refetch 機制（focus, reconnect 時自動更新）
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;