import React from 'react';
import { BarChart, PieChart, Wallet, Calendar, PlusCircle, RefreshCw } from 'lucide-react';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white text-gray-900">
            {/* Header */}
            <header className="bg-green-600 text-white shadow-md">
                <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center">
                    <h1 className="text-3xl font-bold mb-2 md:mb-0">BudgetMap</h1>
                    <nav>
                        <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
                            <li>
                                <a href="#features" className="hover:text-green-300 hover:underline transition duration-200">Features</a>
                            </li>
                            <li>
                                <a href="#how-it-works" className="hover:text-green-300 hover:underline transition duration-200">How It Works</a>
                            </li>
                            <li>
                                <a href="#" className="bg-white text-green-600 px-5 py-2 rounded-md shadow hover:bg-green-100 transition duration-300">Sign Up</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-16 h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-4xl font-bold mb-4">Take Control of Your Finances</h2>
                    <p className="text-xl mb-8">Track expenses, manage budgets, and achieve your financial goals with ease.</p>
                    <a href="#" className="bg-green-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-green-700 transition duration-300">Get Started for Free</a>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="bg-gray-100 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<BarChart className="w-12 h-12 text-green-600" />}
                            title="Monthly and Yearly Budgeting"
                            description="Set and track your budgets on a monthly and yearly basis."
                        />
                        <FeatureCard
                            icon={<PieChart className="w-12 h-12 text-green-600" />}
                            title="Expense Categorization"
                            description="Categorize your expenses for better insights into your spending habits."
                        />
                        <FeatureCard
                            icon={<Wallet className="w-12 h-12 text-green-600" />}
                            title="Savings Tracker"
                            description="See how much you've saved based on your budget and expenses."
                        />
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <StepCard
                            icon={<Calendar className="w-10 h-10 text-green-600" />}
                            title="Set Your Budget"
                            description="Define your monthly or yearly budget to start tracking."
                        />
                        <StepCard
                            icon={<PlusCircle className="w-10 h-10 text-green-600" />}
                            title="Add Expenses"
                            description="Easily add your expenses as you go."
                        />
                        <StepCard
                            icon={<RefreshCw className="w-10 h-10 text-green-600" />}
                            title="Update and Manage"
                            description="Update or delete expenses as needed."
                        />
                        <StepCard
                            icon={<BarChart className="w-10 h-10 text-green-600" />}
                            title="Track Progress"
                            description="View your savings and spending patterns."
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-green-600 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Take Control of Your Finances?</h2>
                    <p className="text-xl mb-8">Join thousands of users who have already improved their financial health.</p>
                    <a href="#" className="bg-white text-green-600 px-8 py-3 rounded-md text-lg font-semibold hover:bg-green-100 transition duration-300">Sign Up Now</a>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; 2024 BudgetTracker. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4">{icon}</div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}

interface StepCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

function StepCard({ icon, title, description }: StepCardProps) {
    return (
        <div className="text-center">
            <div className="flex justify-center mb-4">{icon}</div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}
