import BasicLayout from "../../components/Layout/BasicLayout";
import { DashBoard } from "../../components/admin/DashBoard";
import { useGetAllOrdersQuery } from "../../redux/api/adminAPI";
import Loader from "../../components/Layout/Loader";
import OrderItem from "../../components/order/OrderItem";

const ManageOrders = () => {
  const { data, isLoading } = useGetAllOrdersQuery();

  if (isLoading) return <Loader />;

  const orders = data?.orders;

  return (
    <BasicLayout>
      <DashBoard>
        <h1 className="page-title">Manage Orders</h1>
        {orders && (
          <div className="flex flex-col">
            {orders.map((order, i) => {
              return <OrderItem key={i} order={order} />;
            })}
          </div>
        )}
      </DashBoard>
    </BasicLayout>
  );
};

export default ManageOrders;
