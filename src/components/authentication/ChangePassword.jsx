import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

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
            return;
        }
        onChangePassword(formData.username, formData.currentPassword, formData.newPassword);
        setShowChangePassword(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            {/* Container with glassmorphism effect */}
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20 w-full max-w-md transform transition-all hover:scale-105 hover:shadow-3xl">
                <h2 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">
                    Change Password
                </h2>

                {/* Change Password Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Username Input Field */}
                    <div className="relative">
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Username"
                            className="w-full p-4 bg-gray-800/50 border-0 rounded-xl focus:ring-2 focus:ring-amber-500 transition-all text-white placeholder-gray-400 focus:placeholder-transparent focus:outline-none"
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

                    {/* Current Password Input Field with visibility toggle */}
                    <div className="relative">
                        <input
                            type={showCurrentPassword ? "text" : "password"}
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            placeholder="Current Password"
                            className="w-full p-4 bg-gray-800/50 border-0 rounded-xl focus:ring-2 focus:ring-amber-500 transition-all text-white placeholder-gray-400 focus:placeholder-transparent focus:outline-none pr-12"
                            required
                        />
                        <div
                            className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400 hover:text-white transition-colors"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                            {showCurrentPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                        </div>
                    </div>

                    {/* New Password Input Field with visibility toggle */}
                    <div className="relative">
                        <input
                            type={showNewPassword ? "text" : "password"}
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            placeholder="New Password"
                            className="w-full p-4 bg-gray-800/50 border-0 rounded-xl focus:ring-2 focus:ring-amber-500 transition-all text-white placeholder-gray-400 focus:placeholder-transparent focus:outline-none pr-12"
                            required
                        />
                        <div
                            className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400 hover:text-white transition-colors"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                            {showNewPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                        </div>
                    </div>

                    {/* Confirm Password Input Field with visibility toggle */}
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                            className="w-full p-4 bg-gray-800/50 border-0 rounded-xl focus:ring-2 focus:ring-amber-500 transition-all text-white placeholder-gray-400 focus:placeholder-transparent focus:outline-none pr-12"
                            required
                        />
                        <div
                            className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400 hover:text-white transition-colors"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                        </div>
                    </div>

                    {/* Update Password Button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-yellow-600 to-amber-700 text-white p-4 rounded-xl hover:from-yellow-700 hover:to-amber-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        Update Password
                    </button>

                    {/* Back to Login Link */}
                    <div className="mt-6 text-center">
                        <button
                            onClick={() => setShowChangePassword(false)}
                            className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors underline-offset-2 hover:underline"
                        >
                            Back to Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;