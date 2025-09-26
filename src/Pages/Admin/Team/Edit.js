import React, { useState, useEffect } from 'react';
import Layout from '../../../components/Layout';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContentHeader from '../../../components/ContentHeader';
import { useLocation } from 'react-router-dom';


export default function Edit({ match }) {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem("token");
    const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
    
    const [form, setForm] = useState({
        name: '',
        description: '',
        designation: '',
        image: null,
    });
    const [loaded, setLoaded] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [existingImage, setExistingImage] = useState(null);

    // Fetch team member data on component mount
    useEffect(() => {
        const fetchTeamMember = async () => {
            setLoaded(true);
            try {
                const response = await axios.get(`${apiUrl}team/get/${id}`, {
                    headers: {
                        "Authorization": token,
                        "Content-Type": "multipart/form-data",
                    },
                });
                const teamMember = response.data;
                setForm({
                    name: teamMember.name,
                    description: teamMember.description,
                    designation: teamMember.designation,
                    image: null, 
                });
                if (teamMember.image) { setExistingImage(teamMember.image); }
            } catch (error) {
                toast.error(error.response?.data?.message);
                console.error(error);
            } finally {
                setLoaded(false);
            }
        };

        fetchTeamMember();
    }, [apiUrl, token, id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const formData = new FormData();
        formData.append("id", id);
        formData.append("name", form.name);
        formData.append("description", form.description);
        formData.append("designation", form.designation);
        if (form.image) {
            formData.append("image", form.image);
        }
        try {
            await axios.put(`${apiUrl}team/update`, formData, {
                headers: {
                    "Authorization": token,
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success("Team member updated successfully");
        } catch (error) {
            toast.error(error.response?.data?.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
            setForm(prev => ({ ...prev, image: file }));
            setExistingImage(null);
        }
    };



    return (
        <Layout ac3="active">
            <ContentHeader 
                title="Edit Team Member" 
                breadcrumbs={[
                    { label: 'Dashboard', to: '/admin/dashboard' }, 
                    { label: 'Team List', to: '/admin/team/list' }, 
                    { label: 'Edit Team Member' }
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
                                                onChange={handleImageChange}
                                            />
                                            
                                        </div>
                                        {(previewImage || existingImage) && (
                                                <div className="mt-2">
                                                    <img 
                                                        src={previewImage || existingImage} 
                                                        alt="Profile Preview" 
                                                        style={{height: '100px'}}
                                                        className="img-thumbnail"
                                                    />
                                                </div>
                                            )}
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <div className="float-right">
                                        <button 
                                            type="button" 
                                            className="btn btn-default mx-2" 
                                            onClick={() => window.history.back()}
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            type="submit" 
                                            className="btn btn-primary" 
                                            disabled={submitting}
                                        >
                                            {submitting ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                                                    Updating...
                                                </>
                                            ) : (
                                                "Update Team Member"
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer  autoClose={3000} />
        </Layout>
    );
}