/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion"; // Library for adding animations to buttons
import AdminPanel from "./AdminPanel"; // Imports the AdminPanel component for admin-specific functionality
import logo from '../../../public/logo.svg'; // Imports the logo image for the app branding

// Navbar component
// Purpose: Displays the top navigation bar for the ExpenseX application, including the app logo, name, and buttons for admin panel access and logout
// Props:
// - onLogout: Function to handle user logout
// - currentUser: Object representing the logged-in user (contains properties like username and isAdmin)
// - onAdminAction: Function to handle admin actions such as creating or deleting users
// - users: Array of all users in the system, passed to AdminPanel for user management
const Navbar = ({ onLogout, currentUser, onAdminAction, users }) => {
    // State to control the visibility of the AdminPanel
    // Initialized to false, meaning the AdminPanel is hidden by default
    const [showAdminPanel, setShowAdminPanel] = useState(false);

    // State to manage form data for admin actions (creating or deleting users)
    // Stores the action type ("create" or "delete"), username, password (for create), and admin status
    const [adminAction, setAdminAction] = useState({
        type: "",             // Specifies the action: "create" for new user, "delete" for removing user
        username: "",         // Username for the user being created or deleted
        password: "",         // Password for new user (only used in create action)
        isAdmin: false        // Boolean to determine if the new user is an admin (only for create action)
    });

    // Handles form submission for admin actions
    // Triggered when the AdminPanel form is submitted
    const handleAdminSubmit = (e) => {
        e.preventDefault(); // Prevents the default form submission behavior (page refresh)
        // Calls the onAdminAction prop with the action type and form data
        onAdminAction(adminAction.type, {
            username: adminAction.username,
            password: adminAction.password,
            isAdmin: adminAction.isAdmin
        });
        // Resets the form fields to their initial state after submission
        setAdminAction({ type: "", username: "", password: "", isAdmin: false });
        // Closes the AdminPanel by setting showAdminPanel to false
        setShowAdminPanel(false);
    };

    return (
        // Main navbar container
        // Styled with Tailwind CSS for a dark background, padding, shadow, and custom font (navbar-poppins)
        <nav className="bg-gray-800 p-4 shadow-md navbar-poppins">
            {/* Container for aligning content with max-width and centering */}
            <div className="container mx-auto flex justify-between items-center">
                {/* Left side: App branding (logo and name) */}
                <div className="text-white flex items-center space-x-2">
                    {/* Displays the app logo, sized to 8x8 units */}
                    <img src={logo} alt="ExpenseX Logo" className="h-8 w-8" />
                    {/* Displays the app name in bold, large text */}
                    <span className="text-xl font-bold">ExpenseX</span>
                </div>

                {/* Right side: Navigation buttons */}
                <div className="flex space-x-4">
                    {/* CONDITIONAL RENDERING: Displays the "Admin Panel" button only if the user is authenticated and has admin privileges */}
                    {/* Checks if currentUser exists and currentUser.isAdmin is true */}
                    {currentUser && currentUser.isAdmin && (
                        <motion.button
                            whileHover={{ scale: 1.1 }} // Animates a slight scale-up on hover
                            whileTap={{ scale: 0.9 }}   // Animates a slight scale-down on click
                            onClick={() => setShowAdminPanel(!showAdminPanel)} // Toggles the showAdminPanel state to show/hide AdminPanel
                            className="text-white bg-indigo-600 hover:bg-indigo-700 p-2 rounded-lg focus:outline-none"
                        >
                            Admin Panel
                        </motion.button>
                    )}

                    {/* Logout button, displayed for all authenticated users */}
                    {/* No conditional rendering here, as logout is available to all logged-in users */}
                    <motion.button
                        whileHover={{ scale: 1.1 }} // Similar hover animation
                        whileTap={{ scale: 0.9 }}   // Similar tap animation
                        onClick={onLogout} // Triggers the onLogout function to log the user out
                        className="text-white bg-red-600 hover:bg-red-700 p-2 rounded-lg focus:outline-none"
                    >
                        Logout
                    </motion.button>
                </div>
            </div>

            {/* CONDITIONAL RENDERING: Renders the AdminPanel component only if the user is authenticated and has admin privileges */}
            {/* Same condition as the Admin Panel button to ensure consistency */}
            {currentUser && currentUser.isAdmin && (
                <AdminPanel
                    show={showAdminPanel}                   // Passes the showAdminPanel state to control AdminPanel visibility
                    onAdminAction={onAdminAction}           // Passes the function to handle admin actions (create/delete user)
                    users={users}                           // Passes the list of all users for display in AdminPanel
                    adminAction={adminAction}               // Passes the current admin action form data
                    setAdminAction={setAdminAction}         // Passes the function to update admin action form data
                    handleAdminSubmit={handleAdminSubmit}   // Passes the function to handle AdminPanel form submission
                    currentUser={currentUser}               // Passes the current user data for access control in AdminPanel
                />
            )}
        </nav>
    );
};

// Exports the Navbar component for use in the application
export default Navbar;