import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Registration() {
    const apiUrl = process.env.REACT_APP_API_URL; // Get the API URL from the .env file
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false); // Button loading effect state
    const Env = process.env;
    return (
        <>
            <div className="star-field">
                <div className="layer"></div>
                <div className="layer"></div>
                <div className="layer"></div>

                <div className="login-page-bg bg" id='page-bg'>
                    <div className="login-box">
                        <div className="card card-outline card-primary pb-4">
                            <div class="text-center mt-2">
                                <img class="profile-user-img-com img-fluid border border-0" src={Env.REACT_APP_PROJECT_ICON} alt="User profile picture" />

                                <h3 className="mt-2">{Env.REACT_APP_PROJECT_NAME}</h3>
                            </div>
                            <div className="card-body pt-0 pb-1 ">
                                <p className="login-box-msg">{Env.REACT_APP_PROJECT_NAME} Sine Up</p>
                                <form>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="First Name"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Last Name"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Email Address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="User Name"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Password"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Institution Name"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="col-12">
                                            <button
                                                className="btn btn-primary btn-block w-100"
                                                disabled={loaded}
                                            >
                                                {loaded ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Please wait...
                                                    </>
                                                ) : (
                                                    <>Register</>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </form>

                            </div>
                            <div className="text-center ">
                                <p className="text-center mb-1">Login <Link to={'/admin/login'}>Click</Link></p>
                                <p className="text-center mb-0">Designed by <Link>{Env.REACT_APP_DEVLOPER_NAME}</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}
