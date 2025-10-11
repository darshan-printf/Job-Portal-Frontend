import React, { useState } from "react";
import WebLayout from "../../../components/WebLayout";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function JobBoard() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activePackage, setActivePackage] = useState("All");

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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
      title: "Junior Developer",
      company: "StartUp Tech",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$65,000",
      category: "Information Technology",
      posted: "1 day ago",
      urgent: false,
      package: "silver",
      featured: false,
      highlights: ["Standard Listing"],
    },
    {
      title: "Senior Marketing Manager",
      company: "Brand Masters",
      location: "Los Angeles, CA",
      type: "Full-time",
      salary: "$95,000",
      category: "Marketing",
      posted: "4 days ago",
      urgent: true,
      package: "gold",
      featured: true,
      highlights: ["Featured Position", "Company Profile"],
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
      // If same package is clicked again, remove filter
      setActivePackage("All");
    } else {
      // Set new package filter
      setActivePackage(pkgType);
    }
  };

  return (
    <WebLayout>
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
          

          {/* Job Listings */}
          <div className="row">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, index) => {
                const pkg = getPackageStyle(job.package);
                return (
                  <div
                    className="col-lg-6 mb-4"
                    key={index}
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
                            <button className={`btn btn-${pkg.color} btn-sm`}>
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