import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Layout from "../../../components/Layout";
import axios from "axios";
import ContentHeader from "../../../components/ContentHeader";
import Select from "react-select";
import "react-toastify/dist/ReactToastify.css";

export default function AddMember() {
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCountries();
    // eslint-disable-next-line
  }, []);
  const fetchCountries = async () => {
    try {
      const response = await axios.get(`${apiUrl}country/get`, {
        headers: {
          authorization: `${localStorage.getItem("token")}`,
          "Cache-Control": "no-cache",
        },
      });

      setCountries(response.data.data); // Store API data in state
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };
  const handleSubmit = (e) => {
    setLoaded(true);
    e.preventDefault();
    let data = JSON.stringify({
      name: name,
      code: designation,
      countryId: selectedCountryId,
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiUrl}state/add`,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios.request(config).then((response) => {
        setLoaded(false);
        setName("");
        setDesignation("");
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message);
        setLoaded(false);
      });
  };

  const options = countries.map((country) => ({
    value: country._id,
    label: (
      <div className="d-flex align-items-center">
        <img
          src={`${country.flag}`}
          alt={country.name}
          style={{ width: "20px", height: "15px", marginRight: "8px" }}
        />
        {country.name}
      </div>
    ),
  }));
  return (
    <Layout ac4="active">
      <ContentHeader
        title="Add New State"
        breadcrumbs={[
          { label: "Dashboard", to: "/admin/dashboard" },
          { label: "Location", to: "/admin/location" },
          { label: "Add State" },
        ]}
      />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-primary card-outline">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-12">
                      <div class="form-group">
                        <label for="exampleSelectRounded0">
                          Select Country:
                        </label>
                        <Select
                          options={options}
                          onChange={(opt) => setSelectedCountryId(opt.value)}
                          placeholder="Select a country"
                        />
                      </div>
                    </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="memberName">Name</label>{" "}
                      <span className="text-danger">*</span>
                      <input
                        type="text"
                        className="form-control"
                        id="memberName"
                        placeholder="Enter Member Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="designation">Code</label>
                      <input
                        type="text"
                        className="form-control"
                        id="designation"
                        placeholder="Enter Designation"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <div className="float-right">
                    <button
                      type="button"
                      className="btn btn-secondary mx-2"
                      onClick={() => window.history.back()}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loaded}
                    >
                      {loaded ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        </>
                      ) : (
                        <>Submit</>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer  style={{ width: "auto" }} />
    </Layout>
  );
}
