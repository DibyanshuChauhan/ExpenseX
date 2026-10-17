/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FiEye, FiEyeOff, FiUser, FiLock, FiArrowLeft } from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa6";
import logo from "../../../public/logo.svg";

const Signup = ({ onSignup, setShowSignup }) => {
    const [newUser, setNewUser] = useState({ username: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSignup(newUser.username, newUser.password);
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#090d16] p-4">
            {/* Background Ambient Glow */}
            <div className="absolute top-1/4 -right-20 w-80 h-80 bg-emerald-600/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-teal-600/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="glass-panel-elevated p-8 sm:p-10 rounded-3xl w-full max-w-md relative z-10 transition-all duration-300">
                <div className="flex flex-col items-center text-center mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 p-1 flex items-center justify-center shadow-xl shadow-emerald-600/30 mb-4">
                        <img src={logo} alt="ExpenseX" className="w-8 h-8 object-contain drop-shadow" />
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
                        <FaUserPlus size={11} /> New Registration
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-['Outfit']">
                        Create ExpenseX Account
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                        Start managing your wealth and expenses seamlessly
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                            Desired Username
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <FiUser size={16} />
                            </div>
                            <input
                                type="text"
                                name="username"
                                value={newUser.username}
                                onChange={handleChange}
                                placeholder="Choose a username"
                                className="w-full pl-10 pr-4 py-3 bg-slate-900/80 border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all outline-none"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                            Secure Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <FiLock size={16} />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={newUser.password}
                                onChange={handleChange}
                                placeholder="Create a password"
                                className="w-full pl-10 pr-11 py-3 bg-slate-900/80 border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all outline-none"
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition-colors"
                            >
                                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-2 py-3.5 px-4 bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-emerald-600/30 transition-all duration-200"
                    >
                        Create My Account
                    </button>

                    <div className="pt-4 border-t border-white/5 text-center">
                        <button
                            type="button"
                            onClick={() => setShowSignup(false)}
                            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 font-semibold transition-colors"
                        >
                            <FiArrowLeft size={14} />
                            <span>Already registered? Back to Login</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;