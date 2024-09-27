import RequireAuth from '@auth-kit/react-router/RequireAuth'
import { createBrowserRouter } from 'react-router-dom'
import NotFound from './pages/404'
import AboutUs from './pages/AboutUs'
import StaticBlogPage from './pages/Blog'
import ContactUsPage from './pages/Contact'
import DonorDashboard from './pages/DonorDashboard'
import HomePage from './pages/HomePage'
import MakeDonation from './pages/MakeDonation'
import ProjectDetailsPageGuest from './pages/ProjectDetails'
import ProjectsPage from './pages/Projects'
import Success from './pages/Success'
import LoginPage from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Dashboard from './pages/dashboard/Dashboard'
import BlogCreationPage from './pages/dashboard/blog/Create'
import DashboardBlogDetailPage from './pages/dashboard/blog/Details'
import DashboardBlogsPage from './pages/dashboard/blog/List'
import DonationsPage from './pages/dashboard/donation/List'
import ProjectCreationPage from './pages/dashboard/project/Create'
import ProjectDetailsPage from './pages/dashboard/project/Details'
import EditProjectPage from './pages/dashboard/project/Edit'
import ProjectListPage from './pages/dashboard/project/List'
import AdminUserList from './pages/dashboard/user/list'
import AddVolunteerPage from './pages/dashboard/volunteer/Create'
import VolunteerListPage from './pages/dashboard/volunteer/List'
import VolunteerSignupForm from './pages/volunteer/signup'
import BlogEditPage from './pages/dashboard/blog/Edit'
import BlogDetailPage from './pages/BlogDetails'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <Signup />
  },
  {
    path: '/volunteer/signup',
    element: <VolunteerSignupForm />
  },
  {
    path: '/about',
    element: <AboutUs />
  },
  {
    path: '/blog',
    element: <StaticBlogPage />
  },
  {
    path: '/blog/:id',
    element: <BlogDetailPage />
  },
  {
    path: '/contact',
    element: <ContactUsPage />
  },
  {
    path: '/projects',
    element: <ProjectsPage />
  },
  {
    path: '/dashboard',
    element: (
      <RequireAuth fallbackPath="/login">
        <Dashboard />
      </RequireAuth>
    )
  },
  {
    path: '/donate-now',
    element: <MakeDonation />
  },
  {
    path: '/success',
    element: (<RequireAuth fallbackPath="/login">
      <Success />
    </RequireAuth>)
  },
  {
    path: '/donations',
    element: (<RequireAuth fallbackPath="/login">
      <DonationsPage />
    </RequireAuth>)
  },
  {
    path: '/donor-dashboard',
    element: (<RequireAuth fallbackPath="/login">
      <DonorDashboard />
    </RequireAuth>)
  },
  {
    path: '/dashboard/projects',
    element: (
      <RequireAuth fallbackPath="/login">
        <ProjectListPage />
      </RequireAuth>
    )
  },
  {
    path: '/dashboard/blog/create',
    element: (
      <RequireAuth fallbackPath="/login">
        <BlogCreationPage />
      </RequireAuth>
    )
  },
  {
    path: '/dashboard/blogs',
    element: (
      <RequireAuth fallbackPath="/login">
        <DashboardBlogsPage />
      </RequireAuth>
    )
  },
  {
    path: '/dashboard/blogs/:id',
    element: (
      <RequireAuth fallbackPath="/login">
        <DashboardBlogDetailPage />
      </RequireAuth>
    )
  },
  {
    path: '/dashboard/blogs/edit/:id',
    element: (
      <RequireAuth fallbackPath="/login">
        <BlogEditPage />
      </RequireAuth>
    )
  },
  {
    path: '/users',
    element: <AdminUserList />
  },
  {
    path: '/dashboard/projects/create',
    element: (
      <RequireAuth fallbackPath="/login">
        <ProjectCreationPage />
      </RequireAuth>
    )
  },
  {
    path: '/projects/:id',
    element: (
      <ProjectDetailsPageGuest />
    )
  },
  {
    path: '/dashboard/projects/:id',
    element: (
      <RequireAuth fallbackPath="/login">
        <ProjectDetailsPage />
      </RequireAuth>
    )
  },
  {
    path: '/dashboard/projects/edit/:id',
    element: (
      <RequireAuth fallbackPath="/login">
        <EditProjectPage />
      </RequireAuth>
    )
  },
  {
    path: '/dashboard/volunteers/create',
    element: (
      <RequireAuth fallbackPath="/login">
        <AddVolunteerPage />
      </RequireAuth>
    )
  },
  {
    path: '/dashboard/volunteers',
    element: (
      <RequireAuth fallbackPath="/login">
        <VolunteerListPage />
      </RequireAuth>
    )
  },
  {
    path: '*',
    element: <NotFound />
  },
])

export default routes