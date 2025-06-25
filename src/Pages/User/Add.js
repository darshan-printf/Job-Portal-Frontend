import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContentHeader from '../../components/ContentHeader';


export default function Add() {
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        instituteName: '',
        profileImage: '',
        logo: '',
    })
    const [loaded, setLoaded] = useState(false); //  button  loading  efect deta  hold state


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
        formData.append("profileImage", form.profileImage); // file upload
        formData.append("logo", form.logo); // file upload

        try {
            await axios.post(`${apiUrl}auth/useRegister`, formData, {
                headers: {
                    "Authorization": localStorage.getItem("token"),
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.success("User registered successfully");
            navigate('/userlist');
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong!");
        } finally {
            setLoaded(false);
        }
    };


    return (
        <Layout ac5="active">
            <ContentHeader title="Add New User" breadcrumbs={[{ label: 'Dashboard', to: '/dashboard' }, { label: 'User List', to: '/userlist' }, { label: 'Add User' }]} />
            <section className="content">
                <div className="container-fluid">
                    <div className="card card-primary card-outline">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="firstName">First Name</label> <span className="text-danger">*</span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="firstName"
                                                placeholder="Enter First Name"
                                                value={form.firstName}
                                                onChange={(e) => setForm(prev => ({ ...prev, firstName: e.target.value }))}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="lastName">Last Name</label> <span className="text-danger">*</span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="lastName"
                                                placeholder="Enter Last Name"
                                                value={form.lastName}
                                                onChange={(e) => setForm(prev => ({ ...prev, lastName: e.target.value }))}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="userName">User Name</label> <span className="text-danger">*</span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="userName"
                                                placeholder="Enter User Name"
                                                value={form.userName}
                                                onChange={(e) => setForm(prev => ({ ...prev, userName: e.target.value }))}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label> <span className="text-danger">*</span>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                placeholder="Enter Email"
                                                value={form.email}
                                                onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label> <span className="text-danger">*</span>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="password"
                                                placeholder="Enter Password"
                                                value={form.password}
                                                onChange={(e) => setForm(prev => ({ ...prev, password: e.target.value }))}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="instituteName">Institute Name</label> <span className="text-danger">*</span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="instituteName"
                                                placeholder="Enter Institute Name"
                                                value={form.instituteName}
                                                onChange={(e) => setForm(prev => ({ ...prev, instituteName: e.target.value }))}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="profileImage">Profile Image</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="profileImage"
                                                onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    setForm(prev => ({ ...prev, profileImage: file }));
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="logo">Logo</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="logo"
                                                onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    setForm(prev => ({ ...prev, logo: file }));
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="card-footer">
                                    <div className="float-right">
                                        <button type="button" className="btn btn-primary mx-2" onClick={() => window.history.back()}>
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            disabled={loaded}
                                        >
                                            {loaded ? (
                                                <> <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...</>
                                            ) : (
                                                <>
                                                    Submit
                                                </>
                                            )}
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