import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContentHeader from '../../components/ContentHeader';


export default function AddMember() {
  const navigate = useNavigate();
  const location = useLocation();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [loaded, setLoaded] = useState(false); //  button  loading  efect deta  hold state
  const currentPath = location?.pathname || "";
  const [states, setStates] = useState([]);
  const [selectedStatesId, setSelectedStatesId] = useState("");


  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(`${apiUrl}state/get`, {
          headers: {
            authorization: `${localStorage.getItem('token')}`,
          },
        });

        setStates(response.data); // Store API data in state
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);




  const handleSubmit = (e) => {
    setLoaded(true);
    e.preventDefault();

    let data = JSON.stringify({
      "name": name,
      "code": designation,
      "stateId": selectedStatesId,
    });

    console.log(data);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${apiUrl}city/add`,
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
        toast.success("City added successfully");

        if (currentPath === "/admin/cityadd") {
          setTimeout(() => {
            if (window.location.pathname === "/admin/cityadd") {
              navigate('/admin/citylist');
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
      <ContentHeader title="Add New City" breadcrumbs={[{ label: 'Dashboard', to: '/admin/dashboard' }, { label: 'City List', to: '/admin/citylist' }, { label: 'Add City' }]} />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-primary card-outline">
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
                    <div class="form-group">
                      <label for="exampleSelectRounded0">Select State:</label>
                      <select class="custom-select rounded-0" id="exampleSelectRounded0"
                        onChange={(e) => setSelectedStatesId(e.target.value)}
                        value={selectedStatesId}
                      >
                        <option value="">Select a state</option>
                        {states.map((country) => (
                          <option key={country._id} value={country._id}>
                            {country.name}
                          </option>
                        ))}
                      </select>
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
