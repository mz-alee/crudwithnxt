"use client";
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import { MdOutlinePermMedia } from "react-icons/md";
import { DatePicker } from "antd";
import "animate.css";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker.css";
import { CiEdit } from "react-icons/ci";
import { TiUserDeleteOutline } from "react-icons/ti";
import { useSelector } from "react-redux";
import Navbar from "../Navbar";
const { RangePicker } = DatePicker;
const Home = () => {
  const [editTask, seteditTask] = useState(null);
  const [dateRange, setDateRange] = useState(null);
  const [image, setimage] = useState(null);
  const [searchTerm, setsearchTerm] = useState("");
  const [Theme,setTheme]=useState(false)

  const ValidationSchema = yup.object({
    title: yup.string().min(3).max(20).required("Title required"),
    body: yup.string().min(3).max(20).required("Body required"),
    datepicker: yup.string().required("select the date"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(ValidationSchema),
    defaultValues: {
      todos: [],
    },
  });

  const value = getValues();
  const onSubmit = (data) => {
    console.log("react hook form data", data);
    if (editTask) {
      const updatedTask = {
        ...editTask,
        title: data.title,
        body: data.body,
        image: image || editTask.image,
        datepicker: data.datepicker,
        createdAt: data.datepicker,
      };
      const updatedTasks = value.todos.map((tasks) =>
        tasks.id === editTask.id ? updatedTask : tasks
      );
      console.log("ddddddd", updatedTask);
      setValue("todos", updatedTasks);
    } else {
      setValue("todos", [
        ...value.todos,
        {
          title: data.title,
          body: data.body,
          image: data.image,
          id: Date.now(),
          createdAt: data.datepicker,
          datepicker: data.datepicker,
        },
      ]);
    }
    localStorage.setItem("todos", JSON.stringify(value.todos));
    console.log(value);
    setValue("title", "");
    setValue("body", "");
    setValue("image", "");
    setValue("datepicker", "");
    seteditTask(null);
    setimage(null);
    const fileInput = document.getElementById("form-image");
    if (fileInput) fileInput.value = "";
  };

  const { remove } = useFieldArray({
    control,
    name: "todos",
  });
  const handleImage = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    console.log(imageUrl);
    setimage(imageUrl);
    setValue("image", imageUrl);
  };
  const handleDelete = (index) => {
    remove(index);
  };
  const handleEdit = (task) => {
    setValue("title", task.title);
    setValue("body", task.body);
    setValue("image", task.image);
    setValue("datepicker", task.datepicker);

    seteditTask(task);
    console.log("task-------", task);
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setsearchTerm(searchValue);
  };

  const handleDateChange = (dates) => {
    if (!dates || dates?.length === 0) {
      setDateRange(null);
    } else {
      setDateRange(dates);
    }
  };

  const getFilteredTasks = () => {
    return value.todos.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const taskDate = moment(task.createdAt);
      const matchesDate = dateRange
        ? taskDate >= dateRange[0] && taskDate <= dateRange[1]
        : value.todos;
      return matchesSearch && matchesDate;
    });
  };
  const loggedinUser = useSelector((state) => state.loggedinUser);
  const handleTheme=()=>{
    setTheme(!Theme) 
    console.log(Theme);
    
   }
  return (
    <>
    <div className={Theme?' bg-gray-800 ':' bg-gray-50 text-black'}>
      <Navbar handleTheme={handleTheme}/>
      <div className="  w-full px-8">
        <div className=" flex flex-col justify-center items-center md:flex-row ">
          <div className=" w-1/2  justify-center h-full flex items-center">
            <motion.div className="form-container">
              <div className='flex capitalize text-gray-400 text-lg font-light italic mt-5 mb-4'>
                <h1 className="  animate__animated animate__jackInTheBox animate__delay-2s  ">
                  welcome_
                </h1>
                  <h3 className=" capitalize animate__animated animate__backInRight animate__delay-2s">{loggedinUser?.username}</h3>
              </div>

              <div className=" shadow-xl  p-4 bg-white w-[300px] rounded-md animate__animated animate__fadeInDown  ">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <input
                        className={`${
                          errors.title ? " border-red-500" : "border-gray-400"
                        } border-1 outline-none rounded px-2 `}
                        {...register("title")}
                        placeholder="Title"
                      />
                      {errors.title && (
                        <p className="text-red-500 text-sm    ">
                          {errors.title.message}
                        </p>
                      )}

                      <input
                        className={`${
                          errors.body ? " border-red-500" : "border-gray-400"
                        } border-1 outline-none rounded px-2 `}
                        {...register("body")}
                        placeholder="Body"
                      />
                      {errors.body && (
                        <p className="text-red-500 text-sm    ">
                          {errors.body.message}
                        </p>
                      )}
                      <input
                        className={`${
                          errors.datepicker
                            ? " border-red-500"
                            : "border-gray-400"
                        } border-1 outline-none rounded px-2 `}
                        {...register("datepicker")}
                        type="date"
                      />
                      {errors.datepicker && (
                        <p className="text-red-500 text-sm   ">
                          {errors.datepicker.message}
                        </p>
                      )}
                    </div>
                    <div className="  rounded border-dashed border  h-[250px] ">
                      <input
                        type="file"
                        onChange={handleImage}
                        id="form-image"
                        accept="image/*"
                        className=" hidden "
                      />

                      <label
                        htmlFor="form-image"
                        className="flex flex-col justify-center items-center gap-6 h-full cursor-pointer"
                      >
                        {!image ? (
                          <MdOutlinePermMedia className="w-[50px] h-[50px]" />
                        ) : (
                          <img
                            src={image}
                            alt="image"
                            className="w-[160px] rounded h-[160px] object-cover"
                          />
                        )}
                        Upload Image
                      </label>
                    </div>
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className=" bg-blue-500 rounded px-6 py-1 text-white animate__animated animate__fadeIn animate__delay-1s animate__slow"
                      >
                        {editTask ? "Update Task" : "Add Task"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
          <div className=" w-1/2 h-[500px] flex flex-col items-center">
            <div className="flex mt-4  flex-col w-full justify-center items-center gap-2 ">
              <input
                type="text"
                placeholder="search Tasks"
                onChange={handleSearch}
                className=" outline-none border border-gray-400 px-3 rounded py-1  w-[280px]  animate__animated animate__fadeInDown  "
              />
              <RangePicker
                onChange={handleDateChange}
                format="YYYY-MM-DD"
                className="animate__animated animate__fadeInDown animate__delay-1s"
              />
            </div>
            <div className="scrollbar w-[400px] flex gap-3 bg-gray-50 lg:w-[500px] xl:w-[600px] shadow-xl rounded flex-col overflow-y-scroll h-[470px] will-change-scroll items-center py-4 mt-2 animate__animated animate__fadeInUp animate__slow">
              {getFilteredTasks().length > 0 ? (
                getFilteredTasks() &&
                getFilteredTasks().length >= 0 &&
                getFilteredTasks().map((task, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className=" flex w-[330px] md:w-[380px] lg:w-[480px]  px-2 bg-white shadow-xl  justify-between rounded-md items-center "
                  >
                    <div className="flex gap-2 items-center">
                      <img
                        className="w-[120px] h-[120px] overflow-hidden bg-red-400  rounded-full"
                        src={
                          !task.image
                            ? "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
                            : task.image
                        }
                        alt="profile image"
                      />
                      <div>
                        <h3 className="text-gray-600 font-bold">
                          {task.title}
                        </h3>
                        <p className="text-gray-600">{task.body}</p>
                        <p className="text-gray-400 text-sm font-extralight ">
                          {task.createdAt}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <button
                        onClick={() => handleEdit(task)}
                        className="text-xl text-blue-700"
                      >
                        <CiEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-xl text-red-500"
                      >
                        <TiUserDeleteOutline />
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="mt-[30%]">no task found</p>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Home;
