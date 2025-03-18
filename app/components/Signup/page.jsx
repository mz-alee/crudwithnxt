"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../Redux/authSlice";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast, Slide } from "react-toastify";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import "animate.css";
import { getCookie } from 'cookies-next';
const Signup = () => {
  const [showPas, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const dispatch = useDispatch();
  // validation
  const signUpValidation = yup.object({
    username: yup.string().required("plz enter the username"),
    email: yup.string().required("plz enter the email"),
    password: yup.string().min(8).max(20).required("plz fill the password"),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password"), null], "password must be same"),
    termInput: yup
      .boolean()
      .oneOf([true], "You must accept the terms and conditions."),
  });

  // react hook form
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signUpValidation),
    defaultValues: {
      signUpUserData: [],
    },
  });
  // functions

  const value = getValues();

  const handleSignUp = (data) => {
    const existingUser = JSON.parse(getCookie("users") || []);
    const userExist = existingUser.some((u) => u.email === data.email);
    if (userExist) {
      toast.error("User With This Email Already Exist");
      return;
    }

    const newUser = {
      username: data.username,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    setValue("signUpUserData", (prevData) => [...prevData, newUser]);
    dispatch(registerUser(newUser));
    toast("Account Created Now You Can login");
    setValue("username", "");
    setValue("email", "");
    setValue("password", "");
    setValue("confirmPassword", "");
  };
  
  return (
    <>
      <div className="signup-main-page">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Slide}
        />
        <div className=" flex justify-center items-center h-screen ">
          <div className="form-container shadow-xl flex flex-col bg-white/30 w-[280px] lg:w-[440px] rounded-md h-[450px] gap-2 items-center px-8 animate__animated animate__fadeInDown">
            <form
              className="flex flex-col justify-between h-full py-4"
              onSubmit={handleSubmit(handleSignUp)}
            >
              <h2 className="text-center  italic  text-lg mb-4 animate__animated animate__bounceInDown animate__delay-1s animate__slow ">
                Sign <span className='text-blue-600'> Up</span>
              </h2>
              <div className="flex flex-col gap-8">
                <div className="relative">
                  <input
                    className={`${
                      errors.username
                        ? "border border-red-400"
                        : "border-gray-500"
                    } border outline-none w-[250px] rounded py-1 px-2 animate__animated animate__backInDown animate__delay-1s animate__fast`}
                    {...register("username")}
                    type="text"
                    placeholder="UserName"
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm  absolute animate__animated animate__fadeInUp fast ">
                      {errors.username.message}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <input
                    className={`${
                      errors.email ? "border border-red-400" : "border-gray-500"
                    } border outline-none w-[250px] rounded py-1 px-2 animate__animated animate__backInDown animate__delay-1s animate__fast`}
                    {...register("email")}
                    type="email"
                    placeholder="email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 absolute bottom-[-20px] animate__animated animate__fadeInUp fast">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="relative">
                  <input
                    className={`${
                      errors.password
                        ? "border border-red-400"
                        : "border-gray-500"
                    } border outline-none w-[250px] rounded py-1 px-2 animate__animated animate__backInDown animate__delay-1s animate__fast`}
                    {...register("password")}
                    type={showPas ? "text" : "password"}
                    placeholder="password"
                  />

                  <div
                    onClick={() => setShowPass(!showPas)}
                    className=" cursor-pointer absolute right-2 top-2 animate__animated animate__fadeIn animate__delay-2s"
                  >
                    {showPas ? <GoEye /> : <GoEyeClosed />}
                  </div>

                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1 absolute bottom-[-20px] animate__animated animate__fadeInUp fast">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="relative">
                  <input
                    className={`${
                      errors.confirmPassword
                        ? "border border-red-400"
                        : "border-gray-500"
                    } border outline-none w-[250px] rounded py-1 px-2 animate__animated animate__backInDown animate__delay-1s animate__fast`}
                    {...register("confirmPassword")}
                    type={showConfirmPass ? "text" : "password"}
                    placeholder="confirm password"
                  />

                  <div
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    className=" cursor-pointer absolute right-2 top-2 animate__animated animate__fadeIn animate__delay-2s"
                  >
                    {showConfirmPass ? <GoEye /> : <GoEyeClosed />}
                  </div>

                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1 absolute bottom-[-20px] animate__animated animate__fadeInUp fast">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
                <div className="relative flex gap-1 animate__animated animate__fadeIn animate__delay-2s">
                  <input type="checkbox" {...register("termInput")} />
                  <p className="text-sm font-light ">
                    i agree to accept
                    <span>
                      <a href="/" className="text-blue-700 ">
                        terms and condition
                      </a>
                    </span>
                  </p>
                  {errors.termInput && (
                    <p className="text-red-500 text-sm w-70 mt-1 absolute top-4 animate__animated animate__fadeInUp fast">
                      {errors.termInput.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-4 mt-6">
                <button
                  type="submit"
                  className=" bg-blue-400 text-white rounded py-1 w-[90px] animate__animated animate__fadeIn animate__delay-1s animate__slow"
                  disabled={isSubmitting}
                >
                  Sign Up
                </button>
                <div className="flex animate__animated animate__fadeInDown animate__delay-2s">
                  <p>already have an account?</p>
                  <Link
                    className="text-blue-700 animate__animated animate__fadeIn animate__delay-1s animate__slow"
                    href="/components/Login"
                  >
                    Log In
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
