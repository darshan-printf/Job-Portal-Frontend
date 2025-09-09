import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Registration() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [formdata, setFormdata] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    website: "",
    GSTNumber: "",
    PANNumber: "",
    CINNumber: "",
    type: ""
  });

  const [loaded, setLoaded] = useState(false);
  const Env = process.env;
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!formdata.name || !formdata.email || !formdata.phone) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoaded(true);
    try {
      const data = new FormData();
      data.append('name', formdata.name);
      data.append('address', formdata.address);
      data.append('email', formdata.email);
      data.append('phone', formdata.phone);
      data.append('website', formdata.website);
      data.append('GSTNumber', formdata.GSTNumber);
      data.append('PANNumber', formdata.PANNumber);
      data.append('CINNumber', formdata.CINNumber);
      data.append('type', formdata.type);
    
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${apiUrl}/company/register`,
        headers: { 
          'Content-Type': 'multipart/form-data'
        },
        data: data
      };
      const response = await axios.request(config);
      
      toast.success(response.data.message);
      setFormdata({ name: "", address: "", email: "", phone: "", website: "", GSTNumber: "", PANNumber: "", CINNumber: "", type: "" });
      
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoaded(false);
    }
  };

  return (
    <>
      <div className="star-field">
        <div className="layer"></div>
        <div className="layer"></div>
        <div className="layer"></div>
        <div className="login-page-bg bg" id="page-bg">
          <div className="card card-outline card-primary w-50 m-4">
            <div className="text-center">
              <img
                className="profile-user-img-com img-fluid border border-0"
                src={Env.REACT_APP_PROJECT_ICON}
                alt="User profile picture"
              />
              <h3>{Env.REACT_APP_PROJECT_NAME}</h3>
            </div>
            <div className="card-body " > 
                
 <form onSubmit={handleSubmit}  >
                <div className="row">
                  <div className="col-md-12 col-12 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Enter Company Name *"
                      value={formdata.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      placeholder="Enter Contact Number *"
                      value={formdata.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Enter Email *"
                      value={formdata.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-4 col-12 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="GSTNumber"
                      placeholder="Enter GST Number"
                      value={formdata.GSTNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-4 col-12 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="PANNumber"
                      placeholder="Enter PAN Number"
                      value={formdata.PANNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-4 col-12 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="CINNumber"
                      placeholder="Enter CIN Number"
                      value={formdata.CINNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="website"
                      placeholder="Enter Website"
                      value={formdata.website}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="type"
                      placeholder="Enter Type of (PVT,LTD,ORG,ETC)"
                      value={formdata.type}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-12 col-12 mb-3">
                    <textarea
                      className="form-control"
                      name="address"
                      placeholder="Enter Address"
                      value={formdata.address}
                      onChange={handleInputChange}
                      rows="3"
                    />
                  </div>
                 
                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block w-100"
                      disabled={loaded}
                    >
                      {loaded ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>{" "}
                          Please wait...
                        </>
                      ) : (
                        <>Register</>
                      )}
                    </button>
                  </div>
                </div>
              </form>
                
             
            </div>
            <div className="text-center">
              <p className="text-center mb-1">
                Already have an account? <Link to={"/admin/login"}>Login</Link>
              </p>
              <p className="text-center mb-0">
                Designed by <Link>{Env.REACT_APP_DEVLOPER_NAME}</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}