/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FiEye, FiEyeOff, FiUser, FiLock, FiShield } from "react-icons/fi";
import ThemeToggle from "../shared/ThemeToggle";
import logo from "../../../public/logo.svg";

const Login = ({ onLogin, setShowSignup, setShowForgetPassword, showChangePassword, setShowChangePassword }) => {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(credentials.username, credentials.password);
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 p-4 transition-colors duration-300">
            {/* Top Right Theme Toggle */}
            <div className="absolute top-6 right-6 z-20">
                <ThemeToggle />
            </div>

            {/* Background Ambient Lighting Orbs */}
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-indigo-500/15 dark:bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-violet-500/15 dark:bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

            {/* Elevated Card */}
            <div className="glass-panel-elevated p-8 sm:p-10 rounded-3xl w-full max-w-md relative z-10 transition-all duration-300">
                {/* Brand Logo & Header */}
                <div className="flex flex-col items-center text-center mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 p-1 flex items-center justify-center shadow-xl shadow-indigo-600/30 mb-4">
                        <img src={logo} alt="ExpenseX" className="w-8 h-8 object-contain drop-shadow" />
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 mb-2">
                        <FiShield size={11} /> Expense Management Suite
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white font-['Outfit']">
                        Sign In to ExpenseX
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Access your expenses, reports, and real-time budgets
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                            Username
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <FiUser size={16} />
                            </div>
                            <input
                                type="text"
                                name="username"
                                value={credentials.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                className="w-full pl-10 pr-4 py-3 bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all outline-none"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <FiLock size={16} />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full pl-10 pr-11 py-3 bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all outline-none"
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
                            >
                                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-2 py-3.5 px-4 bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition-all duration-200"
                    >
                        Sign In
                    </button>

                    {/* Links */}
                    <div className="pt-4 border-t border-slate-200 dark:border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs">
                        <button
                            type="button"
                            onClick={() => setShowSignup(true)}
                            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold transition-colors"
                        >
                            Create Account
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowForgetPassword(true)}
                            className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                        >
                            Forgot Password?
                        </button>
                    </div>

                    {showChangePassword && (
                        <div className="text-center pt-2">
                            <button
                                type="button"
                                onClick={() => setShowChangePassword(true)}
                                className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 text-xs font-semibold transition-colors"
                            >
                                Change Password
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Login;