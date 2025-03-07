"use client";
import React, { useState } from "react";
import { Playwrite_IT_Moderna } from "next/font/google";
import { Ubuntu } from "next/font/google";
import { useForm, useFieldArray } from "react-hook-form";
import { CiEdit } from "react-icons/ci";
import DelHandle from "./DelHandle";
import { MdOutlinePermMedia } from "react-icons/md";
import { toast, ToastContainer, Bounce } from "react-toastify";
import { IoList } from "react-icons/io5";
import { BsGrid1X2Fill } from "react-icons/bs";
import DatePicker from "react-datepicker";
import moment from "moment-timezone";

// fonts
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

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      todos: [], 
    },
  });

  const { fields, append, remove } = useFieldArray({
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
      const updatedTasks = fields.map((task) =>
        task.id === editTask.id ? updatedTask : task
      );

      setValue("todos", updatedTasks);
    } else {
      const newID = Date.now();

      append({
        title: data.title,
        body: data.body,
        id: newID,
        image: image,
        time: newID,
        createdAt: moment().format("MMM Do YYYY"), 
      });
    }

    toast("success");
    setValue("title", "");
    setValue("body", "");
    setEditingTask(null);
    setImage(null);
    setValue("image", "");
  };

  const handleDelete = (index) => {
    remove(index);
  };

  const handleAllDel = () => {
    reset();
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
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
    const updatedTasks = fields.filter(
      (task, index) => !selectedTasks.has(index)
    );
    setValue("todos", updatedTasks);
    setSelectedTasks(new Set());
  };

  const handleGridView = () => {
    setToggleview(!toggleView);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTasks = fields.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
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
              {...register("title", {
                required: "Title is required",
                minLength: { value: 3, message: "Minimum length is 3" },
              })}
              type="text"
              name="title"
              placeholder="Title"
            />
            {errors.title && <p className="error">{errors.title.message}</p>}
            <input
              className="animate__animated animate__fadeIn animate__delay-1.5s"
              {...register("body", {
                required: "Body is required",
                minLength: { value: 5, message: "Minimum length is 5" },
              })}
              type="text"
              placeholder="Body"
            />
            {errors.body && <p className="error">{errors.body.message}</p>}
            <label className="file-choose-label" htmlFor="file">
              {!image ? (
                <MdOutlinePermMedia className="file-select-icon" />
              ) : (
                <img src={image} alt="image" className="profile-empty-image" />
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

            {/* <p>{moment().format("MMM Do YYYY")}</p> */}
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
                <div className=' flex gap-4 items-center'>
                {toggleView ? <IoList className='text-lg' /> : <BsGrid1X2Fill />}
                {toggleView ? "List" : "Grid"}
                </div>
              </button>
            </div>
            <div
              className={
                toggleView === false ? "task-container" : "col-task-container"
              }
            >
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task, index) => (
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
                          style={{ fontFamily: ubuntuFont.style.fontFamily }}
                        >
                          {task.title}
                        </h2>
                        <p className="animate__animated animate__fadeIn animate__delay-2s">
                          {task.body}
                        </p>
                        <p>{task.createdAt}</p> {/* Display the created date */}
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
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(index)}
                        >
                          <DelHandle />
                        </button>
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
                ))
              ) : (
                <p className="task-warn-text">No todo list</p>
              )}
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
  );
};

export default HookForm;
