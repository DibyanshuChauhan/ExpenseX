/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { FaFileCsv, FaCalendarDays, FaCalendarWeek } from "react-icons/fa6";

const ReportDownload = ({ viewType, setViewType, downloadReport, disabled = false }) => {
    return (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-xl glass-panel">
            {/* View Type Switcher (Segmented Control) */}
            <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline">
                    Period:
                </span>
                <div className="inline-flex p-1 bg-slate-900/90 rounded-xl border border-white/10 shadow-inner">
                    <button
                        type="button"
                        onClick={() => setViewType("monthly")}
                        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            viewType === "monthly"
                                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                                : "text-slate-400 hover:text-white"
                        }`}
                    >
                        <FaCalendarDays size={13} />
                        <span>Monthly View</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setViewType("weekly")}
                        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            viewType === "weekly"
                                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                                : "text-slate-400 hover:text-white"
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
                className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-semibold shadow-sm hover:text-white transition-all disabled:opacity-50"
            >
                <FaFileCsv size={16} className="text-emerald-400" />
                <span>Export {viewType === "monthly" ? "Monthly" : "Weekly"} CSV</span>
            </motion.button>
        </div>
    );
};

export default ReportDownload;