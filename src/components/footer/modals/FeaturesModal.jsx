/* eslint-disable no-unused-vars */
import React from "react"; // Imports React for component creation
import { motion } from "framer-motion"; // Imports motion for animations

// FeaturesModal component displays a modal with a detailed guide to ExpenseX features
// Props:
// - show: Boolean to control modal visibility
// - onClose: Function to close the modal
// - currentUser: Object with user details, specifically the username
const FeaturesModal = ({ show, onClose, currentUser }) => {
    // Returns null if the modal should not be displayed
    if (!show) return null;

    return (
        // Outer overlay dims the background and centers the modal
        <motion.div
            initial={{ opacity: 0 }} // Starts with zero opacity
            animate={{ opacity: 1 }} // Fades in to full opacity
            exit={{ opacity: 0 }} // Fades out when closing
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
            onClick={onClose} // Closes modal when clicking outside
        >
             {/* Inner modal container with animation and styling */}
            <motion.div
                initial={{ y: 50, scale: 0.9 }} // Starts below and scaled down
                animate={{ y: 0, scale: 1 }} // Moves up and scales to normal
                exit={{ y: 50, scale: 0.9 }} // Moves down and scales down on exit
                transition={{ type: "spring", damping: 15, stiffness: 100 }} // Applies spring animation
                className="bg-white/10 backdrop-blur-xl p-6 rounded-xl shadow-2xl w-full max-w-2xl mx-4 md:max-w-3xl border border-white/5 relative overflow-y-auto max-h-[90vh]"
                onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
            >
                 {/* Close button positioned at top-right */}
                <button
                    onClick={onClose} // Triggers modal closure
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-all duration-200"
                >
                     {/* SVG icon for the close button */}
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                 {/* Title of the features modal with gradient text */}
                <h2 className="text-3xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-600">
                    ExpenseX Features: A Comprehensive Guide
                </h2>
                 {/* Container for feature sections */}
                <div className="space-y-6 text-gray-200">
                    {/* Feature 1: Authentication System */}
                    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                         {/* Section title for Authentication System */}
                        <h3 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                            🔐 Authentication System
                        </h3>
                         {/* Description of the authentication system */}
                        <p className="text-sm leading-relaxed">
                            ExpenseX provides a secure and user-friendly authentication system to manage your account effectively, with all data securely stored using localStorage for persistence across sessions:
                        </p>
                         {/* List of authentication features */}
                        <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                            <li>
                                 {/* Sub-section for Login Window features */}
                                <strong>Login Window</strong>
                                <ul className="list-circle pl-5 mt-1 text-xs">
                                    <li>✅ <strong>Login to Existing Account</strong>: Enter your credentials to access your personalized dashboard. LocalStorage stores your login state (`currentUser`) to keep you logged in until you log out.</li>
                                    <li>✅ <strong>Sign Up to Create a New Account</strong>: Register with a unique username and password, saved in localStorage for future access.</li>
                                    <li>✅ <strong>Forget Password</strong>: Reset your password via temporary token stored in localStorage during the process.</li>
                                    <li>✅ <strong>Change Password</strong>: Update your password post-login, securely updating the localStorage entry.</li>
                                </ul>
                            </li>
                        </ul>
                    </div>

                    {/* Feature 2: Navbar Functionality */}
                    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                        // Section title for Navbar Functionality
                        <h3 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                            🧭 Navbar Functionality
                        </h3>
                         {/* Description of navbar features */}
                        <p className="text-sm leading-relaxed">
                            The navbar offers essential controls, with admin features leveraging localStorage for data management:
                        </p>
                         {/* List of navbar features */}
                        <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                            <li>
                                 {/* Logout button feature */}
                                <strong>Logout Button</strong>: Safely log out, clearing the `currentUser` from localStorage to ensure security.
                            </li>
                            <li>
                                 {/* Sub-section for Admin Panel features (Main Admin only) */}
                                <strong>Admin Panel (Main Admin Only)</strong>
                                <ul className="list-circle pl-5 mt-1 text-xs">
                                    <li>
                                         {/* User Management section */}
                                        👤 <strong>User Management</strong>
                                        <ul className="list-none pl-2">
                                            <li>✅ <strong>Create User</strong>: Add new users, storing their details in localStorage.</li>
                                            <li>✅ <strong>Delete User</strong>: Remove users, updating localStorage accordingly.</li>
                                        </ul>
                                    </li>
                                    <li>
                                         {/* Expense Monitoring section */}
                                        💸 <strong>Expense Monitoring</strong>
                                        <ul className="list-none pl-2">
                                            <li>✅ <strong>View All User Expenses</strong>: Access a consolidated view of all expenses stored in localStorage under user-specific keys.</li>
                                        </ul>
                                    </li>
                                    <li>
                                         {/* Feedback Management section */}
                                        💬 <strong>Feedback Management</strong>
                                        <ul className="list-none pl-2">
                                            <li>✅ <strong>View Feedback</strong>: See all feedback stored in `adminFeedbacks` in localStorage.</li>
                                            <li>✅ <strong>Filter Feedback</strong>: Sort feedback by username using localStorage data.</li>
                                            <li>✅ <strong>Delete Individual Feedback</strong>: Remove specific feedback entries from localStorage.</li>
                                            <li>✅ <strong>Delete All Feedback</strong>: Clear the entire `adminFeedbacks` array in localStorage.</li>
                                        </ul>
                                    </li>
                                    <li>
                                         {/* Secondary Admin Role section */}
                                        🛡️ <strong>Secondary Admin Role</strong>
                                        <ul className="list-none pl-2">
                                            <li>✅ <strong>View Users, Expenses & Feedback</strong>: Read-only access to data stored in localStorage.</li>
                                            <li>❌ <strong>No Create/Delete</strong>: Restricted from modifying localStorage data.</li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>

                    {/* Feature 3: User Dashboard */}
                    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                         {/* Section title for User Dashboard */}
                        <h3 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                            📊 User Dashboard
                        </h3>
                         {/* Description of user dashboard features */}
                        <p className="text-sm leading-relaxed">
                            Your all-in-one financial management hub, powered by localStorage for data persistence:
                        </p>
                         {/* List of user dashboard features */}
                        <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                            <li>
                                 {/* Budget & Expense Entry section */}
                                <strong>Budget & Expense Entry</strong>
                                <ul className="list-circle pl-5 mt-1 text-xs">
                                    <li>✅ <strong>Set Monthly Budget</strong>: Define your budget, saved in localStorage (`budget_${currentUser?.username || "Guest"}`) for tracking.</li>
                                    <li>✅ <strong>Add Expenses</strong>
                                        <ul className="list-none pl-2">
                                            <li>✅ Set amount, category, date, and description.</li>
                                            <li>✅ Submit via “Add Expense” button, storing data in `expenses_${currentUser?.username || "Guest"}` in localStorage.</li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                 {/* Expense Trends (Graph View) section */}
                                <strong>Expense Trends (Graph View)</strong>
                                <ul className="list-circle pl-5 mt-1 text-xs">
                                    <li>✅ <strong>Visual Display</strong>: Graphs generated from localStorage expense data.</li>
                                    <li>✅ <strong>Filter by Weekly/Monthly</strong>: Switch views based on stored data.</li>
                                    <li>✅ <strong>Export as .csv</strong>: Download data from localStorage as a file.</li>
                                </ul>
                            </li>
                            <li>
                                 {/* Reset Functionality section */}
                                <strong>Reset Functionality</strong>
                                <ul className="list-circle pl-5 mt-1 text-xs">
                                    <li>✅ <strong>One-Click Reset</strong>: Clear all expenses from `expenses_${currentUser?.username || "Guest"}` in localStorage.</li>
                                </ul>
                            </li>
                            <li>
                                 {/* Category Summary Section */}
                                <strong>Category Summary Section</strong>
                                <ul className="list-circle pl-5 mt-1 text-xs">
                                    <li>✅ <strong>Total per Category</strong>: Calculated from localStorage expense data.</li>
                                    <li>✅ <strong>Overall Summary</strong>: Grouped category insights from stored records.</li>
                                </ul>
                            </li>
                        </ul>
                    </div>

                    {/* Feature 4: Footer Section */}
                    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                         {/* Section title for Footer Section */}
                        <h3 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                            📥 Footer Section (Modal-Based Features)
                        </h3>
                         {/* Description of footer section features */}
                        <p className="text-sm leading-relaxed">
                            Interactive footer features enhance user engagement, with data handled via localStorage where applicable:
                        </p>
                         {/* List of footer section features */}
                        <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                            <li>
                                 {/* Feedback Modal section */}
                                <strong>📝 Feedback Modal</strong>
                                <ul className="list-circle pl-5 mt-1 text-xs">
                                    <li>✅ <strong>Send Feedback</strong>: Submit feedback, saved in `adminFeedbacks` in localStorage for admin review, linked to `{currentUser?.username || "Guest"}`.</li>
                                </ul>
                            </li>
                            <li>
                                 {/* Contact Us Modal section */}
                                <strong>📧 Contact Us Modal</strong>
                                <ul className="list-circle pl-5 mt-1 text-xs">
                                    <li>✅ <strong>Personal Details</strong>: View developer’s educational and professional info (no localStorage dependency).</li>
                                </ul>
                            </li>
                            <li>
                                 {/* Quick Math Challenge Game section */}
                                <strong>🧠 Quick Math Challenge Game</strong>
                                <ul className="list-circle pl-5 mt-1 text-xs">
                                    <li>✅ <strong>Math-Based Mini-Game</strong>: Play to refresh your mind, with scores tracked in memory (not localStorage).</li>
                                    <li>✅ <strong>Relevance</strong>: Ties into budgeting/expense logic for a fun learning experience.</li>
                                </ul>
                            </li>
                            <li>
                                 {/* Social Links section */}
                                <strong>🌐 Social Links</strong>
                                <ul className="list-circle pl-5 mt-1 text-xs">
                                    <li>✅ <strong>Social Media Links</strong>: Direct access to developer’s profiles (no localStorage use).</li>
                                </ul>
                            </li>
                            <li>
                                 {/* Features Modal section (self-referential) */}
                                <strong>📜 Features Modal</strong>
                                <ul className="list-circle pl-5 mt-1 text-xs">
                                    <li>✅ <strong>Detailed List</strong>: Comprehensive guide to all features, as you’re reading now!</li>
                                    <li>✅ <strong>No Tutorials Needed</strong>: Eliminates the need for separate research, all info here.</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

// Exports the FeaturesModal component for use in the application
export default FeaturesModal;