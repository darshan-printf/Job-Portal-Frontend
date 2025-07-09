import { Link } from "react-router-dom";

export default function WebHeader() {
  return (
    <header id="header" className="header d-flex align-items-center sticky-top">
      <div className="container-fluid container-xl position-relative d-flex align-items-center">
        <Link to="/" className="logo d-flex align-items-center me-auto">
          {/* <!-- Uncomment the line below if you also wish to use an image logo --> */}
          {/* <!-- <img src="Web/img/logo.png" alt=""> --> */}
          <h1 className="sitename">Vesperr</h1>
        </Link>

        <nav id="navmenu" className="navmenu">
          <ul>
            <li>
              <Link to="/" className="active">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/team">Team</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
          <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>

        <Link to="/contact" className="btn-getstarted">
          Get Started
        </Link>
      </div>
    </header>
  );
}
