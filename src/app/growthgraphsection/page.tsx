"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Define your data interface
interface GrowthData {
  year: number;
  growth: number;
}

// Sample data for the year-on-year growth
const data: GrowthData[] = [
  { year: 2020, growth: 5 },
  { year: 2021, growth: 10 },
  { year: 2022, growth: 12 },
  { year: 2023, growth: 18 },
  { year: 2024, growth: 22 },
];

// Prepare data for Chart.js
const chartData = {
  labels: data.map((item) => item.year),
  datasets: [
    {
      label: "Year-on-Year Growth",
      data: data.map((item) => item.growth),
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};

// Chart options
const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Year-on-Year Growth Chart",
    },
  },
};

const GrowthGraph: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Year-on-Year Growth</h2>
      <div className="w-full h-96">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default GrowthGraph;
