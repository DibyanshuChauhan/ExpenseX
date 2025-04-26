/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // For form and dropdown animations
import { FaChevronDown } from "react-icons/fa"; // Icon for dropdown toggle
import DatePicker from "react-datepicker"; // Component for selecting dates
import "react-datepicker/dist/react-datepicker.css"; // Styles for the date picker
import { toast } from "react-toastify"; // For displaying notification messages

// ExpenseForm component
// Purpose: Provides a form for users to add new expenses, with fields for amount, category, date, and description, and a dropdown for category selection
// Props:
// - addExpense: Function passed from parent to handle adding the new expense to the application's data
const ExpenseForm = ({ addExpense }) => {
    // Predefined list of expense categories for the dropdown
    const categories = [
        "Food", "Travel", "Shopping", "Entertainment", "Bills", "Health", "Education", "Groceries", "Rent",
        "Transportation", "Subscriptions", "Savings", "Investments", "Gifts & Donations", "Personal Care",
        "Childcare", "Pet Care", "Insurance", "Taxes", "Work Expenses", "Home Maintenance", "Fitness",
        "Clothing", "Electronics", "Events & Parties", "Medicines", "Other"
    ];

    // State to manage form input values
    // Initialized with empty/default values, with date set to today
    const [form, setForm] = useState({
        amount: "", // Expense amount (string to handle input)
        category: "", // Selected or typed category
        date: new Date(), // Default to current date
        description: "", // Expense description
    });

    // State to toggle the category dropdown's visibility
    const [isOpen, setIsOpen] = useState(false);

    // State to store filtered categories based on user input
    // Initialized with the full categories list
    const [filteredCategories, setFilteredCategories] = useState(categories);

    // Handles changes to the category input
    // Updates the form's category and filters the dropdown list
    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setForm({ ...form, category: value }); // Updates category in form state
        // Filters categories based on case-insensitive match with input
        setFilteredCategories(
            categories.filter((cat) => cat.toLowerCase().includes(value.toLowerCase()))
        );
    };

    // Handles selecting a category from the dropdown
    // Sets the selected category in the form and closes the dropdown
    const selectCategory = (cat) => {
        setForm({ ...form, category: cat });
        setIsOpen(false);
    };

    // Handles form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents page refresh
        // Validates that all fields are filled
        if (!form.amount || !form.category || !form.date || !form.description) {
            // Shows error toast if any field is empty
            toast.error("Please fill all fields before adding an expense!", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
                className: "navbar-poppins",
            });
            return;
        }
        // Calls addExpense with form data to add the expense
        addExpense(form);
        // Resets form to initial state
        setForm({ amount: "", category: "", date: new Date(), description: "" });
        // Resets filtered categories to full list
        setFilteredCategories(categories);
    };

    // Effect to close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            // Checks if dropdown is open and click is outside dropdown container
            if (isOpen && !e.target.closest(".dropdown-container")) {
                setIsOpen(false);
            }
        };
        // Adds event listener for mouse clicks
        document.addEventListener("mousedown", handleClickOutside);
        // Cleanup: Removes event listener on unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]); // Re-runs when isOpen changes

    // Handles date selection from DatePicker
    const handleDateChange = (date) => {
        setForm({ ...form, date }); // Updates date in form state
    };

    // Handles amount input and validates for non-negative numbers
    const handleAmountChange = (e) => {
        const value = e.target.value;
        const numValue = parseFloat(value);
        // Allows empty input or non-negative numbers
        if (value === "" || (numValue >= 0 && !isNaN(numValue))) {
            setForm({ ...form, amount: value });
        } else {
            // Shows error toast for negative amounts
            toast.error("Amount cannot be negative!", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
                className: "navbar-poppins",
            });
            setForm({ ...form, amount: "" }); // Resets amount field
        }
    };

    return (
        // Animated form container with Framer Motion
        // Fades in and slides up on mount
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="bg-gray-800/80 backdrop-blur-md p-6 rounded-xl shadow-2xl border border-gray-700"
        >
            {/* Input field for expense amount */}
            <input
                type="number" // Restricts to numeric input
                placeholder="Amount (₹)" // Placeholder with rupee symbol
                value={form.amount} // Controlled input
                onChange={handleAmountChange} // Validates and updates amount
                className="w-full p-3 mb-4 bg-gray-700 border-none rounded-lg focus:ring-2 focus:ring-blue-500 transition text-white"
                required // Enforces input
            />

            {/* Category dropdown section */}
            <div className="relative mb-4 dropdown-container">
                <div className="flex items-center">
                    {/* Input for typing or selecting category */}
                    <input
                        type="text" // Allows typing for filtering
                        placeholder="Category"
                        value={form.category} // Controlled input
                        onChange={handleCategoryChange} // Filters categories
                        onFocus={() => setIsOpen(true)} // Opens dropdown on focus
                        className="w-full p-3 bg-gray-700 border-none rounded-lg focus:ring-2 focus:ring-blue-500 transition text-white"
                        required
                    />
                    {/* Dropdown toggle button with animated icon */}
                    <motion.button
                        type="button" // Prevents form submission
                        onClick={() => setIsOpen(!isOpen)} // Toggles dropdown
                        className="absolute right-2 p-2 text-gray-400"
                        animate={{ rotate: isOpen ? 180 : 0 }} // Rotates icon when open
                        transition={{ duration: 0.3 }}
                    >
                        <FaChevronDown />
                    </motion.button>
                </div>

                {/* 
                    Conditional rendering for the category dropdown
                    This controls whether the category dropdown is visible.
                    The `isOpen` state is `true` when the user focuses the category input or clicks the dropdown button.
                    If `isOpen` is `true`, we render an animated `<motion.ul>` containing category suggestions, wrapped in `AnimatePresence` for smooth entry/exit animations.
                    If `isOpen` is `false`, nothing is rendered, keeping the form clean and uncluttered.
                    The `AnimatePresence` ensures the dropdown slides in and out smoothly, enhancing the user experience with a polished feel.
                */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.ul
                            initial={{ opacity: 0, y: -10 }} // Starts slightly above and invisible
                            animate={{ opacity: 1, y: 0 }} // Slides down and fades in
                            exit={{ opacity: 0, y: -10 }} // Slides up and fades out
                            transition={{ duration: 0.2 }} // Animation duration
                            className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                        >
                            {/* 
                                Conditional rendering for dropdown content
                                Here, we decide what to show inside the dropdown based on `filteredCategories`.
                                If `filteredCategories` has items (categories matching the user’s input, like typing “Foo” to get “Food”), we map over them to create clickable `<motion.li>` elements.
                                Each list item highlights on hover, and clicking it calls `selectCategory` to set the category and close the dropdown.
                                If `filteredCategories` is empty (e.g., typing “xyz” with no matches), we render a single `<li>` with “No matching categories” to inform the user.
                                This ensures the dropdown always provides clear feedback, either with options or a message, making the form intuitive and user-friendly.
                            */}
                            {filteredCategories.length > 0 ? (
                                filteredCategories.map((cat, index) => (
                                    <motion.li
                                        key={index} // Unique key for React
                                        whileHover={{ backgroundColor: "#4B5563", color: "#fff" }} // Hover animation
                                        onClick={() => selectCategory(cat)} // Sets category and closes dropdown
                                        className="p-3 cursor-pointer text-gray-200 hover:bg-gray-600 transition-colors"
                                    >
                                        {cat}
                                    </motion.li>
                                ))
                            ) : (
                                <li className="p-3 text-gray-400">No matching categories</li>
                            )}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>

            {/* Date picker for selecting expense date */}
            <div className="mb-4">
                <DatePicker
                    selected={form.date} // Current selected date
                    onChange={handleDateChange} // Updates date in form state
                    dateFormat="dd/MM/yyyy" // Date format
                    className="w-full p-3 bg-gray-700 border-none rounded-lg focus:ring-2 focus:ring-blue-500 transition text-white"
                    placeholderText="Select Date"
                    required
                    wrapperClassName="w-full" // Ensures full width
                />
            </div>

            {/* Textarea for expense description */}
            <textarea
                placeholder="Description"
                value={form.description} // Controlled input
                onChange={(e) => setForm({ ...form, description: e.target.value })} // Updates description
                className="w-full p-3 mb-4 bg-gray-700 border-none rounded-lg focus:ring-2 focus:ring-blue-500 transition text-white"
                required
            />

            {/* Submit button with animations */}
            <motion.button
                whileHover={{ scale: 1.05 }} // Scales up on hover
                whileTap={{ scale: 0.95 }} // Scales down on click
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-3 rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all"
            >
                Add Expense
            </motion.button>
        </motion.form>
    );
};

// Exports the ExpenseForm component for use in the application
export default ExpenseForm;