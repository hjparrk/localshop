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
      <div className="flex flex-row gap-20">
        <div className="flex flex-col gap-5">
          {products &&
            products.map((product, i) => {
              return (
                <div key={i}>
                  <img
                    src={product.product.image.url}
                    width={200}
                    height={200}
                  />
                  <h1>{product.product.name}</h1>
                  <div>
                    <label>qty: </label>
                    <input
                      className="w-20"
                      type="number"
                      min="0"
                      step="1"
                      defaultValue={product.quantity}
                      ref={quantityRef}
                    />
                    <button
                      onClick={async () => {
                        const body = {
                          id: product.product._id,
                          quantity: quantityRef.current.value,
                        };
                        await updateCart(body);
                      }}
                    >
                      update
                    </button>
                  </div>
                  <h1>${+parseFloat(product.product.price.$numberDecimal)}</h1>
                </div>
              );
            })}
        </div>
        <div className="flex items-center  gap-5">
          <div className="flex flex-col">
            <h1>Total: ${total_price.toFixed(2)}</h1>
            <button onClick={clearCartHandler}>clear cart</button>
            <button onClick={checkoutHandler}>Checkout</button>
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default Cart;
