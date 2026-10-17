/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiCheckCircle, FiShield, FiLock, FiTrendingUp, FiLayers, FiFileText } from "react-icons/fi";

const FeaturesModal = ({ show, onClose, currentUser }) => {
    useEffect(() => {
        if (show) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [show]);

    if (typeof document === "undefined") return null;

    return createPortal(
        <AnimatePresence>
            {show && (
                <motion.div
                    key="features-modal-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[9999] p-4 sm:p-6 overflow-y-auto"
                    onClick={onClose}
                >
                    <motion.div
                        key="features-modal-dialog"
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="glass-panel-elevated p-6 sm:p-8 rounded-3xl w-full max-w-2xl relative border border-white/10 shadow-2xl max-h-[85vh] flex flex-col my-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5 transition-all z-10"
                            aria-label="Close modal"
                        >
                            <FiX size={18} />
                        </button>

                        <div className="flex items-center gap-3 mb-5 shrink-0 pr-8">
                            <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                                <FiLayers size={20} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                                    ExpenseX Platform Capabilities
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Overview of application features and tools
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4 text-xs overflow-y-auto pr-1 flex-1">
                            {/* Authentication */}
                            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5">
                                <div className="flex items-center gap-2 mb-2 text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider text-[11px]">
                                    <FiLock size={14} />
                                    <span>1. Full-Stack Security & Authentication</span>
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
                                    Secure JWT and bcrypt session handling connected to MongoDB:
                                </p>
                                <ul className="space-y-1.5 text-slate-500 dark:text-slate-400 pl-2">
                                    <li className="flex items-center gap-2">
                                        <FiCheckCircle size={13} className="text-emerald-500 dark:text-emerald-400 shrink-0" />
                                        <span><strong className="text-slate-800 dark:text-slate-200">Personal Accounts</strong>: Individual user accounts with separate budgets and transaction histories.</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <FiCheckCircle size={13} className="text-emerald-500 dark:text-emerald-400 shrink-0" />
                                        <span><strong className="text-slate-800 dark:text-slate-200">Role-Based Access</strong>: Admin and Member roles with privilege enforcement.</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <FiCheckCircle size={13} className="text-emerald-500 dark:text-emerald-400 shrink-0" />
                                        <span><strong className="text-slate-800 dark:text-slate-200">Password Management</strong>: Reset password workflow and in-app password changes.</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Financial Tracking */}
                            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5">
                                <div className="flex items-center gap-2 mb-2 text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider text-[11px]">
                                    <FiTrendingUp size={14} />
                                    <span>2. Budgeting & Expense Tracking</span>
                                </div>
                                <ul className="space-y-1.5 text-slate-500 dark:text-slate-400 pl-2">
                                    <li className="flex items-center gap-2">
                                        <FiCheckCircle size={13} className="text-emerald-500 dark:text-emerald-400 shrink-0" />
                                        <span><strong className="text-slate-800 dark:text-slate-200">Monthly Limit Tracking</strong>: Set and adjust monthly limits with instant utilization percentage.</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <FiCheckCircle size={13} className="text-emerald-500 dark:text-emerald-400 shrink-0" />
                                        <span><strong className="text-slate-800 dark:text-slate-200">Expense Logging</strong>: Quick multi-category expense recording with calendar date picker.</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <FiCheckCircle size={13} className="text-emerald-500 dark:text-emerald-400 shrink-0" />
                                        <span><strong className="text-slate-800 dark:text-slate-200">Visual Charts</strong>: Bar chart comparisons of spending against budget across weekly and monthly periods.</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <FiCheckCircle size={13} className="text-emerald-500 dark:text-emerald-400 shrink-0" />
                                        <span><strong className="text-slate-800 dark:text-slate-200">Category Allocation</strong>: Breakdown of spending across 25+ categories with percentage badges.</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Data Portability */}
                            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5">
                                <div className="flex items-center gap-2 mb-2 text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider text-[11px]">
                                    <FiFileText size={14} />
                                    <span>3. Search & CSV Report Export</span>
                                </div>
                                <ul className="space-y-1.5 text-slate-500 dark:text-slate-400 pl-2">
                                    <li className="flex items-center gap-2">
                                        <FiCheckCircle size={13} className="text-emerald-500 dark:text-emerald-400 shrink-0" />
                                        <span><strong className="text-slate-800 dark:text-slate-200">Instant Filter</strong>: Search through transaction notes or filter by category pills.</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <FiCheckCircle size={13} className="text-emerald-500 dark:text-emerald-400 shrink-0" />
                                        <span><strong className="text-slate-800 dark:text-slate-200">Export to CSV</strong>: One-click report download with formatted date stamps and category summary.</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Admin Panel */}
                            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5">
                                <div className="flex items-center gap-2 mb-2 text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider text-[11px]">
                                    <FiShield size={14} />
                                    <span>4. Administrator Panel</span>
                                </div>
                                <ul className="space-y-1.5 text-slate-500 dark:text-slate-400 pl-2">
                                    <li className="flex items-center gap-2">
                                        <FiCheckCircle size={13} className="text-emerald-500 dark:text-emerald-400 shrink-0" />
                                        <span><strong className="text-slate-800 dark:text-slate-200">Account Management</strong>: Create or delete user profiles directly from the admin panel.</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <FiCheckCircle size={13} className="text-emerald-500 dark:text-emerald-400 shrink-0" />
                                        <span><strong className="text-slate-800 dark:text-slate-200">All-User Spend Audit</strong>: Inspect expenses logged across system accounts.</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <FiCheckCircle size={13} className="text-emerald-500 dark:text-emerald-400 shrink-0" />
                                        <span><strong className="text-slate-800 dark:text-slate-200">Feedback Inbox</strong>: Review and manage member feedback with search filtering.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default FeaturesModal;