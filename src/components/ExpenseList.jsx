
import React, { useState } from "react";

export default function ExpenseList({
  expenses,
  onEditExpense,
  onDeleteExpense,
}) {
  const [filterCategory, setFilterCategory] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const categoryStyles = {
    Food: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Utilities: "bg-blue-50 text-blue-700 border-blue-200",
    Entertainment: "bg-amber-50 text-amber-700 border-amber-200",
    Transport: "bg-red-50 text-red-700 border-red-200",
    Other: "bg-purple-50 text-purple-700 border-purple-200",
  };

  const filteredExpenses = expenses
    .filter(
      (exp) => filterCategory === "All" || exp.category === filterCategory,
    )
    .filter((exp) => !startDate || exp.date >= startDate)
    .filter((exp) => !endDate || exp.date <= endDate)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const clearFilters = () => {
    setFilterCategory("All");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Table Controls and Filtering Header */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/40 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800 tracking-tight">
            All Expenses
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Filter and manage your transaction history
          </p>
        </div>

        {/* Dynamic Filtering Tools */}
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full sm:w-auto rounded-lg border border-slate-200 px-3 py-2 bg-white text-xs font-semibold text-slate-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all cursor-pointer"
          >
            <option value="All">All Categories</option>
            <option value="Food">Food</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Transport">Transport</option>
            <option value="Other">Other</option>
          </select>

          <div className="w-full sm:w-auto flex items-center justify-between gap-2 bg-white border border-slate-200 rounded-lg px-3 py-1.5 shadow-sm">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="text-xs font-semibold text-slate-600 focus:outline-none cursor-pointer bg-transparent"
            />
            <span className="text-slate-300 text-xs font-bold px-1">to</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="text-xs font-semibold text-slate-600 focus:outline-none cursor-pointer bg-transparent"
            />
          </div>

          {(filterCategory !== "All" || startDate || endDate) && (
            <button
              onClick={clearFilters}
              className="w-full sm:w-auto text-center px-4 py-2 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 active:bg-red-200 rounded-lg transition-all"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Enterprise Layout Interactive Table Container */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100 data-table">
          <thead className="bg-slate-50/70">
            <tr>
              <th className="px-6 py-3.5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3.5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3.5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3.5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3.5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Notes
              </th>
              <th className="px-6 py-3.5 text-right text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            {filteredExpenses.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-14 text-slate-400 text-sm font-medium"
                >
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <span className="text-2xl opacity-70">🔍</span>
                    <p className="text-slate-400 font-semibold text-xs tracking-tight">
                      No matching expenses found.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredExpenses.map((exp) => (
                <tr
                  key={exp.id}
                  className="hover:bg-slate-50/60 transition-colors group"
                >
                  <td className="px-6 py-4 text-sm font-bold text-slate-800 whitespace-nowrap">
                    {exp.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 text-[11px] font-bold rounded-md border ${
                        categoryStyles[exp.category] ||
                        "bg-slate-50 text-slate-700 border-slate-200"
                      }`}
                    >
                      {exp.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-semibold text-slate-500 whitespace-nowrap">
                    {new Date(exp.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 text-sm font-black text-slate-900 whitespace-nowrap">
                    PKR{" "}
                    {exp.amount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-slate-400 max-w-xs truncate whitespace-nowrap">
                    {exp.notes || (
                      <span className="text-slate-200 italic font-normal">
                        -
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right text-xs font-bold whitespace-nowrap space-x-1.5">
                    <button
                      onClick={() => onEditExpense(exp)}
                      className="px-3 py-1.5 text-xs font-bold text-indigo-600 bg-indigo-50/60 hover:bg-indigo-100 active:bg-indigo-200 rounded-lg transition-all inline-flex items-center"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDeleteExpense(exp.id)}
                      className="px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50/60 hover:bg-red-100 active:bg-red-200 rounded-lg transition-all inline-flex items-center"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
