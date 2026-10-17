import React, { useState } from "react"; // React library for state management and component creation

// ForgetPassword component
// Purpose: Provides a form for users to initiate the password reset process by entering their username
// Props:
// - onForgetPassword: Function passed from the parent to handle the password reset logic with the provided username
// - setShowForgetPassword: Function to toggle the visibility of this component, typically to return to the login screen
const ForgetPassword = ({ onForgetPassword, setShowForgetPassword }) => {
    // State to store the username entered by the user
    const [username, setUsername] = useState("");

    // Handles changes to the username input field
    // Updates the username state with the input value
    const handleChange = (e) => {
        setUsername(e.target.value); // Updates username state with the new input value
    };

    // Handles form submission to trigger the password reset action
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents the default form submission behavior (page reload)
        onForgetPassword(username); // Calls the parent function to process the password reset
    };

    return (
        // Full-screen container with centered form and gradient background
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            {/* Form container with glassmorphism effect, hover animations, and max width */}
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20 w-full max-w-md transform transition-all hover:scale-105 hover:shadow-3xl">
                {/* Form heading with gradient text */}
                <h2 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">
                    Forget Password
                </h2>

                {/* Form for password reset, with spacing between elements */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Username input field */}
                    <div className="relative">
                        <input
                            type="text"
                            value={username} // Controlled input bound to username state
                            onChange={handleChange} // Updates username state on input change
                            placeholder="Enter Username"
                            className="w-full p-4 bg-gray-800/50 border-0 rounded-xl focus:ring-2 focus:ring-amber-500 transition-all text-white placeholder-gray-400 focus:placeholder-transparent focus:outline-none"
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

                    {/* Reset password submission button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-yellow-600 to-amber-700 text-white p-4 rounded-xl hover:from-yellow-700 hover:to-amber-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        Reset Password
                    </button>

                    {/* Back to login link */}
                    <div className="mt-6 text-center">
                        {/* Button to return to the login screen */}
                        <button
                            onClick={() => setShowForgetPassword(false)}
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

// Exports the ForgetPassword component for use in the application
export default ForgetPassword;