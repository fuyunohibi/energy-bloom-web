"use client"

import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const data = {
    labels: ["Used", "Remaining"],
    datasets: [
      {
        data: [54.63, 100 - 54.63], // Replace with your actual data
        backgroundColor: ["#3BB873", "#CCCCCC"], // Green and grey colors
        borderColor: ["#3BB873", "#CCCCCC"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: "80%", // Adjust the cutout percentage to create the "gauge" look
    rotation: -90,
    circumference: 180,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        enabled: false, // Disable tooltips for a cleaner look
      },
    },
  };

  return (
    <div className="relative">
      <Doughnut data={data} options={options} />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold">£6.84</span>{" "}
        {/* Replace with dynamic value */}
      </div>
    </div>
  );
};

export default DoughnutChart;
