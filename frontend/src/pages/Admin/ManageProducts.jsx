import BasicLayout from "../../components/Layout/BasicLayout";
import { DashBoard } from "../../components/admin/DashBoard";
import {
  useGetAllProductsQuery,
  useDeleteProductMutation,
} from "../../redux/api/adminAPI";
import { useNavigate } from "react-router-dom";

const ManageProducts = () => {
  const { data } = useGetAllProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const navigate = useNavigate();

  const products = data?.products;

  return (
    <BasicLayout>
      <DashBoard>
        <h1 className="page-title">Manage Products</h1>
        <div className="flex flex-col">
          <div></div>
          {products &&
            products.map((product, i) => {
              return (
                <div key={i} className="product-bar">
                  <div className="product-detail">
                    <h1>{product.name}</h1>
                    <h2>{product.description}</h2>
                  </div>
                  <div className="my-auto ">
                    <button
                      onClick={() => {
                        navigate(`/admin/products/${product._id}`);
                      }}
                      className="mr-2">
                      update
                    </button>
                    <button
                      onClick={async () => {
                        await deleteProduct(product._id);
                      }}>
                      delete
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </DashBoard>
    </BasicLayout>
  );
};

export default ManageProducts;
