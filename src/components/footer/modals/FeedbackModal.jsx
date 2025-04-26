/* eslint-disable no-unused-vars */
import React from "react"; // Imports React for component creation
import { motion } from "framer-motion"; // Imports motion for animations
import { FiSend, FiX } from "react-icons/fi"; // Imports icons for Send and Close buttons

// SendFeedbackModal component displays a modal for users to submit feedback
// Props:
// - show: Boolean to control modal visibility
// - onClose: Function to close the modal
// - feedback: String containing the current feedback text
// - setFeedback: Function to update the feedback state
// - handleFeedbackSubmit: Function to process and send the feedback
// - currentUser: Object with user details, specifically the username
const SendFeedbackModal = ({ show, onClose, feedback, setFeedback, handleFeedbackSubmit, currentUser }) => {
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
                className="bg-gradient-to-br from-gray-800 to-gray-900 bg-opacity-95 backdrop-blur-md p-6 rounded-xl shadow-2xl w-full max-w-md mx-4 border border-gray-700 relative"
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
                 {/* Title of the feedback modal */}
                <h3 className="text-xl font-semibold text-white mb-4 text-center">Send Your Feedback</h3>
                 {/* Displays the logged-in username */}
                <p className="text-gray-400 text-sm mb-2">Logged in as: {currentUser.username}</p>
                 {/* Form for submitting feedback */}
                <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                     {/* Textarea for user feedback input */}
                    <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)} // Updates feedback state
                        placeholder="Your feedback here..."
                        className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none placeholder-gray-400"
                        rows="5"
                        required // Ensures input is provided
                    />
                     {/* Container for action buttons */}
                    <div className="flex justify-end space-x-4">
                         {/* Cancel button to close the modal */}
                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: "#4B5563" }} // Enlarges and darkens on hover
                            whileTap={{ scale: 0.95 }} // Slightly shrinks on click
                            type="button"
                            onClick={onClose} // Triggers modal closure
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg transition-all"
                        >
                            Cancel
                        </motion.button>
                         {/* Submit button to send feedback */}
                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: "#10B981" }} // Enlarges and brightens on hover
                            whileTap={{ scale: 0.95 }} // Slightly shrinks on click
                            type="submit"
                            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg transition-all"
                            disabled={!feedback.trim()} // Disables if input is empty or whitespace
                        >
                             {/* Displays the send icon */}
                            <FiSend size={16} />
                            {/* Displays the send text  */}
                            <span>Send</span>  
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

// Exports the SendFeedbackModal component for use in the application
export default SendFeedbackModal;