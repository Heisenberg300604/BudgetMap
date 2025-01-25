import React from 'react'
import { Rocket } from 'lucide-react'

const ComingSoon: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-200 flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-12 text-center space-y-8">
        <Rocket className="mx-auto w-32 h-32 text-green-600 animate-bounce" />
        
        <h1 className="text-5xl font-bold text-green-800 tracking-tight">
          Coming <span className="text-green-600">Soon</span>
        </h1>
        
        <p className="text-gray-600 text-xl">
          We're crafting something extraordinary. Get ready for an incredible experience that will redefine your expectations.
        </p>
        
        <div className="flex justify-center space-x-4">
          <div className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors inline-flex items-center gap-2">
            <Rocket className="w-5 h-5" />
            Stay Tuned
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComingSoon