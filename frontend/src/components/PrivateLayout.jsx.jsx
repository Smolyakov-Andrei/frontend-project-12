import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'

const PrivateLayout = () => {
  const auth = useAuth()
  const location = useLocation()

  return (
    auth.user ? <Outlet /> : <Navigate to="/login" state={{ from: location }} />
  )
}

export default PrivateLayout
