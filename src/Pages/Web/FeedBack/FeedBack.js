import React, { useState } from "react";
import WebLayout from "../../../components/WebLayout";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function FeedBack() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const Env = process.env;

  const handleRating = (value) => {
    setRating(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    const data = JSON.stringify({
      name: name,
      email: email,
      message: feedback,
      rating: rating
    });
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${Env.REACT_APP_API_URL}feedback/add`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data: data
    };

    try {
      const response = await axios.request(config);
      toast.success(response.data.message);
      setRating(0);
      setFeedback("");
      setName("");
      setEmail("");
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
        <div className="container section-title pb-1" data-aos="fade-up">
          <h2>Feed Back</h2>
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
          <div className="col-lg-12">
            <form
              onSubmit={handleSubmit}
              className="php-email-form"
              data-aos="fade-up"
              data-aos-delay={500}
            >
              <div className="row gy-4">
                <div className="col-md-12">
                  <div className="d-flex justify-content-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i
                        key={star}
                        className={`bi ${
                          star <= rating
                            ? "bi-star-fill text-warning"
                            : "bi-star text-muted"
                        } fs-1 mx-1`}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleRating(star)}
                      ></i>
                    ))}
                  </div>
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Your Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="col-md-6 ">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Your Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="col-md-12">
                  <textarea
                    className="form-control"
                    name="message"
                    rows={3}
                    placeholder="Message"
                    required
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                </div>
                <div className="col-md-12 text-center">
                  {isLoading && <div className="loading">Loading</div>}
                  {message && (
                    <div className={message.includes("error") ? "error-message" : "sent-message"}>
                      {message}
                    </div>
                  )}
                  <button type="submit" disabled={isLoading}>
                    {isLoading ? "Submitting..." : "Send Message"}
                  </button>
                </div>
              </div>
            </form>
          </div>
          {/* End Contact Form */}
        </div>
      </section>
        <ToastContainer  style={{ width: "auto" }} />
    </WebLayout>
  );
}