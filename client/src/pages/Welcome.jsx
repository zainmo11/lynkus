import React, { useState } from "react";
import image from "../assets/image (14) 1.png";
import logo from "../assets/Logo.png";
import { useForm } from "react-hook-form";
import Loading from "../components/Loading";
import { SecondaryButton } from "../components/Buttons";

export default function Welcome() {
  const [formStatus, setformStatus] = useState(true);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmitLogin = (data) => {
    setLoading(true);
    // Call Login API
    console.log(data);
  };

  const onSubmitSignup = (data) => {
    setLoading(true);
    // Call Signup API
    console.log(data);
  };

  // To watch the password field for confirmation match
  const password = watch("password");

  return (
    <div className="welcome h-screen flex dark:bg-dark-background">
      <div className="image w-[55%] relative hidden lg:block">
        <img className="w-full h-screen" src={image} alt="welcome image" />
        <div className="logo flex items-center justify-center absolute bottom-3 w-full">
          <img src={logo} alt="logo" />
        </div>
      </div>
      <div className="content flex flex-col justify-center items-center w-full lg:w-[45%] py-10">
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
            <h2 className="text-light-primaryText  text-5xl text-center font-bold mb-12 dark:text-dark-primaryText">
              Welcome back
            </h2>
            <input
              {...register("userName", { required: "Username is Required" })}
              className="block w-full mb-5 border-light-secondaryText focus:border-light-primaryText outline-none border-2 rounded-lg p-2 "
              type="text"
              id="userName"
              placeholder="Username"
            />
            <p className="text-light-primaryText mb-2 pl-1 text-md font-bold dark:text-dark-primaryText">
              {errors.userName?.message}
            </p>
            <input
              {...register("password", { required: "Password is Required" })}
              className="block w-full mb-2  border-light-secondaryText focus:border-light-primaryText outline-none border-2 rounded-lg p-2 "
              type="password"
              id="password"
              placeholder="Password"
            />
            <p className="text-light-primaryText mb-2 pl-1 text-md font-bold dark:text-dark-primaryText">
              {errors.password?.message}
            </p>
            <button
              type="submit"
              className="bg-light-secondaryText hover:bg-light-primaryText font-semibold text-md text-white block mx-auto mt-12 py-2 rounded-lg w-[200px] dark:hover:bg-dark-background"
            >
              {loading ? <Loading /> : "Log in"}
            </button>
            <button
              type="button"
              onClick={() => {
                setformStatus(false);
              }}
              className="border-2 border-light-secondaryText font-semibold text-md text-light-primaryText block mx-auto mt-2 py-2 rounded-lg w-[200px] hover:bg-light-primaryText hover:text-white hover:border-light-primaryText dark:text-dark-primaryText dark:hover:bg-dark-background"
            >
              New here? Register
            </button>
          </form>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmitSignup)}
            className="bg-light-secondaryBackground rounded-lg py-4 px-6 mt-6 w-[90%] md:w-[80%] lg:w-[70%] dark:bg-dark-secondaryBackground"
          >
            <h2 className="text-light-primaryText text-4xl text-center font-bold mb-2 dark:text-dark-primaryText">
              Join the Lynkus Community
            </h2>
            <input
              {...register("fullName", { required: "Name is Required" })}
              className="block w-full mb-5 border-light-secondaryText focus:border-light-primaryText outline-none border-2 rounded-lg p-2 "
              type="text"
              id="fullName"
              placeholder="Username"
            />
            <p className="text-light-primaryText mb-2 pl-1 text-md font-bold dark:text-dark-primaryText">
              {errors.fullName?.message}
            </p>
            <input
              {...register("email", { required: "Email is Required" })}
              className="block w-full mb-5 border-light-secondaryText focus:border-light-primaryText outline-none border-2 rounded-lg p-2 "
              type="email"
              id="email"
              placeholder="Email"
            />
            <p className="text-light-primaryText mb-2 pl-1 text-md font-bold dark:text-dark-primaryText">
              {errors.email?.message}
            </p>
            <input
              {...register("Spassword", { required: "Password is Required" })}
              className="block w-full mb-5 border-light-secondaryText focus:border-light-primaryText outline-none border-2 rounded-lg p-2 "
              type="password"
              id="Spassword"
              placeholder="Password"
            />
            <p className="text-light-primaryText mb-2 pl-1 text-md font-bold dark:text-dark-primaryText">
              {errors.Spassword?.message}
            </p>
            <input
              {...register("confirmPassword", {
                required: "Confirm Password is Required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="block w-full mb-5 border-light-secondaryText focus:border-light-primaryText outline-none border-2 rounded-lg p-2 "
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
            />
            <p className="text-light-primaryText mb-2 pl-1 text-md font-bold dark:text-dark-primaryText">
              {errors.confirmPassword?.message}
            </p>
            <button
              type="submit"
              className="bg-light-secondaryText hover:bg-light-primaryText font-semibold text-md text-white block mx-auto py-2 rounded-lg w-[200px] dark:hover:bg-dark-background"
            >
              {loading ? <Loading /> : "Sign up"}
            </button>
            <SecondaryButton label="Have an account? Login" />
            <button
              type="button"
              onClick={() => {
                setformStatus(true);
              }}
              className="border-2 border-light-secondaryText font-semibold text-md text-light-primaryText block mx-auto mt-2 py-2 rounded-lg w-[200px] hover:bg-light-primaryText hover:text-white hover:border-light-primaryText dark:text-dark-primaryText dark:hover:bg-dark-background"
            >
              Have an account? Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
