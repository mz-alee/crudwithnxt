"use client";
import React, { useState } from "react";
import { DatePicker, Table } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;

const DateDiff = () => {
  const [dateDiff, setDateDiff] = useState(null);

  const handleDateChange = (dates) => {
    if (!dates || dates.length < 2) return;

    const startDate = moment(dates[0].toDate()).startOf("day");
    const endDate = moment(dates[1].toDate()).startOf("day");

    setDateDiff({
      days: endDate.diff(startDate, "days"),
      months: endDate.diff(startDate, "months"),
      years: endDate.diff(startDate, "years"),
    });
  };

  const columns = [
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Difference",
      dataIndex: "difference",
      key: "difference",
    },
  ];

  const data = dateDiff
    ? [
        { key: "1", unit: "Days", difference: dateDiff.days },
        { key: "2", unit: "Months", difference: dateDiff.months },
        { key: "3", unit: "Years", difference: dateDiff.years },
      ]
    : [];

  return (
    <>
      <div style={{ marginBottom: "16px" }}>
        <h2>Date Difference Calculator</h2>
        <RangePicker onChange={handleDateChange} format="YYYY-MM-DD" />
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        style={{ maxWidth: "400px" }}
      />
    </>
  );
};

export default DateDiff;
