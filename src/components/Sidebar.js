import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";


export default function Sidebar({
  M1, M2, M3, M4, M5, M6, M7, M8,
  RName, RName2, RName3, RName4, RName5, RName6, RName7, RName8,
  RLink, RLink2, RLink3, RLink4, RLink5, RLink6, RLink7, RLink8,
  icon1, icon2, icon3, icon4, icon5, icon6, icon7, icon8
}) {
  const data = useSelector((state) => state.data.data);
  const Env = process.env;
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link
        to={'/admin/dashboard'} // Assign the ref to the link
        className="brand-link">
        <img src={Env.REACT_APP_PROJECT_ICON} alt=" Logo" className="brand-image  elevation-3" style={{ opacity: 1 }} />
        <span className="brand-text font-weight-light">{Env.REACT_APP_PROJECT_NAME}</span>
      </Link>
      <div className="sidebar">
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

            {/* Dashboard */}
            <li className={`nav-item has-treeview`}>
              <Link to={RLink} className={`nav-link ${M1 || ""}`}>
                <i className={`nav-icon ${icon1}`}></i>
                <p>
                  {RName}
                </p>
              </Link>
            </li>
            <li className={`nav-item has-treeview`}>
              <Link to={RLink2} className={`nav-link ${M2 || ""}`}>
                <i className={`nav-icon ${icon2}`}></i>
                <p>
                  {RName2}
                </p>
              </Link>
            </li>
            <li className={`nav-item has-treeview`}>
              <Link to={RLink3} className={`nav-link ${M3 || ""}`}>
                <i className={`nav-icon ${icon3}`}></i>
                <p>
                  {RName3}
                </p>
              </Link>
            </li>
            <li className={`nav-item has-treeview`}>
              <Link to={RLink4} className={`nav-link ${M4 || ""}`}>
                <i className={`nav-icon ${icon4}`}></i>
                <p>
                  {RName4}
                </p>
              </Link>
            </li>
            <li className={`nav-item has-treeview`}>
              <Link to={RLink5} className={`nav-link ${M5 || ""}`}>
                <i className={`nav-icon ${icon5}`}></i>
                <p>
                  {RName5}
                </p>
              </Link>
            </li>
            <li className={`nav-item has-treeview`}>
              <Link to={RLink6} className={`nav-link ${M6 || ""}`}>
                <i className={`nav-icon ${icon6}`}></i>
                <p>
                  {RName6}
                </p>
              </Link>
            </li>
            <li className={`nav-item has-treeview`}>
              <Link to={RLink7} className={`nav-link ${M7 || ""}`}>
                <i className={`nav-icon ${icon7}`}></i>
                <p>
                  {RName7}
                </p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>

  )
}
