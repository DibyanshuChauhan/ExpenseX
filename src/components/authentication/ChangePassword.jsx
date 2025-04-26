import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Icons for password visibility toggle

// ChangePassword component
// Purpose: Provides a form for users to change their password, with fields for username, current password, new password, and confirm password
// Props:
// - onChangePassword: Function to handle the password change logic, called with username, current password, and new password
// - setShowChangePassword: Function to toggle visibility of this component, typically to return to the login screen
const ChangePassword = ({ onChangePassword, setShowChangePassword }) => {
    // State to manage form inputs
    // Stores username, current password, new password, and confirm password
    const [formData, setFormData] = useState({
        username: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    // State to control visibility of current password field (show/hide)
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);

    // State to control visibility of new password field (show/hide)
    const [showNewPassword, setShowNewPassword] = useState(false);

    // State to control visibility of confirm password field (show/hide)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Handles changes to form inputs
    // Updates the formData state based on input field name and value
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value }); // Updates state with new input value
    };

    // Handles form submission for password change
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents page refresh on form submission
        // Validates that new password matches confirm password
        if (formData.newPassword !== formData.confirmPassword) {
            return; // Exits if passwords don't match, preventing submission
        }
        // Calls parent function to process password change
        onChangePassword(formData.username, formData.currentPassword, formData.newPassword);
        // Hides the change password form, typically returning to login screen
        setShowChangePassword(false);
    };

    return (
        // Full-screen container with centered form and gradient background
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            {/* Form container with glassmorphism effect, hover animations, and max width */}
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20 w-full max-w-md transform transition-all hover:scale-105 hover:shadow-3xl">
                {/* Form heading with gradient text */}
                <h2 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">
                    Change Password
                </h2>

                {/* Form for changing password, with spacing between fields */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Username input field */}
                    <div className="relative">
                        <input
                            type="text"
                            name="username"
                            value={formData.username} // Controlled input bound to state
                            onChange={handleChange} // Updates state on input change
                            placeholder="Username"
                            className="w-full p-4 bg-gray-800/50 border-0 rounded-xl focus:ring-2 focus:ring-amber-500 transition-all text-white placeholder-gray-400 focus:placeholder-transparent focus:outline-none"
                            required // Ensures field is not empty
                        />
                        {/* Username icon for visual feedback */}
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

                    {/* Current password input field with visibility toggle */}
                    <div className="relative">
                        <input
                            type={showCurrentPassword ? "text" : "password"} // Toggles between text and password based on state
                            name="currentPassword"
                            value={formData.currentPassword} // Controlled input bound to state
                            onChange={handleChange} // Updates state on input change
                            placeholder="Current Password"
                            className="w-full p-4 bg-gray-800/50 border-0 rounded-xl focus:ring-2 focus:ring-amber-500 transition-all text-white placeholder-gray-400 focus:placeholder-transparent focus:outline-none pr-12"
                            required // Ensures field is not empty
                        />
                        {/* 
                            Password visibility toggle button
                            Renders an eye icon to show/hide the current password.
                            If `showCurrentPassword` is `true`, displays `FiEyeOff` (hide password).
                            If `false`, displays `FiEye` (show password).
                            Toggles the `showCurrentPassword` state on click, changing the input type dynamically.
                            Enhances user experience by allowing password visibility control.
                        */}
                        <div
                            className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400 hover:text-white transition-colors"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                            {showCurrentPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                        </div>
                    </div>

                    {/* New password input field with visibility toggle */}
                    <div className="relative">
                        <input
                            type={showNewPassword ? "text" : "password"} // Toggles between text and password based on state
                            name="newPassword"
                            value={formData.newPassword} // Controlled input bound to state
                            onChange={handleChange} // Updates state on input change
                            placeholder="New Password"
                            className="w-full p-4 bg-gray-800/50 border-0 rounded-xl focus:ring-2 focus:ring-amber-500 transition-all text-white placeholder-gray-400 focus:placeholder-transparent focus:outline-none pr-12"
                            required // Ensures field is not empty
                        />
                        {/* 
                            Password visibility toggle button
                            Renders an eye icon to show/hide the new password.
                            If `showNewPassword` is `true`, displays `FiEyeOff` (hide password).
                            If `false`, displays `FiEye` (show password).
                            Toggles the `showNewPassword` state on click, changing the input type dynamically.
                            Enhances user experience by allowing password visibility control.
                        */}
                        <div
                            className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400 hover:text-white transition-colors"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                            {showNewPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                        </div>
                    </div>

                    {/* Confirm password input field with visibility toggle */}
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"} // Toggles between text and password based on state
                            name="confirmPassword"
                            value={formData.confirmPassword} // Controlled input bound to state
                            onChange={handleChange} // Updates state on input change
                            placeholder="Confirm Password"
                            className="w-full p-4 bg-gray-800/50 border-0 rounded-xl focus:ring-2 focus:ring-amber-500 transition-all text-white placeholder-gray-400 focus:placeholder-transparent focus:outline-none pr-12"
                            required // Ensures field is not empty
                        />
                        {/* 
                            Password visibility toggle button
                            Renders an eye icon to show/hide the confirm password.
                            If `showConfirmPassword` is `true`, displays `FiEyeOff` (hide password).
                            If `false`, displays `FiEye` (show password).
                            Toggles the `showConfirmPassword` state on click, changing the input type dynamically.
                            Enhances user experience by allowing password visibility control.
                        */}
                        <div
                            className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400 hover:text-white transition-colors"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                        </div>
                    </div>

                    {/* Update password submission button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-yellow-600 to-amber-700 text-white p-4 rounded-xl hover:from-yellow-700 hover:to-amber-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        Update Password
                    </button>

                    {/* Back to login link */}
                    <div className="mt-6 text-center">
                        {/* Button to return to the login screen */}
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

// Exports the ChangePassword component for use in the application
export default ChangePassword;