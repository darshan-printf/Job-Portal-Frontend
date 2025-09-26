import React, { useState } from 'react';
import Layout from '../../../components/Layout';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContentHeader from '../../../components/ContentHeader';


export default function Add() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem("token");

    const [form, setForm] = useState({
        name: '',
        description: '',
        designation: '',
        image: null,
    });
    const [loaded, setLoaded] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoaded(true);
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("description", form.description);
        formData.append("designation", form.designation);
        formData.append("image", form.image);

        try {
            await axios.post(`${apiUrl}team/add`, formData, {
                headers: {
                    "Authorization": token,
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success("Team member added successfully");
        } catch (error) {
            toast.error(error.response?.data?.message);
        } finally {
            setLoaded(false);
        }
    };

    return (
        <Layout ac3="active">
            <ContentHeader title="Add New Team Member" breadcrumbs={[{ label: 'Dashboard', to: '/admin/dashboard' }, { label: 'Team List', to: '/admin/team/list' }, { label: 'Add Team Member' }]} />
            <section className="content">
                <div className="container-fluid">
                    <div className="card card-primary card-outline">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="name">Name <span className="text-danger">*</span></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                placeholder="Enter Name"
                                                value={form.name}
                                                onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="designation">Designation <span className="text-danger">*</span></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="designation"
                                                placeholder="Enter Designation"
                                                value={form.designation}
                                                onChange={(e) => setForm(prev => ({ ...prev, designation: e.target.value }))}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="description">Description <span className="text-danger">*</span></label>
                                            <textarea
                                                className="form-control"
                                                id="description"
                                                placeholder="Enter Description"
                                                value={form.description}
                                                onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                                                required
                                                rows="4"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="image">Profile Image</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="image"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    if (file) {
                                                        setPreviewImage(URL.createObjectURL(file));
                                                        setForm(prev => ({ ...prev, image: file }));
                                                    }
                                                }}
                                            />
                                            {previewImage && (
                                                <div className="mt-2">
                                                    <img src={previewImage} alt="Profile Preview" height="100" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <div className="float-right">
                                        <button type="button" className="btn btn-primary mx-2" onClick={() => window.history.back()}>
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn btn-primary" disabled={loaded}>
                                            {loaded ? (<>Submitting...</>) : (<>Submit</>)}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer style={{ width: "auto" }} />
        </Layout>
    );
}