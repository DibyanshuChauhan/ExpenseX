import React, { useState } from "react"; // React library for state management and component creation
import { FiEye, FiEyeOff } from "react-icons/fi"; // Icons for password visibility toggle

// Login component
// Purpose: Provides a form for users to log into the Expense Tracker application with username and password
// Props:
// - onLogin: Function passed from the parent to handle the login logic with username and password
// - setShowSignup: Function to toggle visibility of the signup component
// - setShowForgetPassword: Function to toggle visibility of the forget password component
// - showChangePassword: Boolean indicating whether the change password option should be shown
// - setShowChangePassword: Function to toggle visibility of the change password component
const Login = ({ onLogin, setShowSignup, setShowForgetPassword, showChangePassword, setShowChangePassword }) => {
    // State to store user credentials (username and password)
    const [credentials, setCredentials] = useState({ username: "", password: "" });

    // State to toggle password visibility in the input field
    const [showPassword, setShowPassword] = useState(false);

    // Handles changes to the input fields (username and password)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value }); // Updates credentials state with new input value
    };

    // Handles form submission to perform login
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents the default form submission (page reload)
        onLogin(credentials.username, credentials.password); // Calls the parent function to process login
    };

    // Toggles password visibility in the input field
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev); // Toggles the state to show or hide the password
    };

    return (
        // Full-screen container with centered form, custom font, and gradient background
        <div className="min-h-screen flex items-center justify-center navbar-poppins bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            {/* Form container with glassmorphism effect, hover animations, and max width */}
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20 w-full max-w-md transform transition-all hover:scale-105 hover:shadow-3xl">
                {/* Form heading with gradient text */}
                <h2 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                    Login to Expense Tracker
                </h2>

                {/* Login form with spacing between fields */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Username input field */}
                    <div className="relative">
                        <input
                            type="text"
                            name="username"
                            value={credentials.username} // Controlled input bound to credentials state
                            onChange={handleChange} // Updates credentials state on input change
                            placeholder="Username"
                            className="w-full p-4 bg-gray-800/50 border-0 rounded-xl focus:ring-2 focus:ring-purple-500 transition-all text-white placeholder-gray-400 focus:placeholder-transparent focus:outline-none"
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
                            value={credentials.password} // Controlled input bound to credentials state
                            onChange={handleChange} // Updates credentials state on input change
                            placeholder="Password"
                            className="w-full p-4 bg-gray-800/50 border-0 rounded-xl focus:ring-2 focus:ring-purple-500 transition-all text-white placeholder-gray-400 focus:placeholder-transparent focus:outline-none pr-12"
                            required // Ensures the field is not empty
                        />
                        {/* 
                            Eye icon to toggle password visibility
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

                    {/* Login submission button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-700 text-white p-4 rounded-xl hover:from-blue-700 hover:to-purple-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        Login
                    </button>

                    {/* Additional navigation links for signup, forgot password, and change password */}
                    <div className="mt-6 text-center space-x-6">
                        {/* Button to navigate to the signup page */}
                        <button
                            onClick={() => setShowSignup(true)}
                            className="text-blue-400 hover:text-blue-300 font-medium transition-colors underline-offset-2 hover:underline"
                        >
                            Create Account
                        </button>
                        {/* Button to navigate to the forgot password page */}
                        <button
                            onClick={() => setShowForgetPassword(true)}
                            className="text-blue-400 hover:text-blue-300 font-medium transition-colors underline-offset-2 hover:underline"
                        >
                            Forget Password?
                        </button>
                        {/* 
                            Conditional rendering for the change password button
                            Displays the "Change Password" button only if `showChangePassword` is `true`.
                            If `true`, renders a button that sets `setShowChangePassword(true)` when clicked.
                            If `false`, renders nothing, keeping the UI clean and focused on login.
                            Allows dynamic navigation based on the application's state.
                        */}
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

// Exports the Login component for use in the application
export default Login;