/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Library for adding animations to the footer and buttons
import { toast } from "react-toastify"; // Notification library for user feedback (e.g., feedback submission)
import { FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa"; // Social media and feedback icons
import { BsTwitterX } from "react-icons/bs"; // Twitter/X icon
import SendFeedbackModal from "../footer/modals/FeedbackModal"; // Modal for submitting user feedback
import ContactModal from "../footer/modals/ContactModal"; // Modal for contact information
import GameModal from "../footer/modals/GameModal"; // Modal for a quick math challenge game
import FeaturesModal from "../footer/modals/FeaturesModal"; // Modal for displaying app features

// Footer component
// Purpose: Provides a footer for the ExpenseX application, including app info, quick links, social media, feedback, a game, and a live clock
// No props are passed, as it manages its own state and interacts with localStorage
const Footer = () => {
    // State to store the user's feedback input
    const [feedback, setFeedback] = useState("");
    // State to toggle the visibility of the feedback modal
    const [showFeedback, setShowFeedback] = useState(false);
    // State to toggle the visibility of the contact modal
    const [showContactModal, setShowContactModal] = useState(false);
    // State to toggle the visibility of the game modal
    const [showGameModal, setShowGameModal] = useState(false);
    // State to toggle the visibility of the features modal
    const [showFeaturesModal, setShowFeaturesModal] = useState(false);

    // Gets the current year for the copyright notice
    const currentYear = new Date().getFullYear();

    // Initializes the current user from localStorage or defaults to "Guest"
    // Uses a function to handle initialization to avoid parsing errors
    const [currentUser, setCurrentUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem("currentUser");
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                // Ensures parsedUser is valid and has a username
                return parsedUser && typeof parsedUser === "object" && parsedUser.username ? parsedUser : { username: "Guest" };
            }
            return { username: "Guest" };
        } catch (e) {
            console.error("Error parsing initial currentUser from localStorage:", e);
            return { username: "Guest" };
        }
    });

    // State to store and update the current time for the live clock
    const [currentTime, setCurrentTime] = useState(new Date());

    // Effect hook to handle user updates and live time updates
    useEffect(() => {
        // Function to update currentUser from localStorage
        const updateCurrentUser = () => {
            try {
                const user = localStorage.getItem("currentUser");
                if (user) {
                    const parsedUser = JSON.parse(user);
                    // Sets user if valid, otherwise defaults to Guest
                    setCurrentUser(parsedUser && typeof parsedUser === "object" && parsedUser.username ? parsedUser : { username: "Guest" });
                } else {
                    setCurrentUser({ username: "Guest" });
                }
            } catch (e) {
                console.error("Error updating currentUser from localStorage:", e);
                setCurrentUser({ username: "Guest" });
            }
        };

        updateCurrentUser(); // Initial call to set user

        // Updates the current time every second for the live clock
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        // Listens for changes to localStorage to update currentUser (e.g., if another tab updates it)
        window.addEventListener("storage", updateCurrentUser);

        // Cleanup: Clears the timer and removes the event listener when the component unmounts
        return () => {
            clearInterval(timer);
            window.removeEventListener("storage", updateCurrentUser);
        };
    }, []); // Empty dependency array ensures this runs only on mount/unmount

    // Handles feedback form submission
    const handleFeedbackSubmit = (e) => {
        e.preventDefault(); // Prevents page refresh on form submission
        console.log("Current User before submit:", currentUser); // Debug log to verify current user
        // Checks if feedback is non-empty after trimming whitespace
        if (feedback.trim()) {
            const username = currentUser?.username || "Guest"; // Uses current user's username or "Guest"
            // Creates a feedback object with username, feedback text, and timestamp
            const feedbackData = {
                username,
                feedback,
                timestamp: new Date().toISOString(),
            };
            // Retrieves existing feedbacks from localStorage or initializes an empty array
            let feedbacks = JSON.parse(localStorage.getItem("adminFeedbacks")) || [];
            feedbacks.push(feedbackData); // Adds new feedback to the array
            localStorage.setItem("adminFeedbacks", JSON.stringify(feedbacks)); // Saves updated feedbacks
            // Shows a success notification with the username
            toast.success(`Thank you, ${username}! Your feedback has been sent to the admin.`, {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
                className: "navbar-poppins",
            });
            setFeedback(""); // Clears the feedback input
            setShowFeedback(false); // Closes the feedback modal
        }
    };

    // Resets and closes the game modal
    const resetGame = () => {
        setShowGameModal(false); // Closes the game modal
        // Shows an info notification about game reset
        toast.info("Game reset and closed!", {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
            className: "navbar-poppins",
        });
    };

    // Formats the current time for display in the footer
    const formattedTime = currentTime.toLocaleTimeString();

    return (
        // Main footer container with Framer Motion animations
        // Fades in and slides up on mount with a 0.5-second transition
        <motion.footer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8 mt-12"
        >
            {/* Container for content with responsive padding */}
            <div className="container mx-auto px-6 lg:px-12">
                {/* Grid layout for footer sections, 1 column on mobile, 3 on medium screens and up */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
                    {/* App Information Section */}
                    <div className="p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/5">
                        {/* Section title with gradient text */}
                        <h4 className="text-xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400">
                            ExpenseX
                        </h4>
                        {/* Description of the app */}
                        <p className="text-gray-300 leading-relaxed">
                            Track your expenses effortlessly with our modern app. Stay on top of your budget and financial goals!
                        </p>
                    </div>

                    {/* Quick Links Section */}
                    <div className="p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/5">
                        {/* Section title with gradient text */}
                        <h4 className="text-xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400">
                            Quick Links
                        </h4>
                        {/* List of navigation links/buttons */}
                        <ul className="space-y-3 text-gray-300">
                            <li>
                                {/* Home link, currently a placeholder */}
                                <a href="#" className="hover:text-purple-400 transition-colors duration-200">
                                    Home
                                </a>
                            </li>
                            <li>
                                {/* Button to open the Features modal */}
                                <button
                                    className="hover:text-purple-400 transition-colors duration-200 cursor-pointer"
                                    onClick={() => setShowFeaturesModal(true)}
                                >
                                    Features
                                </button>
                            </li>
                            <li>
                                {/* Button to open the Contact modal */}
                                <button
                                    className="hover:text-purple-400 transition-colors duration-200 cursor-pointer"
                                    onClick={() => setShowContactModal(true)}
                                >
                                    Contact Us
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Social Links, Feedback, and Game Section */}
                    <div className="p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/5">
                        {/* Section title with gradient text */}
                        <h4 className="text-xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400">
                            Connect With Us
                        </h4>

                        {/* Social media icons with links */}
                        <div className="flex space-x-6 mb-6 text-gray-300">
                            {/* LinkedIn link with hover effects */}
                            <a href="https://www.linkedin.com/in/divyanshu011/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors duration-200 transform hover:scale-110">
                                <FaLinkedin size={22} />
                            </a>
                            {/* Twitter/X link with hover effects */}
                            <a href="https://x.com/divyanshC01" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors duration-200 transform hover:scale-110">
                                <BsTwitterX size={22} />
                            </a>
                            {/* Instagram link with hover effects */}
                            <a href="https://www.instagram.com/devyanshu__011/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors duration-200 transform hover:scale-110">
                                <FaInstagram size={22} />
                            </a>
                        </div>

                        {/* Feedback button with Framer Motion animations */}
                        <motion.button
                            whileHover={{ scale: 1.05 }} // Scales up slightly on hover
                            whileTap={{ scale: 0.95 }}   // Scales down slightly on click
                            onClick={() => setShowFeedback(true)} // Opens the feedback modal
                            className="flex items-center space-x-3 bg-gradient-to-r from-indigo-600 to-purple-700 text-white px-5 py-2 rounded-xl transition-all duration-200 mb-3 shadow-md hover:shadow-lg"
                        >
                            <FaEnvelope size={18} />
                            <span>Send Feedback</span>
                        </motion.button>

                        {/* Game button with Framer Motion animations */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowGameModal(true)} // Opens the game modal
                            className="flex items-center space-x-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white px-5 py-2 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                            <span>Play Quick Math Challenge</span>
                        </motion.button>
                    </div>
                </div>

                {/* Feedback Modal */}
                {/* Rendered conditionally based on showFeedback state */}
                <SendFeedbackModal
                    show={showFeedback} // Controls modal visibility
                    onClose={() => setShowFeedback(false)} // Closes the modal
                    feedback={feedback} // Current feedback input
                    setFeedback={setFeedback} // Updates feedback input
                    handleFeedbackSubmit={handleFeedbackSubmit} // Handles feedback submission
                    currentUser={currentUser} // Passes current user for display
                />

                {/* Contact Modal */}
                {/* Rendered conditionally based on showContactModal state */}
                <ContactModal
                    show={showContactModal} // Controls modal visibility
                    onClose={() => setShowContactModal(false)} // Closes the modal
                />

                {/* Game Modal */}
                {/* Rendered conditionally based on showGameModal state */}
                <GameModal
                    show={showGameModal} // Controls modal visibility
                    onClose={() => {
                        setShowGameModal(false); // Closes the modal
                        resetGame(); // Resets the game
                    }}
                    onReset={resetGame} // Resets the game
                />

                {/* Features Modal */}
                {/* Rendered conditionally based on showFeaturesModal state */}
                <FeaturesModal
                    show={showFeaturesModal} // Controls modal visibility
                    onClose={() => setShowFeaturesModal(false)} // Closes the modal
                    currentUser={currentUser} // Passes current user for personalized content
                />

                {/* Bottom section with live time and copyright */}
                <div className="text-center text-gray-400 mt-6 border-t border-gray-700/50 pt-4">
                    <p className="text-sm leading-relaxed">
                        Current Time: {formattedTime} | © {currentYear} ExpenseX. All rights reserved. Built with ❤️ by Dibyanshu Chauhan.
                    </p>
                </div>
            </div>
        </motion.footer>
    );
};

// Exports the Footer component for use in the application
export default Footer;