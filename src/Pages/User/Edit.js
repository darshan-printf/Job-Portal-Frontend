import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContentHeader from '../../components/ContentHeader';

export default function Add() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location?.pathname || "";
  const apiUrl = process.env.REACT_APP_API_URL;
  const userId = location.state?.id;

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    instituteName: '',
    profileImage: '',
    logo: '',
  });

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;

      try {
        const response = await axios.get(`${apiUrl}user/get/${userId}`, {
          headers: {
            Authorization: `${localStorage.getItem('token')}`,
          },
        });

        const user = response.data || {};

        setForm({
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          username: user.username || '',
          email: user.email || '',
          password: '', // Do not fetch password
          instituteName: user.instituteName || '',
          profileImage: user.profileImage || '',
          logo: user.logo || '',
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error("Failed to fetch user details.");
      }
    };

    fetchData();
  }, [userId, apiUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoaded(true);

    const formData = new FormData();
    formData.append('id', userId);
    formData.append('firstName', form.firstName);
    formData.append('lastName', form.lastName);
    formData.append('username', form.username);
    formData.append('email', form.email);
    formData.append('password', form.password || '');
    formData.append('instituteName', form.instituteName);

    if (form.profileImage && typeof form.profileImage !== 'string') {
      formData.append('profileImage', form.profileImage);
    }
    if (form.logo && typeof form.logo !== 'string') {
      formData.append('logo', form.logo);
    }

    try {
      await axios.put(`${apiUrl}user/update`, formData, {
        headers: {
          Authorization: localStorage.getItem('token'),
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success("User updated successfully!");
      if (currentPath === "/useredit") {
        setTimeout(() => {
          if (window.location.pathname === "/useredit") {
            navigate('/userlist');
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
    <Layout ac5="active">
      <ContentHeader
        title="Add / Edit User"
        breadcrumbs={[
          { label: 'Dashboard', to: '/dashboard' },
          { label: 'User List', to: '/userlist' },
          { label: 'Add / Edit User' },
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
                      <label htmlFor="username">Username</label> <span className="text-danger">*</span>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Enter Username"
                        value={form.username}
                        onChange={(e) => setForm({ ...form, username: e.target.value })}
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

                  {/* Password */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="password">Password</label> <span className="text-danger">*</span>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter Password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Institute Name */}
                  <div className="col-md-6">
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
                          setForm({ ...form, profileImage: file });
                        }}
                      />
                      {form.profileImage && (
                        <img
                          src={
                            typeof form.profileImage === 'string'
                              ? form.profileImage
                              : URL.createObjectURL(form.profileImage)
                          }
                          alt="Profile"
                          style={{ width: '100px', marginTop: '10px', borderRadius: '5px' }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Logo */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="logo">Logo</label>
                      <input
                        type="file"
                        className="form-control"
                        id="logo"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          setForm({ ...form, logo: file });
                        }}
                      />
                      {form.logo && (
                        <img
                          src={
                            typeof form.logo === 'string'
                              ? form.logo
                              : URL.createObjectURL(form.logo)
                          }
                          alt="Logo"
                          style={{ width: '100px', marginTop: '10px', borderRadius: '5px' }}
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer */}
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
                      {loaded ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>{' '}
                          Loading...
                        </>
                      ) : (
                        'Submit'
                      )}
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
