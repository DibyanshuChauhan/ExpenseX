/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import ExpenseCard from "../shared/ExpenseCard";
import { FaMagnifyingGlass, FaListCheck, FaReceipt } from "react-icons/fa6";

const ExpenseList = ({ expenses }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    // Extract unique categories present in actual expenses
    const availableCategories = ["all", ...new Set(expenses.map(e => e.category).filter(Boolean))];

    // Filter expenses based on search and category
    const filteredExpenses = expenses.filter(exp => {
        const matchesSearch = 
            (exp.description && exp.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (exp.category && exp.category.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesCategory = selectedCategory === "all" || exp.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    const totalFilteredSum = filteredExpenses.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);

    return (
        <div className="p-6 rounded-2xl glass-panel">
            {/* Header with Title and Search */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-inner">
                        <FaListCheck size={16} />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                            Recent Expense History
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Search and inspect individual transactions
                        </p>
                    </div>
                </div>

                {/* Search Bar & Total */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <FaMagnifyingGlass size={13} />
                        </div>
                        <input
                            type="text"
                            placeholder="Filter transactions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full sm:w-56 pl-8 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-600 transition-all outline-none shadow-sm"
                        />
                    </div>

                    <div className="flex items-center justify-between sm:justify-start gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                        <span className="text-slate-600 dark:text-slate-400 font-medium">Showing:</span>
                        <span className="font-bold text-slate-950 dark:text-white">{filteredExpenses.length}</span>
                        <span className="text-slate-300 dark:text-slate-600">|</span>
                        <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">₹{totalFilteredSum.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Category Quick Pills */}
            {availableCategories.length > 2 && (
                <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 scrollbar-none">
                    {availableCategories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                                selectedCategory === cat
                                    ? "bg-indigo-600 border-indigo-500 text-white shadow-sm shadow-indigo-600/30"
                                    : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                            }`}
                        >
                            {cat === "all" ? "All Categories" : cat}
                        </button>
                    ))}
                </div>
            )}

            {/* Transactions Grid */}
            {filteredExpenses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredExpenses.map((expense) => (
                        <ExpenseCard key={expense._id || expense.id || Math.random()} expense={expense} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 rounded-xl border border-dashed border-slate-300 dark:border-white/10 bg-slate-100/50 dark:bg-slate-900/30 flex flex-col items-center justify-center">
                    <div className="w-12 h-12 rounded-2xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 mb-3">
                        <FaReceipt size={22} />
                    </div>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {expenses.length === 0 ? "No expenses recorded yet" : "No matching transactions found"}
                    </p>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm">
                        {expenses.length === 0 
                            ? "Use the transaction composer above to record your first expense." 
                            : "Try clearing your search query or choosing another category."}
                    </p>
                </div>
            )}
        </div>
    );
};

export default ExpenseList;