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
    FaShapes
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

const SummarySection = ({ getCategorySummary }) => {
    const summary = getCategorySummary ? getCategorySummary() : {};
    const entries = Object.entries(summary);

    const totalCategorySpend = entries.reduce((acc, [_, amt]) => acc + (parseFloat(amt) || 0), 0);

    return (
        <div className="p-6 rounded-2xl glass-panel">
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-inner">
                        <FaShapes size={16} />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-white tracking-tight">
                            Category Breakdown & Allocation
                        </h3>
                        <p className="text-xs text-slate-400">
                            Distribution of your spending across life categories
                        </p>
                    </div>
                </div>

                {entries.length > 0 && (
                    <span className="text-xs font-semibold text-slate-400 bg-slate-900/80 px-3 py-1 rounded-full border border-white/5">
                        {entries.length} Active {entries.length === 1 ? "Category" : "Categories"}
                    </span>
                )}
            </div>

            {entries.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {entries.map(([category, amount]) => {
                        const style = categoryIconMap[category] || defaultCategoryStyle;
                        const Icon = style.icon;
                        const numericAmount = parseFloat(amount) || 0;
                        const percent = totalCategorySpend > 0 
                            ? Math.round((numericAmount / totalCategorySpend) * 100) 
                            : 0;

                        return (
                            <div 
                                key={category} 
                                className="p-4 rounded-xl bg-slate-900/60 border border-white/5 hover:border-indigo-500/30 transition-all hover:bg-slate-900/80 group"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2.5">
                                        <div className={`w-8 h-8 rounded-lg ${style.bg} ${style.border} border flex items-center justify-center ${style.color}`}>
                                            <Icon size={14} />
                                        </div>
                                        <span className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                                            {category}
                                        </span>
                                    </div>
                                    <span className="text-xs font-bold text-slate-400 bg-white/5 px-2 py-0.5 rounded-full">
                                        {percent}%
                                    </span>
                                </div>

                                <div className="flex items-baseline justify-between mb-2">
                                    <span className="text-lg font-bold text-white font-mono">
                                        ₹{numericAmount.toLocaleString()}
                                    </span>
                                </div>

                                {/* Mini Distribution Bar */}
                                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                                    <div 
                                        className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-300"
                                        style={{ width: `${percent}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-8 rounded-xl border border-dashed border-white/10 bg-slate-900/30">
                    <p className="text-xs text-slate-400">
                        No category data available yet. Record expenses to see your spending allocation.
                    </p>
                </div>
            )}
        </div>
    );
};

export default SummarySection;