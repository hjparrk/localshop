import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/api/authAPI";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Loader from "../../components/Layout/Loader";
import BasicLayout from "../../components/Layout/BasicLayout";

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
    <BasicLayout>
      <form onSubmit={submitHandler}>
        <h1>Log In</h1>
        <input type="email" placeholder="email" ref={emailRef} />
        <input type="password" placeholder="password" ref={passwordRef} />
        <button type="submit" className="bg-black">
          <div>Login</div>
        </button>
      </form>
      <Link to="/register">
        <div className="text-blue-700 underline text-center p-2">
          Haven't Registered?
        </div>
      </Link>
    </BasicLayout>
  );
};

export default Login;
