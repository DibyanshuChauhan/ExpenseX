/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FiX, FiUser, FiBookOpen, FiBriefcase, FiMail } from "react-icons/fi";

const ContactModal = ({ show, onClose }) => {
    useEffect(() => {
        if (show) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [show]);

    if (typeof document === "undefined") return null;

    return createPortal(
        <AnimatePresence>
            {show && (
                <motion.div
                    key="contact-modal-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[9999] p-4 sm:p-6 overflow-y-auto"
                    onClick={onClose}
                >
                    <motion.div
                        key="contact-modal-dialog"
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="glass-panel-elevated p-6 sm:p-8 rounded-3xl w-full max-w-xl relative border border-white/10 shadow-2xl max-h-[85vh] flex flex-col my-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5 transition-all z-10"
                            aria-label="Close modal"
                        >
                            <FiX size={18} />
                        </button>

                        <div className="flex items-center gap-3 mb-5 shrink-0 pr-8">
                            <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                                <FiUser size={20} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                                    Developer & Creator Profile
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Engineering background and contact channels
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4 text-xs overflow-y-auto pr-1 flex-1">
                            {/* Personal Details */}
                            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5">
                                <div className="flex items-center gap-2 mb-2 text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider text-[11px]">
                                    <FiUser size={14} />
                                    <span>Personal Information</span>
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                    <strong className="text-slate-900 dark:text-white">Dibyanshu Chauhan</strong> - Front-End Web Developer & Full-Stack Engineer based in India. Focused on performant modern web architectures and rich interactive UIs.
                                </p>
                            </div>

                            {/* Education */}
                            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5">
                                <div className="flex items-center gap-2 mb-2 text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider text-[11px]">
                                    <FiBookOpen size={14} />
                                    <span>Academic Background</span>
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                    <strong className="text-slate-900 dark:text-white">B.Sc. in Information Technology</strong> (2022-2025)<br />
                                    Hemwati Nandan Bahuguna Garhwal University<br />
                                    Core Stack: React, Tailwind, JavaScript, Node.js, Express, MongoDB.
                                </p>
                            </div>

                            {/* Experience */}
                            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5">
                                <div className="flex items-center gap-2 mb-2 text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider text-[11px]">
                                    <FiBriefcase size={14} />
                                    <span>Professional Highlights</span>
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                    • Architected and developed ExpenseX full-stack finance tracker.<br />
                                    • 2+ years specialized web development crafting real-time, responsive applications.<br />
                                    • Deep focus on design systems, micro-animations, and UX optimization.
                                </p>
                            </div>

                            {/* Direct Channels & Social */}
                            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5">
                                <div className="flex items-center gap-2 mb-3 text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider text-[11px]">
                                    <FiMail size={14} />
                                    <span>Direct Inquiries</span>
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 flex items-center gap-2 mb-3 font-mono">
                                    <FaEnvelope className="text-slate-400" />
                                    <span>cdivyanshu98@gmail.com</span>
                                </p>

                                <div className="flex items-center gap-3 pt-1">
                                    <a
                                        href="https://www.linkedin.com/in/divyanshu011/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all"
                                    >
                                        <FaLinkedin size={16} />
                                    </a>
                                    <a
                                        href="https://x.com/cdivyanshu98"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all"
                                    >
                                        <BsTwitterX size={15} />
                                    </a>
                                    <a
                                        href="https://www.instagram.com/devyanshu__011/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all"
                                    >
                                        <FaInstagram size={16} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default ContactModal;