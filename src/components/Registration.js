import React, {useState} from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

export default function Registration() {
  const [formdata, setFormdata] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    website: "",
    GSTNumber: "",
    PANNumber: "",
    CINNumber: "",
    type: "",
  });
  const [loaded, setLoaded] = useState(false);
  const Env = process.env;
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoaded(true);
    try {
      const data = new FormData();
      data.append("name", formdata.name);
      data.append("address", formdata.address);
      data.append("email", formdata.email);
      data.append("phone", formdata.phone);
      data.append("website", formdata.website);
      data.append("GSTNumber", formdata.GSTNumber);
      data.append("PANNumber", formdata.PANNumber);
      data.append("CINNumber", formdata.CINNumber);
      data.append("type", formdata.type);
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${apiUrl}/company/register`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: data,
      };
      const response = await axios.request(config);
      toast.success(response.data.message);
      setFormdata({
        name: "",
        address: "",
        email: "",
        phone: "",
        website: "",
        GSTNumber: "",
        PANNumber: "",
        CINNumber: "",
        type: "",
      });
    } catch (error) {
      toast.error( error.response?.data?.message  );
    } finally {
      setLoaded(false);
    }
  };
  return (
      <div className="star-field">
        <div className="login-page-bg bg" id="page-bg">
          <div className="card card-outline card-primary col-5 p-2">
            <div className="text-center">
              <img
                className="profile-user-img-com img-fluid border border-0"
                src={Env.REACT_APP_PROJECT_ICON}
                alt="logo"
              />
              <h3>{Env.REACT_APP_PROJECT_NAME}</h3>
            </div>
            <div className="card-body  p-0 px-2">
              <form onSubmit={handleSubmit}>
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
                      maxLength="10"
                      pattern="[0-9]{10}"
                      title="Phone number must be 10 digits"
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
                      required
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
                      required
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
                      required
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
                      required
                    />
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <select
                      className="form-control"
                      name="type"
                      value={formdata.type}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="PVT">PVT</option>
                      <option value="LTD">LTD</option>
                      <option value="ORG">ORG</option>
                      <option value="ETC">ETC</option>
                    </select>
                  </div>

                  <div className="col-md-12 col-12 mb-3">
                    <textarea
                      className="form-control"
                      name="address"
                      placeholder="Enter Address"
                      value={formdata.address}
                      onChange={handleInputChange}
                      required
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
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
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
      <ToastContainer style={{width:"auto"}} />
      </div>
  );
}
