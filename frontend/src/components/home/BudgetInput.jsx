/* eslint-disable no-unused-vars */
import React from "react";
import { FaWallet, FaArrowTrendUp, FaCircleExclamation } from "react-icons/fa6";

const BudgetInput = ({
    budget,
    handleBudgetChange,
    currentBudget,
    totalSpent,
    remainingBudget,
    disabled = false
}) => {
    // Calculate percentage spent
    const spentPercent = currentBudget > 0 
        ? Math.min(Math.round((totalSpent / currentBudget) * 100), 100)
        : 0;

    const isOverBudget = currentBudget > 0 && totalSpent > currentBudget;

    // Progress bar color based on usage
    let progressColor = "bg-gradient-to-r from-emerald-500 to-teal-400";
    if (spentPercent >= 90 || isOverBudget) {
        progressColor = "bg-gradient-to-r from-rose-500 to-red-600";
    } else if (spentPercent >= 75) {
        progressColor = "bg-gradient-to-r from-amber-500 to-orange-400";
    }

    return (
        <div className="p-6 rounded-2xl glass-panel relative overflow-hidden transition-all duration-300">
            {/* Subtle background glow */}
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Header with Title and Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-inner">
                        <FaWallet size={18} />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                            Monthly Budget Target
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Set your monthly limit to automatically monitor spend velocity
                        </p>
                    </div>
                </div>

                {currentBudget > 0 && (
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold self-start sm:self-auto ${
                        isOverBudget
                            ? "bg-rose-500/15 text-rose-600 dark:text-rose-300 border border-rose-500/30"
                            : spentPercent > 75
                            ? "bg-amber-500/15 text-amber-600 dark:text-amber-300 border border-amber-500/30"
                            : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30"
                    }`}>
                        {isOverBudget ? (
                            <>
                                <FaCircleExclamation size={12} />
                                Over Limit by ₹{(totalSpent - currentBudget).toLocaleString()}
                            </>
                        ) : (
                            <>
                                <FaArrowTrendUp size={12} />
                                {spentPercent}% Utilized
                            </>
                        )}
                    </span>
                )}
            </div>

            {/* Budget Input Field */}
            <div className="relative mb-5">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 dark:text-slate-400 font-bold text-lg">
                    ₹
                </div>
                <input
                    type="number"
                    placeholder="Enter Monthly Budget (e.g. 50000)"
                    value={budget}
                    onChange={handleBudgetChange}
                    disabled={disabled}
                    className="w-full pl-9 pr-4 py-3.5 bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700/80 rounded-xl text-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 font-bold focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-600 dark:focus:border-indigo-400 transition-all text-base disabled:opacity-50 outline-none shadow-sm"
                />
            </div>

            {/* Progress Bar & Quick Stats */}
            {currentBudget > 0 && (
                <div className="space-y-3 pt-2">
                    {/* Visual Progress Bar */}
                    <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-3 overflow-hidden border border-slate-300 dark:border-slate-700 p-0.5">
                        <div
                            className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
                            style={{ width: `${Math.min((totalSpent / currentBudget) * 100, 100)}%` }}
                        />
                    </div>

                    {/* Breakdown Pills */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                            <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-0.5">
                                Set Budget
                            </span>
                            <span className="text-sm font-extrabold text-slate-950 dark:text-white font-mono">
                                ₹{currentBudget.toLocaleString()}
                            </span>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                            <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-0.5">
                                Total Spent
                            </span>
                            <span className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
                                ₹{totalSpent.toLocaleString()}
                            </span>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                            <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-0.5">
                                Available Balance
                            </span>
                            <span className={`text-sm font-extrabold font-mono ${
                                remainingBudget < 0 ? "text-rose-600 dark:text-rose-400" : "text-emerald-600 dark:text-emerald-400"
                            }`}>
                                ₹{(remainingBudget > 0 ? remainingBudget : 0).toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BudgetInput;