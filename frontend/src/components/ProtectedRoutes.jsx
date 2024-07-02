import { Navigate, Outlet } from 'react-router-dom'
import { useAppContext } from '../UserContext';


const ProtectedRoutes = () => {
  const { isUserLogin } = useAppContext()
return (
    isUserLogin ? <Outlet/> : <Navigate to='/login'/>
  )
}

export default ProtectedRoutes;