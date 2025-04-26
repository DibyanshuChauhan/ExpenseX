/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import BudgetInput from "../components/home/BudgetInput"; // For setting and displaying budget
import ExpenseForm from "../components/home/ExpenseForm"; // For adding new expenses
import ExpenseList from "../components/home/ExpenseList"; // For displaying expense list
import ChartSection from "../components/home/ChartSection"; // For visualizing expense trends
import SummarySection from "../components/home/SummarySection"; // For category-wise expense summary
import ReportDownload from "../components/home/ReportDownload"; // For downloading reports
import Footer from "../components/shared/Footer"; // Shared footer component
import { motion } from "framer-motion"; // For button animations
import { toast } from "react-toastify"; // For notification messages
import "react-toastify/dist/ReactToastify.css"; // Toast notification styles

// Home component
// Purpose: Serves as the main dashboard, integrating budget input, expense form, expense list, chart, summary, report download, and footer
// Props:
// - currentUser: Object containing user info (e.g., username), or null if not logged in
const Home = ({ currentUser }) => {
  // Extracts username from currentUser, defaults to "default_user" if not available
  const username = currentUser?.username || "default_user";

  // State for expenses, initialized from localStorage or empty array
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem(`expenses_${username}`);
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  // State for budget, initialized from localStorage or empty string
  const [budget, setBudget] = useState(() => {
    const savedBudget = localStorage.getItem(`budget_${username}`);
    return savedBudget ? parseFloat(savedBudget) : "";
  });

  // State for chart view type ("monthly" or "weekly")
  const [viewType, setViewType] = useState("monthly");

  // Effect to sync expenses and budget to localStorage when they change
  // Only runs if user is logged in
  useEffect(() => {
    if (currentUser) {
      // Saves expenses as JSON string
      localStorage.setItem(`expenses_${username}`, JSON.stringify(expenses));
      // Saves budget if valid, removes if empty or invalid
      if (budget !== "" && !isNaN(parseFloat(budget))) {
        localStorage.setItem(`budget_${username}`, parseFloat(budget).toString());
      } else {
        localStorage.removeItem(`budget_${username}`);
      }
    }
  }, [expenses, budget, username, currentUser]);

  // Adds a new expense with validation
  const addExpense = (expense) => {
    // Checks if user is logged in
    if (!currentUser) {
      toast.error("Please log in to add an expense!", { ...toastOptions });
      return;
    }

    // Validates expense fields
    if (!expense.amount || !expense.category || !expense.date || !expense.description) {
      toast.error("Please fill all fields before adding an expense!", { ...toastOptions });
      return;
    }

    // Calculates total spent including new expense
    const totalSpent = expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0) + parseFloat(expense.amount);
    const currentBudget = budget !== "" ? parseFloat(budget) : 0;

    // Warns if total spent exceeds budget
    if (currentBudget > 0 && totalSpent > currentBudget) {
      toast.warning("Warning: You are exceeding your budget!", { ...toastOptions });
    }

    // Adds expense with unique ID based on timestamp
    setExpenses([...expenses, { ...expense, id: Date.now() }]);
    toast.success("Expense added successfully!", { ...toastOptions });
  };

  // Resets all expenses with confirmation dialog
  const resetExpenses = () => {
    // Checks if user is logged in
    if (!currentUser) {
      toast.error("Please log in to reset expenses!", { ...toastOptions });
      return;
    }

    // Displays confirmation dialog via toast
    toast.warn(
      <div>
        <p>Are you sure you want to reset all expenses? This action cannot be undone!</p>
        <div className="mt-2 flex justify-end space-x-2">
          <button
            onClick={() => {
              toast.dismiss();
              setExpenses([]); // Clears expenses state
              localStorage.removeItem(`expenses_${username}`); // Removes from localStorage
              toast.success("All expenses reset successfully!", { ...toastOptions });
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
        className: "navbar-poppins",
      }
    );
  };

  // Prepares data for ChartSection
  const getChartData = () => {
    const data = {};
    const currentBudget = budget !== "" ? parseFloat(budget) : 0;
    const totalSpent = expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);
    const remainingBudget = currentBudget - totalSpent;

    // Aggregates expenses by month or week based on viewType
    expenses.forEach((exp) => {
      const date = new Date(exp.date);
      const key = viewType === "monthly"
        ? date.toLocaleString("default", { month: "long" })
        : `Week ${Math.ceil((date.getDate()) / 7)}`;
      data[key] = (data[key] || 0) + parseFloat(exp.amount);
    });

    // Returns formatted chart data for expenses, budget, and remaining budget
    return {
      labels: Object.keys(data).length > 0 ? Object.keys(data) : ["No Data"],
      datasets: [
        {
          label: "Expenses (₹)",
          data: Object.values(data).length > 0 ? Object.values(data) : [0],
          backgroundColor: "rgba(59, 130, 246, 0.6)",
          borderColor: "rgba(59, 130, 246, 1)",
          borderWidth: 1,
        },
        {
          label: "Budget (₹)",
          data: Object.keys(data).map(() => currentBudget),
          backgroundColor: "rgba(16, 185, 129, 0.6)",
          borderColor: "rgba(16, 185, 129, 1)",
          borderWidth: 1,
        },
        {
          label: "Remaining (₹)",
          data: Object.keys(data).map(() => (remainingBudget > 0 ? remainingBudget : 0)),
          backgroundColor: "rgba(234, 179, 8, 0.6)",
          borderColor: "rgba(234, 179, 8, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  // Summarizes expenses by category for SummarySection
  const getCategorySummary = () => {
    const summary = {};
    expenses.forEach((exp) => {
      summary[exp.category] = (summary[exp.category] || 0) + parseFloat(exp.amount);
    });
    return summary;
  };

  // Handles budget input changes with validation
  const handleBudgetChange = (e) => {
    // Checks if user is logged in
    if (!currentUser) {
      toast.error("Please log in to set a budget!", { ...toastOptions });
      return;
    }
    const value = e.target.value;
    if (value === "") {
      setBudget(""); // Allows clearing budget
    } else {
      const numValue = parseFloat(value) || 0;
      if (numValue < 0) {
        toast.error("Budget cannot be negative! Setting to 0.", { ...toastOptions });
        setBudget(0);
      } else {
        setBudget(numValue);
      }
    }
  };

  // Calculates total spent and remaining budget
  const totalSpent = expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);
  const currentBudget = budget !== "" ? parseFloat(budget) : 0;
  const remainingBudget = currentBudget - totalSpent;

  // Generates and downloads a CSV report
  const downloadReport = () => {
    // Checks if user is logged in
    if (!currentUser) {
      toast.error("Please log in to download a report!", { ...toastOptions });
      return;
    }
    const currentDate = new Date().toLocaleDateString();
    const header = ["Date,Description,Category,Amount (₹),Budget Set (₹),Total Spent (₹),Remaining Budget (₹)"];
    const categorySummary = getCategorySummary();
    const summaryRows = Object.entries(categorySummary).map(([category, amount]) =>
      `,,${category},${amount},,,`
    );
    const dataRows = expenses.map((exp) =>
      `${new Date(exp.date).toLocaleDateString()},${exp.description},${exp.category},${exp.amount},${currentBudget},${totalSpent},${remainingBudget > 0 ? remainingBudget : 0}`
    );
    const csvContent = [
      ...header,
      ...dataRows,
      ...summaryRows,
      `,,Total Budget,${currentBudget},,,`,
      `,,Total Spent,${totalSpent},,,`,
      `,,Remaining Budget,${remainingBudget > 0 ? remainingBudget : 0},,,`
    ].join("\n");

    // Creates and triggers CSV download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Expense_Report_${viewType}_${username}_${currentDate}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);

    toast.success(`Downloaded ${viewType} expense report for ${username}!`, { ...toastOptions });
  };

  // Toast notification configuration
  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    theme: "dark",
    className: "navbar-poppins",
  };

  // Renders the main dashboard layout
  return (
    // Main container with full-height layout and gradient background
    <div className="container mx-auto p-6 flex flex-col min-h-[calc(100vh-80px)] bg-gradient-to-br from-gray-900 via-gray-800 to-black navbar-Inter">
      <div>
        {/* Dashboard title with gradient text */}
        <h2 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          {/* 
            Conditional Rendering for Title:
            Displays the username if currentUser exists, otherwise shows "Guest".
            Uses a ternary operator to check if currentUser is truthy.
            If currentUser is present, it renders "Dashboard - {currentUser.username}".
            If not, it renders "Dashboard - Guest", indicating an unauthenticated user.
            This ensures the title reflects the user's login status clearly.
          */}
          Dashboard - {currentUser ? currentUser.username : "Guest"}
        </h2>

        {/* Main content container with blurred background and border */}
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/5">
          {/* Budget input section */}
          <BudgetInput
            budget={budget}
            handleBudgetChange={handleBudgetChange}
            currentBudget={currentBudget}
            totalSpent={totalSpent}
            remainingBudget={remainingBudget}
            disabled={!currentUser} // Disables input if not logged in
          />

          {/* Expense form section */}
          <ExpenseForm addExpense={addExpense} disabled={!currentUser} />

          {/* Reset expenses button */}
          <motion.button
            whileHover={{ scale: 1.05 }} // Scales up on hover
            whileTap={{ scale: 0.95 }}   // Scales down on click
            onClick={resetExpenses}
            className="w-full mt-6 bg-gradient-to-r from-red-600 to-red-800 text-white p-3 rounded-xl hover:from-red-700 hover:to-red-900 transition-all shadow-md hover:shadow-lg"
            disabled={!currentUser} // Disables button if not logged in
          >
            Reset All Expenses
          </motion.button>

          {/* Report download and view type switcher */}
          <ReportDownload
            viewType={viewType}
            setViewType={setViewType}
            downloadReport={downloadReport}
            disabled={!currentUser}
          />

          {/* Chart section for expense trends */}
          <ChartSection viewType={viewType} getChartData={getChartData} />

          {/* Category summary section */}
          <SummarySection getCategorySummary={getCategorySummary} />

          {/* Expense list section */}
          <ExpenseList expenses={expenses} />
        </div>
      </div>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

// Exports the Home component for use in the application
export default Home;