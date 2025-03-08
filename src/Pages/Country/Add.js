import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function AddMember() {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [designation, setDesignation] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [isVisible] = useState(true); // Default to true
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const [loaded, setLoaded] = useState(false); //  button  loading  efect deta  hold state
  const [toDate, setToDate] = useState('');
  const location = useLocation();
  const currentPath = location?.pathname || "";

  // this is for page security checking
 useEffect(() => {
  const role = localStorage.getItem('role');
  if (role !== 'admin') {  // Simplified condition
    navigate("/");
  }
}, [navigate]);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Generate image preview
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Set the preview URL
      // Update label to show the selected file name
      const fileName = file.name;
      e.target.nextElementSibling.innerText = fileName; // Update the label to show the file name
    } else {
      setImagePreview(null); // Clear the preview if no image selected
      e.target.nextElementSibling.innerText = 'Choose file'; // Reset label text
    }
  };

  const handleSubmit = (e) => {
    setLoaded(true);
    e.preventDefault();
  
    let data = JSON.stringify({
      "name": name,
      "code": designation,
    });
  
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${apiUrl}country/add`,
      headers: {
        'Authorization': `${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      data: data,
    };
  
    axios
      .request(config)
      .then((response) => {
        setLoaded(false);
        setName('');
        setDesignation('');
        
        
  
        toast.success("Cuntry added successfully");
  
        if (window.location.pathname === "/addMember") {
          setTimeout(() => {
            navigate('/listMember');
          }, 3000);
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Something went wrong!");
        setLoaded(false);
      });
  };
  

  return (
    <Layout menu4="menu-open" ac4="active">
      <section className="content-header pb-0">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">
              <h5>Add New Members</h5>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to={'/dashboard'}>Dashboard</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to={'/panchayatdashboard'}>Panchayat</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to={'/listMember'}>Members List</Link>
                </li>
                <li className="breadcrumb-item">Add Member</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="card card-default">
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
                      <label htmlFor="designation">Code</label>
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