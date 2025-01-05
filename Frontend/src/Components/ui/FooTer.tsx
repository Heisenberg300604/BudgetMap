import React from "react";

const FooTer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">ExpenseTracker</h3>
            <p className="text-sm text-gray-400">
              Take control of your finances with our easy-to-use expense
              tracking tool.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Monthly Budgeting</li>
              <li>Yearly Budgeting</li>
              <li>Expense Categorization</li>
              <li>Savings Tracker</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Twitter</li>
              <li>Facebook</li>
              <li>LinkedIn</li>
              <li>Instagram</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          Made with ❤️ by Nibedan! 
          <br />
          &copy; {new Date().getFullYear()} BudgetMap All rights reserved.
          <br />
          Helping you manage your budget with ease and love!
        </div>
      </div>
    </footer>
  );
};

export default FooTer;
