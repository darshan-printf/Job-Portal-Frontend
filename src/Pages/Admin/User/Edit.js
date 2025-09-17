import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContentHeader from '../../../components/ContentHeader';
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Edit() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location?.pathname || "";
  const apiUrl = process.env.REACT_APP_API_URL;
  const userId = location.state?.id;
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    instituteName: '',
    profileImage: '',
    companyId: '',
  });

  const [companies, setCompanies] = useState([]);
  const [loaded, setLoaded] = useState(false);
  
  const [previewProfile, setPreviewProfile] = useState(null);

  useEffect(() => {
    fetchCompanies();
    
    if (userId) {
      fetchUserData();
    }
    // eslint-disable-next-line
  }, [userId, apiUrl]);

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

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${apiUrl}user/get/${userId}`, {
        headers: {
          Authorization: `${token}`,
          "Cache-Control": "no-cache",
        },
      });

      const user = response.data || {};

      setForm({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        userName: user.username || '',
        email: user.email || '',
        instituteName: user.instituteName || '',
        profileImage: user.profileImage || '',
        companyId: user.companyId || '',
      });
      
      if (user.profileImage) {
        setPreviewProfile(user.profileImage);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error("Failed to fetch user details.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoaded(true);

    const formData = new FormData();
    formData.append('id', userId);
    formData.append('firstName', form.firstName);
    formData.append('lastName', form.lastName);
    formData.append('username', form.userName);
    formData.append('email', form.email);
    formData.append('password', form.password || '');
    formData.append('instituteName', form.instituteName);
    formData.append('companyId', form.companyId);

    if (form.profileImage && typeof form.profileImage !== 'string') {
      formData.append('profileImage', form.profileImage);
    }

    try {
      await axios.put(`${apiUrl}user/update`, formData, {
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success("User updated successfully!");
      if (currentPath === "/admin/useredit") {
        setTimeout(() => {
          if (window.location.pathname === "/admin/useredit") {
            navigate('/admin/userlist');
          }
        }, 3000);
      }

    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoaded(false);
    }
  };

  return (
    <Layout ac3="active">
      <ContentHeader
        title="Edit User"
        breadcrumbs={[
          { label: 'Dashboard', to: '/admin/dashboard' },
          { label: 'User List', to: '/admin/userlist' },
          { label: 'Edit User' },
        ]}
      />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-primary card-outline">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* First Name */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label> <span className="text-danger">*</span>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder="Enter First Name"
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {/* Last Name */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label> <span className="text-danger">*</span>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        placeholder="Enter Last Name"
                        value={form.lastName}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {/* Username */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="userName">Username</label> <span className="text-danger">*</span>
                      <input
                        type="text"
                        className="form-control"
                        id="userName"
                        placeholder="Enter Username"
                        value={form.userName}
                        onChange={(e) => setForm({ ...form, userName: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="email">Email</label> <span className="text-danger">*</span>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter Email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  {/* Institute Name */}
                  <div className="col-md-12 col-12">
                    <div className="form-group">
                      <label htmlFor="instituteName">Institute Name</label> <span className="text-danger">*</span>
                      <input
                        type="text"
                        className="form-control"
                        id="instituteName"
                        placeholder="Enter Institute Name"
                        value={form.instituteName}
                        onChange={(e) => setForm({ ...form, instituteName: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {/* Company Dropdown */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="companyId">Company</label> <span className="text-danger">*</span>
                      <select
                        className="form-control"
                        id="companyId"
                        value={form.companyId}
                        onChange={(e) => setForm({ ...form, companyId: e.target.value })}
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

                  {/* Profile Image */}
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
                            setForm({ ...form, profileImage: file });
                          }
                        }}
                      />
                      {previewProfile && (
                        <div className="mt-2">
                          <img 
                            src={previewProfile} 
                            alt="Profile Preview" 
                            style={{ width: '100px', borderRadius: '5px' }} 
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="card-footer">
                  <div className="float-right">
                    <button type="button" className="btn btn-secondary mx-2"  onClick={() => window.history.back()}>
                      Cancel
                    </button>
                    <button  type="submit" className="btn btn-primary" disabled={loaded}>
                      {loaded ? (<> Submiting... </>) : ('Submit')}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer position="top-center" style={{ width: 'auto' }} />
    </Layout>
  );
}