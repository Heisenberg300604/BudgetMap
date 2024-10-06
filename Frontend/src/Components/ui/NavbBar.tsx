import React from 'react'
import { Button } from "@/Components/ui/button"
import { Link } from 'react-router-dom'
import { Wallet } from 'lucide-react'

const NavbBar: React.FC = () => {
    return (
        <header className="container mx-auto px-4 py-6 flex justify-between items-center bg-white shadow-xl rounded-lg">
            <div className="flex items-center space-x-2">
                <Wallet className="h-8 w-8 text-green-600" />
                <span className="text-2xl font-bold text-green-600">BudgetMap</span>
            </div>
            <nav className="hidden md:flex space-x-6">
                <a
                    href="#features"
                    className="relative text-gray-700 hover:text-green-600 transition duration-200 group"
                >
                    Features
                    <span className="absolute block h-0.5 w-full bg-green-600 bottom-0 left-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </a>
                <a
                    href="#how-it-works"
                    className="relative text-gray-700 hover:text-green-600 transition duration-200 group"
                >
                    How It Works
                    <span className="absolute block h-0.5 w-full bg-green-600 bottom-0 left-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </a>
            </nav>
            <Link to='/register'>
                <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-200">Sign Up</Button>
            </Link>
        </header>

    )
}

export default NavbBar
