/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FiEye, FiEyeOff, FiUser, FiLock, FiArrowLeft, FiShield } from "react-icons/fi";
import { toast } from "react-toastify";
import ThemeToggle from "../shared/ThemeToggle";
import logo from "../../../public/logo.svg";

const ChangePassword = ({ onChangePassword, setShowChangePassword }) => {
    const [formData, setFormData] = useState({
        username: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            toast.error("New password and confirm password do not match!");
            return;
        }
        onChangePassword(formData.username, formData.currentPassword, formData.newPassword);
        setShowChangePassword(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 p-4 transition-colors duration-300">
            <div className="absolute top-6 right-6 z-20">
                <ThemeToggle />
            </div>

            <div className="absolute top-1/4 -right-20 w-80 h-80 bg-amber-500/15 dark:bg-amber-600/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-indigo-500/15 dark:bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="glass-panel-elevated p-8 sm:p-10 rounded-3xl w-full max-w-md relative z-10 transition-all duration-300">
                <div className="flex flex-col items-center text-center mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-indigo-500 p-1 flex items-center justify-center shadow-xl shadow-amber-600/30 mb-4">
                        <img src={logo} alt="ExpenseX" className="w-8 h-8 object-contain drop-shadow" />
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 mb-2">
                        <FiShield size={11} /> Security Settings
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white font-['Outfit']">
                        Update Password
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Secure your ExpenseX account with a new password
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3.5">
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                            Username
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <FiUser size={15} />
                            </div>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Username"
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all outline-none"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                            Current Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <FiLock size={15} />
                            </div>
                            <input
                                type={showCurrentPassword ? "text" : "password"}
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleChange}
                                placeholder="Current password"
                                className="w-full pl-10 pr-10 py-2.5 bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all outline-none"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
                            >
                                {showCurrentPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                            New Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <FiLock size={15} />
                            </div>
                            <input
                                type={showNewPassword ? "text" : "password"}
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                placeholder="New password"
                                className="w-full pl-10 pr-10 py-2.5 bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all outline-none"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
                            >
                                {showNewPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                            Confirm New Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <FiLock size={15} />
                            </div>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm new password"
                                className="w-full pl-10 pr-10 py-2.5 bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all outline-none"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
                            >
                                {showConfirmPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-amber-600 via-orange-500 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-amber-600/30 transition-all duration-200"
                    >
                        Save New Password
                    </button>

                    <div className="pt-3 border-t border-slate-200 dark:border-white/5 text-center">
                        <button
                            type="button"
                            onClick={() => setShowChangePassword(false)}
                            className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 font-semibold transition-colors"
                        >
                            <FiArrowLeft size={14} />
                            <span>Back to Login</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;