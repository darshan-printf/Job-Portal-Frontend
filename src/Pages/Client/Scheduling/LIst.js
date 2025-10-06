import React, { useEffect, useState } from "react";
import UserLayout from "../../../components/UserLayout";
import ContentHeader from "../../../components/ContentHeader";
import { ToastContainer, toast } from "react-toastify";
import { Shield, Star, Crown, Gem } from "lucide-react";
import DataTable from "react-data-table-component";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "react-toastify/dist/ReactToastify.css";
import ScheduleModal from "../../../components/ScheduleModal"; // Import the modal component

export default function SchedulingList() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");
  const [searchQuery, setSearchQuery] = useState("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null); // State to store the selected record

  useEffect(() => {
    fetchRecords();
    // eslint-disable-next-line
  }, []);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}schedule/getschedule`, {
        headers: {
          Authorization: `${token}`,
          "Cache-Control": "no-cache",
        },
      });
      setLoading(false);

      const data = response.data?.schedules || [];
      setRecords(data);
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message);
    }
  };

  // package config
  const packageConfig = {
    Admin: {
      color: "text-primary",
      icon: <Shield size={18} />,
    },
    Silver: {
      color: "text-secondary",
      icon: <Star size={18} />,
    },
    Gold: {
      color: "text-warning",
      icon: <Crown size={18} />,
    },
    Paletiniyam: {
      color: "text-purple",
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
      selector: (row) => row?.jobTitle || "",
      sortable: true,
      cell: (row) =>
        row.isSkeleton ? (
          <Skeleton width={180} />
        ) : (
          <div className="d-flex align-items-center gap-2">
            <span
              className={`d-flex align-items-center mr-1 fw-semibold ${
                packageConfig[row.jobTitle || ""]?.color || "text-dark"
              }`}
            >
              {packageConfig[row.package || ""]?.icon}
            </span>
            <span className="fw-semibold text-dark">{row?.jobTitle || ""}</span>
          </div>
        ),
    },
    {
      name: "Name",
      selector: (row) => row.candidateName,
      sortable: true,
      cell: (row) =>
        row.isSkeleton ? (
          <Skeleton width={180} />
        ) : (
          <div className="fw-semibold text-dark">{row.candidateName}</div>
        ),
    },
    {
      name: "Email",
      selector: (row) => row.candidateEmail,
      sortable: true,
      cell: (row) =>
        row.isSkeleton ? <Skeleton width={200} /> : row.candidateEmail,
    },
    {
      name: "Phone",
      selector: (row) => row.candidatePhone,
      sortable: true,
      width: "120px",
      cell: (row) =>
        row.isSkeleton ? <Skeleton width={100} /> : row.candidatePhone,
    },
    {
      name: "Details",
      width: "200px",
      center: true,
      cell: (row) =>
        row.isSkeleton ? (
          <Skeleton width={60} height={30} />
        ) : (
          <div className="d-flex flex-column gap-2">
            {row.status === "scheduled" ? (
              <div className="d-flex">

                <button type="button" className="btn btn-success btn-xs mr-2" title="Mark as Completed"> Completed </button>
                <button type="button" className="btn btn-danger btn-xs" title="Cancel Interview" > Cancelled </button>
                
              </div>
            ) : row.status === "completed" ? (
              <div className="d-flex">

                <button type="button" className="btn btn-success btn-xs mr-2" title="Accept Candidate">Accepted</button>
                <button type="button" className="btn btn-warning btn-xs" title="Reject Candidate">Rejected</button>

              </div>
            ) : row.status === "cancelled" ? (

              <button type="button" className="btn btn-danger btn-xs" disabled> Cancelled</button>

            ) : row.status === "accepted" ? (

              <button type="button" className="btn btn-success btn-xs" disabled> Accepted</button>

            ) : row.status === "rejected" ? (

              <button type="button" className="btn btn-warning btn-xs" disabled> Rejected</button>

            ) : (
              // Default for pending or no status
              <button
                type="button"
                className="btn btn-secondary btn-xs"
                onClick={() => openModal(row)}
                title="Schedule Interview"
              >
                Schedule Interview
              </button>
            )}
          </div>
        ),
    },
  ];

  const openModal = (row) => {
    setSelectedRecord(row);
  };
  const closeModal = () => {
    setSelectedRecord(null);
  };
  const saveChange = () => {
    fetchRecords();
  };

  const filteredRecords = records.filter((record) =>
    `${record.name || ""} ${record.email || ""} ${record.phone || ""} ${
      record.jobId?.title || ""
    }`
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
    <UserLayout ac4="active">
      <ContentHeader
        title="Interview Schedule"
        breadcrumbs={[
          { label: "Dashboard", to: "/admin/userdashboard" },
          { label: "Interview Schedule" },
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
                        placeholder="Search by name, email, phone, or job title"
                        title="Search within table"
                      />
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

      <ScheduleModal
        isOpen={selectedRecord !== null}
        onClose={closeModal}
        schedule={selectedRecord}
        packageConfig={packageConfig}
        onSave={saveChange}
      />
      <ToastContainer style={{ width: "auto" }} />
    </UserLayout>
  );
}
