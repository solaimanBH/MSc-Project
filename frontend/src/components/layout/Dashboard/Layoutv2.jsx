import React from 'react'
import Sidebar from '../../dashboard/v2/Sidebar'
import Navbar from '../../dashboard/v2/Navbar'
import Footer from '../../dashboard/v2/Footer'

const DashboardLayout = (props) => {
  return (
    <div className="d-flex flex-column min-vh-100" style={{ overflow: 'hidden' }}>
      <Sidebar />

      <div style={{ marginLeft: '250px', marginTop: '60px', paddingBottom: '60px', overflow: 'hidden', minHeight: 'calc(100vh-120px)' }}>
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        {props.children}

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}

export default DashboardLayout
