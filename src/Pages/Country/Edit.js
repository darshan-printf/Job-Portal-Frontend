import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContentHeader from '../../components/ContentHeader';


export default function Edit() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};
  const apiUrl = process.env.REACT_APP_API_URL;
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [loaded, setLoaded] = useState(false); //  button  loading  efect deta  hold stat
  const currentPath = location?.pathname || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}country/get/${id}`, {
          headers: {
            'Authorization': ` ${localStorage.getItem('token')}`,
          },
        });
        const memberData = response.data;
        setName(memberData.name);
        setDesignation(memberData.code);

      } catch (error) {
        console.error('Error fetching member data:', error);
      }
    };

    fetchData();
  }, [id]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoaded(true);

    const payload = {
      id,
      name: name,
      code: designation,
    };

    try {
      await axios.put(`${apiUrl}country/update`, payload, {
        headers: {
          'Authorization': `${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      setLoaded(false);
      toast.success('Country updated successfully');

      if (currentPath === "/countryedit") {
        setTimeout(() => {
          if (window.location.pathname === "/countryedit") {
            navigate('/countrylist');
          }
        }, 3000);
      }
    } catch (error) {
      setLoaded(false);
      console.error('Error updating member:', error);
      toast.error(error.response?.data?.message || 'Update failed');
    }
  };


  return (
    <Layout ac2="active">
      <ContentHeader title="Update Country" breadcrumbs={[{ label: 'Dashboard', to: '/dashboard' }, { label: 'Country List', to: '/countrylist' }, { label: 'Update Country' }]} />
      <section className="content">
        <div className="container-fluid">
          <div className="card  card-primary card-outline">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="memberName">Name</label> <span className="text-danger">*</span>
                      <input
                        type="text"
                        className="form-control"
                        id="memberName"
                        placeholder="Enter Member Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="designation">Designation</label>
                      <input
                        type="text"
                        className="form-control"
                        id="designation"
                        placeholder="Enter Designation"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
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