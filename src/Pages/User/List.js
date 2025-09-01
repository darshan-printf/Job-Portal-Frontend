import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContentHeader from '../../components/ContentHeader';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function List() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [searchQuery, setSearchQuery] = useState('');
    const [records, setRecords] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchRecords();
        // eslint-disable-next-line
    }, []);

    const fetchRecords = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${apiUrl}user/get`, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            setLoading(false);
            const data = response.data || [];
            setRecords(data);
        } catch (error) {
            setLoading(false);
            toast.error(error.response?.data?.message || 'Error fetching records');
        }
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        const confirmed = window.confirm(
            'Are you sure you want to delete this record?'
        );
        if (!confirmed) return;

        try {
            await axios.delete(`${apiUrl}user/delete/${id}`, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            fetchRecords();
            toast.success('User deleted successfully');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error deleting user');
        }
    };

    const columns = [
        {
            name: 'No',
            selector: (row, index) =>
                row.isSkeleton ? <Skeleton width={20} /> : index + 1,
            width: '60px',
            center: true,
        },
        {
            name: 'Profile',
            width: '100px',
            center: true,
            cell: (row) =>
                row.isSkeleton ? (
                    <Skeleton circle height={45} width={45} />
                ) : (
                    <img
                        src={row.profileImage}
                        alt="Profile"
                        style={{
                            width: 45,
                            height: 45,
                            objectFit: 'cover',
                            borderRadius: '50%',
                            border: '1px solid #ccc',
                        }}
                    />
                ),
        },
        {
            name: 'Name',
            sortable: true,
            cell: (row) =>
                row.isSkeleton ? (
                    <Skeleton width={120} />
                ) : (
                    `${row.firstName} ${row.lastName}`
                ),
        },
        {
            name: 'Username',
            sortable: true,
            cell: (row) =>
                row.isSkeleton ? <Skeleton width={80} /> : row.username,
        },
        {
            name: 'Institute',
            sortable: true,
            cell: (row) =>
                row.isSkeleton ? <Skeleton width={100} /> : row.instituteName,
        },
        {
            name: 'Actions',
            width: '110px',
            center: true,
            cell: (row) =>
                row.isSkeleton ? (
                    <Skeleton width={60} height={30} />
                ) : (
                    <div>
                        <button
                            type="button"
                            className={`btn ${
                                row.isActive ? 'btn-primary' : 'btn-danger'
                            } btn-xs mr-2`}
                            onClick={() =>
                                navigate('/admin/useredit', { state: { id: row._id } })
                            }
                        >
                            <i className="fas fa-pen"></i>
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger btn-xs"
                            onClick={() => handleDelete(row._id)}
                        >
                            <i className="fas fa-trash"></i>
                        </button>
                    </div>
                ),
        },
    ];

    const filteredRecords = records.filter(
        (record) =>
            `${record.firstName} ${record.lastName}`
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            record.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (record.instituteName || '')
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
    );

    // Skeleton rows
    const skeletonData = Array(8)
        .fill({})
        .map((_, index) => ({
            _id: index,
            isSkeleton: true,
        }));

    return (
        <Layout ac5="active">
            <ContentHeader
                title="State List"
                breadcrumbs={[
                    { label: 'Dashboard', to: '/admin/dashboard' },
                    { label: 'State List' },
                ]}
            />
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
                                                onChange={(e) =>
                                                    setSearchQuery(e.target.value)
                                                }
                                                placeholder="Search"
                                                title="Search within table"
                                            />
                                        </div>
                                        <div className="bd-highlight">
                                            <button
                                                onClick={() =>
                                                    navigate('/admin/useradd')
                                                }
                                                type="button"
                                                className="btn btn-block btn-primary"
                                            >
                                                <i className="fas fa-plus"></i> Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body text-center p-2">
                                    {loading ? (
                                        <DataTable
                                            columns={columns}
                                            data={skeletonData}
                                            pagination={false}
                                            className="custom-table"
                                            noHeader
                                            highlightOnHover
                                            striped
                                            customStyles={{
                                                headCells: {
                                                    style: {
                                                        justifyContent: 'center',
                                                    },
                                                },
                                            }}
                                        />
                                    ) : (
                                        <DataTable
                                            columns={columns}
                                            data={filteredRecords}
                                            pagination
                                            className="custom-table"
                                            noDataComponent="No data available"
                                            highlightOnHover
                                            striped
                                            customStyles={{
                                                headCells: {
                                                    style: {
                                                        justifyContent: 'center',
                                                    },
                                                },
                                            }}
                                            pointerOnHover
                                            responsive
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer position="top-center" style={{ width: 'auto' }} />
        </Layout>
    );
}
