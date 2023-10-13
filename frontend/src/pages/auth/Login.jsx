import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/api/authAPI";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Loader from "../../components/Layout/Loader";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  const [login, { data, isLoading, isError, error, isSuccess }] =
    useLoginMutation();

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success(data.message);
      navigate("/");
    }
  }, [isSuccess, error]);

  if (isLoading) return <Loader />;

  const submitHandler = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const body = {
      email,
      password,
    };

    await login(body);
  };

  return (
    <div>
      <form className="flex flex-col gap-3" onSubmit={submitHandler}>
        <div>
          <label>Email</label>
          <input type="email" placeholder="email" ref={emailRef} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" placeholder="password" ref={passwordRef} />
        </div>
        <div className="flex flex-col gap-5 items-start">
          <button type="submit">Login</button>
          <Link to="/register">{"haven't registered?"}</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
