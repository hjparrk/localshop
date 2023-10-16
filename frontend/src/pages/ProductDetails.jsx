import { useNavigate, useParams } from "react-router-dom";
import BasicLayout from "../components/Layout/BasicLayout";
import { useGetProductDetailsQuery } from "../redux/api/productAPI";
import { useEffect, useState } from "react";
import { useAddToCartMutation } from "../redux/api/cartAPI";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const ProductDetails = () => {
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.auth);

  const { data } = useGetProductDetailsQuery(params.id);
  const [addToCart, { isSuccess }] = useAddToCartMutation();

  const product = data?.product;

  useEffect(() => {
    if (isSuccess) {
      toast.success("Added to Cart");
    }
  }, [isSuccess]);

  const quantityHandler = (e) => {
    e.preventDefault();
    setQuantity(e.target.value);
  };

  const addToCartHandler = async (e) => {
    e.preventDefault();

    const body = {
      id: product._id,
      quantity: quantity,
    };

    await addToCart(body);
    navigate("/");
  };
  return (
    <BasicLayout>
      {product && (
        <div className="product-box full-box">
          <img src={product.image.url} />
          <div>
            <h1 className="font-semibold text-lg">{product.name}</h1>
            <div className="font-semibold">{`${product.category} > ${product.brand}`}</div>
            <div> {product.description}</div>

            <h1 className="text-lg mt-2">
              ${+parseFloat(product.price.$numberDecimal).toFixed(2)}
            </h1>

            <div className="flex gap-2 align-center">
              {role === "user" && (
                <div>
                  <div className="font-semibold text-lg">Quantity: </div>
                </div>
              )}
              {role === "user" && (
                <input
                  type="number"
                  value={quantity}
                  placeholder="quantity"
                  onChange={quantityHandler}
                  className="w-20 text-lg px-1"
                />
              )}
              {role === "user" && (
                <button onClick={addToCartHandler} className="black-btn">
                  Add to Cart:{" "}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </BasicLayout>
  );
};

export default ProductDetails;
