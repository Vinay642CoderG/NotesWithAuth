
import { useAppContext } from '../UserContext'
import { Navigate, Outlet } from 'react-router-dom'

const HiddenRoutes = () => {
    const { isUserLogin } = useAppContext()
    return (
        !isUserLogin ? <Outlet/> : <Navigate to='/'/>
      )
}

export default HiddenRoutes
