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
        <div className="flex flex-row gap-5">
          <img src={product.image.url} />
          <div className="flex flex-col gap-5">
            <h1>{product.name}</h1>
            <h1>{product.description}</h1>
            <h1>{product.brand}</h1>
            <h1>{product.category}</h1>
            <h1>${+parseFloat(product.price.$numberDecimal).toFixed(2)}</h1>
            {role === "user" && (
              <input
                type="number"
                value={quantity}
                placeholder="quantity"
                onChange={quantityHandler}
              />
            )}
            {role === "user" && (
              <button onClick={addToCartHandler}>Add to Cart</button>
            )}
          </div>
        </div>
      )}
    </BasicLayout>
  );
};

export default ProductDetails;
