import React, { useEffect, useState } from "react";
import UserLayout from "../../../components/UserLayout";
import ContentHeader from "../../../components/ContentHeader";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FilePenLine, Trash2 } from "lucide-react";
import { Shield, Star, Crown, Gem } from "lucide-react"; // icons
import DataTable from "react-data-table-component";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

export default function List() {
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
      const response = await axios.get(`${apiUrl}job/getPosts`, {
        headers: {
          Authorization: `${token}`,
          "Cache-Control": "no-cache",
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
    setDeleteLoading((prev) => ({ ...prev, [id]: true }));
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${apiUrl}job/delete/${id}`, {
            headers: {
              Authorization: `${token}`,
            },
          });

          fetchRecords();
          Swal.fire("Deleted!", "Job has been deleted.", "success");
          setDeleteLoading((prev) => ({ ...prev, [id]: false }));
        } catch (error) {
          setDeleteLoading((prev) => ({ ...prev, [id]: false }));
          Swal.fire("Error", error.response?.data?.message, "error");
        }
      }
    });
  };
  // package config
  const packageConfig = {
    Admin: {
      color: "text-primary", // bootstrap blue
      icon: <Shield size={18} />,
    },
    Silver: {
      color: "text-secondary", // bootstrap grey
      icon: <Star size={18} />,
    },
    Gold: {
      color: "text-warning", // bootstrap yellow
      icon: <Crown size={18} />,
    },
    Platinum: {
      color: "text-purple", // custom class (bootstrap में direct purple नहीं होता)
      icon: <Gem size={18} />,
    },
  };

  const columns = [
    {
      name: "No",
      selector: (row, index) =>
        row.isSkeleton ? <Skeleton width={20} /> : index + 1,
      width: "60px",
      center: "true",
    },
    {
      name: "Job Title",
      selector: (row) => row.title,
      sortable: true,
      cell: (row) =>
        row.isSkeleton ? (
          <Skeleton width={180} />
        ) : (
          <div className="d-flex align-items-center gap-2">
            <span
              className={`d-flex align-items-center mr-1 fw-semibold ${
                packageConfig[row.package]?.color || "text-dark"
              }`}
            >
              {packageConfig[row.package]?.icon}
            </span>
            <span className="fw-semibold text-dark">{row.title}</span>
          </div>
        ),
    },
    {
      name: "Experience",
      selector: (row) => row.experience,
      sortable: true,
      width: "120px",
      cell: (row) =>
        row.isSkeleton ? <Skeleton width={120} /> : `${row.experience}`,
    },
    {
      name: "Salary",
      selector: (row) => row.salary,
      sortable: true,
      width: "100px",
      cell: (row) =>
        row.isSkeleton ? <Skeleton width={80} /> : `₹ ${row.salary} /-`,
    },
    {
      name: "Actions",
      width: "100px",
      center: "true",
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
                navigate(`/admin/jobpostedit?id=${row._id}`, {
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
    <UserLayout ac2="active">
      <ContentHeader
        title="Job Posting"
        breadcrumbs={[
          { label: "Dashboard", to: "/admin/userdashboard" },
          { label: "Job List" },
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
                        onClick={() => navigate("/admin/jobpostadd")}
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
      <ToastContainer style={{ width: "auto" }} />
    </UserLayout>
  );
}
