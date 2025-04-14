/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { FiSend, FiX } from "react-icons/fi";

const SendFeedbackModal = ({ show, onClose, feedback, setFeedback, handleFeedbackSubmit, currentUser }) => {
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
                className="bg-gradient-to-br from-gray-800 to-gray-900 bg-opacity-95 backdrop-blur-md p-6 rounded-xl shadow-2xl w-full max-w-md mx-4 border border-gray-700 relative"
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
                <h3 className="text-xl font-semibold text-white mb-4 text-center">Send Your Feedback</h3>
                <p className="text-gray-400 text-sm mb-2">Logged in as: {currentUser.username}</p>
                <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                    <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Your feedback here..."
                        className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none placeholder-gray-400"
                        rows="5"
                        required
                    />
                    <div className="flex justify-end space-x-4">
                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: "#4B5563" }}
                            whileTap={{ scale: 0.95 }}
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg transition-all"
                        >
                            Cancel
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: "#10B981" }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg transition-all"
                            disabled={!feedback.trim()}
                        >
                            <FiSend size={16} />
                            <span>Send</span>
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default SendFeedbackModal;