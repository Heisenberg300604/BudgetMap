import { Card, CardContent, CardHeader, CardTitle } from "../../Components/ui/card"
import AddExpense from '../Dashboard/AddExpenses'
import ViewExpenses from '../Dashboard/ViewExpenses'
import ManageBudget from '../Dashboard/ManageExpenses'

interface DashboardProps {
  activeTab: string;
}

export default function Dashboard({ activeTab = 'dashboard' }: DashboardProps) {

  return (
    <main className="container mx-auto px-4 py-8">
      {activeTab === 'dashboard' && (
        <>
          <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Total Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600">$1,234.56</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600">$567.89</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Budget Remaining</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600">$789.01</p>
              </CardContent>
            </Card>
          </div>

          <h3 className="text-2xl font-bold mt-12 mb-4">Recent Transactions</h3>
          <Card>
            <CardContent className="p-0">
              <table className="w-full">
                <thead className="bg-green-50">
                  <tr>
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Category</th>
                    <th className="p-3 text-left">Description</th>
                    <th className="p-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-3">2023-05-01</td>
                    <td className="p-3">Food</td>
                    <td className="p-3">Grocery shopping</td>
                    <td className="p-3 text-right">$85.32</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3">2023-04-30</td>
                    <td className="p-3">Transportation</td>
                    <td className="p-3">Gas</td>
                    <td className="p-3 text-right">$45.00</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3">2023-04-28</td>
                    <td className="p-3">Entertainment</td>
                    <td className="p-3">Movie tickets</td>
                    <td className="p-3 text-right">$30.00</td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </>
      )}

      {activeTab === 'addExpense' && <AddExpense />}
      {activeTab === 'viewExpenses' && <ViewExpenses />}
      {activeTab === 'manageBudget' && <ManageBudget />}
    </main>
  )
}