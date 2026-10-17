/* eslint-disable no-unused-vars */
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiX, FiMessageSquare } from "react-icons/fi";

const SendFeedbackModal = ({ show, onClose, feedback, setFeedback, handleFeedbackSubmit, currentUser }) => {
    if (!show) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="glass-panel-elevated p-6 sm:p-8 rounded-3xl w-full max-w-lg relative border border-white/10 shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                    >
                        <FiX size={18} />
                    </button>

                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                            <FiMessageSquare size={18} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white tracking-tight">
                                Send Product Feedback
                            </h3>
                            <p className="text-xs text-slate-400">
                                Submitting as <span className="text-indigo-400 font-semibold">{currentUser?.username || "Guest"}</span>
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                        <textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Share suggestions, bugs, or feature requests with the administrator..."
                            className="w-full p-4 bg-slate-900/80 text-white border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none placeholder-slate-500 text-xs leading-relaxed"
                            rows="5"
                            required
                        />

                        <div className="flex items-center justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={!feedback.trim()}
                                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50"
                            >
                                <FiSend size={13} />
                                <span>Submit Feedback</span>
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default SendFeedbackModal;