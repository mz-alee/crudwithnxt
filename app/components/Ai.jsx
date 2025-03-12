"use client"
import React, { useState } from "react";
import { DatePicker, Table } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;

const data = [
  { key: 1, name: "Item 1", date: "2024-03-01" },
  { key: 2, name: "Item 2", date: "2024-03-05" },
  { key: 3, name: "Item 3", date: "2024-03-10" },
  { key: 4, name: "Item 4", date: "2024-03-15" },
];

const DateRangeFilter = () => {
  const [filteredData, setFilteredData] = useState(data);

  const handleDateChange = (dates) => {
    if (!dates || dates.length === 0) {
      setFilteredData(data);
      return;
    }

    const [start, end] = dates;
    const filtered = data.filter((item) => {
      const itemDate = moment(item.date);
      return itemDate.isBetween(start, end, "day", "[]"); // Inclusive range
    });

    setFilteredData(filtered);
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Date", dataIndex: "date", key: "date" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Date Range Filter</h2>
      <RangePicker onChange={handleDateChange} format="YYYY-MM-DD" />
      <Table
        dataSource={filteredData}
        columns={columns}
        style={{ marginTop: "20px" }}
        pagination={false}
      />
    </div>
  );
};

export default DateRangeFilter;
