/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import BudgetInput from "../components/home/BudgetInput";
import ExpenseForm from "../components/home/ExpenseForm";
import ExpenseList from "../components/home/ExpenseList";
import ChartSection from "../components/home/ChartSection";
import SummarySection from "../components/home/SummarySection";
import ReportDownload from "../components/home/ReportDownload";
import Footer from "../components/shared/Footer";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = ({ currentUser }) => {
  const username = currentUser?.username || "default_user";
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem(`expenses_${username}`);
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });
  const [budget, setBudget] = useState(() => {
    const savedBudget = localStorage.getItem(`budget_${username}`);
    return savedBudget ? parseFloat(savedBudget) : "";
  });
  const [viewType, setViewType] = useState("monthly");

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`expenses_${username}`, JSON.stringify(expenses));
      if (budget !== "" && !isNaN(parseFloat(budget))) {
        localStorage.setItem(`budget_${username}`, parseFloat(budget).toString());
      } else {
        localStorage.removeItem(`budget_${username}`);
      }
    }
  }, [expenses, budget, username, currentUser]);

  const addExpense = (expense) => {
    if (!currentUser) {
      toast.error("Please log in to add an expense!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        className: "navbar-poppins",
      });
      return;
    }
    if (!expense.amount || !expense.category || !expense.date || !expense.description) {
      toast.error("Please fill all fields before adding an expense!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        className: "navbar-poppins",
      });
      return;
    }
    const totalSpent = expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0) + parseFloat(expense.amount);
    const currentBudget = budget !== "" ? parseFloat(budget) : 0;
    if (currentBudget > 0 && totalSpent > currentBudget) {
      toast.warning("Warning: You are exceeding your budget!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        className: "navbar-poppins",
      });
    }
    setExpenses([...expenses, { ...expense, id: Date.now() }]);
    toast.success("Expense added successfully!", {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
      className: "navbar-poppins",
    });
  };

  const resetExpenses = () => {
    if (!currentUser) {
      toast.error("Please log in to reset expenses!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        className: "navbar-poppins",
      });
      return;
    }
    toast.warn(
      <div>
        <p>Are you sure you want to reset all expenses? This action cannot be undone!</p>
        <div className="mt-2 flex justify-end space-x-2">
          <button
            onClick={() => {
              toast.dismiss();
              setExpenses([]);
              localStorage.removeItem(`expenses_${username}`);
              toast.success("All expenses reset successfully!", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
                className: "navbar-poppins",
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
        className: "navbar-poppins",
      }
    );
  };

  const getChartData = () => {
    const data = {};
    const currentBudget = budget !== "" ? parseFloat(budget) : 0;
    const totalSpent = expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);
    const remainingBudget = currentBudget - totalSpent;

    expenses.forEach((exp) => {
      const date = new Date(exp.date);
      const key = viewType === "monthly"
        ? date.toLocaleString("default", { month: "long" })
        : `Week ${Math.ceil((date.getDate()) / 7)}`;
      data[key] = (data[key] || 0) + parseFloat(exp.amount);
    });

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

  const getCategorySummary = () => {
    const summary = {};
    expenses.forEach((exp) => {
      summary[exp.category] = (summary[exp.category] || 0) + parseFloat(exp.amount);
    });
    return summary;
  };

  const handleBudgetChange = (e) => {
    if (!currentUser) {
      toast.error("Please log in to set a budget!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        className: "navbar-poppins",
      });
      return;
    }
    const value = e.target.value;
    if (value === "") {
      setBudget("");
    } else {
      const numValue = parseFloat(value) || 0;
      if (numValue < 0) {
        toast.error("Budget cannot be negative! Setting to 0.", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
          className: "navbar-poppins",
        });
        setBudget(0);
      } else {
        setBudget(numValue);
      }
    }
  };

  const totalSpent = expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);
  const currentBudget = budget !== "" ? parseFloat(budget) : 0;
  const remainingBudget = currentBudget - totalSpent;

  const downloadReport = () => {
    if (!currentUser) {
      toast.error("Please log in to download a report!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        className: "navbar-poppins",
      });
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
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Expense_Report_${viewType}_${username}_${currentDate}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
    toast.success(`Downloaded ${viewType} expense report for ${username}!`, {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
      className: "navbar-poppins",
    });
  };

  return (
    <div className="container mx-auto p-6 flex flex-col min-h-[calc(100vh-80px)] bg-gradient-to-br from-gray-900 via-gray-800 to-black navbar-Inter">
      <div>
        <h2 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          Dashboard - {currentUser ? currentUser.username : "Guest"}
        </h2>
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/5">
          <BudgetInput
            budget={budget}
            handleBudgetChange={handleBudgetChange}
            currentBudget={currentBudget}
            totalSpent={totalSpent}
            remainingBudget={remainingBudget}
            disabled={!currentUser}
          />
          <ExpenseForm addExpense={addExpense} disabled={!currentUser} />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetExpenses}
            className="w-full mt-6 bg-gradient-to-r from-red-600 to-red-800 text-white p-3 rounded-xl hover:from-red-700 hover:to-red-900 transition-all shadow-md hover:shadow-lg"
            disabled={!currentUser}
          >
            Reset All Expenses
          </motion.button>
          <ReportDownload
            viewType={viewType}
            setViewType={setViewType}
            downloadReport={downloadReport}
            disabled={!currentUser}
          />
          <ChartSection viewType={viewType} getChartData={getChartData} />
          <SummarySection getCategorySummary={getCategorySummary} />
          <ExpenseList expenses={expenses} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;