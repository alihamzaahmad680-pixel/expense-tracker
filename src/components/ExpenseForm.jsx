
import React, { useState, useEffect } from "react";

export default function ExpenseForm({
  onAddExpense,
  editingExpense,
  onCancelEdit,
}) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setAmount(editingExpense.amount);
      setCategory(editingExpense.category);
      setDate(editingExpense.date);
      setNotes(editingExpense.notes);
    } else {
      resetForm();
    }
  }, [editingExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseFloat(amount) <= 0) {
      alert("Amount must be greater than zero.");
      return;
    }

    const expenseData = {
      id: editingExpense ? editingExpense.id : Date.now().toString(),
      title: title.trim(),
      amount: parseFloat(amount),
      category,
      date,
      notes: notes.trim(),
    };

    onAddExpense(expenseData);
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setAmount("");
    setCategory("");
    setDate(new Date().toISOString().split("T")[0]);
    setNotes("");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 transition-all">
      {/* Dynamic Section Title */}
      <div className="border-b border-slate-100 pb-4 mb-5">
        <h2 className="text-lg font-bold text-slate-800 tracking-tight">
          {editingExpense ? "Edit Expense Entry" : "Add New Expense"}
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          {editingExpense
            ? "Modify current entry fields"
            : "Record a new outcoming transaction"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input Field */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Transaction Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="e.g., Office Grocery"
            className="block w-full rounded-lg border border-slate-200 px-3 py-2 bg-white text-sm text-slate-800 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
          />
        </div>

        {/* Amount Input Field */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Amount (PKR) *
          </label>
          <div className="relative rounded-lg shadow-sm">
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              placeholder="0.00"
              className="block w-full rounded-lg border border-slate-200 px-3 py-2 bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* Category Dropdown Selection */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Category *
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="block w-full rounded-lg border border-slate-200 px-3 py-2 bg-white text-sm text-slate-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all cursor-pointer"
          >
            <option value="" className="text-slate-400">
              Select Category
            </option>
            <option value="Food">Food</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Transport">Transport</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Date Input Picker */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Date *
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="block w-full rounded-lg border border-slate-200 px-3 py-2 bg-white text-sm text-slate-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all cursor-pointer"
          />
        </div>

        {/* Optional Notes Textarea */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Notes{" "}
            <span className="text-[10px] font-normal text-slate-400 lowercase">
              (optional)
            </span>
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows="3"
            placeholder="Add specific details or item breakdowns..."
            className="block w-full rounded-lg border border-slate-200 px-3 py-2 bg-white text-sm text-slate-800 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all resize-none"
          ></textarea>
        </div>

        {/* Action Form Buttons Stack */}
        <div className="flex items-center gap-2 pt-2">
          <button
            type="submit"
            className={`w-full text-center py-2.5 px-4 text-xs font-bold text-white rounded-lg transition-all shadow-sm ${
              editingExpense
                ? "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800"
                : "bg-slate-900 hover:bg-slate-800 active:bg-slate-950"
            }`}
          >
            {editingExpense ? "Update Entry" : "Save Expense"}
          </button>

          {editingExpense && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="w-full text-center py-2.5 px-4 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-lg transition-all"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
