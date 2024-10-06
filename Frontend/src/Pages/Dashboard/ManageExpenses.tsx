import React, { useState } from 'react'
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"

export default function ManageBudget() {
  const [budget, setBudget] = useState({
    monthly: '',
    yearly: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the budget data to your backend
    console.log('Budget submitted:', budget)
    // Optionally reset form or show success message
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Manage Budget</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="monthlyBudget">Monthly Budget</Label>
            <Input
              id="monthlyBudget"
              type="number"
              placeholder="Enter monthly budget"
              value={budget.monthly}
              onChange={(e) => setBudget({ ...budget, monthly: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="yearlyBudget">Yearly Budget</Label>
            <Input
              id="yearlyBudget"
              type="number"
              placeholder="Enter yearly budget"
              value={budget.yearly}
              onChange={(e) => setBudget({ ...budget, yearly: e.target.value })}
            />
          </div>
          <Button type="submit" className="w-full">Save Budget</Button>
        </form>
      </CardContent>
    </Card>
  )
}