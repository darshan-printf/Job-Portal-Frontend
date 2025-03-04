import React from 'react'
import { Link } from 'react-router-dom'


export default function Header() {
  return (
    <div>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars text-dark"></i></Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          
          
          <li className="nav-item">
            <Link className="nav-link" to={'/user'}><i
              className="fas fa-user"></i></Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
