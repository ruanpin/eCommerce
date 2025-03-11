import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setUserInfo } from '../slices/authSlice';
import { LoginResponse, UserRegister } from '../authInterfaces'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'https://adered.com/api',
    baseUrl: 'http://localhost:4999/api',
  }),
  endpoints: (builder) => ({
    login: builder.mutation<
      LoginResponse, // 回應資料型別
      { email: string; password: string } // 傳遞參數型別
    >({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserInfo(data)); // 登入成功後存入 Redux
        } catch (error) {
          console.error('Login failed:', error);
        }
      },
    }),
    register: builder.mutation<
      {message: string, status: number},
      UserRegister
    >({
      query: (credentials) => ({
        url: '/auth/register',
        method: 'POST',
        body: credentials,
      })
    })
  }),
});

export const { useLoginMutation, useRegisterMutation } = api;