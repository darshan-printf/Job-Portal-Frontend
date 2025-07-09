import React from "react";
import WebLayout from "../../../components/WebLayout";
export default function Services() {
  return (
    <WebLayout>
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
    </WebLayout>
  );
}
