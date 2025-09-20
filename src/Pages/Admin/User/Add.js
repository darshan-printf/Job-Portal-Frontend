import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Layout from "../../../components/Layout";
import axios from "axios";
import ContentHeader from "../../../components/ContentHeader";
import "react-toastify/dist/ReactToastify.css";

export default function Add() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    instituteName: "",
    profileImage: "",
    companyId: "",
  });
  const [companies, setCompanies] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [previewProfile, setPreviewProfile] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCompanies();
    // eslint-disable-next-line
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get(`${apiUrl}company/get`, {
        headers: {
          Authorization: `${token}`,
          "Cache-Control": "no-cache",
        },
      });
      const data = response.data?.data || [];
      setCompanies(data);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoaded(true);
    const formData = new FormData();
    formData.append("firstName", form.firstName);
    formData.append("lastName", form.lastName);
    formData.append("username", form.userName);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("instituteName", form.instituteName);
    formData.append("profileImage", form.profileImage);
    formData.append("companyId", form.companyId);
    try {
      await axios.post(`${apiUrl}user/add`, formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });
      setForm({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        instituteName: "",
        profileImage: "",
        companyId: "",
      });
      setPreviewProfile(null);

      toast.success("User registered successfully");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoaded(false);
    }
  };

  return (
    <Layout ac3="active">
      <ContentHeader
        title="Add New User"
        breadcrumbs={[
          { label: "Dashboard", to: "/admin/dashboard" },
          { label: "User List", to: "/admin/userlist" },
          { label: "Add User" },
        ]}
      />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-primary card-outline">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="firstName">
                        First Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder="Enter First Name"
                        value={form.firstName}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            firstName: e.target.value,
                          }))
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="lastName">
                        Last Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        placeholder="Enter Last Name"
                        value={form.lastName}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            lastName: e.target.value,
                          }))
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="userName">
                        User Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="userName"
                        placeholder="Enter User Name"
                        value={form.userName}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            userName: e.target.value,
                          }))
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group position-relative">
                      <label htmlFor="password">
                        Password <span className="text-danger">*</span>
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        id="password"
                        placeholder="Enter Password"
                        value={form.password}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            password: e.target.value,
                          }))
                        }
                        required
                      />
                      <span
                        className="position-absolute"
                        onClick={() => setShowPassword((prev) => !prev)}
                        style={{
                          top: "38px",
                          right: "10px",
                          cursor: "pointer",
                          color: "#555",
                          zIndex: 10,
                        }}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="email">
                        Email <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter Email"
                        value={form.email}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="instituteName">
                        Institute Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="instituteName"
                        placeholder="Enter Institute Name"
                        value={form.instituteName}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            instituteName: e.target.value,
                          }))
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="companyId">
                        Company <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-control"
                        id="companyId"
                        value={form.companyId}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            companyId: e.target.value,
                          }))
                        }
                        required
                      >
                        <option value="">Select Company</option>
                        {companies.map((company) => (
                          <option key={company._id} value={company._id}>
                            {company.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="profileImage">Profile Image</label>
                      <input
                        type="file"
                        className="form-control"
                        id="profileImage"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setPreviewProfile(URL.createObjectURL(file));
                            setForm((prev) => ({
                              ...prev,
                              profileImage: file,
                            }));
                          }
                        }}
                      />
                      {previewProfile && (
                        <div className="mt-2">
                          <img
                            src={previewProfile}
                            alt="Profile Preview"
                            height="100"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <div className="float-right">
                    <button
                      type="button"
                      className="btn btn-secondary mx-2"
                      onClick={() => window.history.back()}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loaded}
                    >
                      {loaded ? <> 
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      </> : <> Submit </>}
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
