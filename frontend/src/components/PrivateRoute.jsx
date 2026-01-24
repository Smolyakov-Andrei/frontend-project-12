import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'

const PrivateRoute = ({ children }) => {
  const auth = useAuth()
  const location = useLocation()

  return (
    auth.user ? children : <Navigate to="/login" state={{ from: location }} />
  )
}

export default PrivateRoute
