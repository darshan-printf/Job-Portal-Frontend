import React, { useEffect, useState } from "react";
import UserLayout from "../../../components/UserLayout";
import ContentHeader from "../../../components/ContentHeader";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Shield, Star, Crown, Gem } from "lucide-react";
import { FaRegFilePdf } from "react-icons/fa";
import { FaUserClock, FaUserCheck, FaUserTimes } from "react-icons/fa";
import DataTable from "react-data-table-component";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "react-toastify/dist/ReactToastify.css";
import { PiClockCounterClockwiseDuotone } from "react-icons/pi";

export default function SchedulingList() {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");
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
      const response = await axios.get(`${apiUrl}candidate/scheduled`, {
        headers: {
          Authorization: `${token}`,
          "Cache-Control": "no-cache",
        },
      });
      setLoading(false);

      const data = response.data?.candidates || [];
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
      selector: (row) => row?.jobId?.title || "",
      sortable: true,
      cell: (row) =>
        row.isSkeleton ? (
          <Skeleton width={180} />
        ) : (
          <div className="d-flex align-items-center gap-2">
            <span
              className={`d-flex align-items-center mr-1 fw-semibold ${
                packageConfig[row.jobId?.package || ""]?.color || "text-dark"
              }`}
            >
              {packageConfig[row.jobId?.package || ""]?.icon}
            </span>
            <span className="fw-semibold text-dark">
              {row?.jobId?.title || ""}
            </span>
          </div>
        ),
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
      cell: (row) => (row.isSkeleton ? <Skeleton width={200} /> : row.email),
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
      width: "120px",
      cell: (row) => (row.isSkeleton ? <Skeleton width={100} /> : row.phone),
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
              className="btn btn-secondary btn-xs d-flex align-items-center justify-content-center rounded-circle mr-1"
              style={{ width: "32px", height: "32px" }}
              title="View Candidate Details"
            >
              <PiClockCounterClockwiseDuotone size={16} />
            </button>
          </div>
        ),
    },
  ];

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
      <ToastContainer style={{ width: "auto" }} />
    </UserLayout>
  );
}
