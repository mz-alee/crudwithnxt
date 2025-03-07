"use client";
import React, { useState } from "react";
import { Playwrite_IT_Moderna } from "next/font/google";
import { Ubuntu } from "next/font/google";
import DelHandle from "./DelHandle";
import { ToastContainer, toast } from "react-toastify";
import { todoSchema } from './schema/Schema';
import "animate.css";
import { CiEdit } from "react-icons/ci";
import { Formik, Field, Form, ErrorMessage } from 'formik';
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
  const [data, setData] = useState({
    title: "",
    des: "",
    
  });
  const [todos, setTodos] = useState([]);

  // formik 
  const initialValues={
    title:'',
    des:'',
  }
    const Registration =()=>{
      Formik({
        initialValues:initialValues,
        onSubmit:(values)=>{
          console.log(values)
        }
      })
      console.log(Formik)
    }

  // for input 
  const handleChanges = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const [error, seterror] = useState("");

  const handleCrud = (e) => {
    e.preventDefault();
    
    if (data.title.trim() === "") {
      toast("Please fill out the title.");
    }
    if (data.title.trim() === "") {
      seterror("fill the title field");
      return;
    }
    if (data.des.trim() === "") {
      toast("Please fill out the body.");
    }
    if (data.des.trim() === "") {
      seterror("fill the body field");
      return;
    }
    toast("done");

    const newTodo = {  title: data.title, des: data.des };
    setTodos([...todos, newTodo]);

    setData({ title: "", des: "" });
  };

  const handleDelete = (taskId) => {
    toast('task deleted')
      const newTodos = todos.filter((task) => task.id !== taskId);
      setTodos(newTodos);
  
  };
  

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
        // transition={Bounce}
      />
      <div className="main-page">
        <h1
          className="main-title animate__animated animate__backInDown"
          style={{ fontFamily: font.style.fontFamily }}
        >
          CRUD Operation
        </h1>
        <div className="animate__animated animate__backInUp form-container">
          <form onSubmit={handleCrud}>
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={data.title}
              onChange={handleChanges}
            />

            <input
              type="text"
              placeholder="Body"
              name="des"
              value={data.des}
              onChange={handleChanges}
            />
            {error && <p className="error">{error}</p>}
            <button
              style={{ fontFamily: ubuntuFont.style.fontFamily }}
              type="submit"
              className="form-btn"
            >
               Add Task
            </button>
          </form>
        </div>
        <div className="task-container">
          {todos.length === 0 ? (
            <p className="animate__animated animate__fadeIn animate__delay-1s">
              No tasks available. Please add a task.
            </p>
          ) : (
            todos.map((task, index) => (
              <div
                className="task animate__animated animate__backInLeft"
                key={index}
              >
                <p>{index} :</p>
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
                <div className='task-btns animate__animated animate__backInDown animate__delay-2s'>
                <div
                  onClick={() => {
                    handleEdit(index);
                  }}
                  className='edit-btn'
                >
                  <CiEdit/>
                </div>
                <div >
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
