/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import SendFeedbackModal from "../footer/modals/FeedbackModal";
import ContactModal from "../footer/modals/ContactModal";
import GameModal from "../footer/modals/GameModal";
import FeaturesModal from "../footer/modals/FeaturesModal";

const Footer = () => {
    const [feedback, setFeedback] = useState("");
    const [showFeedback, setShowFeedback] = useState(false);
    const [showContactModal, setShowContactModal] = useState(false);
    const [showGameModal, setShowGameModal] = useState(false);
    const [showFeaturesModal, setShowFeaturesModal] = useState(false);
    const currentYear = new Date().getFullYear();
    const [currentUser, setCurrentUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem("currentUser");
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                return parsedUser && typeof parsedUser === "object" && parsedUser.username ? parsedUser : { username: "Guest" };
            }
            return { username: "Guest" };
        } catch (e) {
            console.error("Error parsing initial currentUser from localStorage:", e);
            return { username: "Guest" };
        }
    });
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const updateCurrentUser = () => {
            try {
                const user = localStorage.getItem("currentUser");
                if (user) {
                    const parsedUser = JSON.parse(user);
                    setCurrentUser(parsedUser && typeof parsedUser === "object" && parsedUser.username ? parsedUser : { username: "Guest" });
                } else {
                    setCurrentUser({ username: "Guest" });
                }
            } catch (e) {
                console.error("Error updating currentUser from localStorage:", e);
                setCurrentUser({ username: "Guest" });
            }
        };

        updateCurrentUser(); // Initial call
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        // Optional: Add event listener for storage changes if needed
        window.addEventListener("storage", updateCurrentUser);

        return () => {
            clearInterval(timer);
            window.removeEventListener("storage", updateCurrentUser);
        };
    }, []);

    const handleFeedbackSubmit = (e) => {
        e.preventDefault();
        console.log("Current User before submit:", currentUser); // Debug log
        if (feedback.trim()) {
            const username = currentUser?.username || "Guest"; // Safe access with fallback
            const feedbackData = {
                username,
                feedback,
                timestamp: new Date().toISOString(),
            };
            let feedbacks = JSON.parse(localStorage.getItem("adminFeedbacks")) || [];
            feedbacks.push(feedbackData);
            localStorage.setItem("adminFeedbacks", JSON.stringify(feedbacks));
            toast.success(`Thank you, ${username}! Your feedback has been sent to the admin.`, {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
                className: "navbar-poppins",
            });
            setFeedback("");
            setShowFeedback(false);
        }
    };

    const resetGame = () => {
        setShowGameModal(false);
        toast.info("Game reset and closed!", {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
            className: "navbar-poppins",
        });
    };

    const formattedTime = currentTime.toLocaleTimeString();

    return (
        <motion.footer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8 mt-12"
        >
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
                    {/* App Info */}
                    <div className="p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/5">
                        <h4 className="text-xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400">
                            ExpenseX
                        </h4>
                        <p className="text-gray-300 leading-relaxed">
                            Track your expenses effortlessly with our modern app. Stay on top of your budget and financial goals!
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/5">
                        <h4 className="text-xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400">
                            Quick Links
                        </h4>
                        <ul className="space-y-3 text-gray-300">
                            <li>
                                <a href="#" className="hover:text-purple-400 transition-colors duration-200">
                                    Home
                                </a>
                            </li>
                            <li>
                                <button
                                    className="hover:text-purple-400 transition-colors duration-200 cursor-pointer"
                                    onClick={() => setShowFeaturesModal(true)}
                                >
                                    Features
                                </button>
                            </li>
                            <li>
                                <button
                                    className="hover:text-purple-400 transition-colors duration-200 cursor-pointer"
                                    onClick={() => setShowContactModal(true)}
                                >
                                    Contact Us
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Social & Feedback & Game */}
                    <div className="p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/5">
                        <h4 className="text-xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400">
                            Connect With Us
                        </h4>
                        <div className="flex space-x-6 mb-6 text-gray-300">
                            <a
                                href="https://www.linkedin.com/in/divyanshu011/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-purple-400 transition-colors duration-200 transform hover:scale-110"
                            >
                                <FaLinkedin size={22} />
                            </a>
                            <a
                                href="https://x.com/divyanshC01"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-purple-400 transition-colors duration-200 transform hover:scale-110"
                            >
                                <BsTwitterX size={22} />
                            </a>
                            <a
                                href="https://www.instagram.com/devyanshu__011/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-purple-400 transition-colors duration-200 transform hover:scale-110"
                            >
                                <FaInstagram size={22} />
                            </a>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowFeedback(true)}
                            className="flex items-center space-x-3 bg-gradient-to-r from-indigo-600 to-purple-700 text-white px-5 py-2 rounded-xl transition-all duration-200 mb-3 shadow-md hover:shadow-lg"
                        >
                            <FaEnvelope size={18} />
                            <span>Send Feedback</span>
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowGameModal(true)}
                            className="flex items-center space-x-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white px-5 py-2 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                            <span>Play Quick Math Challenge</span>
                        </motion.button>
                    </div>
                </div>

                {/* Modals */}
                <SendFeedbackModal
                    show={showFeedback}
                    onClose={() => setShowFeedback(false)}
                    feedback={feedback}
                    setFeedback={setFeedback}
                    handleFeedbackSubmit={handleFeedbackSubmit}
                    currentUser={currentUser}
                />
                <ContactModal
                    show={showContactModal}
                    onClose={() => setShowContactModal(false)}
                />
                <GameModal
                    show={showGameModal}
                    onClose={() => {
                        setShowGameModal(false);
                        resetGame();
                    }}
                    onReset={resetGame}
                />
                <FeaturesModal
                    show={showFeaturesModal}
                    onClose={() => setShowFeaturesModal(false)}
                    currentUser={currentUser} // Pass currentUser as prop
                />

                {/* Copyright and Time */}
                <div className="text-center text-gray-400 mt-6 border-t border-gray-700/50 pt-4">
                    <p className="text-sm leading-relaxed">
                        Current Time: {formattedTime} | © {currentYear} ExpenseX. All rights reserved. Built with ❤️ by Dibyanshu Chauhan.
                    </p>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;