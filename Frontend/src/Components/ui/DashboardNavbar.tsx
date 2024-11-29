import React, { useState } from 'react'
import { PlusCircle, List, Settings } from 'lucide-react'  
import { Button } from "@/Components/ui/button"
import Dashboard from '@/Pages/Dashboard/Dashboard';

const DashboardNavbar: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('dashboard');
    return (
        <div>
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-green-600">BudgetMap</h1>
                    <nav className="flex space-x-4">
                        <Button
                            variant={activeTab === 'dashboard' ? 'outline' : 'ghost'}
                            className="text-green-600"
                            onClick={() => setActiveTab('dashboard')}
                        >
                            Dashboard
                        </Button>
                        <Button
                            variant={activeTab === 'addTransactions' ? 'outline' : 'ghost'}  
                            className="text-green-600"
                            onClick={() => setActiveTab('addTransactions')}  
                        >
                            <PlusCircle className="w-4 h-4 mr-2" />
                            Add Transactions
                        </Button>
                        <Button
                            variant={activeTab === 'viewTransactions' ? 'outline' : 'ghost'}  
                            className="text-green-600"
                            onClick={() => setActiveTab('viewTransactions')}  
                        >
                            <List className="w-4 h-4 mr-2" />
                            View All Transactions
                        </Button>
                        <Button
                            variant={activeTab === 'settings' ? 'outline' : 'ghost'}  
                            className="text-green-600"
                            onClick={() => setActiveTab('settings')}  
                        >
                            <Settings className="w-4 h-4 mr-2" />  
                            Settings
                        </Button>
                    </nav>
                </div>
            </header>
            <Dashboard activeTab={activeTab} />
        </div>
    )
}

export default DashboardNavbar
