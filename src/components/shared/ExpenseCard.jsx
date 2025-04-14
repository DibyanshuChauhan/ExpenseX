import React from "react";

const ExpenseCard = ({ expense }) => {
    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h4 className="text-lg font-medium text-white">{expense.description}</h4>
            <p className="text-sm text-gray-300 mt-1">
                <span className="text-blue-400">Category:</span> {expense.category} |{" "}
                <span className="text-purple-400">Date:</span> {new Date(expense.date).toLocaleDateString()} |{" "}
                <span className="text-green-400">Amount:</span> ₹{expense.amount}
            </p>
        </div>
    );
};

export default ExpenseCard;