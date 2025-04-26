import React from "react";

// SummarySection component
// Purpose: Displays a summary of expenses grouped by category, showing each category and its total spent amount in a responsive grid of cards
// Props:
// - getCategorySummary: Function that returns an object with category names as keys and total spent amounts as values
const SummarySection = ({ getCategorySummary }) => {
    return (
        // Container for the summary section with top margin for spacing
        <div className="mt-8">
            {/* Section heading, centered and styled for prominence */}
            <h3 className="text-2xl font-semibold mb-4 text-center text-white">
                Category Summary
            </h3>

            {/* Grid layout for summary cards, responsive across screen sizes */}
            {/* 1 column on small screens, 2 on small-medium, 3 on large screens, with 4-unit gap */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Iterates over category-amount pairs from getCategorySummary */}
                {/* Object.entries converts the object into an array of [category, amount] pairs */}
                {Object.entries(getCategorySummary()).map(([category, amount]) => (
                    // Card for each category, styled with dark background, padding, and shadow
                    <div key={category} className="bg-gray-800 p-4 rounded-lg shadow-md">
                        {/* Category name, styled for clarity */}
                        <p className="text-lg font-medium text-gray-200">{category}</p>
                        {/* Total amount spent, highlighted in blue */}
                        <p className="text-xl text-blue-400">₹{amount}</p>
                    </div>
                ))}
                {/* 
                    How the cards are rendered:
                    - Calls `getCategorySummary()` to get an object of category-amount pairs (e.g., { Food: 500, Travel: 200 }).
                    - Uses `Object.entries` to convert the object into an array of [category, amount] pairs.
                    - Maps over the array to create a card for each pair, with the category as the unique `key`.
                    - Each card displays the category name and total amount spent, styled for readability.
                    - If `getCategorySummary()` returns an empty object (no expenses), no cards are rendered, keeping the grid empty but clean.
                */}
            </div>
        </div>
    );
};

// Exports the SummarySection component for use in the application
export default SummarySection;