import { useEffect } from "react";
import BasicLayout from "../../components/Layout/BasicLayout";
import { useCreateOrderQuery } from "../../redux/api/orderAPI";
import { useLazyClearCartQuery } from "../../redux/api/cartAPI";
import { useNavigate } from "react-router-dom";

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const { isSuccess } = useCreateOrderQuery();
  const [clearCart, { data }] = useLazyClearCartQuery();

  useEffect(() => {
    if (isSuccess) {
      clearCart();
    }
  }, [isSuccess]);

  return (
    <BasicLayout>
      <div className="page-title">Payment Successful</div>
      <button
        className="black-btn"
        onClick={() => {
          navigate("/");
        }}>
        Continue Shopping
      </button>
    </BasicLayout>
  );
};

export default CheckoutSuccess;
