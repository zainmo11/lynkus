import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "../assets/image (14) 1.png";
import logo from "../assets/Logo.png";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "../store/authSlice";
import { isAuthorized } from "../utils/checkAuth";
import Loading from "../components/Loading";
import { DefaultButton, SecondaryButton } from "../components/Buttons";

export default function Welcome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [formStatus, setFormStatus] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const password = watch("password");

  // Login
  const onSubmitLogin = (data) => {
    dispatch(login(data)).then(() => {
      if (isAuthorized()) {
        navigate("/");
      }
    });
  };

  // Signup
  const onSubmitSignup = (data) => {
    dispatch(signup(data));
    setFormStatus(true);
  };

  const toggleForm = (status) => {
    setFormStatus(status);
    reset();
  };

  return (
    <div className="welcome flex dark:bg-dark-background">
      <div className="image w-[55%] relative hidden lg:block">
        <img className="w-full" src={image} alt="welcome image" />
        <div className="logo flex items-center justify-center absolute bottom-3 w-full">
          <img src={logo} alt="logo" />
        </div>
      </div>
      <div className="content flex flex-col justify-center items-center w-full lg:w-[45%] py-10 lg:py-0">
        <h1 className="text-light-primaryText text-6xl mb-3 font-bold dark:text-dark-primaryText">
          Lynkus
        </h1>
        <p className="text-light-primaryText text-lg font-semibold dark:text-dark-primaryText">
          Connecting People, Amplifying Ideas
        </p>
        {formStatus ? (
          <form
            onSubmit={handleSubmit(onSubmitLogin)}
            className="bg-light-secondaryBackground rounded-lg py-8 px-6 mt-10 w-[90%] md:w-[80%] lg:w-[70%] dark:bg-dark-secondaryBackground"
          >
            <h2 className="text-light-primaryText text-5xl text-center font-bold mb-12 dark:text-dark-primaryText">
              Welcome back
            </h2>
            {error && (
              <p className="text-red-600 bg-red-200 rounded-md p-3 text-center">
                {error}
              </p>
            )}
            <input
              {...register("userName", {
                required: "Username is Required",
              })}
              className="block w-full mt-5 border-light-secondaryText focus:border-light-primaryText outline-none border-2 rounded-lg p-2"
              type="text"
              placeholder="Username"
            />
            <p className="text-light-primaryText mt-2 pl-1 text-md font-bold dark:text-dark-primaryText">
              {errors.userName?.message}
            </p>
            <input
              {...register("password", {
                required: "Password is Required",
              })}
              className="block w-full mt-5 border-light-secondaryText focus:border-light-primaryText outline-none border-2 rounded-lg p-2"
              type="password"
              placeholder="Password"
            />
            <p className="text-light-primaryText mt-2 pl-1 text-md font-bold dark:text-dark-primaryText">
              {errors.password?.message}
            </p>
            <DefaultButton
              label={loading ? <Loading /> : "Log in"}
              onClick={handleSubmit(onSubmitLogin)}
            />
            <SecondaryButton
              label="New here? Register"
              onClick={() => toggleForm(false)}
            />
          </form>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmitSignup)}
            className="bg-light-secondaryBackground rounded-lg py-4 px-6 mt-6 w-[90%] md:w-[80%] lg:w-[70%] dark:bg-dark-secondaryBackground"
          >
            <h2 className="text-light-primaryText text-5xl text-center font-bold mb-12 dark:text-dark-primaryText">
              Join the Lynkus Community
            </h2>
            <input
              {...register("userName", { required: "Full Name is Required" })}
              className="block w-full mt-5 border-light-secondaryText focus:border-light-primaryText outline-none border-2 rounded-lg p-2"
              type="text"
              placeholder="Full Name"
            />
            <p className="text-light-primaryText mt-2 pl-1 text-md font-bold dark:text-dark-primaryText">
              {errors.userName?.message}
            </p>
            <input
              {...register("name", { required: "Username is Required" })}
              className="block w-full mt-5 border-light-secondaryText focus:border-light-primaryText outline-none border-2 rounded-lg p-2"
              type="text"
              placeholder="@Username"
            />
            <p className="text-light-primaryText mt-2 pl-1 text-md font-bold dark:text-dark-primaryText">
              {errors.name?.message}
            </p>
            <input
              {...register("email", { required: "Email is Required" })}
              className="block w-full mt-5 border-light-secondaryText focus:border-light-primaryText outline-none border-2 rounded-lg p-2"
              type="email"
              placeholder="Email"
            />
            <p className="text-light-primaryText mt-2 pl-1 text-md font-bold dark:text-dark-primaryText">
              {errors.email?.message}
            </p>
            <input
              {...register("password", {
                required: "Password is Required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="block w-full mt-5 border-light-secondaryText focus:border-light-primaryText outline-none border-2 rounded-lg p-2"
              type="password"
              placeholder="Password"
            />
            <p className="text-light-primaryText mt-2 pl-1 text-md font-bold dark:text-dark-primaryText">
              {errors.password?.message}
            </p>
            <input
              {...register("passwordConfirm", {
                required: "Confirm Password is Required",
                validate: (value) =>
                  value === password || "Passwords must match",
              })}
              className="block w-full mt-5 border-light-secondaryText focus:border-light-primaryText outline-none border-2 rounded-lg p-2"
              type="password"
              placeholder="Confirm Password"
            />
            <p className="text-light-primaryText mt-2 pl-1 text-md font-bold dark:text-dark-primaryText">
              {errors.passwordConfirm?.message}
            </p>
            <DefaultButton
              label={loading ? <Loading /> : "Register"}
              onClick={handleSubmit(onSubmitSignup)}
            />
            <SecondaryButton
              label="Already have an account? Log in"
              onClick={() => toggleForm(true)}
            />
          </form>
        )}
      </div>
    </div>
  );
}
