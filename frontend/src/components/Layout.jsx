import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Layout = () => {
  return (
    <div className='container-fluid'>
        <div className="row">
            <div className="col p-0">
                <Header/>
            </div>
        </div>
        <div className="row">
            <div className="col bg-body-secondary" style={{minHeight: "30rem"}}>
                <Outlet/>
            </div>
        </div>
        <div className="row">
            <div className="col p-0">
                <Footer/>
            </div>
        </div>
    </div>
  )
}

export default Layout
