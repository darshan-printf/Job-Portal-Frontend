import React, { useEffect, useState } from "react";
import UserLayout from "../../../components/UserLayout";
import ContentHeader from "../../../components/ContentHeader";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FilePenLine } from "lucide-react";
import { Shield, Star, Crown, Gem } from "lucide-react"; // icons
import DataTable from "react-data-table-component";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "react-toastify/dist/ReactToastify.css";

export default function CandidateList() {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");
  const Env = process.env;
  const [searchQuery, setSearchQuery] = useState("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRecords();
    // eslint-disable-next-line
  }, []);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}candidate/get`, {
        headers: {
          Authorization: `${token}`,
          "Cache-Control": "no-cache",
        },
      });
      setLoading(false);
      
      // Fix: Extract the candidates array from the response
      const data = response.data?.candidates || [];
      setRecords(data);
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Failed to fetch candidates");
    }
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
    Paletiniyam: {
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
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      cell: (row) =>
        row.isSkeleton ? (
          <Skeleton width={180} />
        ) : (
          <div className="fw-semibold text-dark">{row.name}</div>
        ),
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      cell: (row) =>
        row.isSkeleton ? <Skeleton width={200} /> : row.email,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
      width: "120px",
      cell: (row) =>
        row.isSkeleton ? <Skeleton width={100} /> : row.phone,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      width: "100px",
      cell: (row) =>
        row.isSkeleton ? (
          <Skeleton width={80} />
        ) : (
          <span
            className={`badge ${
              row.status === "rejected"
                ? "badge-danger"
                : row.status === "hired"
                ? "badge-success"
                : "badge-warning"
            }`}
          >
            {row.status}
          </span>
        ),
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
                navigate(`/admin/candidate/edit?id=${row._id}`, {
                  state: { id: row._id },
                })
              }
            >
              <FilePenLine size={16} />
            </button>
          </div>
        ),
    },
  ];

  const filteredRecords = records.filter(
    (record) =>
      `${record.name || ""} ${record.email || ""} ${record.phone || ""}`
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
    <UserLayout ac3="active">
      <ContentHeader
        title="Candidate List"
        breadcrumbs={[
          { label: "Dashboard", to: "/admin/userdashboard" },
          { label: "Candidate List" },
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
                        placeholder="Search by name, email, or phone"
                        title="Search within table"
                      />
                    </div>
                    <div className="bd-highlight">
                      <button
                        onClick={() => navigate("/admin/candidate/add")}
                        type="button"
                        className="btn btn-block btn-primary"
                      >
                        <i className="fas fa-plus"></i> Add Candidate
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
                      noDataComponent="No candidates found"
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