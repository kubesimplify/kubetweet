import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BeatLoader from "react-spinners/BeatLoader";
import { supabase } from "../supabaseClient";

const Login = () => {
  const [signUp, setSignUp] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    const { email, password } = formData;
    const { user, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) toast.error(error.message);
    if (user) toast.success("sign in");
    setLoginLoading(false);
  };
  const handleLogIn = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    const { email, password } = formData;
    const { user, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) toast.error(error.message);
    if (user) toast.success("Log in");
    setLoginLoading(false);
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-800">
        <div className="bg-gray-400 p-3 m-2 rounded-lg min-w-[300px] shadow-2xl">
          <h2 className="text-center m-2 text-xl ">
            {signUp ? "Sign Up" : "Log In"}
          </h2>
          <form
            className="flex flex-col gap-3"
            onSubmit={signUp ? handleSignUp : handleLogIn}
          >
            <input
              className="rounded-lg p-2 outline-none caret-red-500"
              type="email"
              placeholder="Enter Your Email"
              onChange={handleChange}
              name="email"
              autoComplete="off"
              required
            />

            <input
              className="rounded-lg p-2 outline-none caret-red-500"
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleChange}
              minLength={8}
              required
            />

            <button className="bg-gray-800 text-white rounded-lg p-2">
              {loginLoading ? (
                <div className="text-center">
                  <BeatLoader color="white" />
                </div>
              ) : (
                <>{!signUp ? "Log In" : "Sign Up?"}</>
              )}
            </button>
            <span
              className="cursor-pointer text-xs"
              onClick={() => {
                setSignUp((prev) => !prev);
              }}
            >
              {signUp ? "Log In?" : "Sign Up?"}
            </span>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
      />
    </>
  );
};

export default Login;
