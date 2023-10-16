import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Register from "./pages/auth/Register.jsx";
import Login from "./pages/auth/Login.jsx";
import { Toaster } from "react-hot-toast";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Order from "./pages/Order.jsx";
import CheckoutFail from "./pages/checkout/CheckoutFail.jsx";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess.jsx";
import OrderDetails from "./pages/OrderDetails.jsx";
import ManageOrders from "./pages/Admin/ManageOrders.jsx";
import ManageProducts from "./pages/Admin/ManageProducts.jsx";
import ManageUsers from "./pages/Admin/ManageUsers.jsx";
import NewProduct from "./pages/Admin/NewProduct.jsx";
import UpdateProduct from "./pages/Admin/UpdateProduct.jsx";

function App() {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  const visitor = !isAuthenticated && role == null;
  const user = isAuthenticated && role === "user";
  const admin = isAuthenticated && role === "admin";

  return (
    <Fragment>
      <Toaster position="top-center" />
      <div className="pages">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          {user && <Route path="/cart" element={<Cart />} />}
          {user && <Route path="/order" element={<Order />} />}
          {user && <Route path="/order/:id" element={<OrderDetails />} />}
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/checkout/*" element={<CheckoutFail />} />
          {admin && (
            <Route path="/admin/products" element={<ManageProducts />} />
          )}
          {admin && (
            <Route path="/admin/products/new" element={<NewProduct />} />
          )}
          {admin && (
            <Route path="/admin/products/:id" element={<UpdateProduct />} />
          )}
          {admin && <Route path="/admin/users" element={<ManageUsers />} />}
          {admin && <Route path="/admin/orders" element={<ManageOrders />} />}
          {visitor && <Route path="/login" element={<Login />} />}
          {visitor && <Route path="/register" element={<Register />} />}
        </Routes>
      </div>
    </Fragment>
  );
}

export default App;
