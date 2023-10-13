import { useNavigate } from "react-router-dom";
import BasicLayout from "../components/Layout/BasicLayout";
import { useGetMyOrdersQuery } from "../redux/api/orderAPI";

const Order = () => {
  const navigate = useNavigate();
  const { data } = useGetMyOrdersQuery();

  const orders = data?.orders;

  return (
    <BasicLayout>
      <div className="flex flex-col gap-5">
        {orders &&
          orders.map((order, i) => {
            return (
              <div key={i}>
                <h1
                  onClick={() => {
                    navigate(`/order/${order._id}`);
                  }}
                >
                  #{order._id}
                </h1>
                <h1>Status: {order.status}</h1>
                <h1>{order.createdAt.substring(0, 10)}</h1>
              </div>
            );
          })}
      </div>
    </BasicLayout>
  );
};

export default Order;
