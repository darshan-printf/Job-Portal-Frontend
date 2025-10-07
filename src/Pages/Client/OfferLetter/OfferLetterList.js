import React, { useEffect, useState } from "react";
import UserLayout from "../../../components/UserLayout";
import ContentHeader from "../../../components/ContentHeader";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { FaRegFilePdf } from "react-icons/fa";
import DataTable from "react-data-table-component";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { GrDocumentPerformance } from "react-icons/gr";



export default function AddCompanys() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const jobId = queryParams.get("jobId");
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
      const response = await axios.get(`${apiUrl}schedule/getschedule/${jobId}`, {
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
    }
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
      cell: (row) => (row.isSkeleton ? <Skeleton width={200} /> : row.candidateEmail),
    },
    {
      name: "Phone",
      selector: (row) => row.candidatePhone,
      sortable: true,
      width: "120px",
      cell: (row) => (row.isSkeleton ? <Skeleton width={100} /> : row.candidatePhone),
    },
     {
      name: "Interview Date",
      selector: (row) => row.interviewDate,
      sortable: true,
      width: "120px",
      center: "true",
      cell: (row) => (row.isSkeleton ? <Skeleton width={100} /> : moment(row.interviewDate).format("DD-MM-YYYY")),
    },
    {
      name: "Details",
      width: "100px",
      center: "true",
      cell: (row) =>
        row.isSkeleton ? (
          <Skeleton width={60} height={30} />
        ) : (
          <div className="d-flex">
            <button
              type="button"
              disabled={row.status !== "accepted"}
              className="btn btn-secondary btn-xs d-flex align-items-center justify-content-center rounded-circle "
              style={{ width: "32px", height: "32px" }}
              title="View Candidate Details"
            >
              <GrDocumentPerformance  size={16} />
            </button>
          </div>
        ),
    },
  ];

  const filteredRecords = records.filter((record) =>
    `${record.candidateName || ""} ${record.candidateEmail || ""} ${record.candidatePhone || ""}`
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
    <UserLayout ac5="active">
      <ContentHeader
        title="Offer Letter List"
        breadcrumbs={[
          { label: "Dashboard", to: "/admin/userdashboard" },
          { label: "Offer Letter List" },
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
                      selectableRows
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
