import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import moment from "moment";

const ScheduleModal = ({ isOpen, onClose, onSave, schedule }) => {
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [jobDetails, setJobDetails] = useState(null);
  const [candidateDetails, setCandidateDetails] = useState(null);
  const [jobLoading, setJobLoading] = useState(false);
  const [candidateLoading, setCandidateLoading] = useState(false);
  const [remark, setRemark] = useState("");
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");
  const Env = process.env;
  const token = localStorage.getItem("token");
  
  // Generate time slots
  const generateTimeSlots = () => {
    const times = [];
    for (let hour = 9; hour <= 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        times.push({ value: timeString, label: moment(timeString, 'HH:mm').format('hh:mm A') });
      }
    }
    return times;
  };

  const timeSlots = generateTimeSlots();

  useEffect(() => {
    if (isOpen && schedule) {
      // Reset form when modal opens
      setSelectedStatus(null);
      setRemark("");
      
      // Set initial date and time from schedule
      if (schedule.interviewDate) {
        const date = moment(schedule.interviewDate).format('YYYY-MM-DD');
        const time = moment(schedule.interviewDate).format('HH:mm');
        setInterviewDate(date);
        setInterviewTime(time);
      } else {
        // Set default to current date and next available time
        const now = moment();
        setInterviewDate(now.format('YYYY-MM-DD'));
        // Set default time to next 30 minute interval
        const nextHour = now.add(1, 'hour').startOf('hour');
        setInterviewTime(nextHour.format('HH:mm'));
      }
      
      fetchJobDetails();
      fetchCandidateDetails();
    }
    // eslint-disable-next-line
  }, [isOpen, schedule]);

  const fetchJobDetails = async () => {
    setJobLoading(true);
    try {
      const config = {
        method: "get",
        url: `${Env.REACT_APP_API_URL}job/get/${schedule?.jobId}`,
        headers: {
          authorization: token,
          "Cache-Control": "no-cache",
        },
      };
      const response = await axios.request(config);
      setJobDetails(response.data);
    } catch (error) {
      console.error("Error fetching job details:", error);
      toast.error("Failed to load job details");
    } finally {
      setJobLoading(false);
    }
  };

  const fetchCandidateDetails = async () => {
    setCandidateLoading(true);
    try {
      const config = {
        method: "get",
        url: `${Env.REACT_APP_API_URL}candidate/get/${schedule.candidateId}`,
        headers: {
          authorization: token,
          "Cache-Control": "no-cache",
        },
      };
      const response = await axios.request(config);
      setCandidateDetails(response.data.candidate);
    } catch (error) {
      console.error("Error fetching candidate details:", error);
      toast.error("Failed to load candidate details");
    } finally {
      setCandidateLoading(false);
    }
  };

 const handleSave = async () => {
    if (!interviewDate || !interviewTime) { 
      toast.warning("Please select interview date and time");
      return;
    }
    
    setIsLoading(true);
    try {
      const requestData = {
        interviewDate: moment(`${interviewDate} ${interviewTime}`, 'YYYY-MM-DD HH:mm').toISOString(),
        status: "scheduled" || "",
        remark: remark || ""
      };

      await axios.put(
        `${Env.REACT_APP_API_URL}schedule/update/${schedule._id}`,
        requestData,
        {
          headers: { 
            'Content-Type': 'application/json',
            'authorization': token
          }
        }
      );

      if (onSave) await onSave(selectedStatus);
      
      toast.success("Schedule updated successfully");
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update schedule");
    } finally {
      setIsLoading(false);
    }
  };


  // Get minimum date (today)
  const getMinDate = () => {
    return moment().format('YYYY-MM-DD');
  };
  // Get maximum date (1 year from now)
  const getMaxDate = () => {
    return moment().add(1, 'year').format('YYYY-MM-DD');
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      tabIndex="1"
      role="dialog"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          {/* Modal Header */}
          <div className="modal-header bg-primary text-white">
            <h4 className="modal-title">
              <i className="fas fa-calendar-alt mr-2"></i>
              Schedule Details
            </h4>
            <button
              type="button"
              className="close text-white"
              onClick={onClose}
              disabled={isLoading}
              style={{ opacity: isLoading ? 0.5 : 1 }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          {/* Modal Body */}
          <div
            className="modal-body"
            style={{ maxHeight: "70vh", overflowY: "auto" }}
          >
            {/* Loading States */}
            {(jobLoading || candidateLoading) && (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <p className="mt-2 text-muted">Loading details...</p>
              </div>
            )}

            {/* Candidate Details */}
            {candidateDetails && !candidateLoading && (
              <div className="card mb-4 border-0 shadow-sm">
                <div className="card-header bg-light py-3">
                  <h5 className="card-title mb-0 text-dark font-weight-bold">
                    <i className="fas fa-user mr-2 text-primary"></i>
                    Candidate Information
                  </h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <p className="mb-2">
                        <strong className="text-dark">Name:</strong>
                        <span className="ml-2 text-dark">
                          {candidateDetails.name}
                        </span>
                      </p>
                      <p className="mb-2">
                        <strong className="text-dark">Email:</strong>
                        <span className="ml-2 text-dark">
                          {candidateDetails.email}
                        </span>
                      </p>
                    </div>
                    <div className="col-md-6 mb-3">
                      <p className="mb-2">
                        <strong className="text-dark">Phone:</strong>
                        <span className="ml-2 text-dark">
                          {candidateDetails.phone}
                        </span>
                      </p>
                      <p className="mb-2">
                        <strong className="text-dark">Current Status:</strong>
                        <span
                          className={`badge ${
                            schedule.status === "scheduled"
                              ? "badge-success"
                              : schedule.status === "completed"
                              ? "badge-primary"
                              : schedule.status === "accepted"
                              ? "badge-success"
                              : schedule.status === "rejected"
                              ? "badge-danger"
                              : "badge-warning"
                          } ml-2`}
                        >
                          {schedule.status}
                        </span>
                      </p>
                    </div>
                  </div>
                  {candidateDetails.resume && (
                    <div className="mt-3 justify-content-end d-flex">
                      <a
                        href={`${candidateDetails.resume}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-primary ml-3"
                      >
                        <i className="fas fa-download mr-1"></i>
                        Download Resume
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Job Details */}
            {jobDetails && !jobLoading && (
              <div className="card mb-4 border-0 shadow-sm">
                <div className="card-header bg-light py-3">
                  <h5 className="card-title mb-0 text-dark font-weight-bold">
                    <i className="fas fa-briefcase mr-2 text-primary"></i>
                    Job Information
                  </h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <p className="mb-2">
                        <strong className="text-dark">Title:</strong>
                        <span className="ml-2 text-dark">
                          {jobDetails.title}
                        </span>
                      </p>
                      <p className="mb-2">
                        <strong className="text-dark">Field:</strong>
                        <span className="ml-2 text-dark">
                          {jobDetails.field}
                        </span>
                      </p>
                      <p className="mb-2">
                        <strong className="text-dark">Type:</strong>
                        <span className="badge badge-info ml-2">
                          {jobDetails.type}
                        </span>
                      </p>
                      <p className="mb-2">
                        <strong className="text-dark">Experience:</strong>
                        <span className="ml-2 text-dark">
                          {jobDetails.experience}
                        </span>
                      </p>
                    </div>
                    <div className="col-md-6 mb-3">
                      <p className="mb-2">
                        <strong className="text-dark">Salary:</strong>
                        <span className="ml-2 text-dark">
                          ₹{jobDetails.salary?.toLocaleString()}
                        </span>
                      </p>
                      <p className="mb-2">
                        <strong className="text-dark">Shift:</strong>
                        <span className="ml-2 text-dark">
                          {jobDetails.shift}
                        </span>
                      </p>
                      <p className="mb-2">
                        <strong className="text-dark">Notice Period:</strong>
                        <span className="ml-2 text-dark">
                          {jobDetails.noticePeriod}
                        </span>
                      </p>
                      <p className="mb-2">
                        <strong className="text-dark">Package:</strong>
                        <span
                          className={`badge ${
                            jobDetails.package === "Silver"
                              ? "badge-secondary"
                              : jobDetails.package === "Gold"
                              ? "badge-warning"
                              : "badge-danger"
                          } ml-2`}
                        >
                          {jobDetails.package}
                        </span>
                      </p>
                    </div>
                  </div>

                  {jobDetails.description && (
                    <div className="mt-3 mb-3">
                      <strong className="text-dark">Description:</strong>
                      <p className="mt-1 text-muted bg-light p-3 rounded">
                        {jobDetails.description}
                      </p>
                    </div>
                  )}

                  {jobDetails.benefits && (
                    <div className="mt-3 mb-3">
                      <strong className="text-dark">Benefits:</strong>
                      <div className="mt-2">
                        {jobDetails.benefits
                          .split(", ")
                          .map((benefit, index) => (
                            <span
                              key={index}
                              className="badge badge-success mr-2 mb-2 p-2"
                            >
                              {benefit}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}

                  {jobDetails.bondDescription && (
                    <div className="mt-3 mb-3">
                      <strong className="text-dark">
                        Bond Information ({jobDetails.bondTime}):
                      </strong>
                      <p className="mt-1 text-muted bg-light p-3 rounded">
                        {jobDetails.bondDescription}
                      </p>
                    </div>
                  )}

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <p className="mb-2">
                        <strong className="text-dark">Flexible Hours:</strong>
                        <span
                          className={`badge ${
                            jobDetails.flexibleWorkingHours
                              ? "badge-success"
                              : "badge-secondary"
                          } ml-2`}
                        >
                          {jobDetails.flexibleWorkingHours ? "Yes" : "No"}
                        </span>
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p className="mb-2">
                        <strong className="text-dark">Working Hours:</strong>
                        <span className="ml-2 text-dark">
                          {jobDetails.workingHours}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Status Update Section */}
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-light py-3">
                <h5 className="card-title mb-0 text-dark font-weight-bold">
                  <i className="fas fa-edit mr-2 text-primary"></i>
                  Update Status
                </h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="interview-date" className="font-weight-bold text-dark">
                      Interview Date *
                    </label>
                    <input
                      type="date"
                      id="interview-date"
                      className="form-control"
                      value={interviewDate}
                      onChange={(e) => setInterviewDate(e.target.value)}
                      min={getMinDate()}
                      max={getMaxDate()}
                      disabled={isLoading}
                    />
                    <small className="form-text text-muted">
                      Select interview date
                    </small>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="interview-time" className="font-weight-bold text-dark">
                      Interview Time *
                    </label>
                    <Select
                      id="interview-time"
                      value={timeSlots.find(time => time.value === interviewTime)}
                      onChange={(selectedOption) => setInterviewTime(selectedOption.value)}
                      options={timeSlots}
                      placeholder="Select time..."
                      isDisabled={isLoading}
                    />
                    <small className="form-text text-muted">
                      Select interview time (9:00 AM - 6:00 PM)
                    </small>
                  </div>
                </div>
                
                <div className="form-group ">
                  <label
                    htmlFor="remark"
                    className="font-weight-bold text-dark"
                  >
                    Remark (Optional)
                  </label>
                  <textarea
                    id="remark"
                    className="form-control"
                    rows="3"
                    placeholder="Enter any remarks or notes..."
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="modal-footer bg-light">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isLoading}
            >
              <i className="fas fa-times mr-2"></i>
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
              disabled={
                isLoading 
              }
            >
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm "
                    role="status"
                  ></span>
                
                </>
              ) : (
                <>
                  <i className="fas fa-save mr-2"></i>
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;