import React from "react";
import { Bar } from "react-chartjs-2"; // Imports the Bar chart component from react-chartjs-2
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js"; // Imports necessary Chart.js components for rendering the bar chart

// Registers Chart.js components to enable bar chart functionality
// CategoryScale: For x-axis labels (e.g., categories or time periods)
// LinearScale: For y-axis numeric values
// BarElement: For rendering bars
// Title, Tooltip, Legend: For chart title, tooltips, and legend
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// ChartSection component
// Purpose: Displays a bar chart showing expense trends (weekly or monthly) alongside budget, with conditional rendering for data validation
// Props:
// - viewType: String indicating the time period for the chart ("monthly" or "weekly")
// - getChartData: Function that returns chart data (labels and datasets) for rendering
const ChartSection = ({ viewType, getChartData }) => {
    // Chart configuration options to customize appearance and behavior
    const chartOptions = {
        responsive: true, // Ensures the chart adapts to container size (responsive design)
        plugins: {
            legend: {
                position: "top", // Places the legend at the top of the chart
                labels: { color: "white" }, // Sets legend labels to white for visibility on dark background
            },
            title: {
                display: true, // Shows the chart title
                // Dynamically sets title based on viewType ("Monthly" or "Weekly")
                text: `${viewType === "monthly" ? "Monthly" : "Weekly"} Expense Trends with Budget`,
                color: "white", // White title text for contrast
            },
        },
        // Configures axis styling
        scales: {
            x: { ticks: { color: "white" } }, // White x-axis labels (e.g., categories or time periods)
            y: {
                ticks: { color: "white" }, // White y-axis labels (e.g., amounts)
                beginAtZero: true, // Forces y-axis to start at 0 for clear visualization
            },
        },
    };

    // Retrieves chart data by calling the provided getChartData function
    // Expected format: { labels: string[], datasets: { label: string, data: number[] }[] }
    const chartData = getChartData();

    // Validates chart data to ensure it’s usable for rendering
    // Checks if chartData exists, has non-empty labels, and has at least one dataset
    // Acts as a safety check to prevent rendering an empty or invalid chart
    const isValidChartData = chartData && chartData.labels && chartData.labels.length > 0 && chartData.datasets && chartData.datasets.length > 0;

    return (
        // Container div for the chart section with top margin for spacing
        <div className="mt-8">
            {/* Section title, centered and styled for prominence */}
            <h3 className="text-2xl font-semibold mb-4 text-center text-white">
                Expense Trends with Budget
            </h3>

            {/* Chart container with dark background, padding, rounded corners, and shadow */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                {/* 
                    Conditional rendering for the bar chart
                    Here’s where we decide what to show based on the chart data’s validity.
                    We use `isValidChartData` to check if the data from `getChartData()` is good to go—meaning it has labels (like categories or time periods) and at least one dataset with numbers to plot.
                    If `isValidChartData` is true, we render the <Bar> component with the chart data and options, displaying a nice bar chart of expense trends.
                    If it’s false (e.g., no expenses added yet, or `getChartData()` returns null or empty data), we skip the chart and show a clear message: “No expense data available yet. Add some expenses to see the trends!”
                    This approach prevents rendering a blank or broken chart, which could confuse users or cause errors. Instead, the message guides users to add expenses, making the UI intuitive and helpful.
                */}
                {isValidChartData ? (
                    // Renders the Bar chart with the provided data and configuration options
                    <Bar data={chartData} options={chartOptions} />
                ) : (
                    // Displays a fallback message when no valid data is available
                    // Centered, gray text, flexbox for vertical and horizontal alignment
                    <p className="text-center text-gray-400 h-full flex items-center justify-center">
                        No expense data available yet. Add some expenses to see the trends!
                    </p>
                )}
            </div>
        </div>
    );
};

// Exports the ChartSection component for use in the application
export default ChartSection;