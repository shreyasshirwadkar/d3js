import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";

const App = () => {
  return (
    <div className="p-4 h-[100vh]  bg-black text-white">
      <div className="flex gap-4 p-2">
        <div>
          <h1>D3 Bar Chart</h1>
          <BarChart />
        </div>
        <div>
          <h1>D3 Pie Chart</h1>
          <PieChart />
        </div>
      </div>
    </div>
  );
};

export default App;
