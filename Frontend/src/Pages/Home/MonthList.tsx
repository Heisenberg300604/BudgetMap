import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Calendar, Plus, Wallet, TrendingUp, Target, AlertCircle } from 'lucide-react'
import API_BASE_URL from '@/Config/ApiConfig'

// Interface for Budget Period
interface BudgetPeriod {
  _id: string
  month: string
  year: number
  totalIncome: number
  totalExpense: number
  netBalance: number
  savingTarget: number
  currentSavings: number
  savingsProgress: number
  createdAt: string
  status: 'on_track' | 'normal' | 'exceeded'
}

export default function MonthList() {
  const navigate = useNavigate()
  const [error, setError] = useState<string>('')
  const [budgetPeriods, setBudgetPeriods] = useState<BudgetPeriod[]>([])

  // Fetch months on component mount
  useEffect(() => {
    const fetchMonths = async () => {
      try {
        const token = localStorage.getItem('token') // Get token from localStorage (replace with actual method)
        const response = await axios.get(`${API_BASE_URL}/allmonths`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setBudgetPeriods(response.data)
        console.log(budgetPeriods);
      } catch (err) {
        console.error('Error fetching months:', err)
        setError('Failed to fetch months.')
      }
    }

    fetchMonths()
  }, [])

  const calculateStatus = (period: BudgetPeriod) => {
    if (period.currentSavings >= period.savingTarget) {
      return 'on_track'
    }
    if (period.totalExpense > period.totalIncome) {
      return 'exceeded'
    }
    return 'normal'
  }

  const getStatusColor = (status: BudgetPeriod['status']) => {
    switch (status) {
      case 'on_track':
        return 'text-green-500'
      case 'normal':
        return 'text-blue-500'
      case 'exceeded':
        return 'text-red-500'
      default:
        return 'text-gray-500'
    }
  }

  const getStatusText = (status: BudgetPeriod['status']) => {
    switch (status) {
      case 'on_track':
        return 'On Track'
      case 'normal':
        return 'Normal'
      case 'exceeded':
        return 'Exceeded'
      default:
        return 'Unknown'
    }
  }


  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">BudgetMap</h1>
            <p className="text-gray-600 dark:text-gray-300">Track and manage your monthly budgets smoothly and efficiently</p>
          </div>
          <button
            onClick={() => navigate('/months/new')}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Budget Month
          </button>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 px-4 py-3 rounded-lg mb-6 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgetPeriods.map((period) => {
            const status = calculateStatus(period)
            return (
              <div
                key={period._id}
                onClick={() => navigate(`/dashboard/${period._id}`)}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-6 h-6 text-green-500 mr-3" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {period.month} {period.year}
                      </h3>
                    </div>
                    <span className={`text-sm font-medium ${getStatusColor(status)}`}>
                      {getStatusText(status)}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <Wallet className="w-4 h-4 mr-2" />
                        <span>Budget</span>
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        ${period.totalIncome.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        <span>Spent</span>
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        ${period.totalExpense.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <Target className="w-4 h-4 mr-2" />
                        <span>Savings Target</span>
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        ${period.savingTarget.toLocaleString()}
                      </span>
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Savings Progress</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {Math.round((period.savingsProgress / period.savingTarget) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${period.savingsProgress > period.savingTarget
                              ? 'bg-red-500'
                              : period.savingsProgress > period.savingTarget * 0.8
                                ? 'bg-yellow-500'
                                : 'bg-green-500'
                            }`}
                          style={{
                            width: `${Math.min((period.savingsProgress / period.savingTarget) * 100, 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Created At</span>
                    <span className="text-lg font-bold text-green-500">
                      {formatDate(period.createdAt)}
                    </span>
                  </div>
                </div>
              </div>)
          })}

          {budgetPeriods.length === 0 && !error && (
            <div className="col-span-full bg-white dark:bg-gray-800 rounded-xl shadow-md p-12 text-center">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                No Budget Month Yet?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Create your first budget month to start tracking your expenses/transactions
              </p>
              <button
                onClick={() => navigate('/months/new')}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Budget Month
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
