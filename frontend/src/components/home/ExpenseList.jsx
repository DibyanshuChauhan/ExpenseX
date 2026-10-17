import React from "react";
import ExpenseCard from "../shared/ExpenseCard"; // Imports the ExpenseCard component to display individual expense details

// ExpenseList component
// Purpose: Displays a list of expenses in a responsive grid layout, rendering individual ExpenseCard components or a message if no expenses exist
// Props:
// - expenses: Array of expense objects, each containing details like id, amount, category, date, and description
const ExpenseList = ({ expenses }) => {
    return (
        // Grid container for expenses with responsive columns
        // 1 column on small screens, 2 on small-medium, 3 on large screens, with 6-unit gap
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {/* 
                Conditional Rendering:
                This ternary operator checks if the `expenses` array is empty to decide what to display.
                If `expenses.length === 0`, no expenses are present, so we render a `<p>` element with a clear message: 
                "No expenses yet. Add some!" This message spans the entire grid (`col-span-full`) for visibility, 
                styled with a light gray color (`text-gray-400`) to be subtle yet readable.
                The centered text ensures it looks clean and prominent in the grid.
            */}
            {expenses.length === 0 ? (
                <p className="text-center col-span-full text-gray-400">
                    No expenses yet. Add some!
                </p>
            ) : (
                /* 
                    Conditional Rendering (Non-Empty Case):
                    If `expenses.length > 0`, this block runs, rendering a list of ExpenseCard components.
                    The `map` function iterates over the `expenses` array, creating an `ExpenseCard` for each expense.
                    Each `ExpenseCard` gets a unique `key` prop (expense.id) to help React optimize DOM updates.
                    The `expense` object is passed as a prop to `ExpenseCard` to display its details (e.g., amount, category, date).
                    The grid layout ensures expenses are shown as cards, arranged responsively based on screen size.
                */
                expenses.map((expense) => (
                    <ExpenseCard key={expense.id} expense={expense} />
                ))
            )}
        </div>
    );
};

// Exports the ExpenseList component for use in the application
export default ExpenseList;