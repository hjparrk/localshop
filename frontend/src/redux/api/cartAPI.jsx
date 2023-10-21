import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ["cart"],
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query(body) {
        return {
          url: "/carts",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["cart"],
    }),
    updateCart: builder.mutation({
      query(body) {
        return {
          url: "/carts",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["cart"],
    }),
    getMyCart: builder.query({
      query: () => ({
        url: "/carts",
      }),
      providesTags: ["cart"],
    }),
    clearCart: builder.query({
      query: () => ({
        url: "/carts/clear",
        method: "PUT",
      }),
      invalidatesTags: ["cart"],
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
