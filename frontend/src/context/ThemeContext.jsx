import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Initial theme: Check localStorage first, otherwise fallback to system or dark
    const [theme, setTheme] = useState(() => {
        try {
            const stored = localStorage.getItem("theme");
            if (stored === "light" || stored === "dark") {
                return stored;
            }
            // Check system preference
            if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
                return "light";
            }
            return "dark";
        } catch {
            return "dark";
        }
    });

    // Apply theme to document.documentElement and sync with localStorage
    useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
            root.classList.remove("light");
        } else {
            root.classList.remove("dark");
            root.classList.add("light");
        }
        try {
            localStorage.setItem("theme", theme);
        } catch (e) {
            console.error("Failed to persist theme in localStorage:", e);
        }
    }, [theme]);

    // Handle cross-tab synchronization via storage event
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === "theme" && (e.newValue === "light" || e.newValue === "dark")) {
                setTheme(e.newValue);
            }
        };
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDark: theme === "dark" }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
