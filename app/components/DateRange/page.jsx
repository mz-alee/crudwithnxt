'use client'
import React from 'react'
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
const DateRange = () => {
  function handleSelect(date) {
    const filteredData = value.todos.filter((task)=>{
      let taskDate = new Date(task['createdAt'])
      return(
        taskDate>= date.selection.startDate&& 
        taskDate<=date.selection.endDate
      )
    })
    setdateFilterData(filteredData)
    console.log("TASK DATE",dateFilterData);
    setStartDate(date.selection.startDate)
    setEndDate(date.selection.endDate)
  }
  const selectionRange = {
    startDate: StartDate,
    endDate: EndDate,
    key: 'selection',
  }
  return (
    <div>
         <DateRangePicker 
               className='text-black'
              ranges={[selectionRange]}
              onChange={handleSelect}
            />
    </div>
  )
}

export default DateRange