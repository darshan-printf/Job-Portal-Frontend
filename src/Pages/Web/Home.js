import React from "react";
import WebLayout from "../../components/WebLayout";
import { Link } from "react-router-dom";


export default function Home() {
  const Env = process.env;
  return (
    <WebLayout>
      <section id="hero" className="hero section">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
              <h1>Welcome To <span className="text-primary">{Env.REACT_APP_PROJECT_NAME}</span>  Develop Anything.</h1>
              <p>
                Post a job in minutes and start receiving qualified resumes as soon as today
              </p>
              <div className="d-flex">
                <Link to="/contact" className=" btn-get-started">
                  Get Started
                </Link>
                <Link
                  to="https://www.youtube.com/watch?v=Y7f98aduVJ8"
                  className="glightbox btn-watch-video d-flex align-items-center"
                ></Link>
              </div>
            </div>
            <div className="col-lg-6 order-1 order-lg-2 hero-img">
              <img
                src="Web/img/hero-img.png"
                className="img-fluid animated"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
      <section id="clients" className="clients section light-background">
        <div className="container" data-aos="fade-up">
          <div className="row gy-4">
            <div className="col-xl-2 col-md-3 col-6 client-logo">
              <img
                src="Web/img/clients/client-1.png"
                className="img-fluid"
                alt=""
              />
            </div>
            {/* End Client Item */}
            <div className="col-xl-2 col-md-3 col-6 client-logo">
              <img
                src="Web/img/clients/client-2.png"
                className="img-fluid"
                alt=""
              />
            </div>
            {/* End Client Item */}
            <div className="col-xl-2 col-md-3 col-6 client-logo">
              <img
                src="Web/img/clients/client-3.png"
                className="img-fluid"
                alt=""
              />
            </div>
            {/* End Client Item */}
            <div className="col-xl-2 col-md-3 col-6 client-logo">
              <img
                src="Web/img/clients/client-4.png"
                className="img-fluid"
                alt=""
              />
            </div>
            {/* End Client Item */}
            <div className="col-xl-2 col-md-3 col-6 client-logo">
              <img
                src="Web/img/clients/client-5.png"
                className="img-fluid"
                alt=""
              />
            </div>
            {/* End Client Item */}
            <div className="col-xl-2 col-md-3 col-6 client-logo">
              <img
                src="Web/img/clients/client-6.png"
                className="img-fluid"
                alt=""
              />
            </div>
            {/* End Client Item */}
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section id="features" className="features section">
        {/* Section Title */}
        <div className="container section-title" data-aos="fade-up">
          <h2>Features</h2>
          <p>
            Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
            consectetur velit
          </p>
        </div>
        {/* End Section Title */}
        <div className="container">
          <div className="row gy-4">
            {[
              { icon: "briefcase", color: "#ffbb2c", title: "Job Posting Management" },
              { icon: "person-lines-fill", color: "#5578ff", title: "Candidate Profile Management" },
              { icon: "clipboard-data", color: "#e80368", title: "Application Tracking System (ATS)" },
              { icon: "file-earmark-person", color: "#e361ff", title: "Resume Upload & Parsing" },
              { icon: "calendar-event", color: "#47aeff", title: "Interview Scheduling" },
              { icon: "shield-lock", color: "#ffa76e", title: "Role-Based Access Control" },
              { icon: "envelope-paper", color: "#11dbcf", title: "Automated Email Notifications" },
              { icon: "search", color: "#4233ff", title: "Search & Filter Candidates" },
              { icon: "file-earmark-text", color: "#b2904f", title: "Offer Letter Generation" },
              { icon: "bar-chart-line", color: "#b20969", title: "Analytics Dashboard" },
              { icon: "globe", color: "#ff5828", title: "Careers Page Integration" },
              { icon: "clock-history", color: "#29cc61", title: "Candidate Status History" },
            ]
              .map((feature, index) => (
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

      {/* /Team Section */}
      <section id="pricing" className="pricing section">
        {/* Section Title */}
        <div className="container section-title" data-aos="fade-up">
          <h2>Pricing</h2>
          <p>
            Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
            consectetur velit
          </p>
        </div>
        {/* End Section Title */}
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-4" data-aos="zoom-in" data-aos-delay={100}>
              <div className="pricing-item">
                <h3>Demo Plan</h3>
                <h4>
                  <sup>$</sup>10 <span>/ Demo</span>
                </h4>
                <ul>
                  <li>
                    <i className="bi bi-check" />{" "}
                    <span>Quam adipiscing vitae proin</span>
                  </li>
                  <li>
                    <i className="bi bi-check" />{" "}
                    <span>Nec feugiat nisl pretium</span>
                  </li>
                  <li>
                    <i className="bi bi-check" />{" "}
                    <span>Nulla at volutpat diam uteera</span>
                  </li>
                  <li className="na">
                    <i className="bi bi-x" />{" "}
                    <span>Pharetra massa massa ultricies</span>
                  </li>
                  <li className="na">
                    <i className="bi bi-x" />{" "}
                    <span>Massa ultricies mi quis hendrerit</span>
                  </li>
                </ul>
                <a href="#" className="buy-btn">
                  Buy Now
                </a>
              </div>
            </div>
            {/* End Pricing Item */}
            <div className="col-lg-4" data-aos="zoom-in" data-aos-delay={200}>
              <div className="pricing-item featured">
                <h3>Business Plan</h3>
                <h4>
                  <sup>$</sup>199<span> / month</span>
                </h4>
                <ul>
                  <li>
                    <i className="bi bi-check" />{" "}
                    <span>Quam adipiscing vitae proin</span>
                  </li>
                  <li>
                    <i className="bi bi-check" />{" "}
                    <span>Nec feugiat nisl pretium</span>
                  </li>
                  <li>
                    <i className="bi bi-check" />{" "}
                    <span>Nulla at volutpat diam uteera</span>
                  </li>
                  <li>
                    <i className="bi bi-check" />{" "}
                    <span>Pharetra massa massa ultricies</span>
                  </li>
                  <li>
                    <i className="bi bi-check" />{" "}
                    <span>Massa ultricies mi quis hendrerit</span>
                  </li>
                </ul>
                <a href="#" className="buy-btn">
                  Buy Now
                </a>
              </div>
            </div>
            {/* End Pricing Item */}
            <div className="col-lg-4" data-aos="zoom-in" data-aos-delay={300}>
              <div className="pricing-item">
                <h3>Premium Plan</h3>
                <h4>
                  <sup>$</sup>399<span> / month</span>
                </h4>
                <ul>
                  <li>
                    <i className="bi bi-check" />{" "}
                    <span>Quam adipiscing vitae proin</span>
                  </li>
                  <li>
                    <i className="bi bi-check" />{" "}
                    <span>Nec feugiat nisl pretium</span>
                  </li>
                  <li>
                    <i className="bi bi-check" />{" "}
                    <span>Nulla at volutpat diam uteera</span>
                  </li>
                  <li>
                    <i className="bi bi-check" />{" "}
                    <span>Pharetra massa massa ultricies</span>
                  </li>
                  <li>
                    <i className="bi bi-check" />{" "}
                    <span>Massa ultricies mi quis hendrerit</span>
                  </li>
                </ul>
                <a href="#" className="buy-btn">
                  Buy Now
                </a>
              </div>
            </div>
            {/* End Pricing Item */}
          </div>
        </div>
      </section>



    </WebLayout>
  );
}
