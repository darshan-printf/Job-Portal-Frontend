import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import UserLayout from "../../../components/UserLayout";
import ContentHeader from "../../../components/ContentHeader";
import axios from "axios";
import Select from "react-select";
import "react-toastify/dist/ReactToastify.css";

export default function Add() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    experience: "",
    fild: "",
    country: "",
    state: "",
    city: "",
    salary: 0,
    workingHours: "",
    type: "",
    flexibleWorkingHours: true,
    sift: "",
    bondTime: "",
    bondDescription: "",
    noticePeriod: "",
    benifits: "",
    package: "",
  });
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState({
    fields: [],
    countries: [],
    states: [],
    cities: [],
  });
  const [allStates, setAllStates] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [selectedStateId, setSelectedStateId] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");

  const jobTypeOptions = [
    { value: "Full-time", label: "Full-time" },
    { value: "Part-time", label: "Part-time" },
    { value: "Contract", label: "Contract" },
    { value: "Internship", label: "Internship" },
  ];
  const flexibleWorkingHoursOptions = [
    { value: true, label: "Yes" },
    { value: false, label: "No" },
  ];
  const packageOptions = [
    { value: "Silver", label: "Silver" },
    { value: "Gold", label: "Gold" },
    { value: "Paletiniyam", label: "Paletiniyam" },
  ];

  const fetchCountries = async () => {
    try {
      const response = await axios.get(`${apiUrl}country/get`, {
        headers: {
          Authorization: `${token}`,
          "Cache-Control": "no-cache",
        },
      });
      const countries = response.data.data || [];
      const countryOptions = countries.map((country) => ({
        value: country._id,
        label: (
          <div className="d-flex align-items-center">
            <img
              src={country.flag}
              alt={country.name}
              style={{ width: "20px", height: "15px", marginRight: "8px" }}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            {country.name}
          </div>
        ),
        name: country.name,
      }));

      setOptions((prev) => ({
        ...prev,
        countries: countryOptions,
      }));
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const fetchAllStates = async () => {
    try {
      const response = await axios.get(`${apiUrl}state/get`, {
        headers: {
          Authorization: `${token}`,
          "Cache-Control": "no-cache",
        },
      });
      const states = response.data.data || [];
      setAllStates(states);
      if (selectedCountryId) {
        filterStates(selectedCountryId);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const fetchAllCities = async () => {
    try {
      const response = await axios.get(`${apiUrl}city/get`, {
        headers: {
          Authorization: `${token}`,
          "Cache-Control": "no-cache",
        },
      });
      const cities = response.data.data || [];
      setAllCities(cities);
      if (selectedStateId) {
        filterCities(selectedStateId);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  // Filter states based on selected country
  const filterStates = (countryId) => {
    if (!countryId) {
      setOptions((prev) => ({ ...prev, states: [] }));
      return;
    }
    const filteredStates = allStates.filter((state) => {
      return (
        state.country === countryId ||
        state.countryId === countryId ||
        (state.country && state.country._id === countryId)
      );
    });
    const stateOptions = filteredStates.map((state) => ({
      value: state._id,
      label: <div className="d-flex align-items-center">{state.name}</div>,
      name: state.name,
    }));
    setOptions((prev) => ({
      ...prev,
      states: stateOptions,
    }));
  };

  // Filter cities based on selected state
  const filterCities = (stateId) => {
    if (!stateId) {
      setOptions((prev) => ({ ...prev, cities: [] }));
      return;
    }
    const filteredCities = allCities.filter((city) => {
      return (
        city.state === stateId ||
        city.stateId === stateId ||
        (city.state && city.state._id === stateId)
      );
    });
    const cityOptions = filteredCities.map((city) => ({
      value: city._id,
      label: <div className="d-flex align-items-center">{city.name}</div>,
      name: city.name,
    }));

    setOptions((prev) => ({
      ...prev,
      cities: cityOptions,
    }));
  };

  // Fetch options from API
  useEffect(() => {
    // Fetch field options (using sample data as before)
    setOptions((prev) => ({
      ...prev,
      fields: [
        { value: "Information Technology", label: "Information Technology" },
        { value: "Healthcare", label: "Healthcare" },
        { value: "Finance", label: "Finance" },
        { value: "Education", label: "Education" },
        { value: "Marketing", label: "Marketing" },
      ],
    }));

    // Fetch countries, states and cities
    fetchCountries();
    fetchAllStates();
    fetchAllCities();
  }, [apiUrl, token]);

  // When country changes, filter states
  useEffect(() => {
    if (allStates.length > 0) {
      filterStates(selectedCountryId);
    }
  }, [selectedCountryId, allStates]);

  // When state changes, filter cities
  useEffect(() => {
    if (allCities.length > 0) {
      filterCities(selectedStateId);
    }
  }, [selectedStateId, allCities]);

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (selectedOption, field) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: selectedOption ? selectedOption.value : "",
    }));

    // Update the selected IDs for country and state to trigger filtering of related data
    if (field === "country") {
      setSelectedCountryId(selectedOption ? selectedOption.value : "");
      // Reset state and city when country changes
      setFormData((prev) => ({
        ...prev,
        state: "",
        city: "",
      }));
      setSelectedStateId("");
    } else if (field === "state") {
      setSelectedStateId(selectedOption ? selectedOption.value : "");
      // Reset city when state changes
      setFormData((prev) => ({
        ...prev,
        city: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}job/addPost`, formData, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });
      toast.success(response.data.message);
      setFormData({
        title: "",
        description: "",
        experience: "",
        field: "",
        country: "",
        state: "",
        city: "",
        salary: 0,
        workingHours: "",
        type: "",
        flexibleWorkingHours: true,
        shift: "",
        bondTime: "",
        bondDescription: "",
        noticePeriod: "",
        benefits: "",
      });
      setSelectedCountryId("");
      setSelectedStateId("");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  // Get current values for select components
  const getCurrentValue = (field, optionsArray) => {
    if (!formData[field]) return null;
    return (
      optionsArray.find((option) => option.value === formData[field]) || null
    );
  };

  return (
    <UserLayout ac2="active">
      <ContentHeader
        title="Add Job"
        breadcrumbs={[
          { label: "Dashboard", to: "/admin/userdashboard" },
          { label: "Job List", to: "/admin/jobpostlist" },
          { label: "Add Job" },
        ]}
      />

      <section className="content">
        <div className="container-fluid">
          <div className="card card-primary card-outline">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-4 col-12">
                    <div className="form-group">
                      <label htmlFor="title">Job Title</label>
                      <span className="text-danger">*</span>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Enter Job Title"
                        required
                        value={formData.title}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-12">
                    <div className="form-group">
                      <label htmlFor="field">Field</label>
                      <span className="text-danger">*</span>
                      <Select
                        id="field"
                        options={options.fields}
                        value={getCurrentValue("field", options.fields)}
                        onChange={(selected) =>
                          handleSelectChange(selected, "field")
                        }
                        placeholder="Select Field"
                        isSearchable
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-12">
                    <div className="form-group">
                      <label htmlFor="flexibleWorkingHours">
                        Flexible Working Hours
                      </label>
                      <Select
                        id="flexibleWorkingHours"
                        options={flexibleWorkingHoursOptions}
                        value={flexibleWorkingHoursOptions.find(
                          (option) =>
                            option.value === formData.flexibleWorkingHours
                        )}
                        onChange={(selected) =>
                          handleSelectChange(selected, "flexibleWorkingHours")
                        }
                        placeholder="Select Flexible Hours Option"
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="description">Job Description</label>
                      <span className="text-danger">*</span>
                      <textarea
                        className="form-control"
                        id="description"
                        rows="5"
                        placeholder="Enter Job Description"
                        required
                        value={formData.description}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-12">
                    <div className="form-group">
                      <label htmlFor="experience">Experience Required</label>
                      <input
                        type="text"
                        className="form-control"
                        id="experience"
                        placeholder="e.g., 1 to 3 years"
                        value={formData.experience}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-12">
                    <div className="form-group">
                      <label htmlFor="salary">Salary</label>
                      <input
                        type="number"
                        className="form-control"
                        id="salary"
                        placeholder="Enter Salary"
                        value={formData.salary}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-12">
                    <div className="form-group">
                      <label htmlFor="type">Job Type</label>
                      <Select
                        id="type"
                        options={jobTypeOptions}
                        value={getCurrentValue("type", jobTypeOptions)}
                        onChange={(selected) =>
                          handleSelectChange(selected, "type")
                        }
                        placeholder="Select Job Type"
                        isSearchable
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-12">
                    <div className="form-group">
                      <label htmlFor="country">Country</label>
                      <Select
                        id="country"
                        options={options.countries}
                        value={getCurrentValue("country", options.countries)}
                        onChange={(selected) =>
                          handleSelectChange(selected, "country")
                        }
                        placeholder="Select Country"
                        isSearchable
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-12">
                    <div className="form-group">
                      <label htmlFor="state">State</label>
                      <Select
                        id="state"
                        options={options.states}
                        value={getCurrentValue("state", options.states)}
                        onChange={(selected) =>
                          handleSelectChange(selected, "state")
                        }
                        placeholder="Select State"
                        isSearchable
                        isDisabled={!formData.country}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-12">
                    <div className="form-group">
                      <label htmlFor="city">City</label>
                      <Select
                        id="city"
                        options={options.cities}
                        value={getCurrentValue("city", options.cities)}
                        onChange={(selected) =>
                          handleSelectChange(selected, "city")
                        }
                        placeholder="Select City"
                        isSearchable
                        isDisabled={!formData.state}
                      />
                    </div>
                  </div>
                  
                  <div className="col-md-4 col-12">
                    <div className="form-group">
                      <label htmlFor="workingHours">Working Hours</label>
                      <input
                        type="time"
                        step="1"
                        className="form-control"
                        id="workingHours"
                        value={formData.workingHours}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-4 col-12">
                    <div className="form-group">
                      <label htmlFor="shift">Shift</label>
                      <input
                        type="text"
                        className="form-control"
                        id="shift"
                        placeholder="e.g., Day Shift, Night Shift"
                        value={formData.shift}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-12">
                    <div className="form-group">
                      <label htmlFor="noticePeriod">Notice Period</label>
                      <input
                        type="text"
                        className="form-control"
                        id="noticePeriod"
                        placeholder="e.g., 15 days, 1 month"
                        value={formData.noticePeriod}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-12">
                    <div className="form-group">
                      <label htmlFor="bondTime">Bond Time</label>
                      <input
                        type="text"
                        className="form-control"
                        id="bondTime"
                        placeholder="e.g., 1 year"
                        value={formData.bondTime}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-12">
                    <div className="form-group">
                      <label htmlFor="benefits">Benefits</label>
                      <input
                        type="text"
                        className="form-control"
                        id="benefits"
                        placeholder="e.g., Health insurance, Paid time off"
                        value={formData.benefits}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-12">
                    <div className="form-group">
                      <label htmlFor="package">Package</label>
                      <Select
                        id="package"
                        options={packageOptions}
                        value={getCurrentValue("package", packageOptions)}
                        onChange={(selected) =>
                          handleSelectChange(selected, "package")
                        }
                        placeholder="Select Package"
                        isSearchable
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="bondDescription">Bond Description</label>
                      <textarea
                        className="form-control"
                        id="bondDescription"
                        rows="3"
                        placeholder="Enter bond details if applicable"
                        value={formData.bondDescription}
                        onChange={handleInputChange}
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
                      disabled={loading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer style={{ width: "auto" }} />
    </UserLayout>
  );
}
