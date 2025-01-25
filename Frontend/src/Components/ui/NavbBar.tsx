import React from "react";
import { Button } from "@/Components/ui/button";
import { Link } from "react-router-dom";
import { LogIn, Wallet } from "lucide-react";
import { useAuth } from '@/Context/AuthContext';
import toast from "react-hot-toast";

const NavbBar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout(); // Calls the logout method from AuthContext
      toast.success('You have been logged out!');
    } catch (error) {
      toast.error('Error logging out.');
    }
  };
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

      <div className="flex items-center gap-3 md:gap-4">
        {/* Conditional rendering based on authentication */}
        {!isAuthenticated ? (
          <>
            <Link to="/login">
              <Button
                variant="outline"
                className="hidden md:flex items-center gap-2 border-2 border-green-600 text-green-600 hover:bg-green-50 hover:text-green-700 hover:border-green-700 px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:shadow-md"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Button>
            </Link>
            {/* Mobile version of Login button */}
            <Link to="/login">
              <Button
                variant="outline"
                className="md:hidden flex items-center gap-2 border-2 border-green-600 text-green-600 hover:bg-green-50 hover:text-green-700 hover:border-green-700 px-3 py-1.5 rounded-lg font-semibold transition-all duration-300"
              >
                <LogIn className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/register">
              <Button className="relative overflow-hidden bg-green-600 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 hover:bg-green-700 hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 group">
                <span className="relative z-10">Sign Up</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Button>
            </Link>
          </>
        ) : (
          <>
            {/* Logout Button */}
            <Button
              variant="outline"
              className="flex items-center gap-2 border-2 border-red-600 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-700 px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:shadow-md"
              onClick={handleLogout}
            >
              <LogIn className="w-4 h-4" /> {/* You can replace this with an icon for logout */}
              Logout
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default NavbBar;
