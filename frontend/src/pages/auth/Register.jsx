import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import BasicLayout from "../../components/Layout/BasicLayout";
import { useRegisterMutation } from "../../redux/api/authAPI";
import Loader from "../../components/Layout/Loader";
import toast from "react-hot-toast";

const Register = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  const [register, { data, isLoading, isError, error, isSuccess }] =
    useRegisterMutation();

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success(data.message);
      navigate("/login");
    }
  }, [isSuccess, error]);

  if (isLoading) return <Loader />;

  const submitHandler = async (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const body = {
      name,
      email,
      password,
    };

    await register(body);
  };

  return (
    <BasicLayout>
      <form onSubmit={submitHandler}>
        <h1>Register Form</h1>
        <input type="text" placeholder="name" ref={nameRef} />
        <input type="email" placeholder="email" ref={emailRef} />
        <input type="password" placeholder="password" ref={passwordRef} />
        <button type="submit" className="bg-black">
          <div>Register </div>
        </button>
      </form>
      <Link to="/login">
        <div className="text-blue-700 underline text-center p-2">
          Already Registered?
        </div>
      </Link>
    </BasicLayout>
  );
};

export default Register;
