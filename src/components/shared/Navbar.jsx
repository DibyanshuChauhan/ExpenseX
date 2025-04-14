/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import AdminPanel from "./AdminPanel";
import logo from '../../../public/logo.svg'; // SVG file import

const Navbar = ({ onLogout, currentUser, onAdminAction, users }) => {
    const [showAdminPanel, setShowAdminPanel] = useState(false);
    const [adminAction, setAdminAction] = useState({ type: "", username: "", password: "", isAdmin: false });

    const handleAdminSubmit = (e) => {
        e.preventDefault();
        onAdminAction(adminAction.type, { username: adminAction.username, password: adminAction.password, isAdmin: adminAction.isAdmin });
        setAdminAction({ type: "", username: "", password: "", isAdmin: false });
        setShowAdminPanel(false);
    };

    return (
        <nav className="bg-gray-800 p-4 shadow-md navbar-poppins">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white flex items-center space-x-2">
                    <img src={logo} alt="ExpenseX Logo" className="h-8 w-8" /> {/* SVG as logo */}
                    <span className="text-xl font-bold">ExpenseX</span> {/* Text beside logo */}
                </div>
                <div className="flex space-x-4">
                    {currentUser && currentUser.isAdmin && (
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setShowAdminPanel(!showAdminPanel)}
                            className="text-white bg-indigo-600 hover:bg-indigo-700 p-2 rounded-lg focus:outline-none"
                        >
                            Admin Panel
                        </motion.button>
                    )}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onLogout}
                        className="text-white bg-red-600 hover:bg-red-700 p-2 rounded-lg focus:outline-none"
                    >
                        Logout
                    </motion.button>
                </div>
            </div>
            {currentUser && currentUser.isAdmin && (
                <AdminPanel
                    show={showAdminPanel}
                    onAdminAction={onAdminAction}
                    users={users}
                    adminAction={adminAction}
                    setAdminAction={setAdminAction}
                    handleAdminSubmit={handleAdminSubmit}
                    currentUser={currentUser}
                />
            )}
        </nav>
    );
};

export default Navbar;