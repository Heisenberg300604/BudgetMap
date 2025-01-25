import React, { useEffect, useState } from 'react'
import { User, Bell, Lock, Trash2, DollarSign, Crown,ChevronRight, Camera, Tag } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import API_BASE_URL from '@/Config/ApiConfig'
import toast from 'react-hot-toast'

const Settings: React.FC = () => {
  const [currency, setCurrency] = useState('₹');
  const [user, setUser] = useState<any>('');
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
  
  const getUserDetails = async () => {
    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage
  
      if (!token) {
        throw new Error("Token is missing");
      }
  
      // Make the API call
      const response = await axios.get(`${API_BASE_URL}/getuserdetails`, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token to the Authorization header
        },
      });
  
      return response.data; // Return the response data
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data.message || "Error fetching user details";
      } else {
        throw "Error fetching user details";
      }
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const data = await getUserDetails(); // Call the API
        setUser(data.user); // Set user data
        // console.log(user)
      } catch (error: any) {
        toast.error("Failed to load user data"); // Show error toast
      } 
    };

    fetchUserDetails();
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900 dark:to-emerald-900 p-4 sm:p-6">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-6">Settings</h1>

          {/* Profile Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Profile</h2>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 space-y-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center">
                    <User className="w-20 h-20 text-green-500 dark:text-green-300" />
                  </div>
                  <button className="absolute bottom-0 right-0 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all transform group-hover:scale-110">
                    <Camera className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex-grow space-y-4 w-full">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                        <p className="font-semibold text-gray-800 dark:text-gray-200">{user.fullName}</p>
                      </div>
                      <Tag className="w-5 h-5 text-green-500 dark:text-green-400" />
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                        <p className="font-semibold text-gray-800 dark:text-gray-200">{user.email}</p>
                      </div>
                      <Tag className="w-5 h-5 text-green-500 dark:text-green-400" />
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">User ID</p>
                        <p className="font-semibold text-gray-800 dark:text-gray-200">{user.id}</p>
                      </div>
                      <Tag className="w-5 h-5 text-green-500 dark:text-green-400" />
                    </div>
                  </div>
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
                <option value="₹">₹ (INR)</option>
                <option value="$">$ (USD)</option>
              </select>
            </div>

            {/* Pro Upgrade */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg">
              <div className="flex items-center">
                <Crown className="w-5 h-5 text-white mr-3" />
                <span className="text-white font-medium">Upgrade to Pro</span>
              </div>
              <Link to='/coming-soon' className="px-3 py-1 bg-white text-yellow-500 text-sm font-medium rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">
                Upgrade
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings

