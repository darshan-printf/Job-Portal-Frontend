import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Layout from "../../../components/Layout";
import ContentHeader from "../../../components/ContentHeader";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

export default function AddCompanys() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    website: "",
    GSTNumber: "",
    PANNumber: "",
    CINNumber: "",
    type: "",
    isActive: true
  });
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setLogo(null);
    setLogoPreview(null);
    document.getElementById("logo").value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => { data.append(key, formData[key]); });
      if (logo) { data.append('logo', logo);}
      const response = await axios.post(`${apiUrl}company/add`, data, {
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success(response.data.message);
      setFormData({
        name: "",
        address: "",
        email: "",
        phone: "",
        website: "",
        GSTNumber: "",
        PANNumber: "",
        CINNumber: "",
        type: "",
        isActive: true
      });
      setLogo(null);
      setLogoPreview(null);
      document.getElementById("logo").value = "";
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout ac2="active">
      <ContentHeader
        title="Add New Company "
        breadcrumbs={[
          { label: "Dashboard", to: "/admin/dashboard" },
          { label: "Manage Company", to: "/admin/companys/list" },
          { label: "Add New Company " },
        ]}
      />
      <section className="content">
        <div className="container-fluid">
          <div className="card  card-primary card-outline">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-12 col-12">
                    <div className="form-group">
                      <label htmlFor="name">Name</label>{" "}
                      <span className="text-danger">*</span>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter Name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-12  ">
                    <div className="form-group">
                      <label htmlFor="email">Email</label>{" "}
                      <span className="text-danger">*</span>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-12">
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>{" "}
                      <span className="text-danger">*</span>
                      <input
                        type="number"
                        className="form-control"
                        id="phone"
                        placeholder="Enter Phone Number"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-12">
                    <div className="form-group">
                      <label htmlFor="website">Website</label>{" "}
                      <span className="text-danger">*</span>
                      <input
                        type="text"
                        className="form-control"
                        id="website"
                        placeholder="Enter website"
                        required
                        value={formData.website}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-12">
                    <div className="form-group">
                      <label htmlFor="GSTNumber"> GST Number </label>{" "}
                      <span className="text-danger">*</span>
                      <input
                        type="text"
                        className="form-control"
                        id="GSTNumber"
                        placeholder="Enter GST Number"
                        required
                        value={formData.GSTNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-12">
                    <div className="form-group">
                      <label htmlFor="PANNumber"> PAN Number</label>{" "}
                      <span className="text-danger">*</span>
                      <input
                        type="text"
                        className="form-control"
                        id="PANNumber"
                        placeholder="Enter PAN Number"
                        required
                        value={formData.PANNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-12">
                    <div className="form-group">
                      <label htmlFor="CINNumber"> CIN Number</label>{" "}
                      <span className="text-danger">*</span>
                      <input
                        type="text"
                        className="form-control"
                        id="CINNumber"
                        placeholder="Enter CIN Number"
                        required
                        value={formData.CINNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="address">Address</label>{" "}
                      <span className="text-danger">*</span>
                      <textarea
                        className="form-control"
                        id="address"
                        rows="5"
                        placeholder="Enter Address"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="form-group">
                      <label htmlFor="logo">Logo</label>{" "}
                      <span className="text-danger">*</span>
                      <input
                        type="file"
                        className="form-control"
                        id="logo"
                        placeholder="Upload logo"
                        required={!logoPreview}
                        onChange={handleFileChange}
                        accept="image/*"
                      />
                    </div>
                    {logoPreview && (
                      <div className="logo-preview-container mt-3">
                        <p>Logo Preview:</p>
                        <div className="position-relative" style={{width: "150px", height: "150px"}}>
                          <img 
                            src={logoPreview} 
                            alt="Logo preview" 
                            className="img-thumbnail"
                            style={{width: "100%", height: "100%", objectFit: "contain"}}
                          />
                          <button 
                            type="button" 
                            className="btn btn-sm btn-danger position-absolute"
                            style={{top: "-10px", right: "-10px"}}
                            onClick={removeLogo}
                          >
                            &times;
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="col-md-6 col-12 ">
                    <div className="form-group">
                      <label htmlFor="type">Type of Company</label>{" "}
                      <select
                        className="form-control"
                        id="type"
                        value={formData.type}
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
                  </div>
                </div>
                <div className="card-footer">
                  <div className="float-right">
                    <button
                      type="button"
                      className="btn btn-secondary mx-2"
                      onClick={() => window.history.back()}
                      disabled={loading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer  style={{ width: "auto" }} />
    </Layout>
  );
}