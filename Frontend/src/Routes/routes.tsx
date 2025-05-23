import { createBrowserRouter } from 'react-router-dom';
import Login from '../Pages/Authentication/Login';
import Register from '../Pages/Authentication/Register'
import LandingPage from '../Pages/LandingPage';
import RootLayout from '@/Layouts/RootLayout';
import AuthLayout from '@/Layouts/AuthLayout';
import Profile from '@/Pages/Profile/Profile';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Dashboard from '../Pages/Dashboard/Dashboard';
import NotFound from '@/Pages/NotFound';
import MonthList from '@/Pages/Home/MonthList';
import CreateMonth from '@/Pages/Home/CreateMonth';
import DataPrivacyPage from '@/Pages/Data&Privacy/DataPrivacyPage';
import ComingSoon from '@/Pages/ComingSoon';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      // add more routes with path and element
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard/:monthId",
        element: <Dashboard activeTab="" />
      },

    ]
  },
  {
    path: "/home",
    element: <MonthList />
  },
  {
    path: "/months/new",
    element: <CreateMonth />
  },
  {
    path: "/data-and-privacy",
    element: <DataPrivacyPage />
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/coming-soon",
    element: <ComingSoon/>,
  }
]);