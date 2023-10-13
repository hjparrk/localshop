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
        <div className="flex flex-col gap-5">
          {products &&
            products.map((product, i) => {
              return (
                <div key={i}>
                  <h1>{product.name}</h1>
                  <div className="flex flex-row gap-3">
                    <button
                      onClick={() => {
                        navigate(`/admin/products/${product._id}`);
                      }}
                    >
                      update
                    </button>
                    <button
                      onClick={async () => {
                        await deleteProduct(product._id);
                      }}
                    >
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
