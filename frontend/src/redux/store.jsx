import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import { productApi } from "./api/productAPI";
import { authApi } from "./api/authAPI";
import { cartApi } from "./api/cartAPI";
import { orderApi } from "./api/orderAPI";
import { adminApi } from "./api/adminAPI";

const store = configureStore({
  reducer: {
    auth: userReducer,
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      productApi.middleware,
      authApi.middleware,
      cartApi.middleware,
      orderApi.middleware,
      adminApi.middleware,
    ]),
});

export default store;
