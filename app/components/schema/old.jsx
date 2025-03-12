// "use client";
// import React, { useState } from "react";
// import { Playwrite_IT_Moderna } from "next/font/google";
// import { Ubuntu } from "next/font/google";
// import DelHandle from "./DelHandle";
// import { ToastContainer, toast } from "react-toastify";
// import { todoSchema } from './schema/Schema';
// import "animate.css";
// import { CiEdit } from "react-icons/ci";
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// // fonts 
// const font = Playwrite_IT_Moderna({
//   weight: "300",
//   subsets: ["latin"],
// });

// const ubuntuFont = Ubuntu({
//   weight: "300",
//   subsets: ["latin"],
// });
 
// const Home = () => {
//   const [data, setData] = useState({
//     title: "",
//     des: "",
    
//   });
//   const [todos, setTodos] = useState([]);

//   // formik 
//   const initialValues={
//     title:'',
//     des:'',
//   }
//     const Registration =()=>{
//       Formik({
//         initialValues:initialValues,
//         onSubmit:(values)=>{
//           console.log(values)
//         }
//       })
//       console.log(Formik)
//     }

//   // for input 
//   const handleChanges = (e) => {
//     const { name, value } = e.target;
//     setData({
//       ...data,
//       [name]: value,
//     });
//   };
//   const [error, seterror] = useState("");

//   const handleCrud = (e) => {
//     e.preventDefault();
    
//     if (data.title.trim() === "") {
//       toast("Please fill out the title.");
//     }
//     if (data.title.trim() === "") {
//       seterror("fill the title field");
//       return;
//     }
//     if (data.des.trim() === "") {
//       toast("Please fill out the body.");
//     }
//     if (data.des.trim() === "") {
//       seterror("fill the body field");
//       return;
//     }
//     toast("done");

//     const newTodo = {  title: data.title, des: data.des };
//     setTodos([...todos, newTodo]);

//     setData({ title: "", des: "" });
//   };

//   const handleDelete = (taskId) => {
//     toast('task deleted')
//       const newTodos = todos.filter((task) => task.id !== taskId);
//       setTodos(newTodos);
  
//   };
  

//   return (
//     <div>
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick={false}
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//         // transition={Bounce}
//       />
//       <div className="main-page">
//         <h1
//           className="main-title animate__animated animate__backInDown"
//           style={{ fontFamily: font.style.fontFamily }}
//         >
//           CRUD Operation
//         </h1>
//         <div className="animate__animated animate__backInUp form-container">
//           <form onSubmit={handleCrud}>
//             <input
//               type="text"
//               placeholder="Title"
//               name="title"
//               value={data.title}
//               onChange={handleChanges}
//             />

//             <input
//               type="text"
//               placeholder="Body"
//               name="des"
//               value={data.des}
//               onChange={handleChanges}
//             />
//             {error && <p className="error">{error}</p>}
//             <button
//               style={{ fontFamily: ubuntuFont.style.fontFamily }}
//               type="submit"
//               className="form-btn"
//             >
//                Add Task
//             </button>
//           </form>
//         </div>
//         <div className="task-container">
//           {todos.length === 0 ? (
//             <p className="animate__animated animate__fadeIn animate__delay-1s">
//               No tasks available. Please add a task.
//             </p>
//           ) : (
//             todos.map((task, index) => (
//               <div
//                 className="task animate__animated animate__backInLeft"
//                 key={index}
//               >
//                 <p>{index} :</p>
//                 <div className="task-data">
//                   <h2
//                     className="animate__animated animate__fadeIn animate__delay-1s"
//                     style={{ fontFamily: ubuntuFont.style.fontFamily }}
//                   >
//                     {task.title}
//                   </h2>
//                   <p className="animate__animated animate__fadeIn animate__delay-2s">
//                     {task.des}
//                   </p>
//                 </div>
//                 <div className='task-btns animate__animated animate__backInDown animate__delay-2s'>
//                 <div
//                   onClick={() => {
//                     handleEdit(index);
//                   }}
//                   className='edit-btn'
//                 >
//                   <CiEdit/>
//                 </div>
//                 <div >
//                   <DelHandle taskId={task.id} handleDelete={handleDelete} />
//                 </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
  


"use client";
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import "./Style.css";
import { MdOutlinePermMedia } from "react-icons/md";
import { DatePicker, Space } from "antd";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker.css";
const { RangePicker } = DatePicker;
const Demo = () => {
  const [editTask, seteditTask] = useState(null);
  const [dateRange, setDateRange] = useState(null);
  const [image, setimage] = useState(null);
  const [searchTerm, setsearchTerm] = useState("");
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
          // startDate:data.startDate,
          // endDate:data.endDate,
          createdAt: data.datepicker,
          datepicker: data.datepicker,
        },
      ]);
    }
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
  // const handleSearch = (e) => {
  //   const searchValue = e.target.value;
  //   setsearchTerm(searchValue);
  // };

  // const filterData = () => {
  //   const filteredData = value.todos.filter((task) =>
  //     task.title.toLowerCase().includes(searchTerm.toLowerCase())
    
  //   );

  //   return filteredData;
  // };
  // const handleDateChange = (dates) => {
  //   if (!dates || dates.length === 0) {
  //     return;
  //   }

  //   const [start, end] = dates;

  //   const filteredByDate = value.todos.filter((item) => {
  //     const itemDate = moment(item.createdAt);
  //     console.log("task date",itemDate);
  
  //     return itemDate.isBetween(start, end, "day", "[]");

  //   });
  //   setdatefilterdata(filteredByDate)
  // };

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setsearchTerm(searchValue);
};

const handleDateChange = (dates) => {
    if (!dates || dates.length === 0) {
        setDateRange(null);
    } else {
        setDateRange(dates);
    }
};

const getFilteredTasks = () => {
    return value.todos.filter((task) => {
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());

        const taskDate = moment(task.createdAt);
        const matchesDate = dateRange ? taskDate.isBetween(dateRange[0], dateRange[1], "day", "[]") : true;

        return matchesSearch && matchesDate;
    });
};
  return (
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="form-container"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("title")} placeholder="Title" />
          {errors.title && <p className="error">{errors.title.message}</p>}

          <input {...register("body")} placeholder="Body" />
          {errors.body && <p className="error">{errors.body.message}</p>}
          <input {...register("datepicker")} type="date" />
          {errors.datepicker && <p>{errors.datepicker.message}</p>}
          <div className="image-container">
            <input
              type="file"
              onChange={handleImage}
              id="form-image"
              accept="image/*"
              className="hide"
            />

            <label htmlFor="form-image" className="image-label">
              {!image ? (
                <MdOutlinePermMedia className="file-select-icon" />
              ) : (
                <img src={image} alt="image" className="profile-empty-image" />
              )}
              Upload Image
            </label>
          </div>

          <button type="submit" disabled={isSubmitting} className="submit-btn">
            {editTask ? "Update Task" : "Add Task"}
          </button>
        </form>
      </motion.div>

      <div className="tasks-container">
        <RangePicker onChange={handleDateChange} format="YYYY-MM-DD" />

        <input type="text" placeholder="search Tasks" onChange={handleSearch} />
        {getFilteredTasks().length > 0 ? (
          getFilteredTasks() &&
          getFilteredTasks().length >= 0 &&
          getFilteredTasks().map((task, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="task-card"
            >
              <div>
                <img
                  className="profile-image"
                  src={
                    !task.image
                      ? "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
                      : task.image
                  }
                  alt="profile image"
                />
                <h3>{task.title}</h3>
                <p>{task.body}</p>
                <p>{task.createdAt}</p>
              </div>
              <div className="task-actions">
                <button onClick={() => handleEdit(task)} className="edit-btn">
                  edit btn
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="delete-btn"
                >
                  Remove
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p>no task found</p>
        )}
      </div>
    </div>
  );
};

export default Demo;
