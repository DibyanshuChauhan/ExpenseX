import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

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
        <div className="min-h-screen flex items-center justify-center navbar-poppins bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            {/* Container with glassmorphism effect */}
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20 w-full max-w-md transform transition-all hover:scale-105 hover:shadow-3xl">
                <h2 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                    Login to Expense Tracker
                </h2>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Username Input Field */}
                    <div className="relative">
                        <input
                            type="text"
                            name="username"
                            value={credentials.username}
                            onChange={handleChange}
                            placeholder="Username"
                            className="w-full p-4 bg-gray-800/50 border-0 rounded-xl focus:ring-2 focus:ring-purple-500 transition-all text-white placeholder-gray-400 focus:placeholder-transparent focus:outline-none"
                            required
                        />
                        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Password Input Field with visibility toggle */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="w-full p-4 bg-gray-800/50 border-0 rounded-xl focus:ring-2 focus:ring-purple-500 transition-all text-white placeholder-gray-400 focus:placeholder-transparent focus:outline-none pr-12"
                            required
                        />
                        <div
                            className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400 hover:text-white transition-colors"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                        </div>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-700 text-white p-4 rounded-xl hover:from-blue-700 hover:to-purple-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        Login
                    </button>

                    {/* Additional Links for Signup, Forgot Password, and Change Password */}
                    <div className="mt-6 text-center space-x-6">
                        <button
                            onClick={() => setShowSignup(true)}
                            className="text-blue-400 hover:text-blue-300 font-medium transition-colors underline-offset-2 hover:underline"
                        >
                            Create Account
                        </button>
                        <button
                            onClick={() => setShowForgetPassword(true)}
                            className="text-blue-400 hover:text-blue-300 font-medium transition-colors underline-offset-2 hover:underline"
                        >
                            Forget Password?
                        </button>
                        {showChangePassword && (
                            <button
                                onClick={() => setShowChangePassword(true)}
                                className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors underline-offset-2 hover:underline"
                            >
                                Change Password
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;