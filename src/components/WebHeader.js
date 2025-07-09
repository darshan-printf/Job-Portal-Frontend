import { NavLink } from "react-router-dom";

export default function WebHeader() {
  return (
    <header id="header" className="header d-flex align-items-center sticky-top">
      <div className="container-fluid container-xl position-relative d-flex align-items-center">
        <NavLink to="/" className="logo d-flex align-items-center me-auto">
          <h1 className="sitename">Vesperr</h1>
        </NavLink>

        <nav id="navmenu" className="navmenu">
          <ul>
            <li>
              <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/services" className={({ isActive }) => (isActive ? "active" : "")}>
                Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/team" className={({ isActive }) => (isActive ? "active" : "")}>
                Team
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
                Contact
              </NavLink>
            </li>
          </ul>
          <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>

        <NavLink to="/contact" className="btn-getstarted">
          Get Started
        </NavLink>
      </div>
    </header>
  );
}
