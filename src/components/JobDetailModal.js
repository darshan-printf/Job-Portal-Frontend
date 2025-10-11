import React from "react";

const JobModal = ({ job, show, onClose, packageTypes }) => {
  if (!job || !show) return null;

  // Function to get package styling
  const getPackageStyle = (pkg) => {
    return packageTypes[pkg] || packageTypes.silver;
  };

  // Calculate salary breakdown
  const calculateSalaryBreakdown = (salary) => {
    const baseSalary = parseInt(salary.replace(/[₹,]/g, ''));
    return {
      baseSalary: baseSalary,
      tax: baseSalary * 0.18, // 25% tax
      ctc: baseSalary * 1.15, // 15% additional benefits
      cashInHand: baseSalary * 0.75, // After tax
      benefits: baseSalary * 0.15 // Additional benefits
    };
  };

  const pkg = getPackageStyle(job.package);
  const salaryBreakdown = calculateSalaryBreakdown(job.salary);
  console.log(job.salary,"job.salary")

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <div>
              <h4 className="modal-title">{job.title}</h4>
              <p className="mb-0 text-muted">{job.company} • {job.location}</p>
            </div>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          
          <div className="modal-body">
            {/* Header Info */}
            <div className="row mb-4">
              <div className="col-md-8">
                <div className="d-flex flex-wrap gap-2 mb-3">
                  <span className={`badge ${pkg.badgeClass}`}>
                    <i className={`${pkg.icon} me-1`}></i>
                    {pkg.name} Package
                  </span>
                  {job.urgent && <span className="badge bg-danger">Urgent</span>}
                  {job.featured && <span className="badge bg-success">Featured</span>}
                  <span className="badge bg-info">{job.type}</span>
                  <span className="badge bg-secondary">{job.experienceLevel}</span>
                </div>
                
                <div className="d-flex flex-wrap gap-3 text-muted">
                  <div>
                    <i className="bi bi-calendar me-1"></i>
                    Posted: {job.posted}
                  </div>
                  <div>
                    <i className="bi bi-clock me-1"></i>
                    Post Date: {new Date(job.applicationDeadline).toLocaleDateString()}
                  </div>
                  <div>
                    <i className="bi bi-book me-1"></i>
                    {job.education}
                  </div>
                </div>
              </div>
              <div className="col-md-4 text-end">
                <div className="salary-display">
                  <h3 className="text-success mb-1">{job.salary}</h3>
                  <small className="text-muted">per year</small>
                </div>
              </div>
            </div>

            {/* Salary Breakdown */}
            <div className="card mb-4">
              <div className="card-header bg-light">
                <h5 className="mb-0">
                  <i className="bi bi-calculator me-2"></i>
                  Salary Breakdown & Benefits
                </h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <table className="table table-bordered">
                      <thead className="table-light">
                        <tr>
                          <th>Component</th>
                          <th className="text-end">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Base Salary</td>
                          <td className="text-end">₹{salaryBreakdown.baseSalary.toLocaleString()}</td>
                        </tr>
                        <tr>
                          <td>Tax (18%)</td>
                          <td className="text-end text-danger">-₹{salaryBreakdown.tax.toLocaleString()}</td>
                        </tr>
                        <tr>
                          <td>Benefits & Bonuses</td>
                          <td className="text-end text-success">+₹{salaryBreakdown.benefits.toLocaleString()}</td>
                        </tr>
                        <tr className="table-success fw-bold">
                          <td>CTC (Cost to Company)</td>
                          <td className="text-end">₹{salaryBreakdown.ctc.toLocaleString()}</td>
                        </tr>
                        <tr className="table-primary fw-bold">
                          <td>Cash in Hand (Annual)</td>
                          <td className="text-end">₹{salaryBreakdown.cashInHand.toLocaleString()}</td>
                        </tr>
                        <tr className="table-info">
                          <td>Monthly Take Home</td>
                          <td className="text-end">₹{(salaryBreakdown.cashInHand / 12).toLocaleString()}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="col-md-12">
                    <h6 className="mb-3">Benefits Included:</h6>
                    <div className="row">
                      {job.benefits.map((benefit, index) => (
                        <div key={index} className="col-6 mb-2">
                          <i className="bi bi-check-circle text-success me-2"></i>
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="mb-4">
              <h5 className="mb-3">
                <i className="bi bi-file-text me-2"></i>
                Job Description
              </h5>
              <p className="text-muted">{job.description}</p>
            </div>

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <div className="mb-4">
                <h5 className="mb-3">
                  <i className="bi bi-list-check me-2"></i>
                  Requirements
                </h5>
                <div className="row">
                  {job.requirements.map((requirement, index) => (
                    <div key={index} className="col-md-6 mb-2">
                      <i className="bi bi-arrow-right-short text-primary me-2"></i>
                      {requirement}
                    </div>
                  ))}
                </div>
              </div>
            )}

            
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button type="button" className={`btn btn-${pkg.color}`}>
              <i className="bi bi-send me-2"></i>
              Apply for this Position
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobModal;