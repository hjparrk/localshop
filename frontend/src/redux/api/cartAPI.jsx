import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query(body) {
        return {
          url: "/carts",
          method: "POST",
          body,
        };
      },
    }),
    updateCart: builder.mutation({
      query(body) {
        return {
          url: "/carts",
          method: "PUT",
          body,
        };
      },
    }),
    getMyCart: builder.query({
      query: () => ({
        url: "/carts",
      }),
    }),
    clearCart: builder.query({
      query: () => ({
        url: "/carts/clear",
        method: "PUT",
      }),
    }),
    checkout: builder.query({
      query: () => ({
        url: "/carts/checkout",
      }),
    }),
  }),
});

export const {
  useAddToCartMutation,
  useUpdateCartMutation,
  useGetMyCartQuery,
  useLazyCheckoutQuery,
  useLazyClearCartQuery,
} = cartApi;
