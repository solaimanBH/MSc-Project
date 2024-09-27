import { RouterProvider } from "react-router-dom"
import createStore from 'react-auth-kit/createStore';
import AuthProvider from 'react-auth-kit';
import routes from './routes'
import './styles/custom.scss'

const authStore = createStore({
  authName: 'charity-app',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
});

function App() {
  return (
    <AuthProvider store={authStore}>
      <RouterProvider router={routes} />
    </AuthProvider>
  )
}

export default App
