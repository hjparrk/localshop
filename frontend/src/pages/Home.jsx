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
        <h1 className="page-title">Our Products</h1>
        <div className="flex flex-row gap-6">
          <Filter />
          <div className="w-full flex flex-wrap">
            {data?.products?.map((product, i) => {
              return (
                <Link
                  to={`/products/${product._id}`}
                  className="product-box"
                  key={i}>
                  <img src={product.image.url} />

                  <div className="flex justify-between">
                    <h1 className="font-semibold">{product.name}</h1>
                    <h1 className="">
                      ${+parseFloat(product.price.$numberDecimal).toFixed(2)}
                    </h1>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default Home;
