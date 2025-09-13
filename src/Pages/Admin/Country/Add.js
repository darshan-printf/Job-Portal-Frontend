import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContentHeader from '../../../components/ContentHeader';

export default function AddMember() {
  const navigate = useNavigate();
  const location = useLocation();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [flag, setFlag] = useState(null);
  const [flagPreview, setFlagPreview] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const currentPath = location?.pathname || "";

  // Handle flag file selection
  const handleFlagChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFlag(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFlagPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Clear flag selection
  const clearFlag = () => {
    setFlag(null);
    setFlagPreview(null);
  };

  const handleSubmit = (e) => {
    setLoaded(true);
    e.preventDefault();

    // Create form data for file upload
    const formData = new FormData();
    formData.append('name', name);
    formData.append('code', code);
    if (flag) {
      formData.append('flag', flag);
    }

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${apiUrl}country/add`,
      headers: {
        'Authorization': `${localStorage.getItem('token')}`,
      },
      data: formData,
    };

    axios
      .request(config)
      .then((response) => {
        setLoaded(false);
        setName('');
        setCode('');
        setFlag(null);
        setFlagPreview(null);
        toast.success("Country added successfully");

        if (currentPath === "/admin/countryadd") {
          setTimeout(() => {
            if (window.location.pathname === "/admin/countryadd") {
              navigate('/admin/location');
            }
          }, 3000);
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Something went wrong!");
        setLoaded(false);
      });
  };

  return (
    <Layout ac4="active">
      <ContentHeader title="Add New Country" breadcrumbs={[{ label: 'Dashboard', to: '/admin/dashboard' }, { label: 'Country List', to: '/admin/countrylist' }, { label: 'Add Country' }]} />
      <section className="content">
        <div className="container-fluid">
          <div className="card  card-primary card-outline">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="countryName">Country Name</label> <span className="text-danger">*</span>
                      <input
                        type="text"
                        className="form-control"
                        id="countryName"
                        placeholder="Enter Country Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="countryCode">Country Code</label>
                      <input
                        type="text"
                        className="form-control"
                        id="countryCode"
                        placeholder="Enter Country Code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="row mt-3">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="countryFlag">Country Flag</label>
                      <div className="custom-file">
                        <input
                          type="file"
                          className="custom-file-input"
                          id="countryFlag"
                          accept="image/*"
                          onChange={handleFlagChange}
                        />
                        <label className="custom-file-label" htmlFor="countryFlag">
                          {flag ? flag.name : "Choose flag image"}
                        </label>
                      </div>
                      {flagPreview && (
                        <div className="mt-3">
                          <div className="flag-preview-container">
                            <img 
                              src={flagPreview} 
                              alt="Flag preview" 
                              className="flag-preview img-thumbnail"
                              style={{maxHeight: '100px'}}
                            />
                            <button 
                              type="button" 
                              className="btn btn-sm btn-danger ml-2"
                              onClick={clearFlag}
                            >
                              Remove
                            </button>
                          </div>
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