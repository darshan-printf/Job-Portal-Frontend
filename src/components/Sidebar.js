import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

export default function Sidebar({ menuItems }) {
  const data = useSelector((state) => state.data.data);
  const Env = process.env;

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link to="/admin/dashboard" className="brand-link">
        <img
          src={Env.REACT_APP_PROJECT_ICON}
          alt="Logo"
          className="brand-image elevation-3"
          style={{ opacity: 1 }}
        />
        <span className="brand-text font-weight-light">
          {Env.REACT_APP_PROJECT_NAME}
        </span>
      </Link>
      <div className="sidebar">
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {menuItems.map((item, index) => (
              item.RName && item.RLink && (
                <li key={index} className="nav-item has-treeview">
                  <Link to={item.RLink} className={`nav-link ${item.active || ""}`}>
                    <i className={`nav-icon ${item.icon}`}></i>
                    <p>{item.RName}</p>
                  </Link>
                </li>
              )
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
