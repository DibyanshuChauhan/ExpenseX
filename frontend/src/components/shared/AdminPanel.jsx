/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEye, FiEyeOff, FiTrash2, FiSearch, FiShield, FiUserPlus, FiUsers, FiDollarSign, FiMessageSquare } from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../../services/api";

const AdminPanel = ({ show, onAdminAction, users, adminAction, setAdminAction, handleAdminSubmit, currentUser }) => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [originalFeedbacks, setOriginalFeedbacks] = useState([]);
    const [filter, setFilter] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [allExpenses, setAllExpenses] = useState({});
    const [budgets, setBudgets] = useState({});
    const [activeTab, setActiveTab] = useState("users"); // "users" | "expenses" | "feedback" | "create"

    const loadAdminData = useCallback(async () => {
        try {
            const fbRes = await api.feedback.getAll();
            if (fbRes.success && Array.isArray(fbRes.feedbacks)) {
                setFeedbacks(fbRes.feedbacks);
                setOriginalFeedbacks(fbRes.feedbacks);
            }

            const expRes = await api.expenses.getAllGrouped();
            if (expRes.success && expRes.expenses) {
                setAllExpenses(expRes.expenses);
            }

            if (users && users.length > 0) {
                const budgetEntries = await Promise.all(
                    users.map(async (u) => {
                        try {
                            const bRes = await api.expenses.getBudget(u.username);
                            return [u.username, bRes.budget ? parseFloat(bRes.budget) : 0];
                        } catch {
                            return [u.username, 0];
                        }
                    })
                );
                setBudgets(Object.fromEntries(budgetEntries));
            }
        } catch (err) {
            console.error("Failed to load admin data:", err);
        }
    }, [users]);

    useEffect(() => {
        if (show) {
            loadAdminData();
        }
    }, [show, loadAdminData]);

    const isDefaultAdmin = currentUser?.username === "admin" && Boolean(currentUser?.isAdmin);

    const getAllExpenses = () => allExpenses || {};

    const getUserBudget = (username) => {
        return budgets[username] !== undefined ? budgets[username] : 0;
    };

    const getAdminExpenses = () => {
        return (allExpenses && allExpenses["admin"]) || [];
    };

    const handleDeleteFeedback = async (fbItem) => {
        if (isDefaultAdmin && fbItem) {
            try {
                const targetId = fbItem._id || fbItem.id || fbItem;
                const res = await api.feedback.delete(targetId);
                if (res.success) {
                    const updated = feedbacks.filter((fb) => (fb._id ? fb._id !== targetId : fb.id ? fb.id !== targetId : fb !== fbItem));
                    setFeedbacks(updated);
                    setOriginalFeedbacks(updated);
                    toast.success(res.message || "Feedback deleted successfully!", {
                        position: "top-right",
                        autoClose: 3000,
                        theme: "dark",
                    });
                }
            } catch (err) {
                toast.error(err.message || "Failed to delete feedback!");
            }
        }
    };

    const handleDeleteAllFeedbacks = () => {
        if (isDefaultAdmin) {
            toast.warn(
                <div>
                    <p className="font-semibold text-white mb-1">Clear Feedback Records</p>
                    <p className="text-xs text-slate-300">Are you sure you want to delete all user feedback submissions? This action cannot be reversed.</p>
                    <div className="mt-3 flex justify-end space-x-2">
                        <button
                            onClick={async () => {
                                toast.dismiss();
                                try {
                                    const res = await api.feedback.clearAll();
                                    if (res.success) {
                                        setFeedbacks([]);
                                        setOriginalFeedbacks([]);
                                        toast.success(res.message || "All feedbacks deleted successfully!", {
                                            position: "top-right",
                                            autoClose: 3000,
                                            theme: "dark",
                                        });
                                    }
                                } catch (err) {
                                    toast.error(err.message || "Failed to clear feedbacks!");
                                }
                            }}
                            className="bg-rose-600 hover:bg-rose-700 text-white text-xs px-3 py-1.5 rounded-lg font-semibold transition-all shadow-md"
                        >
                            Yes, Clear All
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
                }
            );
        }
    };

    const handleFilter = () => {
        if (filter) {
            const filteredFeedbacks = originalFeedbacks.filter((fb) =>
                fb.username.toLowerCase().includes(filter.toLowerCase()) || 
                fb.feedback.toLowerCase().includes(filter.toLowerCase())
            );
            setFeedbacks([...filteredFeedbacks]);
        } else {
            setFeedbacks([...originalFeedbacks]);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleFilter();
        }
    };

    if (!show) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="border-t border-indigo-500/20 bg-slate-950/95 backdrop-blur-2xl px-4 py-8 sm:px-6 lg:px-8 shadow-2xl relative z-30"
        >
            <div className="container mx-auto max-w-7xl">
                {/* Admin Header with Tabs */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-inner">
                            <FiShield size={22} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-xl font-bold text-white tracking-tight">
                                    Administrative Command Center
                                </h3>
                                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                    {isDefaultAdmin ? "Super Admin" : "Auditor"}
                                </span>
                            </div>
                            <p className="text-xs text-slate-400">
                                Manage user accounts, inspect global spending, and monitor feedback
                            </p>
                        </div>
                    </div>

                    {/* Navigation Segment Tabs */}
                    <div className="inline-flex p-1 bg-slate-900 rounded-xl border border-white/10 shadow-inner self-start md:self-auto overflow-x-auto">
                        <button
                            onClick={() => setActiveTab("users")}
                            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                activeTab === "users" ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30" : "text-slate-400 hover:text-white"
                            }`}
                        >
                            <FiUsers size={14} />
                            <span>Users ({users?.length || 0})</span>
                        </button>
                        <button
                            onClick={() => setActiveTab("expenses")}
                            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                activeTab === "expenses" ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30" : "text-slate-400 hover:text-white"
                            }`}
                        >
                            <FiDollarSign size={14} />
                            <span>All Expenses</span>
                        </button>
                        <button
                            onClick={() => setActiveTab("feedback")}
                            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                activeTab === "feedback" ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30" : "text-slate-400 hover:text-white"
                            }`}
                        >
                            <FiMessageSquare size={14} />
                            <span>Feedback ({feedbacks?.length || 0})</span>
                        </button>
                        {isDefaultAdmin && (
                            <button
                                onClick={() => setActiveTab("create")}
                                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                    activeTab === "create" ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30" : "text-slate-400 hover:text-white"
                                }`}
                            >
                                <FiUserPlus size={14} />
                                <span>Create User</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Tab: Users Management */}
                {activeTab === "users" && (
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                                Registered Accounts & Assigned Budgets
                            </h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {Array.isArray(users) && users.map((u, index) => {
                                const budgetVal = getUserBudget(u.username);
                                return (
                                    <div
                                        key={u._id || u.id || index}
                                        className="p-5 rounded-2xl glass-card border border-white/5 relative group"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500/20 to-violet-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold">
                                                    {u.username.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <span className="text-sm font-bold text-white block">
                                                        {u.username}
                                                    </span>
                                                    <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                                                        u.isAdmin 
                                                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" 
                                                            : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                                    }`}>
                                                        {u.isAdmin ? "Administrator" : "Standard User"}
                                                    </span>
                                                </div>
                                            </div>

                                            {u.username !== "admin" && isDefaultAdmin && (
                                                <button
                                                    onClick={() => onAdminAction("delete", { username: u.username })}
                                                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                                                    title="Delete User Account"
                                                >
                                                    <FiTrash2 size={16} />
                                                </button>
                                            )}
                                        </div>

                                        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                                            <span className="text-slate-400">Monthly Budget:</span>
                                            <span className="font-mono font-bold text-white">
                                                ₹{budgetVal.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Tab: All Expenses Monitoring */}
                {activeTab === "expenses" && (
                    <div className="space-y-6">
                        {Object.entries(getAllExpenses()).map(([user, userExpenses]) => (
                            <div key={user} className="p-6 rounded-2xl glass-panel">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-white/5">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xs">
                                            {user.charAt(0).toUpperCase()}
                                        </div>
                                        <h5 className="text-base font-bold text-white">
                                            {user}'s Transactions
                                        </h5>
                                    </div>
                                    <div className="text-xs text-slate-400">
                                        Budget: <span className="font-mono text-emerald-400 font-bold">₹{getUserBudget(user).toLocaleString()}</span> | 
                                        Entries: <span className="text-white font-bold">{userExpenses.length}</span>
                                    </div>
                                </div>

                                {userExpenses.length > 0 ? (
                                    <div className="overflow-x-auto rounded-xl border border-white/5">
                                        <table className="w-full text-left text-xs text-slate-300">
                                            <thead className="bg-slate-900/90 text-slate-400 uppercase font-bold tracking-wider">
                                                <tr>
                                                    <th className="py-3 px-4">Date</th>
                                                    <th className="py-3 px-4">Category</th>
                                                    <th className="py-3 px-4">Description</th>
                                                    <th className="py-3 px-4 text-right">Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5">
                                                {userExpenses.map((exp, idx) => (
                                                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                                                        <td className="py-3 px-4 font-mono text-slate-400">
                                                            {new Date(exp.date).toLocaleDateString()}
                                                        </td>
                                                        <td className="py-3 px-4">
                                                            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-white/5">
                                                                {exp.category}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 px-4 text-white font-medium">
                                                            {exp.description || "—"}
                                                        </td>
                                                        <td className="py-3 px-4 text-right font-mono font-bold text-indigo-300">
                                                            ₹{parseFloat(exp.amount || 0).toLocaleString()}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <p className="text-xs text-slate-500 italic py-2">No expenses logged for this account.</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Tab: Feedback Management */}
                {activeTab === "feedback" && (
                    <div className="p-6 rounded-2xl glass-panel">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <div className="relative w-full sm:w-80">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <FiSearch size={14} />
                                </div>
                                <input
                                    type="text"
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder="Filter by user or message..."
                                    className="w-full pl-9 pr-10 py-2.5 bg-slate-900/80 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/50 outline-none"
                                />
                                <button
                                    onClick={handleFilter}
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
                                >
                                    Filter
                                </button>
                            </div>

                            {isDefaultAdmin && feedbacks.length > 0 && (
                                <button
                                    onClick={handleDeleteAllFeedbacks}
                                    className="flex items-center gap-2 px-3.5 py-2 bg-rose-500/10 text-rose-300 border border-rose-500/20 hover:bg-rose-500/20 rounded-xl text-xs font-semibold transition-all self-start sm:self-auto"
                                >
                                    <FiTrash2 size={13} />
                                    <span>Delete All Feedbacks</span>
                                </button>
                            )}
                        </div>

                        {feedbacks.length > 0 ? (
                            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                                {feedbacks.map((fb, idx) => (
                                    <div
                                        key={fb._id || fb.id || idx}
                                        className="p-4 rounded-xl bg-slate-900/70 border border-white/5 hover:border-indigo-500/30 transition-all flex items-start justify-between gap-4"
                                    >
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-bold text-white">
                                                    {fb.username}
                                                </span>
                                                <span className="text-[10px] text-slate-500 font-mono">
                                                    {new Date(fb.timestamp).toLocaleString()}
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-300 leading-relaxed">
                                                {fb.feedback}
                                            </p>
                                        </div>

                                        {isDefaultAdmin && (
                                            <button
                                                onClick={() => handleDeleteFeedback(fb)}
                                                className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                                                title="Delete Feedback"
                                            >
                                                <FiTrash2 size={15} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-xs text-slate-500 italic">
                                No feedback entries match your query.
                            </div>
                        )}
                    </div>
                )}

                {/* Tab: Create User */}
                {activeTab === "create" && isDefaultAdmin && (
                    <div className="max-w-xl mx-auto p-6 rounded-2xl glass-panel">
                        <h4 className="text-base font-bold text-white mb-2">
                            Provision New User Account
                        </h4>
                        <p className="text-xs text-slate-400 mb-6">
                            Create an authenticated login profile with custom role permissions
                        </p>

                        <form onSubmit={handleAdminSubmit} className="space-y-4">
                            <input
                                type="hidden"
                                value={(adminAction.type = "create")}
                            />

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                    Account Username
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter username"
                                    value={adminAction.username}
                                    onChange={(e) => setAdminAction({ ...adminAction, username: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-900/80 border border-white/10 rounded-xl text-white text-xs placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/50 outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                    Initial Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={adminAction.password}
                                        onChange={(e) => setAdminAction({ ...adminAction, password: e.target.value })}
                                        className="w-full pl-4 pr-11 py-3 bg-slate-900/80 border border-white/10 rounded-xl text-white text-xs placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/50 outline-none"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white"
                                    >
                                        {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 pt-2">
                                <input
                                    type="checkbox"
                                    id="isAdminCheck"
                                    checked={adminAction.isAdmin}
                                    onChange={(e) => setAdminAction({ ...adminAction, isAdmin: e.target.checked })}
                                    className="w-4 h-4 rounded bg-slate-900 border-white/20 text-indigo-600 focus:ring-indigo-500/50"
                                />
                                <label htmlFor="isAdminCheck" className="text-xs text-slate-300 cursor-pointer">
                                    Grant Administrator Privileges (Can view global audit data)
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="w-full mt-4 py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all"
                            >
                                Create Account
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default AdminPanel;