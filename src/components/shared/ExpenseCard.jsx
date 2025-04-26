import React from "react";

// ExpenseCard component
// Props:
// - expense: Object containing details of a single expense (description, category, date, amount)
const ExpenseCard = ({ expense }) => {
    // The component renders a card displaying details of a single expense
    return (
        // Container div with styling for a card-like appearance (dark background, padding, rounded corners, shadow)
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            {/* Expense description displayed as a heading */}
            <h4 className="text-lg font-medium text-white">{expense.description}</h4>

            {/* Paragraph containing category, date, and amount of the expense */}
            <p className="text-sm text-gray-300 mt-1">
                {/* Category section with blue-colored label */}
                <span className="text-blue-400">Category:</span> {expense.category} |{" "}
                {/* Date section with purple-colored label, formatted to local date string */}
                <span className="text-purple-400">Date:</span> {new Date(expense.date).toLocaleDateString()} |{" "}
                {/* Amount section with green-colored label, prefixed with rupee symbol */}
                <span className="text-green-400">Amount:</span> ₹{expense.amount}
            </p>
        </div>
    );
};

// Export the component for use in other parts of the application
export default ExpenseCard;