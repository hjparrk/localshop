import { useRef } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

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

    console.log(body);
  };

  return (
    <div>
      <form className="flex flex-col gap-3" onSubmit={submitHandler}>
        <div>
          <label>Name</label>
          <input type="text" placeholder="name" ref={nameRef} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" placeholder="email" ref={emailRef} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" placeholder="password" ref={passwordRef} />
        </div>
        <div className="flex flex-col gap-5 items-start">
          <button type="submit">Register</button>
          <Link to="/login">{"already registered?"}</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
