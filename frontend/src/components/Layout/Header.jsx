import { Link, useNavigate } from "react-router-dom";
import {
  useGetProfileQuery,
  useLazyLogoutQuery,
} from "../../redux/api/authAPI";
import { useSelector } from "react-redux";
import Loader from "./Loader";

const Header = () => {
  const { isLoading } = useGetProfileQuery();
  const [logout] = useLazyLogoutQuery();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logout();
    navigate(0);
  };

  const { isAuthenticated, role } = useSelector((state) => state.auth);

  if (isLoading) return <Loader />;

  const visitor = !isAuthenticated && role == null;
  const user = isAuthenticated && role === "user";
  const admin = isAuthenticated && role === "admin";

  return (
    <div className="flex flex-row header-nav">
      <div className="flex gap-5 align-center">
        <Link to="/" className="text-xl">
          LocalShop
        </Link>
        {user && <Link to="/cart">Cart</Link>}
        {user && <Link to="/order">Order</Link>}
        {admin && <Link to="/admin/products">Admin</Link>}
      </div>
      {visitor && (
        <div className="flex gap-5">
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </div>
      )}
      {(user || admin) && (
        <Link to="/" onClick={logoutHandler}>
          Logout
        </Link>
      )}
    </div>
  );
};

export default Header;
