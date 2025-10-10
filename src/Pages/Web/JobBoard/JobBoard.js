import React from "react";
import WebLayout from "../../../components/WebLayout";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function JobBoard() {
  const services = [
    
    {
      icon: "bi bi-people",
      title: "Human Resource",
      desc: "HR and admin related job opportunities",
    },
      {
      icon: "bi bi-people",
      title: "Human Resource",
      desc: "HR and admin related job opportunities",
    },
      {
      icon: "bi bi-people",
      title: "Human Resource",
      desc: "HR and admin related job opportunities",
    },
      {
      icon: "bi bi-people",
      title: "Human Resource",
      desc: "HR and admin related job opportunities",
    },
      
    


  ];
  return (
    <WebLayout>
      <section id="services" className="services section pb-0">
      <div className="container section-title pb-3" data-aos="fade-up">
        <h2>Job Board</h2>
        <p>Find your dream job here. Apply now and start your journey towards a successful career.</p>
      </div>

      <div className="container">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          className="row"
          slidesPerView={4}
          navigation

          pagination={{ clickable: true }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {services.map((service, index) => (
            <SwiperSlide key={index} className="col-xl-3 col-md-6 d-flex p-3 ">
              <div className="service-item position-relative px-3">
                <i className={service.icon} />
                <h4>
                  <a href="" className="stretched-link">
                    {service.title}
                  </a>
                </h4>
                <p>
                 {service.desc}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
      {/* Features Section */}
      <section id="features" className="features section">
        {/* Section Title */}
        
        {/* End Section Title */}
        <div className="container">
          <div className="row gy-4">
            {[
              {
                icon: "briefcase",
                color: "#ffbb2c",
                title: "Job Posting Management",
              },
              {
                icon: "person-lines-fill",
                color: "#5578ff",
                title: "Candidate Profile Management",
              },
              {
                icon: "clipboard-data",
                color: "#e80368",
                title: "Application Tracking System (ATS)",
              },
              {
                icon: "file-earmark-person",
                color: "#e361ff",
                title: "Resume Upload & Parsing",
              },
              {
                icon: "calendar-event",
                color: "#47aeff",
                title: "Interview Scheduling",
              },
              {
                icon: "shield-lock",
                color: "#ffa76e",
                title: "Role-Based Access Control",
              },
              {
                icon: "envelope-paper",
                color: "#11dbcf",
                title: "Automated Email Notifications",
              },
              {
                icon: "search",
                color: "#4233ff",
                title: "Search & Filter Candidates",
              },
              {
                icon: "file-earmark-text",
                color: "#b2904f",
                title: "Offer Letter Generation",
              },
              {
                icon: "bar-chart-line",
                color: "#b20969",
                title: "Analytics Dashboard",
              },
              {
                icon: "globe",
                color: "#ff5828",
                title: "Careers Page Integration",
              },
              {
                icon: "clock-history",
                color: "#29cc61",
                title: "Candidate Status History",
              },
            ].map((feature, index) => (
              <div
                className="col-lg-3 col-md-4"
                data-aos="fade-up"
                data-aos-delay={100 * (index + 1)}
                key={index}
              >
                <div className="features-item">
                  <i
                    className={`bi bi-${feature.icon}`}
                    style={{ color: feature.color }}
                  />
                  <h3>
                    <span
                      className="stretched-link"
                      style={{ pointerEvents: "none", cursor: "default" }}
                    >
                      {feature.title}
                    </span>
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </WebLayout>
  );
}
