import { useEffect, useRef, useState } from "react";
import BasicLayout from "../../components/Layout/BasicLayout";
import { DashBoard } from "../../components/admin/DashBoard";
import { useCreateProductMutation } from "../../redux/api/adminAPI";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const NewProduct = () => {
  const nameRef = useRef();
  const descriptionRef = useRef();
  const brandRef = useRef();
  const priceRef = useRef();
  const categoryRef = useRef();
  const stockRef = useRef();
  const [image, setImage] = useState();

  const navigate = useNavigate();

  const [createProduct, { data, isSuccess, isError, error }] =
    useCreateProductMutation();

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      navigate("/");
    }
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, error]);

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const description = descriptionRef.current.value;
    const brand = brandRef.current.value;
    const category = categoryRef.current.value;
    const price = priceRef.current.value;
    const stock = stockRef.current.value;

    const body = new FormData();
    body.append("name", name);
    body.append("description", description);
    body.append("brand", brand);
    body.append("category", category);
    body.append("price", price);
    body.append("stock", stock);
    body.append("image", image);

    await createProduct(body);
  };

  return (
    <BasicLayout>
      <DashBoard>
        <form onSubmit={submitHandler}>
          <h1>Upload New Product</h1>
          <input
            className="input box"
            type="text"
            placeholder="name"
            ref={nameRef}
            required
          />
          <textarea
            className="input box"
            type="text"
            placeholder="description"
            ref={descriptionRef}
            required
          />
          <input
            className="input box"
            type="text"
            placeholder="brand"
            ref={brandRef}
            required
          />
          <input
            className="input box"
            type="text"
            placeholder="category"
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
            ref={priceRef}
            required
          />
          <input
            className="input box"
            type="number"
            placeholder="stock"
            ref={stockRef}
            required
          />
          <input
            className="input"
            type="file"
            placeholder="image"
            onChange={imageHandler}
            accept=".jpg, .jpeg, .png, .webp"
            required
          />
          <button type="submit" className="bg-black">
            <div> Add Product </div>
          </button>
        </form>
      </DashBoard>
    </BasicLayout>
  );
};

export default NewProduct;
