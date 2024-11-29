import { Card, CardContent, CardHeader, CardTitle } from "../../Components/ui/card"
import ViewTransactions from "./ViewTransaction";
import Settings from "../Settings/Settings";
import AddTransactions from "./AddTransactions";
import { ArrowDown, ArrowUp, DollarSign, TrendingUp } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
interface DashboardProps {
  activeTab: string;
}

const expenseData = [
  { name: 'Food', value: 400 },
  { name: 'Transport', value: 300 },
  { name: 'Entertainment', value: 200 },
  { name: 'Utilities', value: 100 },
]

const monthlyData = [
  { name: 'Jan', amount: 1200 },
  { name: 'Feb', amount: 1100 },
  { name: 'Mar', amount: 1300 },
  { name: 'Apr', amount: 900 },
  { name: 'May', amount: 1400 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function Dashboard({ activeTab = 'dashboard' }: DashboardProps) {

  return (
    <main className="container mx-auto">
      {activeTab === 'dashboard' && (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900 dark:to-emerald-900 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-green-800 dark:text-green-200 mb-8">Dashboard</h1>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$1,234.56</div>
                  <p className="text-xs text-muted-foreground">+2.5% from last month</p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Savings</CardTitle>
                  <ArrowUp className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$567.89</div>
                  <p className="text-xs text-muted-foreground">+10% from last month</p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Budget Remaining</CardTitle>
                  <ArrowDown className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$789.01</div>
                  <p className="text-xs text-muted-foreground">-5% from last month</p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Trend</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+12.5%</div>
                  <p className="text-xs text-muted-foreground">Compared to last 3 months</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle>Expense Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={expenseData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {expenseData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle>Monthly Spending Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="amount" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Transactions */}
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="p-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                        <th className="p-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                        <th className="p-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                        <th className="p-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      <tr>
                        <td className="p-3 text-sm">2023-05-01</td>
                        <td className="p-3 text-sm">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Food
                          </span>
                        </td>
                        <td className="p-3 text-sm">Grocery shopping</td>
                        <td className="p-3 text-sm text-right font-medium">$85.32</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-sm">2023-04-30</td>
                        <td className="p-3 text-sm">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            Transportation
                          </span>
                        </td>
                        <td className="p-3 text-sm">Gas</td>
                        <td className="p-3 text-sm text-right font-medium">$45.00</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-sm">2023-04-28</td>
                        <td className="p-3 text-sm">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Entertainment
                          </span>
                        </td>
                        <td className="p-3 text-sm">Movie tickets</td>
                        <td className="p-3 text-sm text-right font-medium">$30.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
      {activeTab === 'addTransactions' && <AddTransactions />}
      {activeTab === 'viewTransactions' && <ViewTransactions />}
      {activeTab === 'settings' && <Settings />}
    </main>
  )
}