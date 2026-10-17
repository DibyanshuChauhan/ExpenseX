/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FaLinkedin, FaInstagram, FaEnvelope, FaHeart } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { HiSparkles, HiClock } from "react-icons/hi2";
import SendFeedbackModal from "../footer/modals/FeedbackModal";
import ContactModal from "../footer/modals/ContactModal";
import FeaturesModal from "../footer/modals/FeaturesModal";
import { api } from "../../services/api";

const Footer = ({ currentUser: propUser }) => {
    const [feedback, setFeedback] = useState("");
    const [showFeedback, setShowFeedback] = useState(false);
    const [showContactModal, setShowContactModal] = useState(false);
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

    const activeUser = propUser || currentUser;
    const isAdmin = Boolean(activeUser?.isAdmin || activeUser?.username === "admin");

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

        updateCurrentUser();

        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        window.addEventListener("storage", updateCurrentUser);

        return () => {
            clearInterval(timer);
            window.removeEventListener("storage", updateCurrentUser);
        };
    }, []);

    const handleFeedbackSubmit = async (e) => {
        e.preventDefault();
        if (feedback.trim()) {
            const username = activeUser?.username || "Guest";
            try {
                const res = await api.feedback.send(username, feedback.trim());
                if (res.success) {
                    toast.success(res.message || `Thank you, ${username}! Your feedback has been sent to the admin.`, {
                        position: "top-right",
                        autoClose: 3000,
                        theme: "dark",
                        className: "navbar-poppins",
                    });
                    setFeedback("");
                    setShowFeedback(false);
                }
            } catch (err) {
                toast.error(err.message || "Failed to submit feedback!", {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "dark",
                    className: "navbar-poppins",
                });
            }
        }
    };

    // Explicit 12-hour format with AM / PM labeled time
    const formattedTime = currentTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });

    return (
        <motion.footer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative mt-20 border-t border-slate-200/80 dark:border-white/10 bg-slate-100/90 dark:bg-slate-950/80 backdrop-blur-xl text-slate-600 dark:text-slate-300 transition-colors duration-300"
        >
            {/* Top ambient glowing accent line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

            <div className="container mx-auto px-6 py-12 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                    {/* Brand Card */}
                    <div className="p-6 rounded-2xl bg-white/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 shadow-sm dark:shadow-xl hover:border-indigo-500/30 transition-all">
                        <div className="flex items-center space-x-3 mb-3">
                            <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-indigo-500/30">
                                X
                            </span>
                            <h4 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                                Expense<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500">X</span>
                            </h4>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                            Next-generation financial intelligence. Monitor expenses, optimize budgets, and take full control of your wealth with real-time analytics.
                        </p>
                    </div>

                    {/* Quick Navigation Card */}
                    <div className="p-6 rounded-2xl bg-white/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 shadow-sm dark:shadow-xl hover:border-indigo-500/30 transition-all">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-4">
                            Platform & Resources
                        </h4>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors duration-200 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                                    Dashboard Overview
                                </a>
                            </li>
                            <li>
                                <button
                                    onClick={() => setShowFeaturesModal(true)}
                                    className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors duration-200 cursor-pointer flex items-center gap-2 text-left"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span>
                                    System Features Guide
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setShowContactModal(true)}
                                    className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors duration-200 cursor-pointer flex items-center gap-2 text-left"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                                    Contact & Developer Info
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Community & Feedback Card */}
                    <div className="p-6 rounded-2xl bg-white/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 shadow-sm dark:shadow-xl hover:border-indigo-500/30 transition-all flex flex-col justify-between">
                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-4">
                                Stay Connected
                            </h4>
                            <div className="flex space-x-3 mb-5">
                                <a
                                    href="https://www.linkedin.com/in/divyanshu011/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500/40 hover:scale-105 transition-all shadow-sm"
                                    aria-label="LinkedIn"
                                >
                                    <FaLinkedin size={18} />
                                </a>
                                <a
                                    href="https://x.com/cdivyanshu98"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500/40 hover:scale-105 transition-all shadow-sm"
                                    aria-label="Twitter X"
                                >
                                    <BsTwitterX size={16} />
                                </a>
                                <a
                                    href="https://www.instagram.com/devyanshu__011/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500/40 hover:scale-105 transition-all shadow-sm"
                                    aria-label="Instagram"
                                >
                                    <FaInstagram size={18} />
                                </a>
                            </div>
                        </div>

                        {/* Send Feedback button: Only for normal non-admin users */}
                        {!isAdmin && (
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setShowFeedback(true)}
                                className="w-full flex items-center justify-center space-x-2.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-600/25 transition-all duration-200"
                            >
                                <FaEnvelope size={15} />
                                <span>Send Feedback</span>
                                <HiSparkles className="text-yellow-300" size={16} />
                            </motion.button>
                        )}
                    </div>
                </div>

                {/* Modals */}
                {!isAdmin && (
                    <SendFeedbackModal
                        show={showFeedback}
                        onClose={() => setShowFeedback(false)}
                        feedback={feedback}
                        setFeedback={setFeedback}
                        handleFeedbackSubmit={handleFeedbackSubmit}
                        currentUser={activeUser}
                    />
                )}

                <ContactModal
                    show={showContactModal}
                    onClose={() => setShowContactModal(false)}
                />

                <FeaturesModal
                    show={showFeaturesModal}
                    onClose={() => setShowFeaturesModal(false)}
                    currentUser={activeUser}
                />

                {/* Bottom Bar with 12hr AM/PM Live Clock & Copyright */}
                <div className="pt-6 border-t border-slate-200/80 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <p className="flex items-center gap-1.5">
                        © {currentYear} ExpenseX. All rights reserved. Crafted with
                        <FaHeart className="text-rose-500 inline mx-0.5" size={12} /> by Dibyanshu Chauhan.
                    </p>

                    {/* High-Tech 12-Hour AM/PM Time Badge */}
                    <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-indigo-500/20 shadow-inner">
                        <div className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </div>
                        <HiClock className="text-indigo-500 dark:text-indigo-400" size={14} />
                        <span className="text-slate-600 dark:text-slate-400 font-medium">Live Time:</span>
                        <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold tracking-wide">
                            {formattedTime}
                        </span>
                    </div>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;