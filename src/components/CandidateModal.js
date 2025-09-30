import React from "react";
import { FaRegFilePdf } from "react-icons/fa";

const CandidateModal = ({ isOpen, onClose, candidate, packageConfig }) => {
  if (!isOpen) return null;
  const Env = process.env;

  //Large Modal
  return (
    <div
      class="modal fade show "
      id="modal-default"
      style={{ display: "block" }}
      aria-modal="true"
      role="dialog"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Default Modal</h4>
            <button
              type="button"
              class="close"
              onClick={onClose}
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div style={{ width: "100%", height: "60vh", overflow: "hidden" }}>
            <iframe
              src={`${candidate.resume}`}
              width="100%"
              height="100%"
              style={{
                border: "none",
                display: "block", // inline-block gap avoid karega
                overflow: "hidden",
              }}
              title="PDF Viewer"
            />
           
          </div>

          <div class="modal-footer justify-content-between">
            <button
              type="button"
              class="btn btn-default"
              onClick={onClose}
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateModal;
