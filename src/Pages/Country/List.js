import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { Link, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import ContentHeader from '../../components/ContentHeader';



export default function ListMember() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false); //  button  loading  efect deta  hold state

  

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

      setRecords(data);
    } catch (error) {
      setLoaded(false);
      toast.error(error.response.data.message);

    }
  };

  // Function to handle deletion of a record
  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');

    // Show confirmation dialog
    const result = await Swal.fire({
      title: `<i class="fas fa-trash-alt text-danger mr-2"></i>Are you sure you want to delete this record? `,
      showCancelButton: true,
      confirmButtonColor: '#28a745', // Bootstrap success green
      cancelButtonColor: '#dc3545',  // Bootstrap danger red
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    });


    if (!result.isConfirmed) return;

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
      width: '150px',
    },
    {
      name: 'Actions',
      width: '110px',
      center: 'true',
      cell: (row) => (
        <div>
          <button type="button" className="btn btn-primary btn-xs mr-2" onClick={() => navigate('/countryedit', { state: { id: row._id } })}>
            <i className="fas fa-pen"></i>
          </button>

          <button type="button" className="btn btn-danger btn-xs" onClick={() => handleDelete(row._id)}>
            <i className="fas fa-trash"></i>
          </button>
        </div>
      ),
    },
  ];

  // Filter records based on the search query for name and designation
  const filteredRecords = records.filter(
    (record) =>
      record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout ac2="active">
     <ContentHeader title="Country List" breadcrumbs={[{ label: 'Dashboard', to: '/dashboard'},{label: 'Country List'}]} />
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card card-primary card-outline">
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
                <div className="card-body  text-center" disabled={loaded}>
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
                        highlightOnHover
                        striped
                        customStyles={{ headCells: { style: { justifyContent: 'center', }, }, }}
                        pointerOnHover
                        responsive
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer position="top-center" style={{ width: "auto" }} />
    </Layout>
  );
}