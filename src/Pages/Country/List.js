import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { Link, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ListMember() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false); //  button  loading  efect deta  hold state

 // this is for page security checking
 useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {  // Simplified condition
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    fetchRecords();
    // eslint-disable-next-line
  }, []);

  const fetchRecords = async () => {
    setLoaded(true);
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${apiUrl}country/get`, {
        headers: {
          'Authorization': `${token}`,
        },
      });

      setLoaded(false);
      const data = response.data || [];
      console.log(data ,"data")
      
      setRecords(data);
    } catch (error) {
      setLoaded(false);
      toast.error(error.response.data. message);
      
    }
  };

  // Function to handle deletion of a record
  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
  
    // Show confirmation dialog
    const confirmed = window.confirm("Are you sure you want to delete this record?");
    if (!confirmed) {
      return; // Exit if the user cancels
    }
  
    try {
      await axios.delete(`${apiUrl}country/delete/${id}`, {
        headers: {
          'Authorization': ` ${token}`,
        },
      });
      fetchRecords(); // Refresh records after deletion
      toast.success("Country deleted successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  
  const columns = [
    {
      name: 'No',
      selector: (row, index) => index + 1,
      width: '50px',
      center: 'true',
    },
    
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Code',
      selector: (row) => row.code,
      sortable: true,
    },
    
   
    
    
    
    {
      name: 'Actions',
      width: '110px',
      center: 'true',
      cell: (row) => (
        <div>
          <button type="button" className="btn btn-primary btn-sm mr-1" onClick={() => navigate('/countryedit', { state: { id: row._id } })}>
            <i className="fas fa-pen"></i>
          </button>

          <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDelete(row._id)}>
            <i className="fas fa-trash"></i>
          </button>
        </div>
      ),
    },
  ];
  
   // Filter records based on the search query for name and designation
   const filteredRecords = records.filter(
    (record) =>
      record.name.toLowerCase().includes(searchQuery.toLowerCase())||
      record.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout  ac2="active">
      <section className="content-header pb-0">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h5>Country List </h5>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to={'/dashboard'}>Dashboard</Link>
                </li>
                <li className="breadcrumb-item">Country List</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <div className="d-flex justify-content-between">
                    <div className="bd-highlight">
                    <input
                        className="form-control"
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                        placeholder="Search"
                        title="Search within table"
                      />
                    </div>
                    <div className="bd-highlight"></div>
                    <div className="bd-highlight">
                      <button
                        onClick={() => navigate('/countryadd')}
                        type="button"
                        className="btn btn-block btn-primary"
                      >
                        <i className="fas fa-plus"></i> Add
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-body text-center" disabled={loaded}>
                {loaded ? (
                    <> <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span></>
                  ) : (
                    <>
                  <DataTable
                    columns={columns}
                    data={filteredRecords}
                    pagination
                    className="custom-table"
                    noDataComponent="No data available"
                  />
                  </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer position="top-center" style={{ width: "auto" }}/>
    </Layout>
  );
}