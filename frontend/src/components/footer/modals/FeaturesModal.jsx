/* eslint-disable no-unused-vars */
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiCheckCircle, FiShield, FiLock, FiTrendingUp, FiLayers, FiFileText } from "react-icons/fi";

const FeaturesModal = ({ show, onClose, currentUser }) => {
    if (!show) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="glass-panel-elevated p-6 sm:p-8 rounded-3xl w-full max-w-2xl relative border border-white/10 shadow-2xl max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5 transition-all"
                    >
                        <FiX size={18} />
                    </button>

                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                            <FiLayers size={20} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                                ExpenseX Platform Capabilities
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Comprehensive architecture and intelligent feature breakdown
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4 text-xs">
                        {/* Authentication */}
                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5">
                            <div className="flex items-center gap-2 mb-2 text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider text-[11px]">
                                <FiLock size={14} />
                                <span>1. Full-Stack Security & Authentication</span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
                                Robust JWT and bcrypt secured user sessions connected to MongoDB persistence:
                            </p>
                            <ul className="space-y-1.5 text-slate-500 dark:text-slate-400 pl-2">
                                <li className="flex items-center gap-2">
                                    <FiCheckCircle size={13} className="text-emerald-500 dark:text-emerald-400 shrink-0" />
                                    <span><strong className="text-slate-800 dark:text-slate-200">Personalized Access</strong>: Individual user accounts with isolated budgets and transaction histories.</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <FiCheckCircle size={13} className="text-emerald-500 dark:text-emerald-400 shrink-0" />
                                    <span><strong className="text-slate-800 dark:text-slate-200">Role-Based Access</strong>: Main Admin and Member roles with automatic privilege enforcement.</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <FiCheckCircle size={13} className="text-emerald-500 dark:text-emerald-400 shrink-0" />
                                    <span><strong className="text-slate-800 dark:text-slate-200">Self-Service Recovery</strong>: Instant password reset and in-app password changes.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Financial Tracking */}
                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5">
                            <div className="flex items-center gap-2 mb-2 text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider text-[11px]">
                                <FiTrendingUp size={14} />
                                <span>2. Real-Time Financial Health & Budgeting</span>
                            </div>
                            <ul className="space-y-1.5 text-slate-500 dark:text-slate-400 pl-2">
                                <li className="flex items-center gap-2">
                                    <FiCheckCircle size={13} className="text-emerald-500 dark:text-emerald-400 shrink-0" />
                                    <span><strong className="text-slate-800 dark:text-slate-200">Dynamic Limit Tracking</strong>: Set and adjust monthly limits with instantaneous utilization percentage.</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <FiCheckCircle size={13} className="text-emerald-500 dark:text-emerald-400 shrink-0" />
                                    <span><strong className="text-slate-800 dark:text-slate-200">Transaction Composer</strong>: Quick multi-category expense recording with calendar date picker.</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <FiCheckCircle size={13} className="text-emerald-500 dark:text-emerald-400 shrink-0" />
                                    <span><strong className="text-slate-800 dark:text-slate-200">Interactive Charts</strong>: Dynamic Bar Chart trends comparing spending vs budget across weeks and months.</span>
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
                                <span>4. Administrative Command Center</span>
                            </div>
                            <ul className="space-y-1.5 text-slate-500 dark:text-slate-400 pl-2">
                                <li className="flex items-center gap-2">
                                    <FiCheckCircle size={13} className="text-emerald-500 dark:text-emerald-400 shrink-0" />
                                    <span><strong className="text-slate-800 dark:text-slate-200">Account Management</strong>: Create or delete user profiles directly from the admin panel.</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <FiCheckCircle size={13} className="text-emerald-500 dark:text-emerald-400 shrink-0" />
                                    <span><strong className="text-slate-800 dark:text-slate-200">Global Spend Inspection</strong>: Audit expenses across all system accounts.</span>
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
        </AnimatePresence>
    );
};

export default FeaturesModal;