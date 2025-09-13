import React, { useState, useEffect } from 'react';
import Layout from '../../../components/Layout';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContentHeader from '../../../components/ContentHeader';

export default function Edit() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};
  const apiUrl = process.env.REACT_APP_API_URL;
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [flag, setFlag] = useState(null);
  const [flagPreview, setFlagPreview] = useState(null);
  const [existingFlag, setExistingFlag] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const currentPath = location?.pathname || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}country/get/${id}`, {
          headers: {
            'Authorization': ` ${localStorage.getItem('token')}`,
          },
        });
        const countryData = response.data.data;
        setName(countryData.name);
        setCode(countryData.code);
        setExistingFlag(countryData.flag);

      } catch (error) {
        console.error('Error fetching country data:', error);
        toast.error('Failed to load country data');
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoaded(true);

    // Create form data for file upload
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', name);
    formData.append('code', code);
    if (flag) {
      formData.append('flag', flag);
    }

    try {
      await axios.put(`${apiUrl}country/update`, formData, {
        headers: {
          'Authorization': `${localStorage.getItem('token')}`,
        },
      });

      setLoaded(false);
      toast.success('Country updated successfully');

      if (currentPath.includes("/admin/countryedit")) {
        setTimeout(() => {
          navigate('/admin/location');
        }, 2000);
      }
    } catch (error) {
      setLoaded(false);
      console.error('Error updating country:', error);
      toast.error(error.response?.data?.message || 'Update failed');
    }
  };

  return (
    <Layout ac4="active">
      <ContentHeader title="Update Country" breadcrumbs={[{ label: 'Dashboard', to: '/admin/dashboard' }, { label: 'Country List', to: '/admin/countrylist' }, { label: 'Update Country' }]} />
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
                          {flag ? flag.name : "Choose new flag image (optional)"}
                        </label>
                      </div>
                      
                      {(flagPreview || existingFlag) && (
                        <div className="mt-3">
                          <p className="mb-1">Flag Preview:</p>
                          <div className="flag-preview-container d-flex align-items-center">
                            <img 
                              src={flagPreview || existingFlag} 
                              alt="Flag preview" 
                              className="flag-preview img-thumbnail"
                              style={{maxHeight: '100px'}}
                            />
                            {flagPreview && (
                              <button 
                                type="button" 
                                className="btn btn-sm btn-danger ml-2"
                                onClick={clearFlag}
                              >
                                Remove New Flag
                              </button>
                            )}
                          </div>
                          {!flagPreview && existingFlag && (
                            <small className="form-text text-muted">
                              This is the current flag. Upload a new image to replace it.
                            </small>
                          )}
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
                        <> <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Updating...</>
                      ) : (
                        <>
                          Update Country
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