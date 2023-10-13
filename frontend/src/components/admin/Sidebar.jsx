import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex flex-col gap-10 border-2 rounded-md">
      <Link to="/admin/products">Manage Products</Link>
      <Link to="/admin/products/new">New Product</Link>
      <Link to="/admin/users">Manage Users</Link>
      <Link to="/admin/orders">Manage Orders</Link>
    </div>
  );
};

export default Sidebar;
