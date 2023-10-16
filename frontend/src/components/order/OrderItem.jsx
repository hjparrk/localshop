/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { useUpdateOrderMutation } from "../../redux/api/adminAPI";
import toast from "react-hot-toast";

const OrderItem = ({ order }) => {
  const statusRef = useRef();

  const [updateOrder, { isSuccess }] = useUpdateOrderMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("status updated");
    }
  }, [isSuccess]);

  const clickHandler = async (e) => {
    e.preventDefault();

    const body = {
      id: order._id,
      status: statusRef.current.value,
    };
    await updateOrder(body);
  };

  return (
    <div className="product-bar">
      <div>
        <h1>{order._id}</h1>
        <h2>order description</h2>
      </div>
      <div>
        {order && (
          <select defaultValue={`${order.status}`} ref={statusRef}>
            <option value="Processing">Processing</option>
            <option value="Shipping">Shipping</option>
            <option value="Delivered">Delivered</option>
          </select>
        )}

        <button className="my-auto" onClick={clickHandler}>
          update
        </button>
      </div>
    </div>
  );
};

export default OrderItem;
