"use client";
import React, { useEffect, useState } from "react";
import { Playwrite_IT_Moderna } from "next/font/google";
import { Ubuntu } from "next/font/google";
import { useForm, useFieldArray } from "react-hook-form";
import { CiEdit } from "react-icons/ci";
import { MdOutlinePermMedia } from "react-icons/md";
import { toast, ToastContainer, Bounce } from "react-toastify";
import { IoList } from "react-icons/io5";
import { BsGrid1X2Fill } from "react-icons/bs";
import moment from "moment-timezone";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const font = Playwrite_IT_Moderna({
  weight: "300",
  subsets: ["latin"],
});

const ubuntuFont = Ubuntu({
  weight: "300",
  subsets: ["latin"],
});

const HookForm = () => {
  const [editTask, setEditingTask] = useState(null);
  const [image, setImage] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState(new Set());
  const [toggleView, setToggleview] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const todoSchema = yup.object({
    title: yup.string().min(3).max(20).required("plz enter your title"),
    body: yup.string().min(5).max(300).required("plz enter your description"),
    todos: yup.array(),
  });
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(todoSchema),
    defaultValues: {
      todos: [],
    },
  });

  const value = getValues();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const { remove } = useFieldArray({
    control,
    name: "todos",
  });

  const onSubmit = async (data) => {
    if (editTask) {
      const updatedTask = {
        ...editTask,
        title: getValues("title"),
        body: getValues("body"),
        image: image || editTask.image,
      };
      const updatedTasks = value.todos.map((task) =>
        task.id === editTask.id ? updatedTask : task
      );
      setValue("todos", updatedTasks);
    } else {
      setValue("todos", [
        ...value.todos,
        {
          title: data.title,
          body: data.body,
          createdAt: moment().format("MMM Do YYYY"),
          image: image,
          id: Date.now(),
        },
      ]);
    }

    toast("success");
    setValue("title", "");
    setValue("body", "");
    setEditingTask(null);
    setImage(null);
  };

  const handleDelete = (index) => {
    remove(index);
  };

  const handleAllDel = () => {
    reset();
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const imageURL = URL.createObjectURL(file);
    setImage(imageURL);
    setValue("image", imageURL);
  };

  const handleEdit = (task) => {
    setValue("title", task.title);
    setValue("body", task.body);
    setImage(task.image);
    setEditingTask(task);
  };

  const handleCheckboxChange = (taskIndex) => {
    const updatedTask = new Set(selectedTasks);
    if (updatedTask.has(taskIndex)) {
      updatedTask.delete(taskIndex);
    } else {
      updatedTask.add(taskIndex);
    }
    setSelectedTasks(updatedTask);
  };

  const deleteSelectedTasks = () => {
    const updatedTasks = value.todos.filter(
      (task, index) => !selectedTasks.has(index)
    );
    setValue("todos", updatedTasks);
    setSelectedTasks(new Set());
  };

  const handleGridView = () => {
    setToggleview(!toggleView);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredTasks = value.todos.filter(
      (task) =>
        task.title.toLowerCase().includes(term.toLowerCase()) ||
        task.body.toLowerCase().includes(term.toLowerCase())
    );
    setFilterData(filteredTasks);
  };
  const tasksToDisplay = searchTerm ? filterData : value.todos;

  return (
    <div>
      {isLoading ? (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      ) : (
        <div>
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
            transition={Bounce}
          />
          <div className="main-page">
            <h1
              className="main-title animate__animated animate__backInDown"
              style={{ fontFamily: font.style.fontFamily }}
            >
              CRUD Operation
            </h1>
            <div className="animate__animated animate__backInUp form-container">
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  className="animate__animated animate__fadeIn animate__delay-1.2s"
                  {...register("title")}
                  type="text"
                  name="title"
                  placeholder="Title"
                />
                {errors.title && (
                  <p className="error">{errors.title.message}</p>
                )}
                <input
                  className="animate__animated animate__fadeIn animate__delay-1.5s"
                  {...register("body")}
                  type="text"
                  placeholder="Body"
                />
                {errors.body && <p className="error">{errors.body.message}</p>}
                <label className="file-choose-label" htmlFor="file">
                  {!image ? (
                    <MdOutlinePermMedia className="file-select-icon" />
                  ) : (
                    <img
                      src={image}
                      alt="image"
                      className="profile-empty-image"
                    />
                  )}
                  {!image ? <p>click to select image</p> : ""}
                </label>
                <input
                  className="file-choose-input"
                  {...register("image")}
                  type="file"
                  onChange={handleImage}
                  accept="image/*"
                  id="file"
                />
                {errors.image ? (
                  <p className="error">{errors.image.message}</p>
                ) : (
                  ""
                )}
                <button
                  style={{ fontFamily: ubuntuFont.style.fontFamily }}
                  type="submit"
                  className="form-btn"
                  disabled={isSubmitting}
                >
                  {editTask ? "Update Task" : "Add Task"}
                </button>
              </form>
            </div>
            <div>
              <div className="main-task-container animate__animated animate__backInLeft">
                <div>
                  <input
                    className="search-input"
                    type="input"
                    placeholder="Search Task"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <button className="btn" onClick={handleGridView}>
                    <div className=" flex gap-4 items-center">
                      {toggleView ? (
                        <IoList className="text-lg" />
                      ) : (
                        <BsGrid1X2Fill />
                      )}
                      {toggleView ? "List" : "Grid"}
                    </div>
                  </button>
                </div>
                <div
                  className={
                    toggleView === false
                      ? "task-container"
                      : "col-task-container"
                  }
                >
                  {tasksToDisplay.map((task, index) => {
                    return (
                      <div
                        className="task animate__animated animate__backInLeft"
                        id={toggleView === false ? "task" : "col-task"}
                        key={task.id}
                      >
                        <div className="task-box-one">
                          <div>
                            <img
                              className={
                                toggleView === false
                                  ? "profile-image"
                                  : "col-profile-image"
                              }
                              src={
                                task.image
                                  ? task.image
                                  : "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
                              }
                              alt="profile image"
                            />
                          </div>
                          <div className="task-data">
                            <h2
                              className="animate__animated animate__fadeIn animate__delay-1s"
                              style={{
                                fontFamily: ubuntuFont.style.fontFamily,
                              }}
                            >
                              {task.title}
                            </h2>
                            <p className="animate__animated animate__fadeIn animate__delay-2s">
                              {task.body}
                            </p>
                            <p>{task.createdAt}</p>
                          </div>
                        </div>
                        <div className="task-btns animate__animated animate__backInDown animate__delay-2s">
                          <div
                            onClick={() => handleEdit(task)}
                            className="edit-btn"
                          >
                            <CiEdit />
                          </div>
                          <div>
                            {/* <button
                              className="delete-btn"
                              onClick={() => handleDelete(index)}
                            >
                              <DelHandle />
                            </button> */}
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              checked={selectedTasks.has(index)}
                              onChange={() => handleCheckboxChange(index)}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="main-task-container-btns">
                  <button
                    className="seletet-del-btn"
                    onClick={deleteSelectedTasks}
                    disabled={selectedTasks.size === 0}
                  >
                    Delete Selected Tasks
                  </button>
                  <button className="btn" onClick={() => handleAllDel()}>
                    Delete All Tasks
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HookForm;
