import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartSection = ({ viewType, getChartData }) => {
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: "top", labels: { color: "white" } },
            title: { display: true, text: `${viewType === "monthly" ? "Monthly" : "Weekly"} Expense Trends with Budget`, color: "white" },
        },
        scales: {
            x: { ticks: { color: "white" } },
            y: { ticks: { color: "white" }, beginAtZero: true },
        },
    };

    return (
        <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4 text-center text-white">Expense Trends with Budget</h3>
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                <Bar data={getChartData()} options={chartOptions} />
            </div>
        </div>
    );
};

export default ChartSection;