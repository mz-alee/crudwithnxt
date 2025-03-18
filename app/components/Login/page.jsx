"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginData } from "../Redux/authSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { toast, Slide, ToastContainer } from "react-toastify";
import { GoEyeClosed } from "react-icons/go";
import { GoEye } from "react-icons/go";
import loginImage from '../../../public/login.jpg'
import Image from 'next/image';
import "animate.css";
import { getCookie } from 'cookies-next';
const Login = () => {
  const [showPas, setShowPass] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  console.log("env",process.env.SERVER_PASSWORD  );
  if(process.env.NODE_ENV=="development"){
    console.log("you are on development mode");
    
  }else{
    console.log('you are on production mode');
    
  }
  // yup validation schema
  const loginValidation = yup.object({
    email: yup.string().required("Please enter an email"),
    password: yup.string().required("Please enter a password"),
  });

  // react hook form setup
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginValidation),
    defaultValues: {
      LoginForm: [],
    },
  });

  const value = getValues();

  // handle login form submission
  const handleLoginForm = (data) => {
    const existingUser = JSON.parse(getCookie("users") || "[]");
    const userExistEmail = existingUser.some((u) => u.email=== data.email);
    const userExistPass = existingUser.some((u) => u.password === data.password);
    if(!userExistEmail){
      toast.error('Some Thing Went Wrong')
      return
    }
    if (!userExistPass) {
      toast.error("Wrong Password");
      return;
    }
    setValue("LoginForm", [
      ...value.LoginForm,
      {
        email: data.email,
        password: data.password,
      },
    ]);

    dispatch(loginData(data));

    setTimeout(() => {
      router.push("/components/Home");
    }, 1500);
  };

  const loggedin = useSelector((state) => state.loggedinUser);

  // jsx code
  return (
    
      <div className='login-main-page'>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
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
        <div>
          <div className=" flex justify-center items-center h-screen ">
            <div className="form-container shadow-xl flex flex-col bg-white/40 rounded-md h-[350px] gap-2 items-center px-8 animate__animated animate__fadeInDown">
              <form
                className="flex flex-col justify-between h-full py-4"
                onSubmit={handleSubmit(handleLoginForm)}
              >
                <h2 className="text-center text-white italic  text-lg mt-4 animate__animated animate__bounceInDown animate__delay-1s animate__slow">
                  Lo<span className=' text-pink-400'>gin</span>
                </h2>
                <div className="flex flex-col gap-8">
                  <div className="relative ">
                    <input
                      className={`${
                        errors.email
                          ? "border border-red-400"
                          : "border-gray-500"
                      } border outline-none w-[250px] rounded py-1 px-2  animate__animated animate__backInDown animate__delay-1s animate__fast`}
                      {...register("email")}
                      type="text"
                      name="email"
                      placeholder="Email"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm  absolute animate__animated animate__fadeInUp fast ">
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
                      name="password"
                      placeholder="Password"
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
                </div>
                <div className="flex flex-col gap-4">
                  <button
                    type="submit"
                    className="bg-blue-400 text-white rounded py-1 w-[90px] animate__animated animate__fadeIn animate__delay-1s animate__slow"
                    disabled={isSubmitting}
                  >
                    Log In
                  </button>
                  <div className="flex gap-1  animate__animated animate__fadeInUp animate__delay-2s fast">
                    <p >don't have an account?</p>
                    <Link
                      className="text-blue-700 text-md animate__animated animate__fadeIn animate__delay-1s animate__slow"
                      href="/components/Signup"
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Login;
