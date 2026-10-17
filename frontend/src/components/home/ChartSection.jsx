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
import { useTheme } from "../../context/ThemeContext";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartSection = ({ viewType, getChartData }) => {
    const { isDark } = useTheme();
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

    const chartData = {
        labels: rawChartData?.labels || ["No Data"],
        datasets: (rawChartData?.datasets || []).map((ds, idx) => {
            if (idx === 0) {
                return {
                    ...ds,
                    backgroundColor: isDark ? "rgba(99, 102, 241, 0.75)" : "rgba(79, 70, 229, 0.8)",
                    borderColor: "rgba(99, 102, 241, 1)",
                    borderWidth: 1.5,
                    borderRadius: 8,
                    hoverBackgroundColor: "rgba(99, 102, 241, 0.95)",
                };
            }
            if (idx === 1) {
                return {
                    ...ds,
                    backgroundColor: isDark ? "rgba(16, 185, 129, 0.45)" : "rgba(16, 185, 129, 0.55)",
                    borderColor: "rgba(16, 185, 129, 0.9)",
                    borderWidth: 1.5,
                    borderRadius: 8,
                    hoverBackgroundColor: "rgba(16, 185, 129, 0.75)",
                };
            }
            return {
                ...ds,
                backgroundColor: isDark ? "rgba(245, 158, 11, 0.45)" : "rgba(245, 158, 11, 0.55)",
                borderColor: "rgba(245, 158, 11, 0.9)",
                borderWidth: 1.5,
                borderRadius: 8,
                hoverBackgroundColor: "rgba(245, 158, 11, 0.75)",
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
                    color: isDark ? "#94a3b8" : "#475569",
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
                backgroundColor: isDark ? "rgba(15, 23, 42, 0.92)" : "rgba(255, 255, 255, 0.95)",
                titleColor: isDark ? "#ffffff" : "#0f172a",
                bodyColor: isDark ? "#cbd5e1" : "#334155",
                titleFont: { family: "'Plus Jakarta Sans', sans-serif", size: 13, weight: 700 },
                bodyFont: { family: "'Plus Jakarta Sans', sans-serif", size: 12 },
                borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
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
                    color: isDark ? "#94a3b8" : "#64748b",
                    font: { family: "'Plus Jakarta Sans', sans-serif", size: 11, weight: 500 },
                },
                grid: {
                    display: false,
                },
                border: {
                    color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
                },
            },
            y: {
                ticks: {
                    color: isDark ? "#94a3b8" : "#64748b",
                    font: { family: "'Plus Jakarta Sans', sans-serif", size: 11 },
                    callback: (value) => `₹${value.toLocaleString()}`,
                },
                grid: {
                    color: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                },
                border: {
                    dash: [4, 4],
                    color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="p-6 rounded-2xl glass-panel relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-inner">
                        <FaChartColumn size={16} />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                            Spending Velocity & Budget Comparison
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            {viewType === "monthly" ? "Monthly" : "Weekly"} timeline tracking vs budget limit
                        </p>
                    </div>
                </div>
            </div>

            <div className="h-72 w-full">
                {hasData ? (
                    <Bar data={chartData} options={chartOptions} />
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 rounded-xl border border-dashed border-slate-300 dark:border-white/10 bg-slate-100/50 dark:bg-slate-900/40">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-3">
                            <FaChartColumn size={22} />
                        </div>
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            No Visual Analytics Available Yet
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-500 mt-1 max-w-sm">
                            Add your first expense or set a budget above to generate interactive trend curves.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChartSection;