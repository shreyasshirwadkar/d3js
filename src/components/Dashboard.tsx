import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import BarChart from "./BarChart";
import PieChart from "./PieChart";

interface CovidData {
  country: string;
  cases: number;
}

const Dashboard: React.FC = () => {
  const [covidData, setCovidData] = useState<CovidData[]>([]);
  useEffect(() => {
    const fetchCovidData = async () => {
      try {
        const response = await fetch(
          "https://disease.sh/v3/covid-19/countries"
        );
        const data = await response.json();

        // Select a few countries for display
        const selectedCountries = ["USA", "India", "Brazil", "Russia", "UK"];
        const filteredData = data
          .filter((d: any) => selectedCountries.includes(d.country))
          .map((d: any) => ({
            country: d.country,
            cases: d.cases,
          }));

        setCovidData(filteredData);
      } catch (error) {
        console.error("Error fetching COVID-19 data:", error);
      }
    };

    fetchCovidData();
  }, []);
  return (
    <div className="">
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 p-6">
        <BarChart covidData={covidData} />
        {/* <PieChart /> */}
      </div>
    </div>
  );
};

export default Dashboard;
