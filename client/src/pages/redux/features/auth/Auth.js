import React, { useEffect, useRef, useState } from "react";
import { useLoginMutation, useRegisterMutation } from "./authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useNavigate } from "react-router-dom";
import Input from "../../../../components/inputs/Input";

const Auth = () => {
  const navigate = useNavigate();

  const errorRef = useRef();
  const [userForm, setUserForm] = useState({
    user: "",
    pwd: "",
  });
  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [register, { isLoading: isRegistering }] = useRegisterMutation();

  useEffect(() => {
    setError("");
  }, [userForm.pwd, userForm.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //validate
    if (!userForm.user || !userForm.pwd) {
      setError("Please fill in all fields");
      return;
    }
    let userData;
    try {
      if (isRegistered) {
        userData = await register(userForm).unwrap();
      } else {
        userData = await login(userForm).unwrap();
      }

      dispatch(setCredentials({ ...userData, user: userForm.user }));
      setUserForm({ user: "", pwd: "" });
      navigate("/redux/rtk");

      console.log(userData);
    } catch (err) {
      if (!err?.originalStatus) {
        // isLoading: true until timeout occurs
        setError("No Server Response");
      } else if (err.originalStatus === 400) {
        setError("Missing Username or Password");
      } else if (err.originalStatus === 401) {
        setError("Unauthorized");
      } else {
        setError("Auth Failed");
      }
      errorRef.current.focus();
    }
  };
  const handleChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-indigo-100">
      <form className="w-full md:w-1/3 rounded-lg" onSubmit={handleSubmit}>
        <div className="flex font-bold justify-center mt-6">
          <img className="h-24 w-24 mb-3" src="/images/react.png" />
        </div>
        <h2 className="text-2xl text-center text-gray-500 mb-8">
          {isRegistered ? "Register" : "Login"}
        </h2>
        <div className="px-12 pb-10">
          <div className="w-full mb-2">
            <Input
              name="user"
              value={userForm.user}
              onChange={handleChange}
              placeholder={`${
                isRegistered ? "Email" : "Test: admin@example.com"
              }`}
              label="Username"
              type="email"
            />
          </div>
          <div className="w-full mb-2">
            <Input
              name="pwd"
              value={userForm.pwd}
              onChange={handleChange}
              placeholder={`${isRegistered ? "Password" : "Test: 123456"}`}
              label="Password"
              type="password"
            />
          </div>
          <p
            className="underline text-right cursor-pointer"
            onClick={() => setIsRegistered(!isRegistered)}
          >
            {isRegistered ? "Login" : "Register"}
          </p>
          <p
            ref={errorRef}
            className={`${
              error ? "text-red-400 " : "text-green-400"
            } text-center text-small`}
            aria-live="assertive"
          >
            {error}
          </p>
          <button
            disabled={isLoading}
            type="submit"
            className="
		  w-full
		  py-2
		  mt-8
		  rounded-full
		  bg-blue-400
		  text-gray-100
		  focus:outline-none
		  hover:bg-blue-500
		"
          >
            {isLoading ? "Loading..." : isRegistered ? "Register" : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
