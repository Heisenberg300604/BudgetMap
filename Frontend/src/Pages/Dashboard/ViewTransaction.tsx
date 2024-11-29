import React, { useState, useMemo } from 'react'
import { ArrowUpDown, ChevronDown, DollarSign, Filter, Search } from 'lucide-react'

// Dummy data (will be replaced by actual API data)
const dummyTransactions = [
  { id: 1, type: 'Expense', category: 'Food & Dining', amount: 25.50, description: 'Lunch with colleagues', date: '2023-05-15', time: '12:30' },
  { id: 2, type: 'Income', category: 'Salary', amount: 3000, description: 'Monthly salary', date: '2023-05-01', time: '09:00' },
  { id: 3, type: 'Expense', category: 'Transportation', amount: 50, description: 'Uber rides', date: '2023-05-10', time: '18:45' },
  { id: 4, type: 'Expense', category: 'Shopping', amount: 120.75, description: 'New clothes', date: '2023-05-08', time: '14:20' },
  { id: 5, type: 'Income', category: 'Freelance', amount: 500, description: 'Web design project', date: '2023-05-20', time: '20:00' },
]

type Transaction = typeof dummyTransactions[0]

const ViewTransactions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [filterType, setFilterType] = useState<'All' | 'Income' | 'Expense'>('All')
  const [sortConfig, setSortConfig] = useState<{ key: keyof Transaction; direction: 'asc' | 'desc' }>({ key: 'date', direction: 'desc' })

  const filteredAndSortedTransactions = useMemo(() => {
    return dummyTransactions
      .filter(transaction => 
        (filterType === 'All' || transaction.type === filterType) &&
        (transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
         transaction.category.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      .sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1
        return 0
      })
  }, [searchTerm, filterType, sortConfig])

  const totalIncome = useMemo(() => {
    return filteredAndSortedTransactions
      .filter(t => t.type === 'Income')
      .reduce((sum, t) => sum + t.amount, 0)
  }, [filteredAndSortedTransactions])

  const totalExpenses = useMemo(() => {
    return filteredAndSortedTransactions
      .filter(t => t.type === 'Expense')
      .reduce((sum, t) => sum + t.amount, 0)
  }, [filteredAndSortedTransactions])

  const handleSort = (key: keyof Transaction) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900 dark:to-emerald-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-green-800 dark:text-green-200 mb-8">Transactions</h1>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Total Income</h2>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{`₹${totalIncome.toFixed(2)}`}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Total Expenses</h2>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400">{`₹${totalExpenses.toFixed(2)}`}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Net Balance</h2>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{`₹${(totalIncome - totalExpenses).toFixed(2)}`}</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex items-center space-x-4 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <div className="relative">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as 'All' | 'Income' | 'Expense')}
                  className="appearance-none w-full md:w-auto pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="All">All</option>
                  <option value="Income">Income</option>
                  <option value="Expense">Expense</option>
                </select>
                <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  {['Type', 'Category', 'Amount', 'Description', 'Date', 'Time'].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                      onClick={() => handleSort(header.toLowerCase() as keyof Transaction)}
                    >
                      <div className="flex items-center space-x-1">
                        <span>{header}</span>
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {filteredAndSortedTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.type === 'Income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{transaction.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                        {transaction.amount.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">{transaction.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{transaction.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{transaction.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewTransactions
