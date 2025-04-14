import React from "react";
import ExpenseCard from "../shared/ExpenseCard"; // Assuming ExpenseCard is in src/components/shared/ExpenseCard.jsx

const ExpenseList = ({ expenses }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {expenses.length === 0 ? (
                <p className="text-center col-span-full text-gray-400">No expenses yet. Add some!</p>
            ) : (
                expenses.map((expense) => <ExpenseCard key={expense.id} expense={expense} />)
            )}
        </div>
    );
};

export default ExpenseList;