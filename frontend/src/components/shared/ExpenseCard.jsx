/* eslint-disable no-unused-vars */
import React from "react";
import { 
    FaUtensils, 
    FaPlane, 
    FaBagShopping, 
    FaFilm, 
    FaFileInvoiceDollar, 
    FaHeartPulse, 
    FaGraduationCap, 
    FaCartShopping, 
    FaHouse, 
    FaReceipt,
    FaCalendarDays
} from "react-icons/fa6";

const categoryIconMap = {
    Food: { icon: FaUtensils, color: "text-amber-500 dark:text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
    Travel: { icon: FaPlane, color: "text-sky-500 dark:text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/20" },
    Shopping: { icon: FaBagShopping, color: "text-pink-500 dark:text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20" },
    Entertainment: { icon: FaFilm, color: "text-purple-500 dark:text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
    Bills: { icon: FaFileInvoiceDollar, color: "text-emerald-500 dark:text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
    Health: { icon: FaHeartPulse, color: "text-rose-500 dark:text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20" },
    Education: { icon: FaGraduationCap, color: "text-indigo-500 dark:text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20" },
    Groceries: { icon: FaCartShopping, color: "text-teal-500 dark:text-teal-400", bg: "bg-teal-500/10", border: "border-teal-500/20" },
    Rent: { icon: FaHouse, color: "text-orange-500 dark:text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
};

const defaultCategoryStyle = { 
    icon: FaReceipt, 
    color: "text-indigo-500 dark:text-indigo-400", 
    bg: "bg-indigo-500/10", 
    border: "border-indigo-500/20" 
};

const ExpenseCard = ({ expense }) => {
    const style = categoryIconMap[expense.category] || defaultCategoryStyle;
    const Icon = style.icon;

    const formattedDate = expense.date 
        ? new Date(expense.date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric"
        })
        : "N/A";

    const numericAmount = parseFloat(expense.amount) || 0;

    return (
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-400 dark:hover:border-indigo-500/50 transition-all duration-200 group flex flex-col justify-between">
            <div>
                {/* Top Header: Category Icon & Amount */}
                <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-2.5">
                        <div className={`w-9 h-9 rounded-xl ${style.bg} ${style.border} border flex items-center justify-center ${style.color} shadow-inner`}>
                            <Icon size={15} />
                        </div>
                        <div>
                            <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 tracking-wide uppercase block">
                                {expense.category}
                            </span>
                            <h4 className="text-sm font-bold text-slate-950 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-200 transition-colors line-clamp-1">
                                {expense.description || "Expense Transaction"}
                            </h4>
                        </div>
                    </div>

                    <div className="text-right">
                        <span className="text-base font-extrabold text-slate-950 dark:text-white font-mono tracking-tight">
                            ₹{numericAmount.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>

            {/* Bottom: Date Stamp */}
            <div className="pt-2.5 mt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                <span className="flex items-center gap-1.5">
                    <FaCalendarDays size={11} className="text-slate-500 dark:text-slate-400" />
                    {formattedDate}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                    ID: {String(expense._id || expense.id || "").slice(-5) || "item"}
                </span>
            </div>
        </div>
    );
};

export default ExpenseCard;