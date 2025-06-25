import React from 'react';

export default function WebHeader() {
    return (
        <>
            {/* Navbar */}
            <nav className="main-header navbar navbar-expand-md navbar-light navbar-white m-0">
                <div className="container d-flex justify-content-between align-items-center">
                    {/* Logo - aligned left */}
                    <a href="../../index3.html" className="navbar-brand d-flex align-items-center">
                        <img
                            src="../dist/img/logo-removebg-preview.png"
                            alt="HMS Logo"
                            className="brand-image"
                            style={{ width: '50px' }}
                        />
                        
                    </a>

                    {/* Toggler for small screens */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarCollapse"
                        aria-controls="navbarCollapse"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    {/* Navbar links - aligned right */}
                    <div className="collapse navbar-collapse justify-content-end" id="navbarCollapse">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a href="index3.html" className="nav-link">
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link">
                                    About
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link">
                                    Job Bord
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link">
                                    Feedback
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link">
                                    Contect Us
                                </a>
                            </li>
                        </ul>
                        <button className="btn btn-primary btn-sm mr-2">Login</button>
                        <button className="btn btn-primary btn-sm">Login</button>
                    </div>
                </div>
            </nav>
        </>
    );
}
