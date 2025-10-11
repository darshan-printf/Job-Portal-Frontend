import React, { useState } from "react";
import WebLayout from "../../../components/WebLayout";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function JobBoard() {
  const [activeCategory, setActiveCategory] = useState("All");
  
  // Sample data - replace with actual data from your API
  const jobCategories = [
    
    {
      icon: "bi bi-code-slash",
      title: "Info Technology",
      desc: "Software development and IT positions",
      count: 18
    },
    {
      icon: "bi bi-graph-up",
      title: "Marketing",
      desc: "Digital marketing and sales roles",
      count: 15
    },
    {
      icon: "bi bi-calculator",
      title: "Finance",
      desc: "Accounting and financial services",
      count: 12
    },
    {
      icon: "bi bi-heart-pulse",
      title: "Healthcare",
      desc: "Medical and healthcare professionals",
      count: 20
    },
    {
      icon: "bi bi-mortarboard",
      title: "Education",
      desc: "Teaching and academic positions",
      count: 8
    },
  ];
  const jobListings = [
    {
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "Remote",
      type: "Full-time",
      salary: "$90,000 - $120,000",
      category: "Technology",
      posted: "2 days ago",
      urgent: true
    },
    {
      title: "HR Manager",
      company: "Global Solutions",
      location: "New York, NY",
      type: "Full-time",
      salary: "$75,000 - $95,000",
      category: "Human Resources",
      posted: "1 week ago",
      urgent: false
    },
    {
      title: "Marketing Specialist",
      company: "Digital Boost",
      location: "Chicago, IL",
      type: "Contract",
      salary: "$60,000 - $80,000",
      category: "Marketing",
      posted: "3 days ago",
      urgent: true
    },
    {
      title: "Financial Analyst",
      company: "Wealth Management",
      location: "Boston, MA",
      type: "Full-time",
      salary: "$85,000 - $110,000",
      category: "Finance",
      posted: "5 days ago",
      urgent: false
    },
  ];

  const filteredJobs = activeCategory === "All" 
    ? jobListings 
    : jobListings.filter(job => job.category === activeCategory);

  return (
    <WebLayout>
      {/* Featured Jobs */}
      <section className="featured-jobs section bg-light">
        <div className="container">
          <div className="section-title pb-3 " data-aos="fade-up">
            <div className=" justify-content-between section-title text-center p-0">
              <div>
                <h2>Job Board</h2>
                <p>Latest opportunities from top employers</p>
              </div>
              <div className="category-filters mt-3">
                <button 
                  className={`btn ${activeCategory === 'All' ? 'btn-primary' : 'btn-outline-primary'} me-2 mb-2`}
                  onClick={() => setActiveCategory('All')}
                >
                  All Jobs
                </button>
                {jobCategories.map(category => (
                  <button
                    key={category.title}
                    className={`btn ${activeCategory === category.title ? 'btn-primary' : 'btn-outline-primary'} me-2 mb-2`}
                    onClick={() => setActiveCategory(category.title)}
                  >
                    {category.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="row">
            {filteredJobs.map((job, index) => (
              <div 
                className="col-lg-6 mb-4" 
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="job-card card h-100 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <h5 className="card-title mb-1">
                          {job.title}
                          {job.urgent && <span className="badge bg-danger ms-2">Urgent</span>}
                        </h5>
                        <p className="card-text text-muted mb-1">{job.company}</p>
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
                    <div className="job-meta d-flex justify-content-between align-items-center">
                      <span className="badge bg-light text-dark">{job.category}</span>
                      <div>
                        <button className="btn btn-outline-primary btn-sm me-2">
                          <i className="bi bi-bookmark"></i>
                        </button>
                        <button className="btn btn-primary btn-sm">
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </WebLayout>
  );
}