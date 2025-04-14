/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff, FiTrash2, FiSearch } from "react-icons/fi"; // Added FiSearch
import { toast } from "react-toastify"; // Added to fix toast usage
import "react-toastify/dist/ReactToastify.css"; // Added CSS for toast

const AdminPanel = ({ show, onAdminAction, users, adminAction, setAdminAction, handleAdminSubmit, currentUser }) => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [originalFeedbacks, setOriginalFeedbacks] = useState([]); // Added to store original feedbacks
    const [filter, setFilter] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Fetch all users' expenses for admin view
    const getAllExpenses = () => {
        const allExpenses = {};
        users.forEach((user) => {
            const userExpenses = localStorage.getItem(`expenses_${user.username}`);
            if (userExpenses) {
                allExpenses[user.username] = JSON.parse(userExpenses);
            }
        });
        return allExpenses;
    };

    // Fetch budget for a user
    const getUserBudget = (username) => {
        const savedBudget = localStorage.getItem(`budget_${username}`);
        return savedBudget ? parseFloat(savedBudget) : 0;
    };

    // Filter admin's own expenses
    const getAdminExpenses = () => {
        const adminUsername = users.find((u) => u.isAdmin && u.username === "admin")?.username;
        if (!adminUsername) return [];
        const adminExpenses = localStorage.getItem(`expenses_${adminUsername}`);
        return adminExpenses ? JSON.parse(adminExpenses) : [];
    };

    // Fetch feedbacks from localStorage
    useEffect(() => {
        const storedFeedbacks = JSON.parse(localStorage.getItem("adminFeedbacks")) || [];
        setFeedbacks(storedFeedbacks);
        setOriginalFeedbacks(storedFeedbacks); // Store original feedbacks
    }, []);

    // Check if current user is default admin
    const isDefaultAdmin = currentUser?.username === "admin" && users.findIndex((u) => u.username === "admin" && u.isAdmin) === users.indexOf(currentUser);

    // Handle delete individual feedback
    const handleDeleteFeedback = (index) => {
        if (isDefaultAdmin) {
            const updatedFeedbacks = feedbacks.filter((_, i) => i !== index);
            localStorage.setItem("adminFeedbacks", JSON.stringify(updatedFeedbacks));
            setFeedbacks(updatedFeedbacks);
            toast.success("Feedback deleted successfully!", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
            });
        }
    };

    // Handle delete all feedbacks with toast notification
    const handleDeleteAllFeedbacks = () => {
        if (isDefaultAdmin) {
            toast.warn(
                <div>
                    <p>Are you sure you want to delete all feedbacks? This action cannot be undone!</p>
                    <div className="mt-2 flex justify-end space-x-2">
                        <button
                            onClick={() => {
                                toast.dismiss();
                                localStorage.removeItem("adminFeedbacks");
                                setFeedbacks([]);
                                toast.success("All feedbacks deleted successfully!", {
                                    position: "top-right",
                                    autoClose: 3000,
                                    theme: "dark",
                                });
                            }}
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                            Yes
                        </button>
                        <button
                            onClick={() => toast.dismiss()}
                            className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
                        >
                            No
                        </button>
                    </div>
                </div>,
                {
                    position: "top-right",
                    autoClose: false,
                    closeOnClick: false,
                    draggable: false,
                    theme: "dark",
                }
            );
        }
    };

    // Filter feedbacks on search icon click or enter press
    const handleFilter = () => {
        if (filter) {
            const filteredFeedbacks = originalFeedbacks.filter((fb) =>
                fb.username.toLowerCase().includes(filter.toLowerCase()) || fb.feedback.toLowerCase().includes(filter.toLowerCase())
            );
            setFeedbacks([...filteredFeedbacks]); // Update with filtered results
        } else {
            setFeedbacks([...originalFeedbacks]); // Reset to original if filter is empty
        }
    };

    // Handle enter key press
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleFilter();
        }
    };

    if (!show) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="container mx-auto mt-6 p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl border border-gray-700"
        >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Admin Panel Dashboard</h3>

            {/* All Users Section */}
            <div className="mb-8">
                <h4 className="text-xl text-gray-200 font-semibold mb-4">All Users</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {users.map((u, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            className="bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                        >
                            <p className="text-gray-300">
                                {u.username} <span className={u.isAdmin ? "text-green-400" : "text-yellow-400"}>(Admin: {u.isAdmin ? "Yes" : "No"})</span>
                            </p>
                            <p className="text-gray-400 text-sm">Budget: ₹{getUserBudget(u.username).toFixed(2)}</p>
                            {u.username !== "admin" && isDefaultAdmin && (
                                <button
                                    onClick={() => onAdminAction("delete", { username: u.username })}
                                    className="mt-2 text-red-400 hover:text-red-500 text-sm"
                                >
                                    Delete User
                                </button>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* All Users' Expenses Section */}
            <div className="mb-8">
                <h4 className="text-xl text-gray-200 font-semibold mb-4">All Users' Expenses</h4>
                {Object.entries(getAllExpenses()).map(([username, userExpenses]) => (
                    <motion.div
                        key={username}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-gray-700 p-4 rounded-lg shadow-md mb-4"
                    >
                        <h5 className="text-lg text-gray-100 font-medium mb-2">
                            {username}'s Expenses (Budget: ₹{getUserBudget(username).toFixed(2)})
                        </h5>
                        {userExpenses.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-gray-300">
                                    <thead>
                                        <tr className="border-b border-gray-600">
                                            <th className="text-left py-2">Date</th>
                                            <th className="text-left py-2">Amount (₹)</th>
                                            <th className="text-left py-2">Category</th>
                                            <th className="text-left py-2">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userExpenses.map((exp, idx) => (
                                            <tr key={idx} className="border-b border-gray-600 hover:bg-gray-600">
                                                <td className="py-2">{new Date(exp.date).toLocaleDateString()}</td>
                                                <td className="py-2">{exp.amount}</td>
                                                <td className="py-2">{exp.category}</td>
                                                <td className="py-2">{exp.description || "N/A"}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-gray-400 italic">No expenses recorded</p>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Admin's Own Expenses Section */}
            <div className="mb-8">
                <h4 className="text-xl text-gray-200 font-semibold mb-4">Admin's Expenses</h4>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-green-900 p-4 rounded-lg shadow-md"
                >
                    <h5 className="text-lg text-gray-100 font-medium mb-2">
                        Admin's Expenses (Budget: ₹{getUserBudget("admin").toFixed(2)})
                    </h5>
                    {getAdminExpenses().length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-gray-300">
                                <thead>
                                    <tr className="border-b border-green-700">
                                        <th className="text-left py-2">Date</th>
                                        <th className="text-left py-2">Amount (₹)</th>
                                        <th className="text-left py-2">Category</th>
                                        <th className="text-left py-2">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getAdminExpenses().map((exp, idx) => (
                                        <tr key={idx} className="border-b border-green-700 hover:bg-green-800">
                                            <td className="py-2">{new Date(exp.date).toLocaleDateString()}</td>
                                            <td className="py-2">{exp.amount}</td>
                                            <td className="py-2">{exp.category}</td>
                                            <td className="py-2">{exp.description || "N/A"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-400 italic">No admin expenses recorded</p>
                    )}
                </motion.div>
            </div>

            {/* Create User Form */}
            <div>
                <h4 className="text-xl text-gray-200 font-semibold mb-4">Create New User</h4>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-gray-700 p-6 rounded-lg shadow-md"
                >
                    <form onSubmit={handleAdminSubmit} className="space-y-4">
                        <select
                            value={adminAction.type}
                            onChange={(e) => setAdminAction({ ...adminAction, type: e.target.value })}
                            className="w-full p-2 bg-gray-600 border-none rounded-lg text-white focus:ring-2 focus:ring-indigo-500"
                            required
                            disabled={!isDefaultAdmin}
                        >
                            <option value="">Select Action</option>
                            <option value="create">Create User</option>
                        </select>
                        {adminAction.type === "create" && (
                            <>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={adminAction.username}
                                    onChange={(e) => setAdminAction({ ...adminAction, username: e.target.value })}
                                    className="w-full p-2 bg-gray-600 border-none rounded-lg text-white focus:ring-2 focus:ring-indigo-500"
                                    required
                                    disabled={!isDefaultAdmin}
                                />
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        value={adminAction.password}
                                        onChange={(e) => setAdminAction({ ...adminAction, password: e.target.value })}
                                        className="w-full p-2 bg-gray-600 border-none rounded-lg text-white focus:ring-2 focus:ring-indigo-500 pr-10"
                                        required
                                        disabled={!isDefaultAdmin}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                                        disabled={!isDefaultAdmin}
                                    >
                                        {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                                    </button>
                                </div>
                                <label className="flex items-center text-gray-300">
                                    <input
                                        type="checkbox"
                                        checked={adminAction.isAdmin}
                                        onChange={(e) => setAdminAction({ ...adminAction, isAdmin: e.target.checked })}
                                        className="mr-2 accent-indigo-500"
                                        disabled={!isDefaultAdmin}
                                    />
                                    Is Admin?
                                </label>
                            </>
                        )}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="w-full bg-gradient-to-r from-green-600 to-green-700 p-2 rounded-lg text-white hover:from-green-700 hover:to-green-800 transition-all"
                            disabled={!isDefaultAdmin}
                        >
                            Create User
                        </motion.button>
                    </form>
                </motion.div>
            </div>

            {/* Feedback Management Section */}
            <div className="mt-8">
                <h4 className="text-xl text-gray-200 font-semibold mb-4">Feedback Management</h4>
                {currentUser && currentUser.isAdmin && (
                    <div className="bg-gray-700 p-4 rounded-lg shadow-md mb-4">
                        {isDefaultAdmin ? (
                            <>
                                <div className="flex justify-between items-center mb-4">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={filter}
                                            onChange={(e) => setFilter(e.target.value)}
                                            onKeyPress={handleKeyPress} // Trigger filter on Enter
                                            placeholder="Filter by username or feedback..."
                                            className="w-64 p-2 bg-gray-600 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                                        />
                                        <button
                                            onClick={handleFilter} // Trigger filter on icon click
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                                        >
                                            <FiSearch size={20} />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex space-x-4 mb-4">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleDeleteAllFeedbacks}
                                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                                    >
                                        Delete All Feedbacks
                                    </motion.button>
                                </div>
                            </>
                        ) : (
                            <p className="text-gray-400 italic">Only default admin can manage feedbacks.</p>
                        )}
                    </div>
                )}
                {feedbacks.length > 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-gray-700 p-4 rounded-lg shadow-md overflow-y-auto max-h-64"
                    >
                        {feedbacks.map((fb, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-gray-800 p-3 rounded-md mb-3 flex justify-between items-start"
                            >
                                <div>
                                    <p className="text-gray-300">
                                        <strong>{fb.username}</strong> - {new Date(fb.timestamp).toLocaleString()}
                                    </p>
                                    <p className="text-gray-400 mt-1">{fb.feedback}</p>
                                </div>
                                {isDefaultAdmin && (
                                    <motion.button
                                        whileHover={{ scale: 1.1, color: "#ef4444" }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => handleDeleteFeedback(index)}
                                        className="text-red-400 hover:text-red-500 ml-4"
                                    >
                                        <FiTrash2 size={18} />
                                    </motion.button>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <p className="text-gray-400 italic">No feedbacks yet.</p>
                )}
            </div>
        </motion.div>
    );
};

export default AdminPanel;