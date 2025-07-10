import React from "react";
import WebLayout from "../../components/WebLayout";
import { Link } from "react-router-dom";

export default function Home() {
  const Env   = process.env;
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
                <a
                  href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
                  className="glightbox btn-watch-video d-flex align-items-center"
                ></a>
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

      <section id="about" className="about section">
        {/* Section Title */}
        <div className="container section-title" data-aos="fade-up">
          <h2>About Us</h2>
          <p>
            Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
            consectetur velit
          </p>
        </div>
        {/* End Section Title */}
        <div className="container">
          <div className="row gy-5">
            <div
              className="content col-xl-5 d-flex flex-column"
              data-aos="fade-up"
              data-aos-delay={100}
            >
              <h3>Voluptatem dignissimos provident quasi</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis
                aute irure dolor in reprehenderit
              </p>
              <a
                href="#"
                className="about-btn align-self-center align-self-xl-start"
              >
                <span>About us</span> <i className="bi bi-chevron-right" />
              </a>
            </div>
            <div className="col-xl-7" data-aos="fade-up" data-aos-delay={200}>
              <div className="row gy-4">
                <div className="col-md-6 icon-box position-relative">
                  <i className="bi bi-briefcase" />
                  <h4>
                    <a href="" className="stretched-link">
                      Corporis voluptates sit
                    </a>
                  </h4>
                  <p>
                    Consequuntur sunt aut quasi enim aliquam quae harum pariatur
                    laboris nisi ut aliquip
                  </p>
                </div>
                {/* Icon-Box */}
                <div className="col-md-6 icon-box position-relative">
                  <i className="bi bi-gem" />
                  <h4>
                    <a href="" className="stretched-link">
                      Ullamco laboris nisi
                    </a>
                  </h4>
                  <p>
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt
                  </p>
                </div>
                {/* Icon-Box */}
                <div className="col-md-6 icon-box position-relative">
                  <i className="bi bi-broadcast" />
                  <h4>
                    <a href="" className="stretched-link">
                      Labore consequatur
                    </a>
                  </h4>
                  <p>
                    Aut suscipit aut cum nemo deleniti aut omnis. Doloribus ut
                    maiores omnis facere
                  </p>
                </div>
                {/* Icon-Box */}
                <div className="col-md-6 icon-box position-relative">
                  <i className="bi bi-easel" />
                  <h4>
                    <a href="" className="stretched-link">
                      Beatae veritatis
                    </a>
                  </h4>
                  <p>
                    Expedita veritatis consequuntur nihil tempore laudantium
                    vitae denat pacta
                  </p>
                </div>
                {/* Icon-Box */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section id="services" className="services section">
        {/* Section Title */}
        <div className="container section-title" data-aos="fade-up">
          <h2>Services</h2>
          <p>
            Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
            consectetur velit
          </p>
        </div>
        {/* End Section Title */}
        <div className="container">
          <div className="row gy-4">
            <div
              className="col-xl-3 col-md-6 d-flex"
              data-aos="fade-up"
              data-aos-delay={100}
            >
              <div className="service-item position-relative">
                <i className="bi bi-activity" />
                <h4>
                  <a href="" className="stretched-link">
                    Lorem Ipsum
                  </a>
                </h4>
                <p>
                  Voluptatum deleniti atque corrupti quos dolores et quas
                  molestias excepturi
                </p>
              </div>
            </div>
            {/* End Service Item */}
            <div
              className="col-xl-3 col-md-6 d-flex"
              data-aos="fade-up"
              data-aos-delay={200}
            >
              <div className="service-item position-relative">
                <i className="bi bi-bounding-box-circles" />
                <h4>
                  <a href="" className="stretched-link">
                    Sed ut perspici
                  </a>
                </h4>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore
                </p>
              </div>
            </div>
            {/* End Service Item */}
            <div
              className="col-xl-3 col-md-6 d-flex"
              data-aos="fade-up"
              data-aos-delay={300}
            >
              <div className="service-item position-relative">
                <i className="bi bi-calendar4-week" />
                <h4>
                  <a href="" className="stretched-link">
                    Magni Dolores
                  </a>
                </h4>
                <p>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia
                </p>
              </div>
            </div>
            {/* End Service Item */}
            <div
              className="col-xl-3 col-md-6 d-flex"
              data-aos="fade-up"
              data-aos-delay={400}
            >
              <div className="service-item position-relative">
                <i className="bi bi-broadcast" />
                <h4>
                  <a href="" className="stretched-link">
                    Nemo Enim
                  </a>
                </h4>
                <p>
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui
                  blanditiis
                </p>
              </div>
            </div>
            {/* End Service Item */}
          </div>
        </div>
      </section>
      <section id="alt-services" className="alt-services section">
        <div className="container" data-aos="fade-up" data-aos-delay={100}>
          <div className="row gy-4">
            <div className="col-lg-6" data-aos="zoom-in" data-aos-delay={200}>
              <div className="service-item position-relative">
                <div className="img">
                  <img
                    src="Web/img/services-1.jpg"
                    className="img-fluid"
                    alt=""
                  />
                </div>
                <div className="details">
                  <a href="service-details.html" className="stretched-link">
                    <h3>Nesciunt Mete</h3>
                  </a>
                  <p>
                    Provident nihil minus qui consequatur non omnis maiores. Eos
                    accusantium minus dolores iure perferendis.
                  </p>
                </div>
              </div>
            </div>
            {/* End Service Item */}
            <div className="col-lg-6" data-aos="zoom-in" data-aos-delay={300}>
              <div className="service-item position-relative">
                <div className="img">
                  <img
                    src="Web/img/services-2.jpg"
                    className="img-fluid"
                    alt=""
                  />
                </div>
                <div className="details">
                  <a href="service-details.html" className="stretched-link">
                    <h3>Eosle Commodi</h3>
                  </a>
                  <p>
                    Ut autem aut autem non a. Sint sint sit facilis nam iusto
                    sint. Libero corrupti neque eum hic non ut nesciunt dolorem.
                  </p>
                </div>
              </div>
            </div>
            {/* End Service Item */}
            <div className="col-lg-6" data-aos="zoom-in" data-aos-delay={400}>
              <div className="service-item position-relative">
                <div className="img">
                  <img
                    src="Web/img/services-3.jpg"
                    className="img-fluid"
                    alt=""
                  />
                </div>
                <div className="details">
                  <a href="service-details.html" className="stretched-link">
                    <h3>Ledo Markt</h3>
                  </a>
                  <p>
                    Ut excepturi voluptatem nisi sed. Quidem fuga consequatur.
                    Minus ea aut. Vel qui id voluptas adipisci eos earum
                    corrupti.
                  </p>
                </div>
              </div>
            </div>
            {/* End Service Item */}
            <div className="col-lg-6" data-aos="zoom-in" data-aos-delay={500}>
              <div className="service-item position-relative">
                <div className="img">
                  <img
                    src="Web/img/services-4.jpg"
                    className="img-fluid"
                    alt=""
                  />
                </div>
                <div className="details">
                  <a href="service-details.html" className="stretched-link">
                    <h3>Asperiores Commodit</h3>
                  </a>
                  <p>
                    Non et temporibus minus omnis sed dolor esse consequatur.
                    Cupiditate sed error ea fuga sit provident adipisci neque.
                  </p>
                  <a href="service-details.html" className="stretched-link" />
                </div>
              </div>
            </div>
            {/* End Service Item */}
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
              { icon: "eye", color: "#ffbb2c", title: "Lorem Ipsum" },
              { icon: "infinity", color: "#5578ff", title: "Dolor Sitema" },
              {
                icon: "mortarboard",
                color: "#e80368",
                title: "Sed perspiciatis",
              },
              { icon: "nut", color: "#e361ff", title: "Magni Dolores" },
              { icon: "shuffle", color: "#47aeff", title: "Nemo Enim" },
              { icon: "star", color: "#ffa76e", title: "Eiusmod Tempor" },
              { icon: "x-diamond", color: "#11dbcf", title: "Midela Teren" },
              { icon: "camera-video", color: "#4233ff", title: "Pira Neve" },
              { icon: "command", color: "#b2904f", title: "Dirada Pack" },
              { icon: "dribbble", color: "#b20969", title: "Moton Ideal" },
              { icon: "activity", color: "#ff5828", title: "Verdo Park" },
              {
                icon: "brightness-high",
                color: "#29cc61",
                title: "Flavor Nivelanda",
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

      {/* Team Section */}
      <section id="team" className="team section">
        {/* Section Title */}
        <div className="container section-title" data-aos="fade-up">
          <h2>Team</h2>
          <p>
            Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
            consectetur velit
          </p>
        </div>
        {/* End Section Title */}
        <div className="container">
          <div className="row gy-4">
            <div
              className="col-lg-3 col-md-6 d-flex align-items-stretch"
              data-aos="fade-up"
              data-aos-delay={100}
            >
              <div className="team-member">
                <div className="member-img">
                  <img
                    src="Web/img/team/team-1.jpg"
                    className="img-fluid"
                    alt=""
                  />
                  <div className="social">
                    <a href="">
                      <i className="bi bi-twitter-x" />
                    </a>
                    <a href="">
                      <i className="bi bi-facebook" />
                    </a>
                    <a href="">
                      <i className="bi bi-instagram" />
                    </a>
                    <a href="">
                      <i className="bi bi-linkedin" />
                    </a>
                  </div>
                </div>
                <div className="member-info">
                  <h4>Walter White</h4>
                  <span>Chief Executive Officer</span>
                </div>
              </div>
            </div>
            {/* End Team Member */}
            <div
              className="col-lg-3 col-md-6 d-flex align-items-stretch"
              data-aos="fade-up"
              data-aos-delay={200}
            >
              <div className="team-member">
                <div className="member-img">
                  <img
                    src="Web/img/team/team-2.jpg"
                    className="img-fluid"
                    alt=""
                  />
                  <div className="social">
                    <a href="">
                      <i className="bi bi-twitter-x" />
                    </a>
                    <a href="">
                      <i className="bi bi-facebook" />
                    </a>
                    <a href="">
                      <i className="bi bi-instagram" />
                    </a>
                    <a href="">
                      <i className="bi bi-linkedin" />
                    </a>
                  </div>
                </div>
                <div className="member-info">
                  <h4>Sarah Jhonson</h4>
                  <span>Product Manager</span>
                </div>
              </div>
            </div>
            {/* End Team Member */}
            <div
              className="col-lg-3 col-md-6 d-flex align-items-stretch"
              data-aos="fade-up"
              data-aos-delay={300}
            >
              <div className="team-member">
                <div className="member-img">
                  <img
                    src="Web/img/team/team-3.jpg"
                    className="img-fluid"
                    alt=""
                  />
                  <div className="social">
                    <a href="">
                      <i className="bi bi-twitter-x" />
                    </a>
                    <a href="">
                      <i className="bi bi-facebook" />
                    </a>
                    <a href="">
                      <i className="bi bi-instagram" />
                    </a>
                    <a href="">
                      <i className="bi bi-linkedin" />
                    </a>
                  </div>
                </div>
                <div className="member-info">
                  <h4>William Anderson</h4>
                  <span>CTO</span>
                </div>
              </div>
            </div>
            {/* End Team Member */}
            <div
              className="col-lg-3 col-md-6 d-flex align-items-stretch"
              data-aos="fade-up"
              data-aos-delay={400}
            >
              <div className="team-member">
                <div className="member-img">
                  <img
                    src="Web/img/team/team-4.jpg"
                    className="img-fluid"
                    alt=""
                  />
                  <div className="social">
                    <a href="">
                      <i className="bi bi-twitter-x" />
                    </a>
                    <a href="">
                      <i className="bi bi-facebook" />
                    </a>
                    <a href="">
                      <i className="bi bi-instagram" />
                    </a>
                    <a href="">
                      <i className="bi bi-linkedin" />
                    </a>
                  </div>
                </div>
                <div className="member-info">
                  <h4>Amanda Jepson</h4>
                  <span>Accountant</span>
                </div>
              </div>
            </div>
            {/* End Team Member */}
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
                <h3>Free Plan</h3>
                <h4>
                  <sup>$</sup>0<span> / month</span>
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
                  <sup>$</sup>29<span> / month</span>
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
                <h3>Developer Plan</h3>
                <h4>
                  <sup>$</sup>49<span> / month</span>
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
      {/* /Pricing Section */}

      {/* /Faq Section */}
      {/* Contact Section */}
      <section id="contact" className="contact section">
        {/* Section Title */}
        <div className="container section-title" data-aos="fade-up">
          <h2>Contact</h2>
          <p>
            Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
            consectetur velit
          </p>
        </div>
        {/* End Section Title */}
        <div
          className="container position-relative"
          data-aos="fade-up"
          data-aos-delay={100}
        >
          <div className="row gy-4">
            <div className="col-lg-5">
              <div
                className="info-item d-flex"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                <i className="bi bi-geo-alt flex-shrink-0" />
                <div>
                  <h3>Address</h3>
                  <p>A108 Adam Street, New York, NY 535022</p>
                </div>
              </div>
              {/* End Info Item */}
              <div
                className="info-item d-flex"
                data-aos="fade-up"
                data-aos-delay={300}
              >
                <i className="bi bi-telephone flex-shrink-0" />
                <div>
                  <h3>Call Us</h3>
                  <p>+1 5589 55488 55</p>
                </div>
              </div>
              {/* End Info Item */}
              <div
                className="info-item d-flex"
                data-aos="fade-up"
                data-aos-delay={400}
              >
                <i className="bi bi-envelope flex-shrink-0" />
                <div>
                  <h3>Email Us</h3>
                  <p>info@example.com</p>
                </div>
              </div>
              {/* End Info Item */}
            </div>
            <div className="col-lg-7">
              <form
                action="forms/contact.php"
                method="post"
                className="php-email-form"
                data-aos="fade-up"
                data-aos-delay={500}
              >
                <div className="row gy-4">
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Your Name"
                      required=""
                    />
                  </div>
                  <div className="col-md-6 ">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Your Email"
                      required=""
                    />
                  </div>
                  <div className="col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      name="subject"
                      placeholder="Subject"
                      required=""
                    />
                  </div>
                  <div className="col-md-12">
                    <textarea
                      className="form-control"
                      name="message"
                      rows={6}
                      placeholder="Message"
                      required=""
                      defaultValue={""}
                    />
                  </div>
                  <div className="col-md-12 text-center">
                    <div className="loading">Loading</div>
                    <div className="error-message" />
                    <div className="sent-message">
                      Your message has been sent. Thank you!
                    </div>
                    <button type="submit">Send Message</button>
                  </div>
                </div>
              </form>
            </div>
            {/* End Contact Form */}
          </div>
        </div>
      </section>
    </WebLayout>
  );
}
