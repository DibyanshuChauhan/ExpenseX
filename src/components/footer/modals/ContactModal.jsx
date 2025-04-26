/* eslint-disable no-unused-vars */
import React from "react"; // Imports React for component creation
import { motion } from "framer-motion"; // Imports motion for animations
import { FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa"; // Imports social media and email icons
import { BsTwitterX } from "react-icons/bs"; // Imports Twitter X icon
import { FiX } from "react-icons/fi"; // Imports close icon

// ContactModal component displays a modal with personal and contact information
// Props:
// - show: Boolean to control modal visibility
// - onClose: Function to close the modal
const ContactModal = ({ show, onClose }) => {
    // Returns null if the modal should not be displayed
    if (!show) return null;

    return (
        // Outer overlay dims the background and centers the modal
        <motion.div
            initial={{ opacity: 0 }} // Starts with zero opacity
            animate={{ opacity: 1 }} // Fades in to full opacity
            exit={{ opacity: 0 }} // Fades out when closing
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto"
            onClick={onClose} // Closes modal when clicking outside
        >
             {/* Inner modal container with animation and styling */}
            <motion.div
                initial={{ scale: 0.7, y: 50 }} // Starts scaled down and below
                animate={{ scale: 1, y: 0 }} // Scales up and moves to center
                exit={{ scale: 0.7, y: 50 }} // Scales down and moves down on exit
                transition={{ type: "spring", damping: 15, stiffness: 100 }} // Applies spring animation
                className="bg-gradient-to-br from-gray-800 to-gray-900 bg-opacity-95 backdrop-blur-md p-6 rounded-xl shadow-2xl w-full max-w-md mx-4 md:max-w-lg lg:max-w-xl border border-gray-700 relative"
                onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
            >
                 {/* Close button positioned at top-right */}
                <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }} // Rotates and enlarges on hover
                    whileTap={{ scale: 0.9 }} // Slightly shrinks on click
                    onClick={onClose} // Triggers modal closure
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-all"
                >
                    {/* Displays the close icon */}
                    <FiX size={20} />  
                </motion.button>
                 {/* Title of the contact modal */}
                <h3 className="text-2xl font-semibold text-white mb-4 text-center">About Me & Contact</h3>
                 {/* Container for contact and personal information sections */}
                <div className="space-y-6 text-gray-300">
                    {/* Personal Info */}
                    <div>
                         {/* Section title for personal details */}
                        <h4 className="text-lg font-medium text-indigo-300 mb-2">Personal Details</h4>
                         {/* Displays personal information */}
                        <p className="text-sm">
                            Name: Dibyanshu Chauhan<br />
                            Role: Front-End Web Developer<br />
                            Location: India
                        </p>
                    </div>
                    {/* Educational Background */}
                    <div>
                         {/* Section title for educational background */}
                        <h4 className="text-lg font-medium text-indigo-300 mb-2">Educational Background</h4>
                         {/* Displays educational details */}
                        <p className="text-sm">
                            Degree: Bachelors of Science in Information Technology<br />
                            University: Hemwati Nandan Bahuguna Garhwal University<br />
                            Year: 2022-2025<br />
                            Skills: HTML, CSS, Javascript, React, Tailwind
                        </p>
                    </div>
                    {/* Professional Experience */}
                    <div>
                         {/* Section title for professional experience */}
                        <h4 className="text-lg font-medium text-indigo-300 mb-2">Professional Experience</h4>
                         {/* Displays professional experience details */}
                        <p className="text-sm">
                            - Developed Expense Tracker app using React and Tailwind.<br />
                            - 2+ years of experience in web development.<br />
                            - Worked on real-time data solutions and UI/UX optimization.
                        </p>
                    </div>
                    {/* Contact Information */}
                    <div>
                         {/* Section title for contact information */}
                        <h4 className="text-lg font-medium text-indigo-300 mb-2">Contact Information</h4>
                         {/* Displays email contact with icon */}
                        <p className="text-sm flex items-center space-x-2">
                            <FaEnvelope /> <span>Email: cdivyanshu98@gmail.com</span>
                        </p>
                         {/* Container for social media links */}
                        <div className="flex space-x-4 mt-2">
                             {/* LinkedIn profile link */}
                            <a href="https://www.linkedin.com/in/divyanshu011/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400">
                                <FaLinkedin size={20} />
                            </a>
                             {/* Twitter X profile link */}
                            <a href="https://x.com/divyanshC01" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400">
                                <BsTwitterX size={20} />
                            </a>
                             {/* Instagram profile link */}
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

// Exports the ContactModal component for use in the application
export default ContactModal;