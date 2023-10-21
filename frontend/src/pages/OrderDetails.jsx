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
      <h1 className="page-title">My Order</h1>
      {order && (
        <div>
          <div className="product-bar mx-2">
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
                <td>
                  ${+parseFloat(order.total_price.$numberDecimal).toFixed(2)}
                </td>
              </tr>
            </table>
          </div>
          <div className="page-title">Ordered Items</div>
          <div className="flex flex-wrap">
            {order.products.map((product, i) => {
              return (
                <div key={i} className="product-box">
                  <img src={product.product.image.url} />
                  <h1 classname="font-bold">{product.product.name}</h1>
                  <div className="flex">
                    <span className="">
                      ${+parseFloat(product.product.price.$numberDecimal)}
                    </span>
                    <span className="px-2">{" x "}</span>
                    <span>{product.quantity}</span>
                    <span className="px-2">=</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </BasicLayout>
  );
};

export default OrderDetails;
