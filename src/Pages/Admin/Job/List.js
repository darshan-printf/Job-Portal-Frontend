import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FilePenLine, Trash2 } from "lucide-react";
import Layout from "../../../components/Layout";
import ContentHeader from "../../../components/ContentHeader";
import DataTable from "react-data-table-component";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "react-toastify/dist/ReactToastify.css";

export default function AddCompanys() {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");
  const Env = process.env;
  const [searchQuery, setSearchQuery] = useState("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState({});

  useEffect(() => {
    fetchRecords();
    // eslint-disable-next-line
  }, []);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}job/get`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setLoading(false);
      const data = response.data || [];
      setRecords(data);
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this record?"
    );
    if (!confirmed) return;

    setDeleteLoading((prev) => ({ ...prev, [id]: true }));

    try {
      await axios.delete(`${apiUrl}job/delete/${id}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      // Update local state immediately for a responsive UI
      setRecords((prevRecords) =>
        prevRecords.filter((record) => record._id !== id)
      );
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setDeleteLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  const columns = [
    {
      name: "No",
      selector: (row, index) =>
        row.isSkeleton ? <Skeleton width={20} /> : index + 1,
      width: "60px",
      center: true,
    },
    {
      name: "Company",
      width: "100px",
      center: true,
      cell: (row) =>
        row.isSkeleton ? (
          <Skeleton circle height={45} width={45} />
        ) : (
          <img
            src={row.countryFlag || Env.REACT_APP_PROJECT_ICON}
            alt="Profile"
            height={45}
            width={45}
            className="p-1"
          />
        ),
    },

    {
      name: "Title",
      sortable: true,
      cell: (row) =>
        row.isSkeleton ? <Skeleton width={120} /> : `${row.title}`,
    },
    {
      name: "Experience",
      sortable: true,
      width: "120px",
      cell: (row) =>
        row.isSkeleton ? <Skeleton width={120} /> : `${row.experience}`,
    },
    {
      name: "Salary",
      sortable: true,
       width: "100px",
      cell: (row) =>
        row.isSkeleton ? <Skeleton width={80} /> : `₹ ${row.salary} /-`,
    },
    {
      name: "Type",
      sortable: true,
      cell: (row) => (row.isSkeleton ? <Skeleton width={100} /> : row.type),
      width: "80px",
    },
    {
      name: "Location",
      sortable: true,
      cell: (row) =>
        row.isSkeleton ? (
          <Skeleton width={100} />
        ) : (
          `(${row.country}) ${row.state}, ${row.city}`
        ),
    },

    {
      name: "Actions",
      width: "100px",
      center: true,
      cell: (row) =>
        row.isSkeleton ? (
          <Skeleton width={60} height={30} />
        ) : (
          <div className="d-flex">
            <button
              type="button"
              className="btn btn-primary btn-xs d-flex align-items-center justify-content-center rounded-circle mr-1"
              style={{ width: "32px", height: "32px" }}
              onClick={() =>
                navigate(`/admin/useredit?id=${row._id}`, {
                  state: { id: row._id },
                })
              }
            >
              <FilePenLine size={16} />
            </button>
            <button
              type="button"
              className="btn btn-danger btn-xs d-flex align-items-center justify-content-center rounded-circle"
              onClick={() => handleDelete(row._id)}
              style={{ width: "32px", height: "32px" }}
            >
              {deleteLoading[row._id] ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden"></span>
                </div>
              ) : (
                <Trash2 size={16} />
              )}
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
      (record.instituteName || "")
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
        title="Manage Jobs "
        breadcrumbs={[
          { label: "Dashboard", to: "/admin/dashboard" },
          { label: "Manage Jobs " },
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
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search"
                        title="Search within table"
                      />
                    </div>
                    <div className="bd-highlight">
                      <button
                        onClick={() => navigate("/admin/useradd")}
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
                            justifyContent: "center",
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
                            justifyContent: "center",
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
      <ToastContainer position="top-center" style={{ width: "auto" }} />
    </Layout>
  );
}
