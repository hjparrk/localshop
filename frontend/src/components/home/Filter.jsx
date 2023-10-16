import { useNavigate, useSearchParams } from "react-router-dom";

const product_categories = [
  "Electronics",
  "Cameras",
  "Food",
  "Books",
  "Sports",
  "Outdoor",
  "Home",
];

const Filter = () => {
  const navigation = useNavigate();
  let [searchParams] = useSearchParams();

  const clickHandler = (checkbox) => {
    const categories = document.getElementsByName(checkbox.name);

    categories.forEach((category) => {
      if (category !== checkbox) {
        category.checked = false;
      }
    });

    if (checkbox.checked === false) {
      if (searchParams.has(checkbox.name)) {
        searchParams.delete(checkbox.name);
        const path =
          window.location.pathname + "?" + `${searchParams.toString()}`;
        navigation(path);
      }
    } else {
      if (searchParams.has(checkbox.name)) {
        searchParams.set(checkbox.name, checkbox.value);
      } else {
        searchParams.append(checkbox.name, checkbox.value);
      }
      const path =
        window.location.pathname + "?" + `${searchParams.toString()}`;
      navigation(path);
    }
  };

  const defaultCheckHandler = (category) => {
    const value = searchParams.get("category");
    if (category === value) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="flex flex-col p-2 gap-2 w-[200px] h-[100%] bg-gray-100">
      <h1 className="text-lg">Filter</h1>
      <hr className="h-0.5 bg-gray-400" />
      <div className="flex flex-col gap-1">
        {product_categories?.map((category) => {
          return (
            <div className="flex flex-row gap-1 text-sm" key={category}>
              <input
                type="checkbox"
                name="category"
                value={category}
                defaultChecked={defaultCheckHandler(category)}
                onClick={(e) => clickHandler(e.target)}
              />
              <label>{category}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Filter;
