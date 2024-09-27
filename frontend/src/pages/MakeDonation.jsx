import { useEffect, useRef } from "react"
import { useLocation, useNavigate } from 'react-router-dom'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'

const MakeDonation = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const isLoggedIn = useIsAuthenticated()
  const linkRef = useRef()


  useEffect(() => {
    console.log({ isLoggedIn });

    if (!isLoggedIn) {
      navigate('/login', { state: { mode: 'donation' } })
    } else {
      linkRef.current.click()
    }
  }, [isLoggedIn])

  return (
    <div>
      <a href="https://donate.stripe.com/test_bIYg0S7Rdakp24wfYY" style={{ visibility: 'hidden' }} ref={linkRef}>Site</a>
    </div>
  )
}

export default MakeDonation
