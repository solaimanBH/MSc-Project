import React from 'react';
import { Row, Col } from 'reactstrap';
// import DashboardNavbar from './DashboardNavbar';
import Navbar from '../Header'
import Sidebar from './Sidebar';

const DashboardLayout = (props) => {
  return (
    <div>
      <Navbar />
      <Row noGutters>
        <Col md="2">
          <Sidebar />
        </Col>
        <Col md="10" className="ml-sm-auto px-4">
          {props.children}
        </Col>
      </Row>
    </div>
  );
};

export default DashboardLayout;
