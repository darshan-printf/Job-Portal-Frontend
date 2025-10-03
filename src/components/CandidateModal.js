import React, { useState } from "react";
import Select from 'react-select';
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const CandidateModal = ({ isOpen, onClose, candidate, onSave }) => {
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const Env = process.env;
  const token = localStorage.getItem("token");
 
  
  if (!isOpen) return null;

  // Status options for React Select
  const statusOptions = [
    { value: "pending", label: "Pending"  },
    { value: "scheduled", label: "Scheduled" },
    { value: "rejected", label: "Rejected" }
  ];

  // Handle status change
  const handleStatusChange = (selectedOption) => {
    setSelectedStatus(selectedOption );
  };

  // Handle Save Changes button click
  const handleSaveChanges = async () => {
    if (!selectedStatus) {
      toast.error("Please select a status");
      return;
    }
    setIsLoading(true);
    try {
      const data = JSON.stringify({
        candidateId: candidate._id,
        status: selectedStatus.value
      });
      const config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `${Env.REACT_APP_API_URL}candidate/changeStatus`,
        headers: { 
          'authorization': token, 
          'Content-Type': 'application/json'
        },
        data: data
      };
      const response = await axios.request(config);
    
      toast.success(response.data.message);
      onClose();
      onSave();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Custom styles for React Select
  const customStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused ? '#80bdff' : '#ced4da',
      boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(0, 123, 255, 0.25)' : 'none',
      '&:hover': {
        borderColor: state.isFocused ? '#80bdff' : '#adb5bd'
      }
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? '#007bff' : state.isFocused ? '#f8f9fa' : 'white',
      color: state.isSelected ? 'white' : '#212529'
    })
  };

  return (
    <div
      className="modal fade show"
      id="modal-default"
      style={{ display: "block" }}
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title"> Details of {candidate?.name} ({candidate?.jobId?.title})</h4>
            <button
              type="button"
              className="close"
              onClick={onClose}
              data-dismiss="modal"
              aria-label="Close"
              disabled={isLoading}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          
          <div className="modal-body">
            {/* React Select Status Selector */}
            <div className="form-group">
              <label htmlFor="statusSelect">Candidate Status</label>
              <Select
                id="statusSelect"
                options={statusOptions}
                value={selectedStatus || { value: candidate.status, label: candidate.status }}
                onChange={handleStatusChange}
                isDisabled={isLoading}
                placeholder="Select candidate status..."
                styles={customStyles}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: '#007bff',
                    primary25: '#e9ecef',
                    primary50: '#dee2e6'
                  }
                })}
              />
            </div>

            {/* PDF Viewer */}
            <div style={{ width: "100%", height: "50vh", overflow: "hidden", marginTop: "20px" }}>
              <iframe
                src={`${candidate.resume}`}
                width="100%"
                height="100%"
                style={{
                  border: "none",
                  display: "block",
                  overflow: "hidden",
                }}
                title="PDF Viewer"
              />
            </div>
          </div>

          <div className="modal-footer justify-content-end">
            <button
              type="button"
              className="btn btn-default"
              onClick={onClose}
              data-dismiss="modal"
              disabled={isLoading}
            >
              Close
            </button>
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={handleSaveChanges}
              disabled={isLoading || !selectedStatus}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                
                </>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateModal;