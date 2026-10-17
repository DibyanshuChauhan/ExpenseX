/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiLogOut, FiShield, FiUser } from "react-icons/fi";
import AdminPanel from "./AdminPanel";
import ThemeToggle from "./ThemeToggle";
import logo from "../../../public/logo.svg";

const Navbar = ({ onLogout, currentUser, onAdminAction, users }) => {
    const [showAdminPanel, setShowAdminPanel] = useState(false);

    const [adminAction, setAdminAction] = useState({
        type: "",
        username: "",
        password: "",
        isAdmin: false
    });

    const handleAdminSubmit = (e) => {
        e.preventDefault();
        onAdminAction(adminAction.type, {
            username: adminAction.username,
            password: adminAction.password,
            isAdmin: adminAction.isAdmin
        });
        setAdminAction({ type: "", username: "", password: "", isAdmin: false });
        setShowAdminPanel(false);
    };

    const isAdmin = Boolean(currentUser?.isAdmin || currentUser?.username === "admin");
    const username = currentUser?.username || "Guest";

    return (
        <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-white/10 bg-white/85 dark:bg-slate-950/80 backdrop-blur-xl transition-all">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Brand / Logo */}
                    <div className="flex items-center space-x-3">
                        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 p-0.5 shadow-lg shadow-indigo-500/25">
                            <img src={logo} alt="ExpenseX Logo" className="h-6 w-6 object-contain drop-shadow" />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white font-['Outfit']">
                                    Expense<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500">X</span>
                                </span>
                                <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                                    Fintech
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right side user badge, Theme toggle & actions */}
                    <div className="flex items-center space-x-2.5 sm:space-x-3">
                        {/* User Profile Pill */}
                        {currentUser && (
                            <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 shadow-inner">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold">
                                    {username.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-xs font-medium text-slate-700 dark:text-slate-200">
                                    {username}
                                </span>
                                <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                                    isAdmin 
                                        ? "bg-amber-500/15 text-amber-600 dark:text-amber-300 border border-amber-500/30" 
                                        : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30"
                                }`}>
                                    {isAdmin ? "Admin" : "Member"}
                                </span>
                            </div>
                        )}

                        {/* Admin Panel Button */}
                        {isAdmin && (
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setShowAdminPanel(!showAdminPanel)}
                                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                                    showAdminPanel 
                                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400" 
                                        : "bg-slate-100 dark:bg-slate-900 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20 dark:border-indigo-500/30 hover:bg-indigo-50 dark:hover:bg-indigo-950/50"
                                }`}
                            >
                                <FiShield size={14} className="text-indigo-500 dark:text-indigo-400" />
                                <span>{showAdminPanel ? "Hide Admin" : "Admin Panel"}</span>
                            </motion.button>
                        )}

                        {/* Dark / Light Mode Toggle Button */}
                        <ThemeToggle />

                        {/* Logout Button */}
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={onLogout}
                            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide bg-rose-500/10 text-rose-600 dark:text-rose-300 border border-rose-500/20 hover:bg-rose-500/20 hover:text-rose-700 dark:hover:text-white transition-all shadow-sm"
                        >
                            <FiLogOut size={13} />
                            <span>Logout</span>
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Admin Panel Drawer / Modal */}
            {isAdmin && (
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
        </header>
    );
};

export default Navbar;