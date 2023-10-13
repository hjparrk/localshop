import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ["product", "order", "user"],
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => ({
        url: "/products/all",
      }),
      providesTags: ["product"],
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: "/orders/all",
      }),
      providesTags: ["order"],
    }),
    updateOrder: builder.mutation({
      query({ id, status }) {
        const body = { status };
        return {
          url: `/orders/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["order"],
    }),
    deleteProduct: builder.mutation({
      query(id) {
        return {
          url: `/products/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["product"],
    }),
    createProduct: builder.mutation({
      query(body) {
        return {
          url: `/products`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["product"],
    }),
    updateProduct: builder.mutation({
      query({ id, body }) {
        console.log(id);
        console.log(body);
        return {
          url: `/products/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["product"],
    }),
    getUsers: builder.query({
      query: () => ({
        url: "/users",
      }),
      providesTags: ["user"],
    }),
    deleteUser: builder.mutation({
      query(id) {
        return {
          url: `/users/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
  useDeleteProductMutation,
  useCreateProductMutation,
  useUpdateProductMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
} = adminApi;
