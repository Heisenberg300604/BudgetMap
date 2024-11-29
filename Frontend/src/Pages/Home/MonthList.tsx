'use client'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, Plus, Wallet, TrendingUp, Target, AlertCircle } from 'lucide-react'

// Dummy data interface
interface BudgetPeriod {
  _id: string
  name: string
  year: number
  budget: number
  savingTarget: number
  currentSpending: number
  savings: number
  status: 'on_track' | 'at_risk' | 'exceeded'
  categories: {
    name: string
    spent: number
    budget: number
  }[]
}

export default function MonthList() {
  const navigate = useNavigate()
  const [error, setError] = useState<string>('')
  
  // Dummy data
  const [budgetPeriods] = useState<BudgetPeriod[]>([
    {
      _id: '1',
      name: 'January',
      year: 2024,
      budget: 5000,
      savingTarget: 1500,
      currentSpending: 2800,
      savings: 800,
      status: 'on_track',
      categories: [
        { name: 'Housing', spent: 1200, budget: 1500 },
        { name: 'Food', spent: 800, budget: 1000 },
        { name: 'Transport', spent: 400, budget: 500 }
      ]
    },
    {
      _id: '2',
      name: 'February',
      year: 2024,
      budget: 5000,
      savingTarget: 1500,
      currentSpending: 4200,
      savings: 300,
      status: 'at_risk',
      categories: [
        { name: 'Housing', spent: 1500, budget: 1500 },
        { name: 'Food', spent: 950, budget: 1000 },
        { name: 'Transport', spent: 480, budget: 500 }
      ]
    },
    {
      _id: '3',
      name: 'March',
      year: 2024,
      budget: 5000,
      savingTarget: 1500,
      currentSpending: 5200,
      savings: 0,
      status: 'exceeded',
      categories: [
        { name: 'Housing', spent: 1600, budget: 1500 },
        { name: 'Food', spent: 1100, budget: 1000 },
        { name: 'Transport', spent: 550, budget: 500 }
      ]
    }
  ])

  const getStatusColor = (status: BudgetPeriod['status']) => {
    switch (status) {
      case 'on_track':
        return 'text-green-500'
      case 'at_risk':
        return 'text-yellow-500'
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
      case 'at_risk':
        return 'At Risk'
      case 'exceeded':
        return 'Exceeded'
      default:
        return 'Unknown'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">BudgetMap</h1>
            <p className="text-gray-600 dark:text-gray-300">Track and manage your monthly budgets Smoothly and Efficiently</p>
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
          {budgetPeriods.map((period) => (
            <div
              key={period._id}
              onClick={() => navigate(`/dashboard`)}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-6 h-6 text-green-500 mr-3" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {period.name} {period.year}
                    </h3>
                  </div>
                  <span className={`text-sm font-medium ${getStatusColor(period.status)}`}>
                    {getStatusText(period.status)}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Wallet className="w-4 h-4 mr-2" />
                      <span>Budget</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ${period.budget.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      <span>Spent</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ${period.currentSpending.toLocaleString()}
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
                      <span className="text-sm text-gray-600 dark:text-gray-300">Budget Usage</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {Math.round((period.currentSpending / period.budget) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          period.currentSpending > period.budget
                            ? 'bg-red-500'
                            : period.currentSpending > period.budget * 0.8
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                        }`}
                        style={{
                          width: `${Math.min(
                            (period.currentSpending / period.budget) * 100,
                            100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Current Savings</span>
                  <span className="text-lg font-bold text-green-500">
                    ${period.savings.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {budgetPeriods.length === 0 && !error && (
            <div className="col-span-full bg-white dark:bg-gray-800 rounded-xl shadow-md p-12 text-center">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                No Budget Month Yet ?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Create your first budget month to start tracking your expenses/Transactions
              </p>
              <button
                onClick={() => navigate('/periods/new')}
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

