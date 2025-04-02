import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { deepParseJson } from 'deep-parse-json';
import { setUserInfo } from '../slices/authSlice';
import { LoginResponse, UserRegister, UserDetails } from '../authInterfaces'
import { Product, CartItem } from '../goodsInterfaces'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4999/api',
    prepareHeaders: (headers, { getState, endpoint }) => {
      const state = getState() as { auth: { token: string | null } };
      const token = state.auth.token;

      if (endpoint === 'login' || endpoint === 'register') {
        return headers;
      }

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
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
    }),
    getUserDetails: builder.query<
      {message: string, data: UserDetails, status: number},
      void
    >({
      query: () => '/auth/userInfo'
    }),
    updateUserDetails: builder.mutation<
      {message: string, status: number},
      {name: string, phone: string}
    >({
      query: (credentials) => ({
        url: '/auth/userInfo',
        method: 'PUT',
        body: credentials,
      })
    }),
    searchGoodsList: builder.query<
      { message: string, data: Product[], status: number, total:  number },
      { page: number; pageSize: number; keyword: string }
    >({
      query: ({ keyword, page, pageSize }) => `/products/search?keyword=${keyword}&page=${page}&pageSize=${pageSize}`,
      transformResponse: (response: any) => {
        try {
          const parsedData = deepParseJson(response);
          parsedData.data.forEach((e: Product) => {
            if (e.variants.length) {
              e.showPrice = e.variants[0].price
            }
          })
          return parsedData;
        } catch (error) {
          console.error('Error parsing JSON:', error);
          return response;
        }
      },
    }),
    searchSpecificGood: builder.query<
      { message: string, data: Product, status: number },
      { product_id: string | undefined }
    >({
      query: ({ product_id }) => `/products/${product_id}`,
      transformResponse: (response: any) => {
        try {
          const parsedData = deepParseJson(response);
          if (Array.isArray(parsedData?.data?.variants) && parsedData?.data?.variants?.length) {
            parsedData.data.showPrice = parsedData.data.variants[0].price
          }
          return parsedData;

        } catch (error) {
          console.error('Error parsing JSON:', error);
          return response;
        }
      },
    }),
    addToCart: builder.mutation<
      { message: string, status: number, cartItemId?: number},
      { productId: number, quantity: number, color: string, size: string }
    >({
      query: (credentials) => ({
        url: '/cart/add',
        method: 'POST',
        body: credentials,
      })
    }),
    searchCart_Member: builder.query<
      { message: string, data: CartItem[], status: number, totalAmount: number },
      { page?: number, pageSize?: number }
    >({
      query: ({ page, pageSize }) => `/cart/cart?${page && `page=${page}`}${page && `&pageSize=${pageSize}`}`,
      transformResponse: (response: any) => {
        try {
          const parsedData = deepParseJson(response);
          // if (Array.isArray(parsedData?.data?.variants) && parsedData?.data?.variants?.length) {
          //   parsedData.data.showPrice = parsedData.data.variants[0].price
          // }
          return parsedData;

        } catch (error) {
          console.error('Error parsing JSON:', error);
          return response;
        }
      },
    }),
    changeItemFromCart_member: builder.mutation<
      { message: string, status: number },
      { id: number, quantity?: number, checked?: number }
    >({
      query: (credentials) => ({
        url: '/cart/update',
        method: 'PUT',
        body: credentials,
      }),
    }),
    deleteProductFromCart_member: builder.mutation<
      { message: string, status: number },
      { cartItem_id: number }
    >({
      query: ({ cartItem_id }) => ({
        url: `/cart/remove/${cartItem_id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLazyGetUserDetailsQuery,
  useUpdateUserDetailsMutation,
  useLazySearchGoodsListQuery,
  useSearchSpecificGoodQuery,
  useAddToCartMutation,
  useLazySearchCart_MemberQuery,
  useChangeItemFromCart_memberMutation,
  useDeleteProductFromCart_memberMutation,
} = api;