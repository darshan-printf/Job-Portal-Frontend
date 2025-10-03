import React, { useState, useEffect } from "react";
import Select from 'react-select';
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
  const Env = process.env;
  const token = localStorage.getItem("token");

  // Status options for the select dropdown
  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'interviewed', label: 'Interviewed' },
    { value: 'hired', label: 'Hired' },
    { value: 'rejected', label: 'Rejected' }
  ];

  useEffect(() => {
    if (isOpen && schedule) {
      fetchJobDetails();
      fetchCandidateDetails();
    }
  }, [isOpen, schedule]);

  const fetchJobDetails = async () => {
    setJobLoading(true);
    try {
      const config = {
        method: 'get',
        url: `${Env.REACT_APP_API_URL}job/get/68db6bfc47227e8ff1071b0a`,
        headers: { 
          'authorization': token,
          "Cache-Control": "no-cache",
        }
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
        method: 'get',
        url: `${Env.REACT_APP_API_URL}candidate/get/${schedule._id}`,
        headers: { 
          'authorization': token,
          "Cache-Control": "no-cache",
        }
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
    if (!selectedStatus) {
      toast.warning("Please select a status");
      return;
    }
    
    setIsLoading(true);
    try {
      await onSave(selectedStatus);
      toast.success("Schedule updated successfully");
      onClose();
    } catch (error) {
      console.error("Error saving schedule:", error);
      toast.error("Failed to update schedule");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      tabIndex="1"
      role="dialog"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          {/* Modal Header */}
          <div className="modal-header bg-primary text-white">
            <h4 className="modal-title">
              <i className="fas fa-calendar-alt mr-2"></i>
              Schedule Details ({moment(jobDetails.createdAt).format("DD-MM-YYYY")})
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
          <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
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
                        <span className="ml-2 text-dark">{candidateDetails.name}</span>
                      </p>
                      <p className="mb-2">
                        <strong className="text-dark">Email:</strong>
                        <span className="ml-2 text-dark">{candidateDetails.email}</span>
                      </p>
                    </div>
                    <div className="col-md-6 mb-3">
                      <p className="mb-2">
                        <strong className="text-dark">Phone:</strong>
                        <span className="ml-2 text-dark">{candidateDetails.phone}</span>
                      </p>
                      <p className="mb-2">
                        <strong className="text-dark">Current Status:</strong>
                        <span className={`badge ${candidateDetails.status === 'scheduled' ? 'badge-success' : 'badge-warning'} ml-2`}>
                          {candidateDetails.status}
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
                        <span className="ml-2 text-dark">{jobDetails.title}</span>
                      </p>
                      <p className="mb-2">
                        <strong className="text-dark">Field:</strong>
                        <span className="ml-2 text-dark">{jobDetails.field}</span>
                      </p>
                      <p className="mb-2">
                        <strong className="text-dark">Type:</strong>
                        <span className="badge badge-info ml-2">{jobDetails.type}</span>
                      </p>
                      <p className="mb-2">
                        <strong className="text-dark">Experience:</strong>
                        <span className="ml-2 text-dark">{jobDetails.experience}</span>
                      </p>
                    </div>
                    <div className="col-md-6 mb-3">
                      <p className="mb-2">
                        <strong className="text-dark">Salary:</strong>
                        <span className="ml-2 text-dark">₹{jobDetails.salary?.toLocaleString()}</span>
                      </p>
                      <p className="mb-2">
                        <strong className="text-dark">Shift:</strong>
                        <span className="ml-2 text-dark">{jobDetails.shift}</span>
                      </p>
                      <p className="mb-2">
                        <strong className="text-dark">Notice Period:</strong>
                        <span className="ml-2 text-dark">{jobDetails.noticePeriod}</span>
                      </p>
                      <p className="mb-2">
                        <strong className="text-dark">Package:</strong>
                        <span className={`badge ${jobDetails.package === 'Silver' ? 'badge-secondary' : 'badge-warning'} ml-2`}>
                          {jobDetails.package}
                        </span>
                      </p>
                    </div>
                  </div>
                  
                  {jobDetails.description && (
                    <div className="mt-3 mb-3">
                      <strong className="text-dark">Description:</strong>
                      <p className="mt-1 text-muted bg-light p-3 rounded">{jobDetails.description}</p>
                    </div>
                  )}

                  {jobDetails.benefits && (
                    <div className="mt-3 mb-3">
                      <strong className="text-dark">Benefits:</strong>
                      <div className="mt-2">
                        {jobDetails.benefits.split(', ').map((benefit, index) => (
                          <span key={index} className="badge badge-success mr-2 mb-2 p-2">
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {jobDetails.bondDescription && (
                    <div className="mt-3 mb-3">
                      <strong className="text-dark">Bond Information ({jobDetails.bondTime}):</strong>
                      <p className="mt-1 text-muted bg-light p-3 rounded">{jobDetails.bondDescription}</p>
                    </div>
                  )}

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <p className="mb-2">
                        <strong className="text-dark">Flexible Hours:</strong>
                        <span className={`badge ${jobDetails.flexibleWorkingHours ? 'badge-success' : 'badge-secondary'} ml-2`}>
                          {jobDetails.flexibleWorkingHours ? 'Yes' : 'No'}
                        </span>
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p className="mb-2">
                        <strong className="text-dark">Working Hours:</strong>
                        <span className="ml-2 text-dark">{jobDetails.workingHours}</span>
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
                <div className="form-group mb-0">
                  <label htmlFor="status-select" className="font-weight-bold text-dark">
                    Select New Status
                  </label>
                  <Select
                    id="status-select"
                    value={selectedStatus}
                    onChange={setSelectedStatus}
                    options={statusOptions}
                    placeholder="Choose status..."
                    isDisabled={isLoading}
                    className="mt-2"
                  />
                  <small className="form-text text-muted mt-2">
                    Current status: <strong className="text-dark">{candidateDetails?.status || 'N/A'}</strong>
                  </small>
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
              disabled={isLoading || !selectedStatus || jobLoading || candidateLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm mr-2" role="status"></span>
                  Saving...
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