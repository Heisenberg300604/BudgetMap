import { useState } from 'react'
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import { Pencil, Trash2 } from 'lucide-react'

// Mock data for expenses
const mockExpenses = [
  { id: 1, date: '2023-05-01', category: 'Food', description: 'Grocery shopping', amount: 85.32 },
  { id: 2, date: '2023-04-30', category: 'Transportation', description: 'Gas', amount: 45.00 },
  { id: 3, date: '2023-04-28', category: 'Entertainment', description: 'Movie tickets', amount: 30.00 },
]

export default function ViewExpenses() {
  const [expenses, setExpenses] = useState(mockExpenses)
  const [timeFrame, setTimeFrame] = useState('monthly')

  const handleEdit = (id: number) => {
    // Implement edit functionality
    console.log('Edit expense with id:', id)
  }

  const handleDelete = (id: number) => {
    // Implement delete functionality
    setExpenses(expenses.filter(expense => expense.id !== id))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">View Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <label htmlFor="timeFrame">Time Frame:</label>
            <Select value={timeFrame} onValueChange={setTimeFrame}>
              <SelectTrigger id="timeFrame">
                <SelectValue placeholder="Select time frame" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell className="text-right">${expense.amount.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(expense.id)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(expense.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}