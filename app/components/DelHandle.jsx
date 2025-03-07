import React from 'react';
import { IoIosClose } from 'react-icons/io';

const DelHandle = ({ taskId, handleDelete }) => {
  return (
    <button onClick={() => handleDelete(taskId)} className="delete-btn">
      <IoIosClose />
    </button>
  );
};

export default DelHandle;
