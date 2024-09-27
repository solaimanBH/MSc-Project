import { FaArrowUp, FaHandsHelping, FaPoundSign, FaProjectDiagram, FaTasks, FaUser } from 'react-icons/fa';
import { Badge, Button, Card, CardBody, CardText, CardTitle, Col, Container, Row, Table } from 'reactstrap';

import { useEffect, useState } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import DashboardLayout from '../../components/layout/Dashboard/Layoutv2';
import { API_BASE } from '../../constants/base';
import DonorDashboard from '../DonorDashboard';
import VolunteerDashboard from './volunteer/VolunteerDashboard';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState()
  const [loading, setLoading] = useState(true)
  const authHeader = useAuthHeader()
  const user = useAuthUser()
  useEffect(() => {
    if (authHeader?.length <= 0) return
    const get = async () => {
      const res = await fetch(`${API_BASE}/dashboard`, {
        headers: {
          Authorization: authHeader
        }
      })

      const data = await res.json()

      setDashboardData(data)
      setLoading(false)
    }
    get()
  }, [authHeader, user])

  if (user.role === 'donor') {
    return <DonorDashboard />
  }

  if (user.role === 'volunteer') {
    return <VolunteerDashboard />
  }

  return (
    <DashboardLayout>
      <Container fluid className="p-4">
        {loading ? <p>Loading ...</p> : (<>
          <Row className="mb-4">
            <Col md="3" sm="6">
              <Card className="text-white bg-primary mb-4">
                <CardBody className="d-flex align-items-center justify-content-between">
                  <div>
                    <CardTitle tag="h5">Total Projects</CardTitle>
                    <CardText tag="h3">{dashboardData.projects}</CardText>
                  </div>
                  <FaProjectDiagram size={50} />
                </CardBody>
              </Card>
            </Col>
            <Col md="3" sm="6">
              <Card className="text-white bg-secondary mb-4">
                <CardBody className="d-flex align-items-center justify-content-between">
                  <div>
                    <CardTitle tag="h5">Total Donations</CardTitle>
                    <CardText tag="h3">&pound;{dashboardData.totalDonations}</CardText>
                  </div>
                  <FaPoundSign size={50} />
                </CardBody>
              </Card>
            </Col>
            <Col md="3" sm="6">
              <Card className="text-white bg-success mb-4">
                <CardBody className="d-flex align-items-center justify-content-between">
                  <div>
                    <CardTitle tag="h5">Total Users</CardTitle>
                    <CardText tag="h3">{dashboardData.totalUsers}</CardText>
                  </div>
                  <FaUser size={50} />
                </CardBody>
              </Card>
            </Col>
            <Col md="3" sm="6">
              <Card className="text-white bg-info mb-4">
                <CardBody className="d-flex align-items-center justify-content-between">
                  <div>
                    <CardTitle tag="h5">Total Volunteers</CardTitle>
                    <CardText tag="h3">{dashboardData.totalVolunteers}</CardText>
                  </div>
                  <FaHandsHelping size={50} />
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md="6">
              <Card style={{ minHeight: '400px' }}>
                <CardBody>
                  <CardTitle tag="h5">Recent Activity</CardTitle>
                  <Table borderless className="mb-0">
                    <tbody>
                      {dashboardData?.topActivities?.map((activity, index) => (
                        <tr key={index}>
                          <td>{activity?.message}</td>
                          <td className="text-right"><Badge color="info">{new Date(activity?.createdAt).toLocaleString()}</Badge></td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
            <Col md="6">
              <Card style={{ minHeight: '400px' }}>
                <CardBody>
                  <CardTitle tag="h5">Ongoing Projects</CardTitle>
                  <Table className="mb-0">
                    <thead>
                      <tr>
                        <th>Project</th>
                        <th>Progress</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData?.ongoingProjects?.length > 0 ? (
                        dashboardData?.ongoingProjects?.map((project) => {
                          const progress = ((project?.currentAmount / project?.goalAmount) * 100).toFixed(0); // Calculate progress percentage
                          return (
                            <tr key={project?._id}>
                              <td>{project?.title}</td>
                              <td>
                                <Badge color={progress >= 75 ? 'primary' : progress >= 50 ? 'warning' : 'info'}>
                                  {progress}%
                                </Badge>
                              </td>
                              <td>
                                <Button color="secondary" size="sm">
                                  <FaTasks /> Manage
                                </Button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="3" className="text-center">No ongoing projects found.</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md="12">
              <Card>
                <CardBody>
                  <CardTitle tag="h5">Donation Overview</CardTitle>
                  <Row>
                    <Col md="4">
                      <CardText><FaArrowUp className="text-success" /> $5,000 raised today</CardText>
                    </Col>
                    <Col md="4">
                      <CardText><FaArrowUp className="text-success" /> $30,000 raised this month</CardText>
                    </Col>
                    <Col md="4">
                      <CardText><FaArrowUp className="text-success" /> $75,000 raised this year</CardText>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </>)}
      </Container>
    </DashboardLayout>
  );
};

export default Dashboard;
