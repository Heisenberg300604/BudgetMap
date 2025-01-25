import React, { useState, useMemo, useEffect } from 'react'
import { ArrowUpDown, ChevronDown,Filter, Search } from 'lucide-react'
import API_BASE_URL from '@/Config/ApiConfig'
import { useParams } from 'react-router-dom'

type Transaction = {
  _id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: string;
  time: string;
};

const ViewTransactions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [monthDetails, setMonthDetails] = useState<any>(''); // store month details here 
  const [filterType, setFilterType] = useState<'All' | 'income' | 'expense'>('All')
  const [sortConfig, setSortConfig] = useState<{ key: keyof Transaction; direction: 'asc' | 'desc' }>({ key: 'date', direction: 'desc' })
  const { monthId } = useParams();

  const filteredAndSortedTransactions = useMemo(() => {
    return transactions
      .filter(transaction =>
        (filterType === 'All' || transaction.type === filterType) &&
        (transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          transaction.category.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      .sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
  }, [transactions, searchTerm, filterType, sortConfig]);

  const handleSort = (key: keyof Transaction) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  useEffect(() => {
    // Fetch month details from the API
    const fetchMonthDetails = async () => {
      try {
        // const monthId = '677935a6b92e1824ef338b29'; // Replace with dynamic value if necessary
        const response = await fetch(`${API_BASE_URL}/months?monthId=${monthId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch month details');
        }
        const data = await response.json();
        // console.log('Month Details:', data); // Log the data for now
        setMonthDetails(data);
        console.log('Month Details:', monthDetails);
      } catch (error) {
        console.error('Error fetching month details:', error);
      }
    };

    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        if (!token) throw new Error('User not authenticated');

        const response = await fetch(`${API_BASE_URL}/transactions?monthId=${monthId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch transactions');
        }

        const data = await response.json();
        setTransactions(data);
        console.log('Transactions:', transactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();

    fetchMonthDetails();
  }, [monthId]);



  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900 dark:to-emerald-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-green-800 dark:text-green-200 mb-8">Transactions</h1>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Total Income</h2>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{`₹ ${monthDetails.totalIncome}`}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Total Expenses</h2>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400">{`₹${parseFloat(monthDetails.totalExpense).toFixed(2)}`}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Net Balance</h2>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{`₹${parseFloat(monthDetails.netBalance).toFixed(2)}`}</p>
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
                  onChange={(e) => setFilterType(e.target.value as 'All' | 'income' | 'expense')}
                  className="appearance-none w-full md:w-auto pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="All">All</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
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
                  <tr key={transaction._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{transaction.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">₹ {transaction.amount.toFixed(2)}</td>
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
