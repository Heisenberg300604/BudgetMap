import DashboardNavbar from '@/Components/ui/DashboardNavbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const DashboardLayout:React.FC = () => {
  return (
    <div>
      <DashboardNavbar/>
      <Outlet/>
    </div>
  )
}

export default DashboardLayout
