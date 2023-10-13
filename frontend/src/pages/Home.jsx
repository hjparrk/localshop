import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import BasicLayout from "../components/Layout/BasicLayout";
import { useGetProductsQuery } from "../redux/api/productAPI";
import toast from "react-hot-toast";
import Loader from "../components/Layout/Loader";
import Filter from "../components/home/Filter";

const Home = () => {
  let [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const category = searchParams.get("category");

  const params = { page };
  category !== null && (params.category = category);

  const { data, isLoading, isError, error } = useGetProductsQuery(params);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError]);

  if (isLoading) return <Loader />;

  return (
    <BasicLayout>
      <div>
        <h1>Local Shop</h1>
        <div className="flex flex-row gap-6">
          <Filter />
          <div className="grid grid-cols-4 gap-5">
            {data?.products?.map((product, i) => {
              return (
                <div className="" key={i}>
                  <Link to={`/products/${product._id}`}>
                    <img src={product.image.url} />
                    <h1>{product.name}</h1>
                    <h1>
                      ${+parseFloat(product.price.$numberDecimal).toFixed(2)}
                    </h1>
                    <h1>{product.brand}</h1>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default Home;
