import React, { useState } from 'react'
import { PlusCircle, List, Sliders } from 'lucide-react'
import { Button } from "@/Components/ui/button"
import Dashboard from '@/Pages/Dashboard/Dashboard';

const DashboardNavbar: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('dashboard');
    return (
        <div>
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-green-600">BudgetMap</h1>
                    <nav className="flex space-x-4">
                        <Button
                            variant={activeTab === 'dashboard' ? 'outline' : 'ghost'}
                            className="text-green-600"
                            onClick={() => setActiveTab('dashboard')}
                        >
                            Dashboard
                        </Button>
                        <Button
                            variant={activeTab === 'addExpense' ? 'outline' : 'ghost'}
                            className="text-green-600"
                            onClick={() => setActiveTab('addExpense')}
                        >
                            <PlusCircle className="w-4 h-4 mr-2" />
                            Add Expense
                        </Button>
                        <Button
                            variant={activeTab === 'viewExpenses' ? 'outline' : 'ghost'}
                            className="text-green-600"
                            onClick={() => setActiveTab('viewExpenses')}
                        >
                            <List className="w-4 h-4 mr-2" />
                            View Expenses
                        </Button>
                        <Button
                            variant={activeTab === 'manageBudget' ? 'outline' : 'ghost'}
                            className="text-green-600"
                            onClick={() => setActiveTab('manageBudget')}
                        >
                            <Sliders className="w-4 h-4 mr-2" />
                            Manage Budget
                        </Button>
                    </nav>
                </div>
            </header>
            <Dashboard activeTab={activeTab} />
        </div>
    )
}

export default DashboardNavbar
