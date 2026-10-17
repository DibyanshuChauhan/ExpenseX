/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FiUser, FiArrowLeft, FiKey } from "react-icons/fi";
import logo from "../../../public/logo.svg";

const ForgetPassword = ({ onForgetPassword, setShowForgetPassword }) => {
    const [username, setUsername] = useState("");

    const handleChange = (e) => {
        setUsername(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onForgetPassword(username);
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#090d16] p-4">
            <div className="absolute top-1/4 -right-20 w-80 h-80 bg-amber-600/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-orange-600/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="glass-panel-elevated p-8 sm:p-10 rounded-3xl w-full max-w-md relative z-10 transition-all duration-300">
                <div className="flex flex-col items-center text-center mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-yellow-500 p-1 flex items-center justify-center shadow-xl shadow-amber-600/30 mb-4">
                        <img src={logo} alt="ExpenseX" className="w-8 h-8 object-contain drop-shadow" />
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2">
                        <FiKey size={11} /> Password Recovery
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-['Outfit']">
                        Reset Account Password
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                        Enter your registered username to reset your access
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                            Account Username
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <FiUser size={16} />
                            </div>
                            <input
                                type="text"
                                value={username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                className="w-full pl-10 pr-4 py-3 bg-slate-900/80 border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all outline-none"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-2 py-3.5 px-4 bg-gradient-to-r from-amber-600 via-orange-500 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-amber-600/30 transition-all duration-200"
                    >
                        Reset Password
                    </button>

                    <div className="pt-4 border-t border-white/5 text-center">
                        <button
                            type="button"
                            onClick={() => setShowForgetPassword(false)}
                            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 font-semibold transition-colors"
                        >
                            <FiArrowLeft size={14} />
                            <span>Return to Login</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgetPassword;