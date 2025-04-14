/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import DatePicker from "react-datepicker"; // Importing datepicker
import "react-datepicker/dist/react-datepicker.css"; // Importing datepicker styles
import { toast } from "react-toastify"; // Added for toast notifications

const ExpenseForm = ({ addExpense }) => {
    // Predefined category options
    const categories = [
        "Food",
        "Travel",
        "Shopping",
        "Entertainment",
        "Bills",
        "Health",
        "Education",
        "Groceries",
        "Rent",
        "Transportation",
        "Subscriptions",
        "Savings",
        "Investments",
        "Gifts & Donations",
        "Personal Care",
        "Childcare",
        "Pet Care",
        "Insurance",
        "Taxes",
        "Work Expenses",
        "Home Maintenance",
        "Fitness",
        "Clothing",
        "Electronics",
        "Events & Parties",
        "Medicines",
        "Other",
    ];

    const [form, setForm] = useState({
        amount: "",
        category: "",
        date: new Date(), // Default to current date for DatePicker
        description: "",
    });
    const [isOpen, setIsOpen] = useState(false); // Dropdown open/close state
    const [filteredCategories, setFilteredCategories] = useState(categories); // Filtered list for autocomplete

    // Handle input change and filter categories
    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setForm({ ...form, category: value });
        setFilteredCategories(
            categories.filter((cat) => cat.toLowerCase().includes(value.toLowerCase()))
        );
    };

    // Select category from dropdown
    const selectCategory = (cat) => {
        setForm({ ...form, category: cat });
        setIsOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.amount || !form.category || !form.date || !form.description) {
            toast.error("Please fill all fields before adding an expense!", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
                className: "navbar-poppins",
            });
            return;
        }
        addExpense(form);
        setForm({ amount: "", category: "", date: new Date(), description: "" }); // Reset form with current date
        setFilteredCategories(categories); // Reset filtered list
        // Removed toast.success here to avoid duplicate
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (isOpen && !e.target.closest(".dropdown-container")) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    // Handle date change for DatePicker
    const handleDateChange = (date) => {
        setForm({ ...form, date });
    };

    // Handle amount change
    const handleAmountChange = (e) => {
        const value = e.target.value;
        const numValue = parseFloat(value);
        if (value === "" || (numValue >= 0 && !isNaN(numValue))) {
            setForm({ ...form, amount: value });
        } else {
            toast.error("Amount cannot be negative!", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
                className: "navbar-poppins",
            });
            setForm({ ...form, amount: "" }); // Reset to empty if negative
        }
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="bg-gray-800/80 backdrop-blur-md p-6 rounded-xl shadow-2xl border border-gray-700"
        >
            <input
                type="number"
                placeholder="Amount (₹)"
                value={form.amount}
                onChange={handleAmountChange}
                className="w-full p-3 mb-4 bg-gray-700 border-none rounded-lg focus:ring-2 focus:ring-blue-500 transition text-white"
                required
            />
            {/* Custom Category Dropdown with container class */}
            <div className="relative mb-4 dropdown-container">
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Category"
                        value={form.category}
                        onChange={handleCategoryChange}
                        onFocus={() => setIsOpen(true)}
                        className="w-full p-3 bg-gray-700 border-none rounded-lg focus:ring-2 focus:ring-blue-500 transition text-white"
                        required
                    />
                    <motion.button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className="absolute right-2 p-2 text-gray-400"
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <FaChevronDown />
                    </motion.button>
                </div>
                <AnimatePresence>
                    {isOpen && (
                        <motion.ul
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                        >
                            {filteredCategories.length > 0 ? (
                                filteredCategories.map((cat, index) => (
                                    <motion.li
                                        key={index}
                                        whileHover={{ backgroundColor: "#4B5563", color: "#fff" }}
                                        onClick={() => selectCategory(cat)}
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
            <div className="mb-4">
                <DatePicker
                    selected={form.date}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    className="w-full p-3 bg-gray-700 border-none rounded-lg focus:ring-2 focus:ring-blue-500 transition text-white"
                    placeholderText="Select Date"
                    required
                    wrapperClassName="w-full"
                />
            </div>
            <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full p-3 mb-4 bg-gray-700 border-none rounded-lg focus:ring-2 focus:ring-blue-500 transition text-white"
                required
            />
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-3 rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all"
            >
                Add Expense
            </motion.button>
        </motion.form>
    );
};

export default ExpenseForm;