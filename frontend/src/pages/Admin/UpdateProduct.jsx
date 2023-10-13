import { useEffect, useRef } from "react";
import BasicLayout from "../../components/Layout/BasicLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../../redux/api/productAPI";
import Loader from "../../components/Layout/Loader";
import { useUpdateProductMutation } from "../../redux/api/adminAPI";
import toast from "react-hot-toast";

const UpdateProduct = () => {
  const params = useParams();

  const nameRef = useRef();
  const descriptionRef = useRef();
  const brandRef = useRef();
  const priceRef = useRef();
  const categoryRef = useRef();
  const stockRef = useRef();

  const navigate = useNavigate();

  const { data, isLoading } = useGetProductDetailsQuery(params.id);
  const [updateProduct, { isSuccess }] = useUpdateProductMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Product updated");
      navigate("/admin/products");
    }
  }, [isSuccess]);

  if (isLoading) return <Loader />;

  const product = data.product;

  const submitHandler = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const description = descriptionRef.current.value;
    const brand = brandRef.current.value;
    const category = categoryRef.current.value;
    const price = priceRef.current.value;
    const stock = stockRef.current.value;

    const body = {
      name,
      description,
      brand,
      category,
      price,
      stock,
    };

    await updateProduct({ id: params.id, body });
  };

  return (
    <BasicLayout>
      <form className="flex flex-col gap-5" onSubmit={submitHandler}>
        <input
          className="input box"
          type="text"
          placeholder="name"
          defaultValue={product.name}
          ref={nameRef}
          required
        />
        <textarea
          className="input box"
          type="text"
          placeholder="description"
          defaultValue={product.description}
          ref={descriptionRef}
          required
        />
        <input
          className="input box"
          type="text"
          placeholder="brand"
          defaultValue={product.brand}
          ref={brandRef}
          required
        />
        <input
          className="input box"
          type="text"
          placeholder="category"
          defaultValue={product.category}
          ref={categoryRef}
          required
        />
        <input
          className="input box"
          type="number"
          min="0"
          max="10000"
          step="0.01"
          placeholder="price"
          defaultValue={+parseFloat(product.price.$numberDecimal).toFixed(2)}
          ref={priceRef}
          required
        />
        <input
          className="input box"
          type="number"
          placeholder="stock"
          defaultValue={product.stock}
          ref={stockRef}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-lg"
        >
          Update Product
        </button>
      </form>
    </BasicLayout>
  );
};

export default UpdateProduct;
