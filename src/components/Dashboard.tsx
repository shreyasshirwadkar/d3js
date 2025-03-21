import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

interface CovidData {
  country: string;
  cases: number;
}

const allCountries = [
  "USA",
  "India",
  "Brazil",
  "Russia",
  "UK",
  "Germany",
  "France",
  "Italy",
  "Spain",
  "Canada",
];

const Dashboard: React.FC = () => {
  const [covidData, setCovidData] = useState<CovidData[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([
    "USA",
    "India",
    "Brazil",
    "Russia",
    "UK",
  ]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const fetchCovidData = async () => {
      try {
        const response = await fetch(
          "https://disease.sh/v3/covid-19/countries"
        );
        const data = await response.json();

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
  }, [selectedCountries]);

  const toggleTheme = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSelectCountry = (country: string) => {
    setSelectedCountries((prev) =>
      prev.includes(country)
        ? prev.filter((c) => c !== country)
        : [...prev, country]
    );
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      } min-h-screen p-6 max-w-full`}
    >
      <button
        onClick={toggleTheme}
        className={`${
          darkMode ? "bg-slate-400 text-black" : " bg-black text-white"
        } p-2 mb-2 rounded-lg`}
      >
        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
      <div className="mb-4 relative w-full md:w-[20vw]">
        <label
          className={`${
            darkMode ? "text-white " : "text-black"
          }  block text-lg font-semibold  `}
        >
          Select Countries:
        </label>
        <button
          onClick={toggleDropdown}
          className="flex items-center justify-between w-full px-4 py-2 text-white bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {selectedCountries.length > 0
            ? selectedCountries.join(", ")
            : "Select Countries"}
          <ChevronDownIcon className="w-5 h-5 text-white ml-2" />
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute left-0 w-full mt-2 bg-gray-900 border border-gray-600 rounded-lg shadow-lg z-10">
            {allCountries.map((country) => (
              <div
                key={country}
                onClick={() => handleSelectCountry(country)}
                className={`px-4 py-2 cursor-pointer ${
                  selectedCountries.includes(country)
                    ? "bg-blue-600 text-white"
                    : "text-white hover:bg-gray-700"
                }`}
              >
                {country}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart covidData={covidData} />
        <PieChart covidData={covidData} />
      </div>
    </div>
  );
};

export default Dashboard;
