import React, { useState } from 'react'
import './Navbar.scss'
import { FaUser } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { FaCogs } from "react-icons/fa";
import { FaEnvelopeOpenText } from "react-icons/fa";
//import { Login } from '../Login/Login';
import { Link } from "react-router-dom"
import logo from '../../../assets/logo/reservanow_logo.svg';
import { useAuthContext } from '../../../hooks/useAuthContext';

export default function Navbar() {
    const { isAuthenticated } = useAuthContext();
    const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='container_navbar'>
      <div className='nav_logo'>
        <img src={logo} alt="Logo" className="login__logo"/>
      </div>
      
      <div className='navbar'>
        <div className={`nav_items ${isOpen && "open"}`}>
          { isAuthenticated ? <Link to="/logout"><FaUser />Logout</Link>:<Link to="/login"><FaUser />Login</Link> }
          <Link to="/Signup"><FaUserPlus /> Regístrate</Link>
          <Link to="/Servicios"><FaCogs /> Servicios</Link>
          <Link to="/Contacto"><FaEnvelopeOpenText /> Contacto</Link>
        </div>
        <div className={`nav_toggle ${isOpen && "open"}`} onClick={ () => setIsOpen(!isOpen)}>
            <span></span>
            <span></span>
            <span></span>
        </div>
      </div>
    </div>
  )
}