import { Button } from "../Components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../Components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../Components/ui/tabs"
import {
  BarChart,
  PieChart,
  Wallet,
  Calendar,
  PlusCircle,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";
import { FaGithub } from 'react-icons/fa';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className=" container mx-auto px-1 py-12 md:py-24 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0 ml-3">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Take Control of Your Finances
          </h1>
          <p className="text-xl mb-6 text-gray-600">
            Track expenses, manage budgets, and achieve your financial goals
            with ease.
          </p>
          <div className="flex justify-start gap-2">
          <Link to="/register">
            <Button size="lg" className="mr-4 bg-green-600 hover:bg-green-700">
              Get Started for Free
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50 hover:border-green-700 hover:text-green-700 active:bg-green-100 transition-colors duration-200"
            onClick={() =>
              window.open("https://github.com/Heisenberg300604/BudgetMap", "_blank")
            }
          >
            <FaGithub className="w-5 h-5 mr-1" />{" "}
            Star on GitHub
          </Button>
          </div>
          {/* <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">Learn More</Button> */}
        </div>
        <div className="md:w-1/2">
          <img src="/saving.svg "></img>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-green-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Key Features
          </h2>
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
      <section id="how-it-works" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How It Works
          </h2>
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

      {/* Demo Section */}
      {/* <section className="bg-green-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">See It in Action</h2>
          <Tabs defaultValue="monthly" className="max-w-3xl mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="monthly">Monthly View</TabsTrigger>
              <TabsTrigger value="yearly">Yearly View</TabsTrigger>
            </TabsList>
            <TabsContent value="monthly">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Budget Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="h-64 bg-white rounded flex items-center justify-center border border-green-200">
                    Monthly Budget Chart Placeholder
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="yearly">
              <Card>
                <CardHeader>
                  <CardTitle>Yearly Financial Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="h-64 bg-white rounded flex items-center justify-center border border-green-200">
                    Yearly Financial Summary Chart Placeholder
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of users who have already improved their financial
            health.
          </p>
          <Link to='/register'>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-green-600 hover:bg-green-50"
          >
            Sign Up Now
          </Button>
          </Link>
        </div>
      </section>
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
    <Card>
      <CardHeader>
        <div className="flex justify-center mb-4">{icon}</div>
        <CardTitle className="text-xl font-semibold text-center">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-center">{description}</p>
      </CardContent>
    </Card>
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
