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
        <table>
          <tr>
            <th>ID</th>
            <td>#{order._id}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>{order.status}</td>
          </tr>
          <tr>
            <th>Placed at</th>
            <td>{order.createdAt.substring(0, 10)}</td>
          </tr>
          <tr>
            <th># of items</th>
            <td>{order.total_quantity}</td>
          </tr>
          <tr>
            <th>Total price</th>
            <td>${+parseFloat(order.total_price.$numberDecimal).toFixed(2)}</td>
          </tr>
          <tr>
            <th>Ordered Items</th>
            <td>
              {order.products.map((product, i) => {
                console.log(product);
                console.log(product.product?.name);
                return (
                  <span key={i}>
                    {product.product !== null ? (
                      <span>{product.product?.name}</span>
                    ) : (
                      <span>Deleted product</span>
                    )}
                    <span>: </span>
                    <span>{product.quantity}</span>
                    <span>, </span>
                  </span>
                );
              })}
            </td>
          </tr>
        </table>
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
