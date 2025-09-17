import React, { useState } from "react";
import WebLayout from "../../../components/WebLayout";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    sent: false,
    error: false,
    message: ''
  });
  const Env = process.env;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus({ sent: false, error: false, message: '' });

    try {
      const response = await axios.post(`${Env.REACT_APP_API_URL}inbox/add`, formData, {
        headers: { 
          'Content-Type': 'application/json'
        }
      });
      toast.success(response.data.message);
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
     
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <WebLayout>
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
                  <p>{Env.REACT_APP_DEVLOPER_ADDRESS}</p>
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
                  <p>{Env.REACT_APP_DEVLOPER_PHONE}</p>
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
                  <p>{Env.REACT_APP_DEVLOPER_EMAIL}</p>
                </div>
              </div>
              {/* End Info Item */}
            </div>
            <div className="col-lg-7">
              <form
                onSubmit={handleSubmit}
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
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6 ">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Your Email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      name="subject"
                      placeholder="Subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-12">
                    <textarea
                      className="form-control"
                      name="message"
                      rows={6}
                      placeholder="Message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-12 text-center">
                    {isLoading && <div className="loading">Loading</div>}
                    {submitStatus.error && (
                      <div className="error-message">{submitStatus.message}</div>
                    )}
                    {submitStatus.sent && (
                      <div className="sent-message">
                        {submitStatus.message}
                      </div>
                    )}
                    <button type="submit" disabled={isLoading}>
                      {isLoading ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
            {/* End Contact Form */}
          </div>
        </div>
      </section>
      <ToastContainer  style={{ width: "auto" }} />
    </WebLayout>
  );
}