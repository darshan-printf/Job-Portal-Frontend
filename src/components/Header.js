import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isFullScreen, setIsFullScreen] = useState(false);

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
  return (
    <div>
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
          <li class="nav-item dropdown">
            <Link class="nav-link" data-toggle="dropdown" href="#">
              <i className="fas fa-user"></i>
            </Link>
            <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <span class="dropdown-item dropdown-header">
                <i class="fas fa-user mr-2"></i> User
              </span>
              <div class="dropdown-divider"></div>
              <Link to="/admin/profile" class="dropdown-item">
                <i class="fas fa-user mr-2"></i> Profile
               
              </Link>
              <div class="dropdown-divider"></div>
              <Link href="#" class="dropdown-item">
                <i class="fas fa-lock mr-2"></i> Change Password
                
              </Link>
              <div class="dropdown-divider"></div>
              <Link href="#" class="dropdown-item">
                <i class="fas fa-sign-out-alt mr-2"></i> Log out
                
              </Link>
              
              
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}
