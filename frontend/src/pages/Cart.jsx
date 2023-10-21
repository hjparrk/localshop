import { useEffect, useRef } from "react";
import BasicLayout from "../components/Layout/BasicLayout";
import Loader from "../components/Layout/Loader";
import {
  useGetMyCartQuery,
  useLazyCheckoutQuery,
  useLazyClearCartQuery,
  useUpdateCartMutation,
} from "../redux/api/cartAPI";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const quantityRef = useRef();
  const { data, isLoading } = useGetMyCartQuery();
  const [updateCart, { isSuccess }] = useUpdateCartMutation();
  const [clearCart] = useLazyClearCartQuery();

  const [checkout] = useLazyCheckoutQuery();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      toast.success("quantity updated");
    }
  }, [isSuccess]);

  if (isLoading) return <Loader />;

  const cart = data?.cart;
  const products = cart?.products;

  let total_price = 0;
  products.forEach((product) => {
    total_price +=
      +parseFloat(product.product.price.$numberDecimal) * product.quantity;
  });

  const clearCartHandler = async () => {
    await clearCart();
    navigate("/");
  };

  const checkoutHandler = async () => {
    const response = await checkout();
    const url = await response.data.url;

    window.location.href = url;
  };

  return (
    <BasicLayout>
      <div className="flex flex-col">
        <h1 className="page-title">My Cart</h1>
        <div className="flex w-full flex-wrap">
          {products &&
            products.map((product, i) => {
              return (
                <div key={i} className="product-box">
                  <img src={product.product.image.url} />
                  <div className="flex justify-between">
                    <h1 className="font-semibold">{product.product.name}</h1>
                    <h1>
                      ${+parseFloat(product.product.price.$numberDecimal)}
                    </h1>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex">
                      <label>Quantity: </label>
                      <input
                        className="ml-2 w-12 bg-black text-white text-center pl-1"
                        type="number"
                        min="0"
                        step="1"
                        defaultValue={product.quantity}
                        ref={quantityRef}
                      />
                      <button
                        className="text-blue-500 px-1 border border-black"
                        onClick={async () => {
                          const body = {
                            id: product.product._id,
                            quantity: quantityRef.current.value,
                          };
                          await updateCart(body);
                        }}>
                        update
                      </button>
                    </div>
                    {/* <button className="text-red-800 border border-black px-1">
                      remove
                    </button> */}
                  </div>
                </div>
              );
            })}
        </div>
        <div className="flex justify-end items-center gap-5 py-1 px-4 border-t border-black">
          <h1>Total: ${total_price.toFixed(2)}</h1>
          <button onClick={clearCartHandler} className="black-btn">
            Clear my cart
          </button>
          <button onClick={checkoutHandler} className="black-btn">
            Move to checkout
          </button>
        </div>
      </div>
    </BasicLayout>
  );
};

export default Cart;
