import React, { useState } from 'react'
import { User, Bell, Lock, Trash2, DollarSign, Crown,ChevronRight, Camera } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Settings: React.FC = () => {
  const [currency, setCurrency] = useState('$')
  const navigate = useNavigate()

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all your data? This action cannot be undone.')) {
      // Reset data logic here
      console.log('Data reset')
    }
  }

  const handleNavigateToDataAndPrivacy = () => {
    navigate('/data-and-privacy') // Navigate to the desired route
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900 dark:to-emerald-900 p-4 sm:p-6">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-6">Settings</h1>

          {/* Profile Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Profile</h2>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative">
                <User className="w-24 h-24 text-green-500" />
                {/* <img
                  src="/placeholder.svg?height=100&width=100"
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                /> */}
                <button className="absolute bottom-0 right-0 bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-grow space-y-3">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Other Settings */}
          <div className="space-y-4">
            {/* Reminders */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center">
                <Bell className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-700 dark:text-gray-200">Reminders</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>

            {/* Data and Privacy */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer"
            onClick={handleNavigateToDataAndPrivacy}>
              <div className="flex items-center">
                <Lock className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-700 dark:text-gray-200">Data and Privacy</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>

            {/* Reset Data */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center">
                <Trash2 className="w-5 h-5 text-red-500 mr-3" />
                <span className="text-gray-700 dark:text-gray-200">Reset Data</span>
              </div>
              <button
                onClick={handleResetData}
                className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Reset
              </button>
            </div>

            {/* Currency Symbol */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-700 dark:text-gray-200">Currency Symbol</span>
              </div>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              >
                <option value="$">$ (USD)</option>
                <option value="€">€ (EUR)</option>
                <option value="£">£ (GBP)</option>
                <option value="¥">¥ (JPY)</option>
              </select>
            </div>

            {/* Pro Upgrade */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg">
              <div className="flex items-center">
                <Crown className="w-5 h-5 text-white mr-3" />
                <span className="text-white font-medium">Upgrade to Pro</span>
              </div>
              <button className="px-3 py-1 bg-white text-yellow-500 text-sm font-medium rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">
                Upgrade
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings

