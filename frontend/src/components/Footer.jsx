import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
        <nav className="navbar navbar-expand-lg" style={{background: "#3c3c92"}} data-bs-theme="dark">
            <div className="container-fluid">
            <Link className="navbar-brand" to={"/"}>
                Logo
            </Link>
            <p className='text-white m-auto'>Copyright@2024</p>
            </div>
        </nav>
    </footer>
  )
}

export default Footer
