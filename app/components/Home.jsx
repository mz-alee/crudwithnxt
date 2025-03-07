"use client"
import React, { useState } from "react";
import { Playwrite_IT_Moderna } from "next/font/google";
import { Ubuntu } from "next/font/google";
// import DelHandle from "./DelHandle";
import { ToastContainer, toast } from "react-toastify";
import { todoSchema } from "./schema/Schema";
import "animate.css";
import { CiEdit } from "react-icons/ci";
import { useFormik } from "formik";

// fonts
const font = Playwrite_IT_Moderna({
  weight: "300",
  subsets: ["latin"],
});

const ubuntuFont = Ubuntu({
  weight: "300",
  subsets: ["latin"],
});

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const formik = useFormik({
    initialValues: {
      title: editingTask ? editingTask.title : '',
      des: editingTask ? editingTask.des : '',
    },
    validationSchema: todoSchema,
    onSubmit: (values, { resetForm }) => {
      if (values.title.trim() === "") {
        toast("Please fill out the title.");
        return;
      }
      if (values.des.trim() === "") {
        toast("Please fill out the body.");
        return;
      }

      if (editingTask) {
        const updatedTodos = todos.map((task) =>
          task.id === editingTask.id
            ? { ...task, title: values.title, des: values.des }
            : task
        );
        setTodos(updatedTodos);
        toast("Task updated successfully!");
      } else {
        const newTodo = {
          id: Date.now(),
          title: values.title,
          des: values.des,
        };
        setTodos([...todos, newTodo]);
        toast("Task added successfully!");
      }

      resetForm(); 
      setEditingTask(null);
    },
  });

  const handleDelete = (taskId) => {
    const newTodos = todos.filter((task) => task.id !== taskId);
    setTodos(newTodos);
    toast('Task deleted');
  };

  const handleEdit = (taskId) => {
    const taskToEdit = todos.find((task) => task.id === taskId);
    if (taskToEdit) {
      setEditingTask(taskToEdit);  
      formik.setValues({
        title: taskToEdit.title,
        des: taskToEdit.des,
      });  
    }
  };

  return (
    <div>
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
      />
      <div className="main-page">
        <h1
          className="main-title animate__animated animate__backInDown"
          style={{ fontFamily: font.style.fontFamily }}
        >
          CRUD Operation
        </h1>
        <div className="animate__animated animate__backInUp form-container">
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="input-field"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            {formik.errors.title && formik.touched.title && (
              <div className="error">{formik.errors.title}</div>
            )}

            <input
              type="text"
              name="des"
              placeholder="Body"
              className="input-field"
              value={formik.values.des}
              onChange={formik.handleChange}
            />
            {formik.errors.des && formik.touched.des && (
              <div className="error">{formik.errors.des}</div>
            )}

            <button
              style={{ fontFamily: ubuntuFont.style.fontFamily }}
              type="submit"
              className="form-btn"
              disabled={formik.isSubmitting}
            >
              {editingTask ? "Update Task" : "Add Task"}
            </button>
          </form>
        </div>

        <div className="task-container">
          {todos.length === 0 ? (
            <p className="animate__animated animate__fadeIn animate__delay-1s">
              No tasks available. Please add a task.
            </p>
          ) : (
            todos.map((task) => (
              <div
                className="task animate__animated animate__backInLeft"
                key={task.id}
              >
                <div className="task-data">
                  <h2
                    className="animate__animated animate__fadeIn animate__delay-1s"
                    style={{ fontFamily: ubuntuFont.style.fontFamily }}
                  >
                    {task.title}
                  </h2>
                  <p className="animate__animated animate__fadeIn animate__delay-2s">
                    {task.des}
                  </p>
                </div>
                <div className="task-btns animate__animated animate__backInDown animate__delay-2s">
                  <div
                    onClick={() => handleEdit(task.id)}
                    className="edit-btn"
                  >
                    <CiEdit />
                  </div>
                  <div>
                    <DelHandle taskId={task.id} handleDelete={handleDelete} />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
