import React, { useState } from 'react'
import { PlusCircle, Calendar, Clock, Tag, FileText } from 'lucide-react'
import toast from 'react-hot-toast'
import API_BASE_URL from '@/Config/ApiConfig'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function AddTransactions() { 
  const { monthId } = useParams();
  const [transaction, setTransaction] = useState({
    type: '',
    category: '',
    amount: '',
    description: '',
    date: '',
    time: ''
  })
  const user = localStorage.getItem('user');
  const userId = user ? JSON.parse(user).id : ''; // will change it later on upon building user context 

  const addTransaction = async (transactionData:any) => { // mention the transaction data type (to be done later)
    try {
      const response = await axios.post(`${API_BASE_URL}/transaction`, { ...transactionData, monthId, userId });
      console.log('Transaction successfully added:', response.data);
      toast.success('Transaction added successfully!', { duration: 4000 });
    } catch (error) {
      console.error('Error adding transaction:', error);
      toast.error('Failed to add transaction. Please try again.');
    }
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    console.log('Transaction submitted:', transaction)
    try {
      const transactionData = { // pass the user id and the month id too (to be done later)
        ...transaction,
        amount: parseFloat(transaction.amount),
      };
      await addTransaction(transactionData);
      setTransaction({
        type: '',
        category: '',
        amount: '',
        description: '',
        date: '',
        time: '',
      });
    } catch (error) {
      console.error('Error submitting transaction:', error);
    }
  }

  const handleSetCurrentDateTime = () => {
    const now = new Date()
    setTransaction({
      ...transaction,
      date: now.toISOString().split('T')[0],
      time: now.toTimeString().split(' ')[0].slice(0, 5)
    })
  }

  const categories = [
    'Food & Dining',
    'Transportation',
    'Entertainment',
    'Utilities',
    'Shopping',
    'Healthcare',
    'Education',
    'Travel',
    'Gifts & Donations',
    'Investments',
    'Others'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900 dark:to-emerald-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-6">Add Transaction</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                <div className="flex rounded-md shadow-sm">
                  <button
                    type="button"
                    className={`flex-1 px-4 py-2 text-sm font-medium rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      transaction.type === 'income'
                        ? 'bg-green-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setTransaction({ ...transaction, type: 'income' })}
                  >
                    Income
                  </button>
                  <button
                    type="button"
                    className={`flex-1 px-4 py-2 text-sm font-medium rounded-r-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      transaction.type === 'expense'
                        ? 'bg-red-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setTransaction({ ...transaction, type: 'expense' })}
                  >
                    Expense
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                <div className="relative">
                  <select
                    id="category"
                    value={transaction.category}
                    onChange={(e) => setTransaction({ ...transaction, category: e.target.value })}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <Tag className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400 text-lg">₹</span>
                </div>
                <input
                  type="number"
                  id="amount"
                  value={transaction.amount}
                  onChange={(e) => setTransaction({ ...transaction, amount: e.target.value })}
                  className="block w-full pl-8 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Note/Description</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  id="description"
                  value={transaction.description}
                  onChange={(e) => setTransaction({ ...transaction, description: e.target.value })}
                  className="block w-full pl-10 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                  placeholder="Enter description"
                  rows={1}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="date"
                    value={transaction.date}
                    onChange={(e) => setTransaction({ ...transaction, date: e.target.value })}
                    className="block w-full pl-10 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Time</label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="time"
                    id="time"
                    value={transaction.time}
                    onChange={(e) => setTransaction({ ...transaction, time: e.target.value })}
                    className="block w-full pl-10 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={handleSetCurrentDateTime}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Set to Current Date & Time
              </button>
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                Add Transaction
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
