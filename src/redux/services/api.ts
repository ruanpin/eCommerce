import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setUserInfo } from '../slices/authSlice';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'https://adered.com/api',
    baseUrl: 'http://localhost:4990',
  }),
  endpoints: (builder) => ({
    login: builder.mutation<
      { token: string; auth: string; useName: string }, // 回應資料型別
      { account: string; password: string } // 傳遞參數型別
    >({
      query: (credentials) => ({
        url: '/test_login',
        method: 'POST',
        body: credentials,
        formData: true, // 使用 form-data 格式
      }),
      async onQueryStarted(credentials, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserInfo(data)); // 登入成功後存入 Redux
        } catch (error) {
          console.error('Login failed:', error);
        }
      },
    }),
  }),
});

export const { useLoginMutation } = api;