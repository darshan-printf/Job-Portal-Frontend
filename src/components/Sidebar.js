import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";

export default function Sidebar({M1,M2}) {
  const data = useSelector((state) => state.data.data);
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link
        to={'/dashboard'} // Assign the ref to the link
        className="brand-link">
        <img src={"dist/img/logo.png"} alt=" Logo" className="brand-image img-circle elevation-3" style={{ opacity: .8 }} />
        <span className="brand-text font-weight-light">Admin</span>
      </Link>
      <div className="sidebar">
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

            {/* Dashboard */}
            <li className={`nav-item has-treeview`}>
              <Link to={'/dashboard'} className={`nav-link ${M1 || ""}`}>
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>
                  Dashboard
                </p>
              </Link>
            </li>
            <li className={`nav-item has-treeview`}>
              <Link to={'/dashboard'} className={`nav-link ${M2 || ""}`}>
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>
                  Country
                </p>
              </Link>
            </li>
            <li className={`nav-item has-treeview`}>
              <Link to={'/dashboard'} className={`nav-link ${M2 || ""}`}>
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>
                  Country
                </p>
              </Link>
            </li>
            <li className={`nav-item has-treeview`}>
              <Link to={'/dashboard'} className={`nav-link ${M2 || ""}`}>
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>
                  Country
                </p>
              </Link>
            </li>
            <li className={`nav-item has-treeview`}>
              <Link to={'/dashboard'} className={`nav-link ${M2 || ""}`}>
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>
                  Country
                </p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>

  )
}
