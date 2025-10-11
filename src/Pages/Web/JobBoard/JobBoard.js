import React, { useState } from "react";
import WebLayout from "../../../components/WebLayout";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function JobBoard() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activePackage, setActivePackage] = useState("All");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Package types with unique styling
  const packageTypes = {
    silver: {
      name: "Silver",
      color: "secondary",
      badgeClass: "bg-secondary",
      borderClass: "border-secondary",
      icon: "bi bi-star",
    },
    gold: {
      name: "Gold",
      color: "warning",
      badgeClass: "bg-warning",
      borderClass: "border-warning",
      icon: "bi bi-star-fill",
    },
    platinum: {
      name: "Platinum",
      color: "primary",
      badgeClass: "bg-primary",
      borderClass: "border-primary",
      icon: "bi bi-gem",
    },
  };

  // Sample data with package types
  const jobCategories = [
    {
      icon: "bi bi-code-slash",
      title: "Information Technology",
      desc: "Software development and IT positions",
      count: 18,
    },
    {
      icon: "bi bi-graph-up",
      title: "Marketing",
      desc: "Digital marketing and sales roles",
      count: 15,
    },
    {
      icon: "bi bi-calculator",
      title: "Finance",
      desc: "Accounting and financial services",
      count: 12,
    },
    {
      icon: "bi bi-heart-pulse",
      title: "Healthcare",
      desc: "Medical and healthcare professionals",
      count: 20,
    },
    {
      icon: "bi bi-mortarboard",
      title: "Education",
      desc: "Teaching and academic positions",
      count: 8,
    },
  ];

  const jobListings = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "Remote",
      type: "Full-time",
      salary: "$90,000",
      category: "Information Technology",
      posted: "2 days ago",
      urgent: true,
      package: "platinum",
      featured: true,
      highlights: [
        "Priority Listing",
        "Featured Position",
        "Company Logo Display",
      ],
      description: "We are looking for an experienced Frontend Developer to join our dynamic team. You will be responsible for developing and implementing user interface components using React.js concepts and workflows such as Redux, Flux, and Webpack.",
      requirements: [
        "5+ years of experience in frontend development",
        "Proficient in React.js, JavaScript, HTML5, CSS3",
        "Experience with state management libraries (Redux)",
        "Knowledge of modern authorization mechanisms",
        "Familiarity with modern frontend build pipelines and tools"
      ],
      benefits: [
        "Health, dental, and vision insurance",
        "401(k) with company matching",
        "Flexible work hours",
        "Remote work options",
        "Professional development budget"
      ],
      applicationDeadline: "2024-02-15",
      experienceLevel: "Senior",
      education: "Bachelor's in Computer Science or related field"
    },
    {
      id: 2,
      title: "HR Manager",
      company: "Global Solutions",
      location: "New York, NY",
      type: "Full-time",
      salary: "$75,000",
      category: "Human Resources",
      posted: "1 week ago",
      urgent: false,
      package: "silver",
      featured: false,
      highlights: ["Standard Listing"],
      description: "We are seeking an experienced HR Manager to oversee all aspects of human resources practices and processes. The ideal candidate will support business needs and ensure the proper implementation of company strategy and objectives.",
      requirements: [
        "Bachelor's degree in Human Resources or related field",
        "5+ years of experience in HR management",
        "Knowledge of HR systems and databases",
        "Excellent active listening and negotiation skills",
        "People-oriented and results-driven"
      ],
      benefits: [
        "Competitive salary package",
        "Health insurance",
        "Paid time off",
        "Career advancement opportunities",
        "Employee assistance program"
      ],
      applicationDeadline: "2024-02-20",
      experienceLevel: "Mid-Senior",
      education: "Bachelor's in Human Resources or related field"
    },
    {
      id: 3,
      title: "Marketing Specialist",
      company: "Digital Boost",
      location: "Chicago, IL",
      type: "Contract",
      salary: "$60,000",
      category: "Marketing",
      posted: "3 days ago",
      urgent: true,
      package: "gold",
      featured: true,
      highlights: ["Featured Position", "Highlighted Listing"],
      description: "Join our marketing team as a Marketing Specialist where you'll develop and implement marketing strategies to increase brand awareness and drive customer engagement.",
      requirements: [
        "3+ years of experience in marketing",
        "Experience with digital marketing tools",
        "Excellent written and verbal communication skills",
        "Knowledge of SEO/SEM and Google Analytics",
        "Creative thinking and problem-solving skills"
      ],
      benefits: [
        "Flexible schedule",
        "Performance bonuses",
        "Professional development",
        "Networking opportunities",
        "Creative work environment"
      ],
      applicationDeadline: "2024-02-18",
      experienceLevel: "Mid-Level",
      education: "Bachelor's in Marketing or related field"
    },
    {
      id: 4,
      title: "Financial Analyst",
      company: "Wealth Management",
      location: "Boston, MA",
      type: "Full-time",
      salary: "$85,000",
      category: "Finance",
      posted: "5 days ago",
      urgent: false,
      package: "platinum",
      featured: true,
      highlights: ["Priority Listing", "Featured Position", "Urgent Hiring"],
      description: "We are looking for a Financial Analyst to provide accurate and data-based information on company's profitability, solvency, stability, and liquidity.",
      requirements: [
        "Bachelor's degree in Finance, Economics, or related field",
        "3+ years of experience as a Financial Analyst",
        "Proficiency in MS Excel and financial software",
        "Knowledge of financial forecasting and diagnosis",
        "Strong analytical and presentation skills"
      ],
      benefits: [
        "Comprehensive health benefits",
        "Retirement plan with matching",
        "Bonus potential",
        "Tuition reimbursement",
        "Work-life balance programs"
      ],
      applicationDeadline: "2024-02-25",
      experienceLevel: "Mid-Level",
      education: "Bachelor's in Finance or related field"
    },
  ];

  // Combined filter function
  const filteredJobs = jobListings.filter((job) => {
    const categoryMatch = activeCategory === "All" || job.category === activeCategory;
    const packageMatch = activePackage === "All" || job.package === activePackage;
    return categoryMatch && packageMatch;
  });

  // Function to get package styling
  const getPackageStyle = (pkg) => {
    return packageTypes[pkg] || packageTypes.silver;
  };

  // Toggle function for package filter
  const togglePackageFilter = (pkgType) => {
    if (activePackage === pkgType) {
      setActivePackage("All");
    } else {
      setActivePackage(pkgType);
    }
  };

  // Handle Apply Now button click
  const handleApplyNow = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  // Calculate salary breakdown
  const calculateSalaryBreakdown = (salary) => {
    const baseSalary = parseInt(salary.replace(/[$,]/g, ''));
    return {
      baseSalary: baseSalary,
      tax: baseSalary * 0.25, // 25% tax
      ctc: baseSalary * 1.15, // 15% additional benefits
      cashInHand: baseSalary * 0.75, // After tax
      benefits: baseSalary * 0.15 // Additional benefits
    };
  };

  // Job Detail Modal Component
  const JobDetailModal = ({ job, show, onClose }) => {
    if (!job || !show) return null;

    const pkg = getPackageStyle(job.package);
    const salaryBreakdown = calculateSalaryBreakdown(job.salary);

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
                            <td className="text-end">${salaryBreakdown.baseSalary.toLocaleString()}</td>
                          </tr>
                          <tr>
                            <td>Tax (25%)</td>
                            <td className="text-end text-danger">-${salaryBreakdown.tax.toLocaleString()}</td>
                          </tr>
                          <tr>
                            <td>Benefits & Bonuses</td>
                            <td className="text-end text-success">+${salaryBreakdown.benefits.toLocaleString()}</td>
                          </tr>
                          <tr className="table-success fw-bold">
                            <td>CTC (Cost to Company)</td>
                            <td className="text-end">${salaryBreakdown.ctc.toLocaleString()}</td>
                          </tr>
                          <tr className="table-primary fw-bold">
                            <td>Cash in Hand (Annual)</td>
                            <td className="text-end">${salaryBreakdown.cashInHand.toLocaleString()}</td>
                          </tr>
                          <tr className="table-info">
                            <td>Monthly Take Home</td>
                            <td className="text-end">${(salaryBreakdown.cashInHand / 12).toLocaleString()}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="col-md-12">
                      <h6 className="mb-3">Benefits Included:</h6>
                      <div className="row">
                        {job.benefits.map((benefit, index) => (
                          <div key={index} className="col-6 mb-2">
                            <i className="bi bi-check-circle text-success me-2 "></i>{benefit}
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

  return (
    <WebLayout>
      {/* Job Detail Modal */}
      <JobDetailModal 
        job={selectedJob} 
        show={showModal} 
        onClose={() => setShowModal(false)} 
      />

      {/* Featured Jobs */}
      <section className="featured-jobs section bg-light">
        <div className="container">
          <div className="section-title pb-3" data-aos="fade-up">
            <div className="justify-content-between section-title text-center p-0">
              <div className="mb-4">
                <h2>Job Board</h2>
                <p>Latest opportunities from top employers</p>
              </div>
              
              {/* Package Cards - Toggle Functionality */}
              <div className="container">
                <div className="row text-center">
                  <div className="col-md-4 mb-3">
                    <div 
                      className={`package-card card h-100 ${activePackage === "silver" ? "border-secondary border-3 shadow" : "border-secondary"}`}
                      onClick={() => togglePackageFilter("silver")}
                      style={{ cursor: 'pointer', transition: 'all 0.3s' }}
                    >
                      <div className="card-body">
                        <i className="bi bi-star fs-1 text-secondary"></i>
                        <h5 className="card-title mt-2">Silver Package</h5>
                        <p className="card-text text-muted">
                          Standard job listing with basic visibility
                        </p>
                        {activePackage === "silver" && (
                          <div className="badge bg-secondary text-white mt-2">
                            <i className="bi bi-check-lg me-1"></i>
                            Active
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div 
                      className={`package-card card h-100 ${activePackage === "gold" ? "border-warning border-3 shadow" : "border-warning"}`}
                      onClick={() => togglePackageFilter("gold")}
                      style={{ cursor: 'pointer', transition: 'all 0.3s' }}
                    >
                      <div className="card-body">
                        <i className="bi bi-star-fill fs-1 text-warning"></i>
                        <h5 className="card-title mt-2">Gold Package</h5>
                        <p className="card-text text-muted">
                          Featured listing with highlighted placement
                        </p>
                        {activePackage === "gold" && (
                          <div className="badge bg-warning text-white mt-2">
                            <i className="bi bi-check-lg me-1"></i>
                            Active
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div 
                      className={`package-card card h-100 ${activePackage === "platinum" ? "border-primary border-3 shadow" : "border-primary"}`}
                      onClick={() => togglePackageFilter("platinum")}
                      style={{ cursor: 'pointer', transition: 'all 0.3s' }}
                    >
                      <div className="card-body">
                        <i className="bi bi-gem fs-1 text-primary"></i>
                        <h5 className="card-title mt-2">Platinum Package</h5>
                        <p className="card-text text-muted">
                          Premium visibility with urgent priority
                        </p>
                        {activePackage === "platinum" && (
                          <div className="badge bg-primary text-white mt-2">
                            <i className="bi bi-check-lg me-1"></i>
                            Active
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Category Filters */}
              <div className="category-filters mt-4 mb-4">
                <button
                  className={`btn ${
                    activeCategory === "All"
                      ? "btn-primary"
                      : "btn-outline-primary"
                  } me-2 mb-2`}
                  onClick={() => setActiveCategory("All")}
                >
                  All Jobs
                </button>
                {jobCategories.map((category) => (
                  <button
                    key={category.title}
                    className={`btn ${
                      activeCategory === category.title
                        ? "btn-primary"
                        : "btn-outline-primary"
                    } me-2 mb-2`}
                    onClick={() => {
                      if (activeCategory === category.title) {
                        setActiveCategory("All");
                      } else {
                        setActiveCategory(category.title);
                      }
                    }}
                  >
                    {category.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-4">
            <p className="text-muted">
              Showing {filteredJobs.length} of {jobListings.length} jobs
              {activeCategory !== "All" && ` in ${activeCategory}`}
              {activePackage !== "All" && ` with ${packageTypes[activePackage]?.name} Package`}
            </p>
          </div>

          {/* Job Listings */}
          <div className="row">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, index) => {
                const pkg = getPackageStyle(job.package);
                return (
                  <div
                    className="col-lg-6 mb-4"
                    key={job.id}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div
                      className={`job-card card h-100 shadow-sm border-3 ${
                        pkg.borderClass
                      } ${job.featured ? "featured-job" : ""}`}
                    >
                      <div className="card-body position-relative">
                        {/* Package Badge */}
                        <div
                          className={`package-badge ${pkg.badgeClass} text-white px-3 py-1 rounded-pill position-absolute top-0 start-50 translate-middle`}
                        >
                          <i className={`${pkg.icon} me-1`}></i>
                          {pkg.name} Package
                        </div>

                        <div className="d-flex justify-content-between align-items-start mb-3 mt-3">
                          <div>
                            <h5 className="card-title mb-1">
                              {job.title}
                              {job.urgent && (
                                <span className="badge bg-danger ms-2">
                                  Urgent
                                </span>
                              )}
                              {job.featured && (
                                <span className="badge bg-success ms-2">
                                  Featured
                                </span>
                              )}
                            </h5>
                            <p className="card-text text-muted mb-1">
                              {job.company}
                            </p>
                            <p className="card-text text-muted small">
                              <i className="bi bi-geo-alt me-1"></i>
                              {job.location} • {job.type}
                            </p>
                          </div>
                          <div className="text-end">
                            <div className="salary-badge bg-success text-white px-2 py-1 rounded mb-2">
                              {job.salary}
                            </div>
                            <small className="text-muted">{job.posted}</small>
                          </div>
                        </div>

                        {/* Package Highlights */}
                        <div className="package-highlights mb-3">
                          <div className="d-flex flex-wrap gap-1">
                            {job.highlights.map((highlight, idx) => (
                              <span
                                key={idx}
                                className={`badge bg-light text-${pkg.color} border border-${pkg.color}`}
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="job-meta d-flex justify-content-between align-items-center">
                          <span className="badge bg-light text-dark">
                            {job.category}
                          </span>
                          <div>
                            <button 
                              className={`btn btn-${pkg.color} btn-sm`}
                              onClick={() => handleApplyNow(job)}
                            >
                              Apply Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-12 text-center py-5">
                <i className="bi bi-search display-1 text-muted"></i>
                <h4 className="mt-3">No jobs found</h4>
                <p className="text-muted">
                  No jobs match your current filters. Try adjusting your criteria.
                </p>
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    setActiveCategory("All");
                    setActivePackage("All");
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </WebLayout>
  );
}