import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { AlertCircle, Calendar, DollarSign, Target, ArrowLeft, Shield, PiggyBank, Loader2, ChevronDown } from 'lucide-react'

interface FormData {
  name: string
  year: number
  budget: string
  savingTarget: string
}

interface ValidationErrors {
  name?: string
  year?: string
  budget?: string
  savingTarget?: string
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

export default function CreateMonth() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    year: new Date().getFullYear(),
    budget: '',
    savingTarget: '',
  })
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false)
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false)
  const navigate = useNavigate()

  const years = Array.from(
    { length: 7 }, 
    (_, i) => new Date().getFullYear() - 1 + i
  )

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('[data-dropdown]')) {
        setIsMonthDropdownOpen(false);
        setIsYearDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {}
    const currentYear = new Date().getFullYear()

    if (!formData.name.trim()) {
      newErrors.name = 'Month name is required'
    } else if (formData.name.length < 3) {
      newErrors.name = 'Month name must be at least 3 characters'
    }

    if (!formData.year) {
      newErrors.year = 'Year is required'
    } else if (formData.year < currentYear - 1 || formData.year > currentYear + 5) {
      newErrors.year = `Year must be between ${currentYear - 1} and ${currentYear + 5}`
    }

    if (!formData.budget) {
      newErrors.budget = 'Budget is required'
    } else if (parseFloat(formData.budget) <= 0) {
      newErrors.budget = 'Budget must be greater than 0'
    }

    if (!formData.savingTarget) {
      newErrors.savingTarget = 'Saving target is required'
    } else if (parseFloat(formData.savingTarget) < 0) {
      newErrors.savingTarget = 'Saving target cannot be negative'
    } else if (parseFloat(formData.savingTarget) >= parseFloat(formData.budget)) {
      newErrors.savingTarget = 'Saving target cannot exceed budget'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form', {
        icon: '⚠️',
        duration: 4000,
      })
      return
    }

    setIsSubmitting(true)
    
    try {
      // Simulated API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Budget month created successfully!', {
        icon: '🎉',
        duration: 4000,
      })
      
      navigate('/periods')
    } catch (error) {
      toast.error('Failed to create budget month. Please try again.', {
        icon: '❌',
        duration: 4000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleMonthSelect = (month: string) => {
    setFormData(prev => ({ ...prev, name: month }))
    setIsMonthDropdownOpen(false)
    if (errors.name) {
      setErrors(prev => ({ ...prev, name: undefined }))
    }
  }

  const handleYearSelect = (year: number) => {
    setFormData(prev => ({ ...prev, year }))
    setIsYearDropdownOpen(false)
    if (errors.year) {
      setErrors(prev => ({ ...prev, year: undefined }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <button
          onClick={() => navigate('/home')}
          className="mb-6 flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Budget Months
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Create New Budget Month
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Set up your budget and saving targets for the upcoming month
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label 
                    htmlFor="name" 
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                  >
                    Month Name
                  </label>
                  <div className="relative" data-dropdown>
                    <button
                      type="button"
                      onClick={() => setIsMonthDropdownOpen(!isMonthDropdownOpen)}
                      className={`
                        relative w-full pl-10 pr-3 py-2.5 rounded-lg text-left
                        border ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
                        bg-white dark:bg-gray-700
                        text-gray-900 dark:text-white
                        focus:outline-none focus:ring-2 
                        ${errors.name ? 'focus:ring-red-500' : 'focus:ring-green-500'}
                        transition-colors
                      `}
                    >
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                      {formData.name || 'Select Month'}
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </button>
                    
                    {isMonthDropdownOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 max-h-60 overflow-auto">
                        {MONTHS.map((month) => (
                          <button
                            key={month}
                            type="button"
                            onClick={() => handleMonthSelect(month)}
                            className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
                          >
                            {month}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.name && (
                    <p className="mt-1.5 text-sm text-red-500 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label 
                    htmlFor="year" 
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                  >
                    Year
                  </label>
                  <div className="relative" data-dropdown>
                    <button
                      type="button"
                      onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
                      className={`
                        w-full px-3 py-2.5 rounded-lg text-left
                        border ${errors.year ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
                        bg-white dark:bg-gray-700
                        text-gray-900 dark:text-white
                        focus:outline-none focus:ring-2 
                        ${errors.year ? 'focus:ring-red-500' : 'focus:ring-green-500'}
                        transition-colors
                      `}
                    >
                      {formData.year}
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </button>
                    
                    {isYearDropdownOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 max-h-60 overflow-auto">
                        {years.map((year) => (
                          <button
                            key={year}
                            type="button"
                            onClick={() => handleYearSelect(year)}
                            className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
                          >
                            {year}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.year && (
                    <p className="mt-1.5 text-sm text-red-500 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.year}
                    </p>
                  )}
                </div>

                <div>
                  <label 
                    htmlFor="budget" 
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                  >
                    Monthly Budget
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="budget"
                      name="budget"
                      type="number"
                      value={formData.budget}
                      onChange={handleChange}
                      className={`
                        block w-full pl-10 pr-3 py-2.5 rounded-lg
                        border ${errors.budget ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
                        bg-white dark:bg-gray-700
                        text-gray-900 dark:text-white
                        placeholder-gray-400 dark:placeholder-gray-400
                        focus:outline-none focus:ring-2 
                        ${errors.budget ? 'focus:ring-red-500' : 'focus:ring-green-500'}
                        transition-colors
                      `}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                    />
                  </div>
                  {errors.budget && (
                    <p className="mt-1.5 text-sm text-red-500 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.budget}
                    </p>
                  )}
                </div>

                <div>
                  <label 
                    htmlFor="savingTarget" 
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                  >
                    Saving Target
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Target className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="savingTarget"
                      name="savingTarget"
                      type="number"
                      value={formData.savingTarget}
                      onChange={handleChange}
                      className={`
                        block w-full pl-10 pr-3 py-2.5 rounded-lg
                        border ${errors.savingTarget ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
                        bg-white dark:bg-gray-700
                        text-gray-900 dark:text-white
                        placeholder-gray-400 dark:placeholder-gray-400
                        focus:outline-none focus:ring-2 
                        ${errors.savingTarget ? 'focus:ring-red-500' : 'focus:ring-green-500'}
                        transition-colors
                      `}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                    />
                  </div>
                  {errors.savingTarget && (
                    <p className="mt-1.5 text-sm text-red-500 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.savingTarget}
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Shield className="h-5 w-5 text-blue-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">
                      Security Note
                    </h3>
                    <div className="mt-2 text-sm text-blue-700 dark:text-blue-400">
                      <p>
                        Your budget information is encrypted and stored securely. Only you can access
                        this data.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/home')}
                  className="w-full sm:w-auto px-4 py-2.5 border border-gray-300 dark:border-gray-600 
                    text-gray-700 dark:text-gray-300 rounded-lg shadow-sm hover:bg-gray-50 
                    dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 
                    focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-lg shadow-sm
                    bg-gradient-to-r from-green-500 to-emerald-600 
                    hover:from-green-600 hover:to-emerald-700
                    text-white font-medium
                    focus:outline-none focus:ring-2 focus:ring-offset-2 
                    focus:ring-green-500 dark:focus:ring-offset-gray-800
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all duration-200 ease-in-out
                    flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <PiggyBank className="w-4 h-4 mr-2" />
                      Create Budget
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

