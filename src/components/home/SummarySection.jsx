import React from "react";

const SummarySection = ({ getCategorySummary }) => {
    return (
        <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4 text-center text-white">Category Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(getCategorySummary()).map(([category, amount]) => (
                    <div key={category} className="bg-gray-800 p-4 rounded-lg shadow-md">
                        <p className="text-lg font-medium text-gray-200">{category}</p>
                        <p className="text-xl text-blue-400">₹{amount}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SummarySection;