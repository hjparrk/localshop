import { useParams } from "react-router-dom";
import BasicLayout from "../components/Layout/BasicLayout";
import { useGetOrderDetailsQuery } from "../redux/api/orderAPI";
import Loader from "../components/Layout/Loader";

const OrderDetails = () => {
  const params = useParams();

  const { data, isLoading } = useGetOrderDetailsQuery(params.id);

  if (isLoading) return <Loader />;

  const order = data?.order;

  console.log(order);

  return (
    <BasicLayout>
      {order && (
        <div>
          <h1>#{order._id}</h1>
          <h1>order date: {order.createdAt.substring(0, 10)}</h1>
          <h1>Status: {order.status}</h1>
          {order.products.map((product, i) => {
            return (
              <div key={i}>
                <img src={product.product.image.url} width={100} height={100} />
                <h1>{product.product.name}</h1>
                <h1>${+parseFloat(product.product.price.$numberDecimal)}</h1>
              </div>
            );
          })}
          <h1>total qty: {order.total_quantity}</h1>
          <h1>total price: ${+parseFloat(order.total_price.$numberDecimal)}</h1>
        </div>
      )}
    </BasicLayout>
  );
};

export default OrderDetails;
