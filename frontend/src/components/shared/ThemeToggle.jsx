import React from "react";
import { motion } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";

const ThemeToggle = ({ className = "" }) => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            type="button"
            className={`relative flex items-center justify-center p-2 rounded-xl transition-all duration-300 border ${
                isDark
                    ? "bg-slate-900 text-amber-400 border-white/10 hover:border-amber-400/40 hover:bg-slate-800"
                    : "bg-white text-indigo-600 border-slate-200 shadow-sm hover:border-indigo-400/40 hover:bg-slate-50"
            } ${className}`}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
            <motion.div
                key={isDark ? "dark" : "light"}
                initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.2 }}
            >
                {isDark ? <FiSun size={17} /> : <FiMoon size={17} />}
            </motion.div>
        </motion.button>
    );
};

export default ThemeToggle;
