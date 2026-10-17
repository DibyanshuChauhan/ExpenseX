/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    FaChevronDown, 
    FaPlus, 
    FaUtensils, 
    FaPlane, 
    FaBagShopping, 
    FaFilm, 
    FaFileInvoiceDollar, 
    FaHeartPulse, 
    FaGraduationCap, 
    FaCartShopping, 
    FaHouse, 
    FaCalendarDays 
} from "react-icons/fa6";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

const categoryIconMap = {
    Food: FaUtensils,
    Travel: FaPlane,
    Shopping: FaBagShopping,
    Entertainment: FaFilm,
    Bills: FaFileInvoiceDollar,
    Health: FaHeartPulse,
    Education: FaGraduationCap,
    Groceries: FaCartShopping,
    Rent: FaHouse,
};

const ExpenseForm = ({ addExpense, disabled = false }) => {
    const categories = [
        "Food", "Travel", "Shopping", "Entertainment", "Bills", "Health", "Education", "Groceries", "Rent",
        "Transportation", "Subscriptions", "Savings", "Investments", "Gifts & Donations", "Personal Care",
        "Childcare", "Pet Care", "Insurance", "Taxes", "Work Expenses", "Home Maintenance", "Fitness",
        "Clothing", "Electronics", "Events & Parties", "Medicines", "Other"
    ];

    const [form, setForm] = useState({
        amount: "",
        category: "",
        date: new Date(),
        description: "",
    });

    const [isOpen, setIsOpen] = useState(false);
    const [filteredCategories, setFilteredCategories] = useState(categories);

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setForm({ ...form, category: value });
        setFilteredCategories(
            categories.filter((cat) => cat.toLowerCase().includes(value.toLowerCase()))
        );
    };

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
        setForm({ amount: "", category: "", date: new Date(), description: "" });
        setFilteredCategories(categories);
    };

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

    const handleDateChange = (date) => {
        setForm({ ...form, date });
    };

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
            setForm({ ...form, amount: "" });
        }
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            onSubmit={handleSubmit}
            className="p-6 rounded-2xl glass-panel relative overflow-hidden"
        >
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-600 dark:text-violet-400 shadow-inner">
                        <FaPlus size={16} />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                            Record New Transaction
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Log spending details with instant categorization
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Amount Input */}
                <div>
                    <label className="block text-[11px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1.5">
                        Amount (₹)
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 dark:text-slate-400 font-bold">
                            ₹
                        </div>
                        <input
                            type="number"
                            placeholder="0.00"
                            value={form.amount}
                            onChange={handleAmountChange}
                            disabled={disabled}
                            required
                            className="w-full pl-8 pr-4 py-3 bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700/80 rounded-xl text-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 font-mono font-medium focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-600 dark:focus:border-indigo-400 shadow-sm transition-all text-sm disabled:opacity-50 outline-none"
                        />
                    </div>
                </div>

                {/* Category Dropdown */}
                <div className="relative dropdown-container">
                    <label className="block text-[11px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1.5">
                        Category
                    </label>
                    <div className="relative flex items-center">
                        <input
                            type="text"
                            placeholder="Select or type category..."
                            value={form.category}
                            onChange={handleCategoryChange}
                            onFocus={() => setIsOpen(true)}
                            disabled={disabled}
                            required
                            className="w-full pl-3.5 pr-10 py-3 bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700/80 rounded-xl text-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 font-medium focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-600 dark:focus:border-indigo-400 shadow-sm transition-all text-sm disabled:opacity-50 outline-none"
                        />
                        <button
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            disabled={disabled}
                            className="absolute right-3 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
                        >
                            <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                <FaChevronDown size={14} />
                            </motion.div>
                        </button>
                    </div>

                    <AnimatePresence>
                        {isOpen && (
                            <motion.ul
                                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                                transition={{ duration: 0.15 }}
                                className="absolute z-30 w-full mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl max-h-56 overflow-y-auto p-1.5 space-y-0.5"
                            >
                                {filteredCategories.length > 0 ? (
                                    filteredCategories.map((cat, index) => {
                                        const IconComp = categoryIconMap[cat] || FaBagShopping;
                                        return (
                                            <li
                                                key={index}
                                                onClick={() => selectCategory(cat)}
                                                className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-600/30 hover:text-indigo-600 dark:hover:text-white transition-all"
                                            >
                                                <span className="w-6 h-6 rounded-md bg-slate-100 dark:bg-white/5 flex items-center justify-center text-indigo-500 dark:text-indigo-400">
                                                    <IconComp size={12} />
                                                </span>
                                                <span>{cat}</span>
                                            </li>
                                        );
                                    })
                                ) : (
                                    <li className="p-3 text-xs text-slate-500 text-center font-medium">
                                        No matching categories
                                    </li>
                                )}
                            </motion.ul>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                {/* Date Picker */}
                <div>
                    <label className="block text-[11px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <FaCalendarDays size={12} className="text-indigo-600 dark:text-indigo-400" />
                        <span>Date</span>
                    </label>
                    <DatePicker
                        selected={form.date}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        disabled={disabled}
                        className="w-full px-3.5 py-3 bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700/80 rounded-xl text-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 font-medium focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-600 dark:focus:border-indigo-400 shadow-sm transition-all text-sm disabled:opacity-50 outline-none"
                        placeholderText="Select Date"
                        required
                        wrapperClassName="w-full"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-[11px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1.5">
                        Description / Note
                    </label>
                    <input
                        type="text"
                        placeholder="What was this expense for?"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        disabled={disabled}
                        required
                        className="w-full px-3.5 py-3 bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700/80 rounded-xl text-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 font-medium focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-600 dark:focus:border-indigo-400 shadow-sm transition-all text-sm disabled:opacity-50 outline-none"
                    />
                </div>
            </div>

            {/* Submit Button */}
            <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={disabled}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
                <FaPlus size={14} />
                <span>Add Expense Transaction</span>
            </motion.button>
        </motion.form>
    );
};

export default ExpenseForm;