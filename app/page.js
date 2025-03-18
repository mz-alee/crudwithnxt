"use client";
import React, { useEffect, useState } from "react";
import Login from "./components/Login/page";
import Loader from "./Loader";
const page = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(!isLoading);
    }, 3000);
  }, []);
  return <div>{isLoading ? <Loader /> : <Login />}</div>;
};

export default page;
