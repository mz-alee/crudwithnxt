import React from 'react';
import { IoIosClose } from 'react-icons/io';

const DelHandle = ({ taskId, handleDelete }) => {
  return (
    <div onClick={() => handleDelete(taskId)} className="delete-btn">
      <IoIosClose />
    </div>
  );
};

export default DelHandle;
