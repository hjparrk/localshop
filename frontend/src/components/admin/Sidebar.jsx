import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex gap-4 border-b border-black rounded-md py-2">
      <Link to="/admin/products">Manage Products</Link>
      <Link to="/admin/products/new">New Product</Link>
      <Link to="/admin/users">Manage Users</Link>
      <Link to="/admin/orders">Manage Orders</Link>
    </div>
  );
};

export default Sidebar;
