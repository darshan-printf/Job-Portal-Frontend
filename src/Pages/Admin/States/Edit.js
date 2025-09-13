import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { Link, MemoryRouter, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContentHeader from "../../../components/ContentHeader";
import Select from "react-select";

export default function Edit() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};
  const apiUrl = process.env.REACT_APP_API_URL;
  const [form, setForm] = useState({
    name: "",
    code: "",
    selectedCountryId: "",
  });
  const [countries, setCountries] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const currentPath = location?.pathname || "";

  // Fetch existing state data and countries
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoading(true);
        // Fetch countries first
        const countriesResponse = await axios.get(`${apiUrl}country/get`, {
          headers: {
            authorization: `${localStorage.getItem("token")}`,
          },
        });
        
        setCountries(countriesResponse.data.data || []);
        
        // Then fetch state data
        const stateResponse = await axios.get(`${apiUrl}state/get/${id}`, {
          headers: {
            Authorization: ` ${localStorage.getItem("token")}`,
          },
        });
        
        const stateData = stateResponse.data;
        setForm({
          name: stateData.name,
          code: stateData.code,
          selectedCountryId: stateData.country._id || stateData.country,
        });
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };
    
    if (id) {
      fetchAllData();
    }
  }, [id, apiUrl]);

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoaded(true);

    const payload = {
      id,
      name: form.name,
      code: form.code,
      countryId: form.selectedCountryId,
    };

    try {
      await axios.put(`${apiUrl}state/update`, payload, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      setLoaded(false);
      toast.success("State updated successfully");

      if (currentPath === "/admin/statesedit") {
        setTimeout(() => {
          if (window.location.pathname === "/admin/statesedit") {
            navigate("/admin/location");
          }
        }, 3000);
      }
    } catch (error) {
      setLoaded(false);
      console.error("Error updating member:", error);
      toast.error(error.response?.data?.message || "Update failed");
    }
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
        title="Update State"
        breadcrumbs={[
          { label: "Dashboard", to: "/admin/dashboard" },
          { label: "Location", to: "/admin/location" },
          { label: "Update State" },
        ]}
      />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-primary card-outline">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="exampleSelectRounded0">Select Country:</label>
                      <Select
                        options={options}
                        value={
                          options.find(
                            (o) => o.value === form.selectedCountryId
                          ) || null
                        }
                        onChange={(opt) =>
                          setForm((prev) => ({
                            ...prev,
                            selectedCountryId: opt.value,
                          }))
                        }
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
                        value={form.name}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, name: e.target.value }))
                        }
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
                        id="code"
                        placeholder="Enter Code"
                        value={form.code}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, code: e.target.value }))
                        }
                      />
                    </div>
                  </div>

                  
                </div>

                <div className="card-footer">
                  <div className="float-right">
                    <button
                      type="button"
                      className="btn btn-primary mx-2"
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
                          {" "}
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>{" "}
                          Loading...
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
      <ToastContainer position="top-center" style={{ width: "auto" }} />
    </Layout>
  );
}