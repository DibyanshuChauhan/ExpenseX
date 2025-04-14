import React from "react";

const BudgetInput = ({ budget, handleBudgetChange, currentBudget, totalSpent, remainingBudget }) => {
    return (
        <div className="mb-4">
            <input
                type="number"
                placeholder="Enter Monthly Budget (₹)"
                value={budget}
                onChange={handleBudgetChange}
                className="w-full p-3 bg-gray-700 border-none rounded-lg focus:ring-2 focus:ring-blue-500 transition text-white"
            />
            {currentBudget > 0 && (
                <p className="mt-2 text-sm text-gray-300">
                    Budget set: ₹{currentBudget} | Total Spent: ₹{totalSpent} | Remaining: ₹{remainingBudget > 0 ? remainingBudget : 0}
                </p>
            )}
        </div>
    );
};

export default BudgetInput;