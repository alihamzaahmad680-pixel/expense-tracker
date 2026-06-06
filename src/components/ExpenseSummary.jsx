
import React from "react";

export default function ExpenseSummary({ expenses }) {
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const categoriesConfig = [
    {
      name: "Food",
      color: "bg-emerald-500",
      textColor: "text-emerald-600",
      trackColor: "bg-emerald-50",
    },
    {
      name: "Utilities",
      color: "bg-blue-500",
      textColor: "text-blue-600",
      trackColor: "bg-blue-50",
    },
    {
      name: "Entertainment",
      color: "bg-amber-500",
      textColor: "text-amber-600",
      trackColor: "bg-amber-50",
    },
    {
      name: "Transport",
      color: "bg-red-500",
      textColor: "text-red-600",
      trackColor: "bg-red-50",
    },
    {
      name: "Other",
      color: "bg-purple-500",
      textColor: "text-purple-600",
      trackColor: "bg-purple-50",
    },
  ];

  const summaryData = categoriesConfig.map((cat) => {
    const amount = expenses
      .filter((exp) => exp.category === cat.name)
      .reduce((sum, exp) => sum + exp.amount, 0);

    const percentage = total > 0 ? (amount / total) * 100 : 0;

    return {
      ...cat,
      amount,
      percentage,
    };
  });

  return (
    <div className="space-y-6">
      {/* Total Amount Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-400 via-indigo-500 to-slate-400"></div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Total Amount Spent
        </h3>
        <p className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">
          PKR{" "}
          {total.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>

      {/* Category-wise Breakdown Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="border-b border-slate-100 pb-4 mb-5">
          <h2 className="text-lg font-bold text-slate-800 tracking-tight">
            Category-wise Breakdown
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Visual distribution of monthly data segments
          </p>
        </div>

        {expenses.length === 0 ? (
          <div className="text-center py-10 text-slate-400 text-sm font-medium">
            <div className="flex flex-col items-center justify-center space-y-2">
              <span className="text-2xl">📊</span>
              <p>No transactions available to calculate analytics.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Multi-segment Progress Bar */}
            <div className="w-full h-3.5 bg-slate-100 rounded-lg overflow-hidden flex shadow-inner">
              {summaryData.map((cat) =>
                cat.percentage > 0 ? (
                  <div
                    key={cat.name}
                    style={{ width: `${cat.percentage}%` }}
                    className={`${cat.color} h-full transition-all duration-500 hover:opacity-90 cursor-pointer`}
                    title={`${cat.name}: ${cat.percentage.toFixed(1)}%`}
                  />
                ) : null,
              )}
            </div>

            {/* Individual Grid Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 pt-2">
              {summaryData.map((cat) => (
                <div
                  key={cat.name}
                  className="flex flex-col space-y-1.5 p-3 rounded-xl border border-slate-50 bg-slate-50/30 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`w-2.5 h-2.5 rounded-md ${cat.color} inline-block shadow-sm`}
                      ></span>
                      <span className="text-slate-800 font-semibold">
                        {cat.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-900 font-bold">
                        PKR{" "}
                        {cat.amount.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                      <span
                        className={`ml-1.5 px-1.5 py-0.5 text-[10px] font-extrabold rounded ${cat.trackColor} ${cat.textColor}`}
                      >
                        {cat.percentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  {/* Clean Background Track Slider */}
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`${cat.color} h-1.5 rounded-full transition-all duration-500`}
                      style={{ width: `${cat.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
