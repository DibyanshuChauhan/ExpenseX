/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

const ReportDownload = ({ viewType, setViewType, downloadReport }) => {
    return (
        <div className="mt-4 flex items-center space-x-4">
            <label htmlFor="viewType" className="mr-2 text-gray-300">View: </label>
            <select
                id="viewType"
                value={viewType}
                onChange={(e) => setViewType(e.target.value)}
                className="p-2 bg-gray-700 border-none rounded-lg focus:ring-2 focus:ring-blue-500 transition text-white"
            >
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
            </select>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={downloadReport}
                className="bg-gradient-to-r from-green-600 to-green-800 text-white p-3 rounded-lg hover:from-green-700 hover:to-green-900 transition-all"
            >
                Download {viewType} Report
            </motion.button>
        </div>
    );
};

export default ReportDownload;