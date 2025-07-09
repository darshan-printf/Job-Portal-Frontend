import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";

export default function WebFooter() {
  return (
    <footer className="bg-white border-top">
      {/* Main Footer */}
      <div className="container py-5">
        <div className="row gy-4">
          {/* Company Info */}
          <div className="col-lg-3 col-md-6">
            <h5 style={{ color: "#3498db" }} className="fw-bold mb-3">
              Vesperr
            </h5>
            <p className="text-muted small">
              Empowering businesses with innovative solutions and cutting-edge
              technology. Your success is our priority.
            </p>
            <div className="d-flex gap-2">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="d-inline-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: "36px",
                    height: "36px",
                    backgroundColor: "#eaf4fb",
                    color: "#3498db",
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-3 col-md-6">
            <h6 className="text-dark fw-semibold mb-3">Quick Links</h6>
            <ul className="list-unstyled text-muted small">
              {["Home", "About", "Services", "Team", "Contact"].map((link) => (
                <li key={link} className="mb-2">
                  <a
                    href={`/${link.toLowerCase()}`}
                    className="text-decoration-none d-flex align-items-center text-muted"
                  >
                    <ArrowRight
                      size={14}
                      className="me-2 opacity-0 hover-opacity"
                    />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="col-lg-3 col-md-6">
            <h6 className="text-dark fw-semibold mb-3">Our Services</h6>
            <ul className="list-unstyled text-muted small">
              {[
                "Web Development",
                "Mobile Apps",
                "Digital Marketing",
                "Cloud Solutions",
                "Consulting",
              ].map((service) => (
                <li key={service} className="mb-2">
                  <a href="#" className="text-decoration-none d-flex align-items-center text-muted">
                    <ArrowRight
                      size={14}
                      className="me-2 opacity-0 hover-opacity"
                    />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-3 col-md-6">
            <h6 className="text-dark fw-semibold mb-3">Contact Info</h6>
            <div className="text-muted small">
              <p className="d-flex align-items-start mb-2">
                <MapPin size={16} className="me-2 text-primary" />
                123 Business Street, Suite 100<br />New York, NY 10001
              </p>
              <p className="d-flex align-items-center mb-2">
                <Phone size={16} className="me-2 text-primary" />
                <a href="tel:+1234567890" className="text-muted text-decoration-none">
                  +1 (234) 567-8900
                </a>
              </p>
              <p className="d-flex align-items-center mb-0">
                <Mail size={16} className="me-2 text-primary" />
                <a href="mailto:info@vesperr.com" className="text-muted text-decoration-none">
                  info@vesperr.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div
        className="py-4"
        style={{ backgroundColor: "#f0f8ff", borderTop: "1px solid #ddd" }}
      >
        <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
          <div>
            <h6 className="mb-1 fw-semibold text-dark">Stay Updated</h6>
            <p className="text-muted small mb-0">
              Subscribe to our newsletter for the latest updates
            </p>
          </div>
          <form className="d-flex w-100 w-md-auto" style={{ maxWidth: "400px" }}>
            <input
              type="email"
              className="form-control rounded-start"
              placeholder="Enter your email"
            />
            <button
              type="submit"
              className="btn btn-primary rounded-end"
              style={{ backgroundColor: "#3498db", borderColor: "#3498db" }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="py-3 border-top text-center text-md-start"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <p className="mb-0 text-muted small">
            © 2024 <span style={{ color: "#3498db", fontWeight: "600" }}>Vesperr</span>. All Rights Reserved.
          </p>
          <div className="d-flex gap-3 small">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-muted text-decoration-none"
              >
                {item}
              </a>
            ))}
          </div>
          <p className="mb-0 small text-muted">
            Designed by{" "}
            <a href="#" className="text-decoration-none" style={{ color: "#3498db" }}>
              Darshan Talaviya
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
