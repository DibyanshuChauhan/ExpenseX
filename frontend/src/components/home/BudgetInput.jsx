import React from "react";

// BudgetInput component
// Purpose: Provides an input field for users to set their monthly budget and conditionally displays budget details (set budget, total spent, remaining budget)
// Props:
// - budget: The current value of the budget input field (controlled by parent component)
// - handleBudgetChange: Function to handle changes to the budget input, updates the budget state
// - currentBudget: The confirmed/set budget amount (numeric value, typically stored in localStorage or state)
// - totalSpent: The total amount spent, calculated from expenses
// - remainingBudget: The remaining budget (currentBudget - totalSpent)
const BudgetInput = ({ budget, handleBudgetChange, currentBudget, totalSpent, remainingBudget }) => {
    return (
        // Container div for the budget input and budget details, with bottom margin for spacing
        <div className="mb-4">
            {/* Input field for entering the monthly budget */}
            {/* Type 'number' restricts input to numeric values */}
            <input
                type="number"
                placeholder="Enter Monthly Budget (₹)" // Placeholder text with rupee symbol
                value={budget} // Controlled input, bound to the budget prop
                onChange={handleBudgetChange} // Calls handleBudgetChange on input change to update budget state
                className="w-full p-3 bg-gray-700 border-none rounded-lg focus:ring-2 focus:ring-blue-500 transition text-white" // Tailwind CSS for styling: full width, padding, dark background, rounded, blue focus ring, white text
            />

            {/* 
                Display budget info only if budget is greater than 0
                Alright, let’s dive into the conditional rendering here!
                This is where we decide whether to show the budget details or not, and it’s pretty cool how it works.
                We’re using the && operator to check if currentBudget is greater than 0. If it is—like if the user has actually set a budget—we render that <p> tag with the budget breakdown: the set budget, total spent, and remaining amount.
                But if currentBudget is 0 or less (maybe the user hasn’t entered anything yet or it’s been reset), the whole thing gets skipped, and nothing shows up below the input.
                This is super handy because it keeps the UI clean—why clutter the screen with zeros or nonsense if there’s no budget to show? Plus, it avoids confusing the user with negative numbers or empty stats.
                It’s like saying, “Hey, only show this info when it makes sense!” This little check makes the component feel smart and user-friendly, only popping up the details when they’re actually meaningful.
            */}
            {/* CONDITIONAL RENDERING: Displays budget details only if currentBudget is greater than 0 */}
            {/* Uses the && operator to render the <p> tag only when the condition is true */}
            {currentBudget > 0 && (
                <p className="mt-2 text-sm text-gray-300">
                    {/* Displays the set budget, total spent, and remaining budget */}
                    Budget set: ₹{currentBudget} | Total Spent: ₹{totalSpent} |
                    {/* Nested conditional rendering for remainingBudget: Shows 0 if negative to avoid confusing users */}
                    Remaining: ₹{remainingBudget > 0 ? remainingBudget : 0}
                </p>
            )}
        </div>
    );
};

// Exports the BudgetInput component for use in the application
export default BudgetInput;