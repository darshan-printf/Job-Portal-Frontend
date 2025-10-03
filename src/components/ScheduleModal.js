import React, { useState } from "react";
import Select from 'react-select';
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const ScheduleModal = ({ isOpen, onClose, onSave ,schedule }) => {
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const Env = process.env;
  const token = localStorage.getItem("token");
 
  console.log(schedule?.companyId,"schedule")
  if (!isOpen) return null;

 
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
            <h4 className="modal-title"> Details of </h4>
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
              disabled={isLoading || !selectedStatus}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm " role="status" aria-hidden="true"></span>
                
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

export default ScheduleModal;