import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { FaChartColumn } from "react-icons/fa6";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartSection = ({ viewType, getChartData }) => {
    const rawChartData = getChartData();

    // Check if chartData has meaningful data
    const hasData = 
        rawChartData && 
        rawChartData.labels && 
        rawChartData.labels.length > 0 && 
        rawChartData.labels[0] !== "No Data" &&
        rawChartData.datasets && 
        rawChartData.datasets[0] &&
        rawChartData.datasets[0].data && 
        rawChartData.datasets[0].data.some(val => val > 0);

    // Enhanced chart styling with rounded corners & sleek colors
    const chartData = {
        labels: rawChartData?.labels || ["No Data"],
        datasets: (rawChartData?.datasets || []).map((ds, idx) => {
            if (idx === 0) {
                // Expenses
                return {
                    ...ds,
                    backgroundColor: "rgba(99, 102, 241, 0.75)",
                    borderColor: "rgba(129, 140, 248, 1)",
                    borderWidth: 1.5,
                    borderRadius: 8,
                    hoverBackgroundColor: "rgba(99, 102, 241, 0.95)",
                };
            }
            if (idx === 1) {
                // Budget
                return {
                    ...ds,
                    backgroundColor: "rgba(16, 185, 129, 0.45)",
                    borderColor: "rgba(52, 211, 153, 0.9)",
                    borderWidth: 1.5,
                    borderRadius: 8,
                    hoverBackgroundColor: "rgba(16, 185, 129, 0.65)",
                };
            }
            // Remaining
            return {
                ...ds,
                backgroundColor: "rgba(245, 158, 11, 0.45)",
                borderColor: "rgba(251, 191, 36, 0.9)",
                borderWidth: 1.5,
                borderRadius: 8,
                hoverBackgroundColor: "rgba(245, 158, 11, 0.65)",
            };
        }),
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
                align: "end",
                labels: {
                    color: "#94a3b8",
                    font: { family: "'Plus Jakarta Sans', sans-serif", size: 12, weight: 600 },
                    usePointStyle: true,
                    pointStyle: "circle",
                    padding: 16,
                },
            },
            title: {
                display: false,
            },
            tooltip: {
                backgroundColor: "rgba(15, 23, 42, 0.92)",
                titleColor: "#ffffff",
                bodyColor: "#cbd5e1",
                titleFont: { family: "'Plus Jakarta Sans', sans-serif", size: 13, weight: 700 },
                bodyFont: { family: "'Plus Jakarta Sans', sans-serif", size: 12 },
                borderColor: "rgba(255, 255, 255, 0.1)",
                borderWidth: 1,
                padding: 12,
                cornerRadius: 10,
                boxPadding: 6,
                usePointStyle: true,
                callbacks: {
                    label: function (context) {
                        return ` ${context.dataset.label}: ₹${context.parsed.y.toLocaleString()}`;
                    },
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: "#94a3b8",
                    font: { family: "'Plus Jakarta Sans', sans-serif", size: 11, weight: 500 },
                },
                grid: {
                    display: false,
                },
                border: {
                    color: "rgba(255, 255, 255, 0.1)",
                },
            },
            y: {
                ticks: {
                    color: "#94a3b8",
                    font: { family: "'Plus Jakarta Sans', sans-serif", size: 11 },
                    callback: (value) => `₹${value.toLocaleString()}`,
                },
                grid: {
                    color: "rgba(255, 255, 255, 0.05)",
                },
                border: {
                    dash: [4, 4],
                    color: "rgba(255, 255, 255, 0.1)",
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="p-6 rounded-2xl glass-panel relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-inner">
                        <FaChartColumn size={16} />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-white tracking-tight">
                            Spending Velocity & Budget Comparison
                        </h3>
                        <p className="text-xs text-slate-400">
                            {viewType === "monthly" ? "Monthly" : "Weekly"} timeline tracking vs budget limit
                        </p>
                    </div>
                </div>
            </div>

            <div className="h-72 w-full">
                {hasData ? (
                    <Bar data={chartData} options={chartOptions} />
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 rounded-xl border border-dashed border-white/10 bg-slate-900/40">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-3">
                            <FaChartColumn size={22} />
                        </div>
                        <p className="text-sm font-semibold text-slate-300">
                            No Visual Analytics Available Yet
                        </p>
                        <p className="text-xs text-slate-500 mt-1 max-w-sm">
                            Add your first expense or set a budget above to generate interactive trend curves.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChartSection;