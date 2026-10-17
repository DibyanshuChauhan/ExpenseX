/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { FaFileCsv, FaCalendarDays, FaCalendarWeek } from "react-icons/fa6";

const ReportDownload = ({ viewType, setViewType, downloadReport, disabled = false }) => {
    return (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-2xl glass-panel">
            {/* View Type Switcher (Segmented Control) */}
            <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mr-1 hidden sm:inline">
                    Period:
                </span>
                <div className="inline-flex p-1 bg-slate-200/80 dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700/80 shadow-inner">
                    <button
                        type="button"
                        onClick={() => setViewType("monthly")}
                        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            viewType === "monthly"
                                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                                : "text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
                        }`}
                    >
                        <FaCalendarDays size={13} />
                        <span>Monthly View</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setViewType("weekly")}
                        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            viewType === "weekly"
                                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                                : "text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
                        }`}
                    >
                        <FaCalendarWeek size={13} />
                        <span>Weekly View</span>
                    </button>
                </div>
            </div>

            {/* Export CSV Button */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={downloadReport}
                disabled={disabled}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500 rounded-xl text-xs font-bold shadow-md shadow-emerald-600/25 transition-all disabled:opacity-50 cursor-pointer"
            >
                <FaFileCsv size={16} className="text-white" />
                <span>Export {viewType === "monthly" ? "Monthly" : "Weekly"} CSV</span>
            </motion.button>
        </div>
    );
};

export default ReportDownload;