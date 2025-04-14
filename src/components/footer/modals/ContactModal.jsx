/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FiX } from "react-icons/fi";

const ContactModal = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.7, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.7, y: 50 }}
                transition={{ type: "spring", damping: 15, stiffness: 100 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 bg-opacity-95 backdrop-blur-md p-6 rounded-xl shadow-2xl w-full max-w-md mx-4 md:max-w-lg lg:max-w-xl border border-gray-700 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-all"
                >
                    <FiX size={20} />
                </motion.button>
                <h3 className="text-2xl font-semibold text-white mb-4 text-center">About Me & Contact</h3>
                <div className="space-y-6 text-gray-300">
                    {/* Personal Info */}
                    <div>
                        <h4 className="text-lg font-medium text-indigo-300 mb-2">Personal Details</h4>
                        <p className="text-sm">
                            Name: Dibyanshu Chauhan<br />
                            Role: Front-End Web Developer<br />
                            Location: India
                        </p>
                    </div>
                    {/* Educational Background */}
                    <div>
                        <h4 className="text-lg font-medium text-indigo-300 mb-2">Educational Background</h4>
                        <p className="text-sm">
                            Degree: Bachelors of Science in Information Technology<br />
                            University: Hemwati Nandan Bahuguna Garhwal University<br />
                            Year: 2022-2025<br />
                            Skills: HTML, CSS, Javascript, React, Tailwind
                        </p>
                    </div>
                    {/* Professional Experience */}
                    <div>
                        <h4 className="text-lg font-medium text-indigo-300 mb-2">Professional Experience</h4>
                        <p className="text-sm">
                            - Developed Expense Tracker app using React and Tailwind.<br />
                            - 2+ years of experience in web development.<br />
                            - Worked on real-time data solutions and UI/UX optimization.
                        </p>
                    </div>
                    {/* Contact Information */}
                    <div>
                        <h4 className="text-lg font-medium text-indigo-300 mb-2">Contact Information</h4>
                        <p className="text-sm flex items-center space-x-2">
                            <FaEnvelope /> <span>Email: cdivyanshu98@gmail.com</span>
                        </p>
                        <div className="flex space-x-4 mt-2">
                            <a href="https://www.linkedin.com/in/divyanshu011/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400">
                                <FaLinkedin size={20} />
                            </a>
                            <a href="https://x.com/divyanshC01" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400">
                                <BsTwitterX size={20} />
                            </a>
                            <a href="https://www.instagram.com/devyanshu__011/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400">
                                <FaInstagram size={20} />
                            </a>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ContactModal;