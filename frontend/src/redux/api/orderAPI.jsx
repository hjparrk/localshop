import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    createOrder: builder.query({
      query: () => ({
        url: "/orders",
        method: "POST",
      }),
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
    }),
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
      }),
    }),
  }),
});

export const {
  useCreateOrderQuery,
  useGetMyOrdersQuery,
  useGetOrderDetailsQuery,
} = orderApi;
