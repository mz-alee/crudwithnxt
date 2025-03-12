import React from "react";
import DelHandle from './DelHandle';
import { CiEdit } from "react-icons/ci"; 

const Task = ({ task, index, toggleView, ubuntuFont, handleEdit, handleDelete, selectedTasks, handleCheckboxChange }) => {
  return (
    <div
      className={`task animate__animated animate__backInLeft ${toggleView ? "col-task" : ""}`}
      key={task.id} 
    >
      <div className="task-box-one">
        <div>
          <img
            className={toggleView ? "col-profile-image" : "profile-image"}
            src={
              task.image
                ? task.image
                : "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
            }
            alt="profile"
          />
        </div>
        <div className="task-data">
          <h2
            className="animate__animated animate__fadeIn animate__delay-1s"
            style={{
              fontFamily: ubuntuFont?.style?.fontFamily,
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
        <div onClick={() => handleEdit(task)} className="edit-btn">
          <CiEdit />
        </div>
        <div>
          <button
            className="delete-btn"
            onClick={() => handleDelete(task.id)} 
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
  );
};

export default Task;