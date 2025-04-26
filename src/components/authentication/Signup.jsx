import React, { useState } from "react"; // React library for state management and component creation
import { FiEye, FiEyeOff } from "react-icons/fi"; // Icons for password visibility toggle

// Signup component
// Purpose: Provides a form for users to create a new account in the Expense Tracker application with a username and password
// Props:
// - onSignup: Function passed from the parent to handle the signup logic with username and password
// - setShowSignup: Function to toggle the visibility of this component, typically to return to the login screen
const Signup = ({ onSignup, setShowSignup }) => {
    // State to store the new user’s credentials (username and password)
    const [newUser, setNewUser] = useState({ username: "", password: "" });

    // State to toggle password visibility in the input field
    const [showPassword, setShowPassword] = useState(false);

    // Handles changes to the input fields (username and password)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value }); // Updates newUser state with new input value
    };

    // Handles form submission to perform signup
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents the default form submission (page reload)
        onSignup(newUser.username, newUser.password); // Calls the parent function to process signup
    };

    // Toggles password visibility in the input field
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev); // Toggles the state to show or hide the password
    };

    return (
        // Full-screen container with centered form and gradient background
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            {/* Form container with glassmorphism effect, hover animations, and max width */}
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20 w-full max-w-md transform transition-all hover:scale-105 hover:shadow-3xl">
                {/* Form heading with gradient text */}
                <h2 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                    Create New Account
                </h2>

                {/* Signup form with spacing between fields */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Username input field */}
                    <div className="relative">
                        <input
                            type="text"
                            name="username"
                            value={newUser.username} // Controlled input bound to newUser state
                            onChange={handleChange} // Updates newUser state on input change
                            placeholder="Username"
                            className="w-full p-4 bg-gray-800/50 border-0 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all text-white placeholder-gray-400 focus:placeholder-transparent focus:outline-none"
                            required // Ensures the field is not empty
                        />
                        {/* 
                            Username icon for visual feedback
                            Displays a user icon next to the input field to indicate it’s for username entry.
                            Positioned absolutely on the right side, centered vertically with a transform, and styled with a gray color.
                            Enhances user experience by providing a clear visual cue for the input purpose.
                        */}
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

                    {/* Password input field with visibility toggle */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"} // Toggles between text and password based on state
                            name="password"
                            value={newUser.password} // Controlled input bound to newUser state
                            onChange={handleChange} // Updates newUser state on input change
                            placeholder="Password"
                            className="w-full p-4 bg-gray-800/50 border-0 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all text-white placeholder-gray-400 focus:placeholder-transparent focus:outline-none pr-12"
                            required // Ensures the field is not empty
                        />
                        {/* 
                            Password visibility toggle button
                            Displays an eye icon to show or hide the password.
                            If `showPassword` is `true`, renders `FiEyeOff` (hide password).
                            If `false`, renders `FiEye` (show password).
                            Toggles the `showPassword` state on click, changing the input type dynamically.
                            Improves user experience by allowing password visibility control.
                        */}
                        <div
                            className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400 hover:text-white transition-colors"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                        </div>
                    </div>

                    {/* Signup submission button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-700 text-white p-4 rounded-xl hover:from-green-700 hover:to-emerald-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        Signup
                    </button>

                    {/* Back to login link */}
                    <div className="mt-6 text-center">
                        {/* Button to return to the login screen */}
                        <button
                            onClick={() => setShowSignup(false)}
                            className="text-green-400 hover:text-green-300 font-medium transition-colors underline-offset-2 hover:underline"
                        >
                            Back to Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Exports the Signup component for use in the application
export default Signup;