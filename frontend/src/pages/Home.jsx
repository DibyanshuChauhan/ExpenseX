/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import BudgetInput from "../components/home/BudgetInput";
import ExpenseForm from "../components/home/ExpenseForm";
import ExpenseList from "../components/home/ExpenseList";
import ChartSection from "../components/home/ChartSection";
import SummarySection from "../components/home/SummarySection";
import ReportDownload from "../components/home/ReportDownload";
import Footer from "../components/shared/Footer";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { 
    FaWallet, 
    FaArrowTrendDown, 
    FaArrowTrendUp, 
    FaRotateLeft, 
    FaShieldHeart, 
    FaCircleExclamation 
} from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi2";
import { api } from "../services/api";

const Home = ({ currentUser }) => {
    const username = currentUser?.username || "default_user";

    const [expenses, setExpenses] = useState([]);
    const [budget, setBudget] = useState("");
    const [viewType, setViewType] = useState("monthly");

    useEffect(() => {
        if (currentUser?.username) {
            api.expenses
                .getByUser(currentUser.username)
                .then((res) => {
                    if (res.success && Array.isArray(res.expenses)) {
                        setExpenses(res.expenses);
                    }
                })
                .catch((err) => console.error("Error loading expenses:", err));

            api.expenses
                .getBudget(currentUser.username)
                .then((res) => {
                    if (res.success && res.budget !== undefined) {
                        setBudget(res.budget);
                    }
                })
                .catch((err) => console.error("Error loading budget:", err));
        } else {
            setExpenses([]);
            setBudget("");
        }
    }, [currentUser]);

    const addExpense = async (expense) => {
        if (!currentUser) {
            toast.error("Please log in to add an expense!", { ...toastOptions });
            return;
        }

        if (!expense.amount || !expense.category || !expense.date || !expense.description) {
            toast.error("Please fill all fields before adding an expense!", { ...toastOptions });
            return;
        }

        try {
            const formattedDate = expense.date instanceof Date ? expense.date.toISOString() : new Date(expense.date).toISOString();
            const res = await api.expenses.add({
                ...expense,
                date: formattedDate,
                username: currentUser.username,
            });

            if (res.success && res.expense) {
                const updatedExpenses = [...expenses, res.expense];
                setExpenses(updatedExpenses);

                const totalSpent = updatedExpenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);
                const currentBudget = budget !== "" ? parseFloat(budget) : 0;
                if (currentBudget > 0 && totalSpent > currentBudget) {
                    toast.warning("Warning: You are exceeding your budget!", { ...toastOptions });
                }

                toast.success(res.message || "Expense added successfully!", { ...toastOptions });
            }
        } catch (err) {
            toast.error(err.message || "Failed to add expense!", { ...toastOptions });
        }
    };

    const resetExpenses = () => {
        if (!currentUser) {
            toast.error("Please log in to reset expenses!", { ...toastOptions });
            return;
        }

        toast.warn(
            <div>
                <p className="font-semibold text-white mb-1">Confirm Reset All Expenses</p>
                <p className="text-xs text-slate-300">Are you sure you want to permanently clear all your recorded expenses? This cannot be undone.</p>
                <div className="mt-3 flex justify-end space-x-2">
                    <button
                        onClick={async () => {
                            toast.dismiss();
                            try {
                                const res = await api.expenses.reset(currentUser.username);
                                if (res.success) {
                                    setExpenses([]);
                                    toast.success(res.message || "All expenses reset successfully!", { ...toastOptions });
                                }
                            } catch (err) {
                                toast.error(err.message || "Failed to reset expenses!", { ...toastOptions });
                            }
                        }}
                        className="bg-rose-600 hover:bg-rose-700 text-white text-xs px-3 py-1.5 rounded-lg font-semibold transition-all shadow-md"
                    >
                        Yes, Reset
                    </button>
                    <button
                        onClick={() => toast.dismiss()}
                        className="bg-slate-700 hover:bg-slate-600 text-white text-xs px-3 py-1.5 rounded-lg font-semibold transition-all"
                    >
                        Cancel
                    </button>
                </div>
            </div>,
            {
                position: "top-right",
                autoClose: false,
                closeOnClick: false,
                draggable: false,
                theme: "dark",
                className: "navbar-poppins",
            }
        );
    };

    const getChartData = () => {
        const data = {};
        const currentBudget = budget !== "" ? parseFloat(budget) : 0;
        const totalSpent = expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);
        const remainingBudget = currentBudget - totalSpent;

        expenses.forEach((exp) => {
            const date = new Date(exp.date);
            const key = viewType === "monthly"
                ? date.toLocaleString("default", { month: "short" })
                : `W${Math.ceil((date.getDate()) / 7)}`;
            data[key] = (data[key] || 0) + parseFloat(exp.amount);
        });

        return {
            labels: Object.keys(data).length > 0 ? Object.keys(data) : ["No Data"],
            datasets: [
                {
                    label: "Expenses (₹)",
                    data: Object.values(data).length > 0 ? Object.values(data) : [0],
                },
                {
                    label: "Budget (₹)",
                    data: Object.keys(data).map(() => currentBudget),
                },
                {
                    label: "Remaining (₹)",
                    data: Object.keys(data).map(() => (remainingBudget > 0 ? remainingBudget : 0)),
                },
            ],
        };
    };

    const getCategorySummary = () => {
        const summary = {};
        expenses.forEach((exp) => {
            summary[exp.category] = (summary[exp.category] || 0) + parseFloat(exp.amount);
        });
        return summary;
    };

    const handleBudgetChange = async (e) => {
        if (!currentUser) {
            toast.error("Please log in to set a budget!", { ...toastOptions });
            return;
        }
        const value = e.target.value;
        let targetBudget = "";
        if (value === "") {
            targetBudget = "";
            setBudget("");
        } else {
            const numValue = parseFloat(value) || 0;
            if (numValue < 0) {
                toast.error("Budget cannot be negative! Setting to 0.", { ...toastOptions });
                targetBudget = 0;
                setBudget(0);
            } else {
                targetBudget = numValue;
                setBudget(numValue);
            }
        }

        try {
            await api.expenses.setBudget(currentUser.username, targetBudget);
        } catch (err) {
            console.error("Failed to update budget on server:", err);
        }
    };

    const totalSpent = expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);
    const currentBudget = budget !== "" ? parseFloat(budget) : 0;
    const remainingBudget = currentBudget - totalSpent;
    const isOverBudget = currentBudget > 0 && totalSpent > currentBudget;
    const spentPercent = currentBudget > 0 ? Math.round((totalSpent / currentBudget) * 100) : 0;

    const downloadReport = () => {
        if (!currentUser) {
            toast.error("Please log in to download a report!", { ...toastOptions });
            return;
        }
        const currentDate = new Date().toLocaleDateString();
        const header = ["Date,Description,Category,Amount (₹),Budget Set (₹),Total Spent (₹),Remaining Budget (₹)"];
        const categorySummary = getCategorySummary();
        const summaryRows = Object.entries(categorySummary).map(([category, amount]) =>
            `,,${category},${amount},,,`
        );
        const dataRows = expenses.map((exp) =>
            `${new Date(exp.date).toLocaleDateString()},${exp.description},${exp.category},${exp.amount},${currentBudget},${totalSpent},${remainingBudget > 0 ? remainingBudget : 0}`
        );
        const csvContent = [
            ...header,
            ...dataRows,
            ...summaryRows,
            `,,Total Budget,${currentBudget},,,`,
            `,,Total Spent,${totalSpent},,,`,
            `,,Remaining Budget,${remainingBudget > 0 ? remainingBudget : 0},,,`
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `Expense_Report_${viewType}_${username}_${currentDate}.csv`;
        link.click();
        window.URL.revokeObjectURL(url);

        toast.success(`Downloaded ${viewType} expense report for ${username}!`, { ...toastOptions });
    };

    const toastOptions = {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        className: "navbar-poppins",
    };

    return (
        <div className="flex-1 flex flex-col min-h-screen bg-slate-100/90 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 transition-colors duration-300">
            {/* Ambient Background Aura Glows */}
            <div className="fixed top-0 left-1/4 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-600/10 rounded-full blur-[128px] pointer-events-none" />
            <div className="fixed top-1/3 right-1/4 w-96 h-96 bg-violet-500/5 dark:bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="fixed bottom-10 left-1/3 w-96 h-96 bg-cyan-500/5 dark:bg-cyan-600/10 rounded-full blur-[128px] pointer-events-none" />

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 relative z-10 max-w-7xl">
                {/* Dashboard Hero Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
                                <HiSparkles size={11} /> Real-time Analytics
                            </span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white font-['Outfit']">
                            Dashboard - <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 dark:from-indigo-300 dark:via-white dark:to-violet-300">
                                {currentUser ? currentUser.username : "Guest"}
                            </span>
                        </h1>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 font-medium">
                            Track daily spending, analyze financial health, and stay within your budget limit.
                        </p>
                    </div>

                    {/* Quick Reset Action */}
                    {currentUser && expenses.length > 0 && (
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={resetExpenses}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/30 text-xs font-bold shadow-sm transition-all self-start md:self-auto cursor-pointer"
                        >
                            <FaRotateLeft size={13} />
                            <span>Reset All Expenses</span>
                        </motion.button>
                    )}
                </div>

                {/* KPI Metrics Hero Cards (4-Column Bento Row) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {/* Monthly Budget Card */}
                    <div className="p-5 rounded-2xl glass-panel relative overflow-hidden group hover:border-indigo-500/40 transition-all">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                Allocated Budget
                            </span>
                            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                                <FaWallet size={14} />
                            </div>
                        </div>
                        <div className="text-2xl font-black text-slate-950 dark:text-white font-mono tracking-tight">
                            ₹{currentBudget.toLocaleString()}
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-2 font-medium flex items-center gap-1">
                            {currentBudget > 0 ? "Target limit for this month" : "No budget set yet"}
                        </p>
                    </div>

                    {/* Total Expenses Card */}
                    <div className="p-5 rounded-2xl glass-panel relative overflow-hidden group hover:border-violet-500/40 transition-all">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                Total Outflow
                            </span>
                            <div className="w-8 h-8 rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center">
                                <FaArrowTrendUp size={14} />
                            </div>
                        </div>
                        <div className="text-2xl font-black text-slate-950 dark:text-white font-mono tracking-tight">
                            ₹{totalSpent.toLocaleString()}
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-2 font-medium">
                            Across {expenses.length} recorded {expenses.length === 1 ? "transaction" : "transactions"}
                        </p>
                    </div>

                    {/* Remaining Balance Card */}
                    <div className="p-5 rounded-2xl glass-panel relative overflow-hidden group hover:border-emerald-500/40 transition-all">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                Remaining Balance
                            </span>
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                isOverBudget ? "bg-rose-500/10 text-rose-600 dark:text-rose-400" : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            }`}>
                                <FaArrowTrendDown size={14} />
                            </div>
                        </div>
                        <div className={`text-2xl font-black font-mono tracking-tight ${
                            isOverBudget ? "text-rose-600 dark:text-rose-400" : "text-emerald-600 dark:text-emerald-400"
                        }`}>
                            ₹{(remainingBudget > 0 ? remainingBudget : 0).toLocaleString()}
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-2 font-medium">
                            {isOverBudget ? (
                                <span className="text-rose-600 dark:text-rose-400 font-bold">Exceeded by ₹{(totalSpent - currentBudget).toLocaleString()}</span>
                            ) : currentBudget > 0 ? (
                                <span className="text-emerald-600 dark:text-emerald-400 font-bold">{100 - spentPercent}% still available</span>
                            ) : (
                                "Set budget to track savings"
                            )}
                        </p>
                    </div>

                    {/* Financial Health Card */}
                    <div className="p-5 rounded-2xl glass-panel relative overflow-hidden group hover:border-cyan-500/40 transition-all">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                Spend Health
                            </span>
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                isOverBudget ? "bg-rose-500/10 text-rose-600 dark:text-rose-400" : "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
                            }`}>
                                {isOverBudget ? <FaCircleExclamation size={14} /> : <FaShieldHeart size={14} />}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={`text-lg font-extrabold ${
                                isOverBudget 
                                    ? "text-rose-600 dark:text-rose-400" 
                                    : spentPercent > 75 
                                    ? "text-amber-600 dark:text-amber-400" 
                                    : "text-emerald-600 dark:text-emerald-400"
                            }`}>
                                {currentBudget === 0 
                                    ? "Unconfigured" 
                                    : isOverBudget 
                                    ? "Limit Exceeded" 
                                    : spentPercent > 75 
                                    ? "Caution" 
                                    : "Healthy Pace"}
                            </span>
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-2 font-medium">
                            {currentBudget > 0 ? `${spentPercent}% of monthly limit consumed` : "Define monthly budget"}
                        </p>
                    </div>
                </div>

                {/* Primary Bento Layout */}
                <div className="space-y-8">
                    {/* Row 1: Add Expense Form & Budget Controls */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Transaction Composer Form */}
                        <div className="lg:col-span-7">
                            <ExpenseForm addExpense={addExpense} disabled={!currentUser} />
                        </div>

                        {/* Budget Configuration & Export Toolbar */}
                        <div className="lg:col-span-5 space-y-6">
                            <BudgetInput
                                budget={budget}
                                handleBudgetChange={handleBudgetChange}
                                currentBudget={currentBudget}
                                totalSpent={totalSpent}
                                remainingBudget={remainingBudget}
                                disabled={!currentUser}
                            />
                            <ReportDownload
                                viewType={viewType}
                                setViewType={setViewType}
                                downloadReport={downloadReport}
                                disabled={!currentUser}
                            />
                        </div>
                    </div>

                    {/* Row 2: Analytics & Category Allocation */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Interactive Trends Chart */}
                        <div className="lg:col-span-7">
                            <ChartSection viewType={viewType} getChartData={getChartData} />
                        </div>

                        {/* Category Summary Allocation */}
                        <div className="lg:col-span-5">
                            <SummarySection getCategorySummary={getCategorySummary} />
                        </div>
                    </div>

                    {/* Row 3: Full-width Transaction History with Search */}
                    <div>
                        <ExpenseList expenses={expenses} />
                    </div>
                </div>
            </main>

            {/* Premium Footer with 12hr AM/PM labeled time */}
            <Footer currentUser={currentUser} />
        </div>
    );
};

export default Home;