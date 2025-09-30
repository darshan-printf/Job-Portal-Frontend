import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const navigate = useNavigate();
 
  // Agar user ESC daba de toh bhi state update ho jaye
  useEffect(() => {
    const handleChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleChange);
    return () => document.removeEventListener("fullscreenchange", handleChange);
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/admin/login");
  };
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link
            className="nav-link"
            data-widget="pushmenu"
            href="#"
            role="button"
          >
            <i className="fas fa-bars text-dark"></i>
          </Link>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
        
        <li className="nav-item dropdown">
          <Link
            className="nav-link"
            to="/admin/forgetpassword"
          >
            <i className="fas fa-lock"></i>
          </Link>
        </li>
        <li className="nav-item dropdown">
          <Link to="/admin/profile" className="nav-link"
          >
            <i className="fas fa-user"></i>
          </Link>
        </li>
        <li className="nav-item dropdown">
          <Link
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
          >
            <i className="fas fa-power-off"></i>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
