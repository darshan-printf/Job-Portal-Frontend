import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Sidebar({ menuItems }) {
  const data = useSelector((state) => state.data.data);
  const Env = process.env;

  useEffect(() => {
    // Ensure AdminLTE only initializes once
    if (window.$) {
      window.$('[data-widget="treeview"]').Treeview('init');
    }
  }, []);

  return (
    <aside className="main-sidebar sidebar-dark-primary">
      <Link to="/admin/dashboard" className="brand-link">
        <img
          src={Env.REACT_APP_PROJECT_ICON}
          alt="Logo"
          className="brand-image"
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
            {menuItems.map((item, index) =>
              item.RName && item.RLink && (
                <li key={index} className="nav-item">
                  <Link to={item.RLink} className={`nav-link ${item.active || ""}`}>
                    <i className={`nav-icon ${item.icon}`}></i>
                    <p>{item.RName}</p>
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
