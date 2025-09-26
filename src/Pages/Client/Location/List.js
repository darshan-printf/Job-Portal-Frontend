import React, { useEffect, useState } from "react";
import UserLayout from "../../../components/UserLayout";
import ContentHeader from "../../../components/ContentHeader";
import { ToastContainer, toast } from "react-toastify";
import DataTable from "react-data-table-component";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "react-toastify/dist/ReactToastify.css";

export default function LocationList() {
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
      const response = await axios.get(`${apiUrl}allLocation/get`, {
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
  const columns = [
    {
      name: "No",
      selector: (row, index) =>
        row.isSkeleton ? <Skeleton width={20} /> : index + 1,
      width: "60px",
      center: "true",
    },
     {
      name: "Country",
      sortable: true,
      selector: (row) => row.country,
      cell: (row) =>
        row.isSkeleton ? (
          <div className="flex d-flex items-center align-items-center gap-2">
            <Skeleton circle height={45} width={45} /> <Skeleton width={120} />
            
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <img
              src={row.flag || Env.REACT_APP_PROJECT_ICON}
              alt="Profile"
              height={30}
              width={30}
              className="p-1 rounded-full"
            />
            <span>{row.country}</span>
          </div>
        ),
    },
    {
      name: "State",
      selector: (row) => row.state,
      sortable: true,
      cell: (row) =>
        row.isSkeleton ? <Skeleton width={120} /> : `${row.state}`,
    },
    {
      name: "City",
      selector: (row) => row.city,
      sortable: true,
      cell: (row) =>
        row.isSkeleton ? <Skeleton width={120} /> : `${row.city}`,
    },
   
  ];

  const filteredRecords = records.filter(
    (record) =>
      `${record.country} ${record.state} ${record.city}`
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
    <UserLayout ac6="active">
      <ContentHeader
        title="Location"
        breadcrumbs={[
          { label: "Dashboard", to: "/admin/userdashboard" },
          { label: "Location" },
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
