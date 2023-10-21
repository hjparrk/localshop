import { useNavigate } from "react-router-dom";
import BasicLayout from "../components/Layout/BasicLayout";
import { useGetMyOrdersQuery } from "../redux/api/orderAPI";
const Order = () => {
  const navigate = useNavigate();
  const { data } = useGetMyOrdersQuery();

  const orders = data?.orders;

  return (
    <BasicLayout>
      <h1 className="page-title">My Orders</h1>
      {orders &&
        orders.map((order, i) => {
          return (
            <div key={i} className="product-bar">
              <div>
                <h1
                  onClick={() => {
                    navigate(`/order/${order._id}`);
                  }}
                  className="font-semibold underline">
                  #{order._id}
                </h1>
                <h1>Status: {order.status}</h1>
              </div>
              <div>
                <h1 className="text-end">{order.createdAt.substring(0, 10)}</h1>
                <h1 className="text-end">
                  ${+parseFloat(order.total_price.$numberDecimal)}
                </h1>
              </div>
            </div>
          );
        })}
    </BasicLayout>
  );
};

export default Order;
