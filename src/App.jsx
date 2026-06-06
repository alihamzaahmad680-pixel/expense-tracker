import React, { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseSummary from "./components/ExpenseSummary";
import { useLocalStorage } from "./hooks/useLocalStorage";

export default function App() {
  const [expenses, setExpenses] = useLocalStorage("expenses", []);
  const [editingExpense, setEditingExpense] = useState(null);

  const handleAddOrUpdateExpense = (expenseData) => {
    if (editingExpense) {
      setExpenses((prev) =>
        prev.map((exp) => (exp.id === editingExpense.id ? expenseData : exp)),
      );
      setEditingExpense(null);
    } else {
      setExpenses((prev) => [...prev, expenseData]);
    }
  };

  const handleEditSelect = (expense) => {
    setEditingExpense(expense);
  };

  const handleDeleteExpense = (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      setExpenses((prev) => prev.filter((exp) => exp.id !== id));
      if (editingExpense?.id === id) setEditingExpense(null);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans antialiased text-slate-800 selection:bg-indigo-500 selection:text-white">
      <div className="container mx-auto px-4 py-6 md:py-10 max-w-7xl">
        {/* Premium Dashboard Header Section - Clean Centered Layout */}
        <header className="mb-8 md:mb-10 flex flex-col items-center text-center border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Personal Expense Tracker
            </h1>
            <p className="text-xs md:text-sm text-slate-500 mt-1 max-w-md mx-auto">
              Track, analyze, and optimize your daily budget seamlessly.
            </p>
          </div>
          <div className="mt-4 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-sm inline-flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
              Storage Synchronized
            </span>
          </div>
        </header>

        {/* Highly Responsive Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* Left Column: Form Input Panel (Sticky placement on wider desktop views) */}
          <div className="lg:col-span-4 lg:sticky lg:top-6 w-full">
            <ExpenseForm
              onAddExpense={handleAddOrUpdateExpense}
              editingExpense={editingExpense}
              onCancelEdit={() => setEditingExpense(null)}
            />
          </div>

          {/* Right Column: Ledger Tracking & Visual Analytics Panels */}
          <div className="lg:col-span-8 w-full space-y-6 md:space-y-8">
            {/* Component 1: All Expenses Log Table (Positioned Top Right) */}
            <ExpenseList
              expenses={expenses}
              onEditExpense={handleEditSelect}
              onDeleteExpense={handleDeleteExpense}
            />

            {/* Component 2: Category Breakdown Metrics (Positioned Bottom Right) */}
            <ExpenseSummary expenses={expenses} />
          </div>
        </div>
      </div>
    </div>
  );
}
