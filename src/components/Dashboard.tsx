import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import BarChart from "./BarChart";
import PieChart from "./PieChart";

const Dashboard: React.FC = () => {
  return (
    <div className="">
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 p-6">
        <BarChart />
        {/* <PieChart /> */}
      </div>
    </div>
  );
};

export default Dashboard;
