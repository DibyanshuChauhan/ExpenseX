/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion"; // For button animations

// ReportDownload component
// Purpose: Provides a UI for selecting the view type (monthly or weekly) and downloading a report based on the selected view
// Props:
// - viewType: String indicating the current view ("monthly" or "weekly")
// - setViewType: Function to update the viewType state
// - downloadReport: Function to trigger the download of a report based on the current viewType
const ReportDownload = ({ viewType, setViewType, downloadReport }) => {
    return (
        // Container for view type dropdown and download button
        // Flex layout with spacing and top margin
        <div className="mt-4 flex items-center space-x-4">
            {/* Label for the view type dropdown */}
            <label htmlFor="viewType" className="mr-2 text-gray-300">View: </label>

            {/* Dropdown to select between "monthly" or "weekly" view */}
            <select
                id="viewType" // Associates with label
                value={viewType} // Controlled by viewType prop
                onChange={(e) => setViewType(e.target.value)} // Updates viewType on selection
                className="p-2 bg-gray-700 border-none rounded-lg focus:ring-2 focus:ring-blue-500 transition text-white"
            >
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
            </select>
            {/* 
                Conditional Rendering for Dropdown:
                The dropdown dynamically displays the selected option based on the `viewType` prop ("monthly" or "weekly").
                The `value` prop is bound to `viewType`, ensuring the dropdown reflects the current state (e.g., shows "Monthly" if `viewType` is "monthly").
                When the user selects an option, the `onChange` event calls `setViewType` with the new value, updating the state.
                This creates a controlled component where the displayed option is conditionally rendered based on `viewType`, ensuring the UI stays in sync with the state.
            */}

            {/* Button to trigger report download */}
            <motion.button
                whileHover={{ scale: 1.05 }} // Scales up slightly on hover
                whileTap={{ scale: 0.95 }}   // Scales down slightly on click
                onClick={downloadReport}     // Calls downloadReport function
                className="bg-gradient-to-r from-green-600 to-green-800 text-white p-3 rounded-lg hover:from-green-700 hover:to-green-900 transition-all"
            >
                Download {viewType} Report
            </motion.button>
            {/* 
                Conditional Rendering for Button Text:
                The button's text dynamically includes the current `viewType` using string interpolation (`Download {viewType} Report`).
                If `viewType` is "monthly", the text reads "Download monthly Report"; if "weekly", it reads "Download weekly Report".
                This conditional rendering ensures the button clearly indicates which report (monthly or weekly) will be downloaded.
                The `downloadReport` function, triggered on click, likely uses `viewType` to generate the appropriate report, handling the logic internally.
            */}
        </div>
    );
};

// Exports the ReportDownload component for use in the application
export default ReportDownload;