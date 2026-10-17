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
    Food: { icon: FaUtensils, color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20" },
    Travel: { icon: FaPlane, color: "text-sky-400", bg: "bg-sky-400/10", border: "border-sky-400/20" },
    Shopping: { icon: FaBagShopping, color: "text-pink-400", bg: "bg-pink-400/10", border: "border-pink-400/20" },
    Entertainment: { icon: FaFilm, color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20" },
    Bills: { icon: FaFileInvoiceDollar, color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" },
    Health: { icon: FaHeartPulse, color: "text-rose-400", bg: "bg-rose-400/10", border: "border-rose-400/20" },
    Education: { icon: FaGraduationCap, color: "text-indigo-400", bg: "bg-indigo-400/10", border: "border-indigo-400/20" },
    Groceries: { icon: FaCartShopping, color: "text-teal-400", bg: "bg-teal-400/10", border: "border-teal-400/20" },
    Rent: { icon: FaHouse, color: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-400/20" },
};

const defaultCategoryStyle = { 
    icon: FaReceipt, 
    color: "text-indigo-400", 
    bg: "bg-indigo-400/10", 
    border: "border-indigo-400/20" 
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
        <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 hover:border-indigo-500/30 hover:bg-slate-900/90 transition-all duration-200 group flex flex-col justify-between">
            <div>
                {/* Top Header: Category Icon & Amount */}
                <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-2.5">
                        <div className={`w-9 h-9 rounded-xl ${style.bg} ${style.border} border flex items-center justify-center ${style.color} shadow-inner`}>
                            <Icon size={15} />
                        </div>
                        <div>
                            <span className="text-xs font-semibold text-slate-400 tracking-wide uppercase block">
                                {expense.category}
                            </span>
                            <h4 className="text-sm font-semibold text-white group-hover:text-indigo-200 transition-colors line-clamp-1">
                                {expense.description || "Expense Transaction"}
                            </h4>
                        </div>
                    </div>

                    <div className="text-right">
                        <span className="text-base font-bold text-white font-mono tracking-tight">
                            ₹{numericAmount.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>

            {/* Bottom: Date Stamp */}
            <div className="pt-2.5 mt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                    <FaCalendarDays size={11} className="text-slate-500" />
                    {formattedDate}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                    ID: {String(expense._id || expense.id || "").slice(-5) || "item"}
                </span>
            </div>
        </div>
    );
};

export default ExpenseCard;