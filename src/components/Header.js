import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Header() {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const navigate = useNavigate();
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      // Enter fullscreen
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      // Exit fullscreen
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

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
        <li class="nav-item dropdown">
          <Link
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              toggleFullScreen();
            }}
          >
            {isFullScreen ? (
              <i className="fas fa-compress"></i> // fullscreen on → compress
            ) : (
              <i className="fas fa-expand"></i> // fullscreen off → expand
            )}
          </Link>
        </li>
        <li className="nav-item dropdown">
          <Link className="nav-link" data-toggle="dropdown" href="#">
            <i className="fas fa-user"></i>
          </Link>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <span className="dropdown-item dropdown-header">
              <i className="fas fa-user mr-2"></i> User
            </span>
            <div className="dropdown-divider"></div>
            <Link to="/admin/profile" class="dropdown-item">
              <i className="fas fa-user mr-2"></i> Profile
            </Link>
            <div className="dropdown-divider"></div>
            <Link href="#" class="dropdown-item">
              <i className="fas fa-lock mr-2"></i> Change Password
            </Link>
            <div className="dropdown-divider"></div>
            <li className="dropdown-divider"></li>
            <span
              onClick={logout}
              className="dropdown-item"
              style={{ cursor: "pointer" }}
            >
              <i className="fas fa-sign-out-alt mr-2"></i> Log out
            </span>
          </div>
        </li>
      </ul>
    </nav>
  );
}
