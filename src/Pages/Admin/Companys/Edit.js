import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout";
import ContentHeader from "../../../components/ContentHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Edit() {
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
  const [fetching, setFetching] = useState(true);
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  // Fetch company data on component mount
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get(`${apiUrl}company/get/${id}`, {
          headers: {
            'Authorization': `${token}`,
            "Cache-Control": "no-cache",
          }
        });
        
        if (response.data.success) {
          const company = response.data.data;
          setFormData({
            name: company.name || "",
            address: company.address || "",
            email: company.email || "",
            phone: company.phone || "",
            website: company.website || "",
            GSTNumber: company.GSTNumber || "",
            PANNumber: company.PANNumber || "",
            CINNumber: company.CINNumber || "",
            type: company.type || "",
            isActive: company.isActive
          });
          
          if (company.logo) {
            setLogoPreview(company.logo);
          }
        }
      } catch (error) {
        toast.error("Failed to fetch company data");
        console.error(error);
      } finally {
        setFetching(false);
      }
    };

    if (id) {
      fetchCompanyData();
    } else {
      setFetching(false);
    }
  }, [id, apiUrl, token]);

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
      data.append('id', id); // Add company ID to the form data
      
      Object.keys(formData).forEach(key => { 
        data.append(key, formData[key]); 
      });
      
      if (logo) { 
        data.append('logo', logo);
      }
      
      const response = await axios.put(`${apiUrl}company/update`, data, {
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <Layout ac2="active">
        <ContentHeader
          title="Update Company"
          breadcrumbs={[
            { label: "Dashboard", to: "/admin/dashboard" },
            { label: "Manage Company", to: "/admin/companys/list" },
            { label: "Update Company" },
          ]}
        />
        <section className="content">
          <div className="container-fluid">
            <div className="card card-primary card-outline">
              <div className="card-body text-center">
                <p>Loading company data...</p>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout ac2="active">
      <ContentHeader
        title="Update Company"
        breadcrumbs={[
          { label: "Dashboard", to: "/admin/dashboard" },
          { label: "Manage Company", to: "/admin/companys/list" },
          { label: "Update Company" },
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
                      <label htmlFor="logo">Logo</label>
                      <input
                        type="file"
                        className="form-control"
                        id="logo"
                        placeholder="Upload logo"
                        onChange={handleFileChange}
                        accept="image/*"
                      />
                      <small className="form-text text-muted">
                        {logoPreview ? "Select a new file to replace the current logo" : "Upload a logo image"}
                      </small>
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
                      {loading ? "Updating..." : "Update "}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer position="top-center" style={{ width: "auto" }} />
    </Layout>
  );
}