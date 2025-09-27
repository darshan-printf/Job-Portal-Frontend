import React, { useState, useEffect } from "react";
import axios from "axios";
import UserLayout from "../../../components/UserLayout";
import ContentHeader from "../../../components/ContentHeader";

import { Link } from "react-router-dom";

export default function CompanyAndPackage() {
  const [companyData, setCompanyData] = useState({});
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");
  useEffect(() => {
    fetchCompanyData();
    // eslint-disable-next-line
  }, []);

  const fetchCompanyData = async () => {
    try {
      const response = await axios.get(`${apiUrl}company/getCompanyByUser`, {
        headers: { Authorization: token },
      });
      setCompanyData(response.data.data);
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  };

  return (
    <UserLayout ac8="active">
      <ContentHeader
        title="Company & Package"
        breadcrumbs={[
          { label: "Dashboard", to: "/admin/userdashboard" },
          { label: "Company & Package" },
        ]}
      />

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <div className="card card-primary card-outline">
                <div className="card-body box-profile">
                  <div className="text-center">
                    <img
                      className="profile-user-img img-fluid img-circle"
                      src={companyData.logo}
                      alt="User"
                    />
                  </div>
                  <h3 className="profile-username text-center">
                    {companyData.name}
                  </h3>
                  <p className="text-muted text-center">{companyData.name} {companyData.type}</p>
                  <ul className="list-group list-group-unbordered mb-3">
                    
                    <li className="list-group-item">
                      <b>GST</b>{" "}
                      <Link className="float-right">
                        {companyData.GSTNumber}
                      </Link>
                    </li>
                    <li className="list-group-item">
                      <b>PAN</b>{" "}
                      <Link className="float-right">
                        {companyData.PANNumber}
                      </Link>
                    </li>
                    <li className="list-group-item">
                      <b>CIN</b>{" "}
                      <Link className="float-right">
                        {companyData.CINNumber}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">About of {companyData.name} </h3>
                </div>
                <div className="card-body">
                  <strong>
                    <i className="fas fa-envelope  mr-1"></i>Email
                  </strong>
                  <p className="text-muted">
                   {companyData.email}
                  </p>
                  <hr />
                  <strong>
                    <i className="fas fa-globe mr-1"></i>Website
                  </strong>
                  <p className="text-muted"> 
                    <Link >{companyData.website}</Link>
                  </p>
                  <hr />
                  <strong>
                    <i className="fas fa-map-marker-alt mr-1"></i>Address
                  </strong>
                  <p className="text-muted">{companyData.address}</p>
                  <hr />
                  <strong>
                    <i className="fas fa-mobile-alt  mr-1"></i>Mobile
                  </strong>

                  <p className="text-muted">
                    {companyData.phone}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="card">
                <div className="card-header p-2">
                  <ul className="nav nav-pills">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        href="#activity"
                        data-toggle="tab"
                      >
                        Activity
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="#timeline"
                        data-toggle="tab"
                      >
                        Timeline
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="#settings"
                        data-toggle="tab"
                      >
                        Settings
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="card-body">
                  <div className="tab-content">
                    <div className="active tab-pane" id="activity">
                      <div className="post clearfix">
                        <div className="user-block">
                          <img
                            className="img-circle img-bordered-sm"
                            src={companyData.logo}
                            alt="User"
                          />
                          <span className="username">
                            <Link >{companyData.name}</Link>
                            <Link  className="float-right btn-tool">
                              <i className="fas fa-times"></i>
                            </Link>
                          </span>
                          <span className="description">
                            Sent you a message 
                          </span>
                        </div>
                        <p>
                          Lorem ipsum represents a long-held tradition for
                          designers, typographers and the like. Some people hate
                          it and argue for its demise, but others ignore the
                          hate as they create awesome tools to help create
                          filler text for everyone from bacon lovers to Charlie
                          Sheen fans.
                        </p>
                      </div>

                      <div className="post">
                        <div className="user-block">
                          <img
                            className="img-circle img-bordered-sm"
                            src={companyData.logo}
                            alt="User"
                          />
                          <span className="username">
                            <Link >Adam Jones</Link>
                            <Link  className="float-right btn-tool">
                              <i className="fas fa-times"></i>
                            </Link>
                          </span>
                          <span className="description">
                            Posted 5 photos 
                          </span>
                        </div>

                        <div className="row mb-3">
                          <div className="col-sm-6">
                            <img
                              className="img-fluid"
                              src="https://img.freepik.com/free-photo/beautiful-domestic-cat-laying-fence_181624-43207.jpg?t=st=1758883132~exp=1758886732~hmac=cdc7fb938da13cb28f8a2869a36bd5daa4152a49608cd3deb2cba89c6c333ad1&w=1060"
                              alt="Photo"
                            />
                          </div>

                          <div className="col-sm-6">
                            <div className="row">
                              <div className="col-sm-6">
                                <img
                                  className="img-fluid mb-3"
                                  src="https://img.freepik.com/free-photo/beautiful-domestic-cat-laying-fence_181624-43207.jpg?t=st=1758883132~exp=1758886732~hmac=cdc7fb938da13cb28f8a2869a36bd5daa4152a49608cd3deb2cba89c6c333ad1&w=1060"
                                  alt="Photo"
                                />
                                <img
                                  className="img-fluid"
                                  src="https://img.freepik.com/free-photo/beautiful-domestic-cat-laying-fence_181624-43207.jpg?t=st=1758883132~exp=1758886732~hmac=cdc7fb938da13cb28f8a2869a36bd5daa4152a49608cd3deb2cba89c6c333ad1&w=1060beautiful-domestic-cat-laying-fence_181624-43207.jpg?t=st=1758883132~exp=1758886732~hmac=cdc7fb938da13cb28f8a2869a36bd5daa4152a49608cd3deb2cba89c6c333ad1&w=1060"
                                  alt="Photo"
                                />
                              </div>

                              <div className="col-sm-6">
                                <img
                                  className="img-fluid mb-3"
                                  src="https://img.freepik.com/free-photo/beautiful-domestic-cat-laying-fence_181624-43207.jpg?t=st=1758883132~exp=1758886732~hmac=cdc7fb938da13cb28f8a2869a36bd5daa4152a49608cd3deb2cba89c6c333ad1&w=1060"
                                  alt="Photo"
                                />
                                <img
                                  className="img-fluid"
                                  src="https://img.freepik.com/free-photo/beautiful-domestic-cat-laying-fence_181624-43207.jpg?t=st=1758883132~exp=1758886732~hmac=cdc7fb938da13cb28f8a2869a36bd5daa4152a49608cd3deb2cba89c6c333ad1&w=1060"
                                  alt="Photo"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="tab-pane" id="timeline">
                      <div className="timeline timeline-inverse">
                        <div className="time-label">
                          <span className="bg-danger">10 Feb. 2014</span>
                        </div>

                        <div>
                          <i className="fas fa-envelope bg-primary"></i>

                          <div className="timeline-item">
                            <span className="time">
                              <i className="far fa-clock"></i> 12:05
                            </span>

                            <h3 className="timeline-header">
                              <a href="#">Support Team</a> sent you an email
                            </h3>

                            <div className="timeline-body">
                              Etsy doostang zoodles disqus groupon greplin oooj
                              voxy zoodles, weebly ning heekya handango imeem
                              plugg dopplr jibjab, movity jajah plickers sifteo
                              edmodo ifttt zimbra. Babblely odeo kaboodle quora
                              plaxo ideeli hulu weebly balihoo...
                            </div>
                            <div className="timeline-footer">
                              <a href="#" className="btn btn-primary btn-sm">
                                Read more
                              </a>
                              <a href="#" className="btn btn-danger btn-sm">
                                Delete
                              </a>
                            </div>
                          </div>
                        </div>

                        <div>
                          <i className="fas fa-user bg-info"></i>

                          <div className="timeline-item">
                            <span className="time">
                              <i className="far fa-clock"></i> 5 mins ago
                            </span>

                            <h3 className="timeline-header border-0">
                              <a href="#">Sarah Young</a> accepted your friend
                              request
                            </h3>
                          </div>
                        </div>

                        <div>
                          <i className="fas fa-comments bg-warning"></i>

                          <div className="timeline-item">
                            <span className="time">
                              <i className="far fa-clock"></i> 27 mins ago
                            </span>

                            <h3 className="timeline-header">
                              <a href="#">Jay White</a> commented on your post
                            </h3>

                            <div className="timeline-body">
                              Take me to your leader! Switzerland is small and
                              neutral! We are more like Germany, ambitious and
                              misunderstood!
                            </div>
                            <div className="timeline-footer">
                              <a
                                href="#"
                                className="btn btn-warning btn-flat btn-sm"
                              >
                                View comment
                              </a>
                            </div>
                          </div>
                        </div>

                        <div className="time-label">
                          <span className="bg-success">3 Jan. 2014</span>
                        </div>

                        <div>
                          <i className="fas fa-camera bg-purple"></i>

                          <div className="timeline-item">
                            <span className="time">
                              <i className="far fa-clock"></i> 2 days ago
                            </span>

                            <h3 className="timeline-header">
                              <a href="#">Mina Lee</a> uploaded new photos
                            </h3>

                            <div className="timeline-body">
                              <img
                                src="http://placehold.it/150x100"
                                alt="..."
                              />
                              <img
                                src="http://placehold.it/150x100"
                                alt="..."
                              />
                              <img
                                src="http://placehold.it/150x100"
                                alt="..."
                              />
                              <img
                                src="http://placehold.it/150x100"
                                alt="..."
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <i className="far fa-clock bg-gray"></i>
                        </div>
                      </div>
                    </div>

                    <div className="tab-pane" id="settings">
                      <form className="form-horizontal">
                        <div className="form-group row">
                          <label
                            for="inputName"
                            className="col-sm-2 col-form-label"
                          >
                            Name
                          </label>
                          <div className="col-sm-10">
                            <input
                              type="email"
                              className="form-control"
                              id="inputName"
                              placeholder="Name"
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label
                            for="inputEmail"
                            className="col-sm-2 col-form-label"
                          >
                            Email
                          </label>
                          <div className="col-sm-10">
                            <input
                              type="email"
                              className="form-control"
                              id="inputEmail"
                              placeholder="Email"
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label
                            for="inputName2"
                            className="col-sm-2 col-form-label"
                          >
                            Name
                          </label>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              className="form-control"
                              id="inputName2"
                              placeholder="Name"
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label
                            for="inputExperience"
                            className="col-sm-2 col-form-label"
                          >
                            Experience
                          </label>
                          <div className="col-sm-10">
                            <textarea
                              className="form-control"
                              id="inputExperience"
                              placeholder="Experience"
                            ></textarea>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label
                            for="inputSkills"
                            className="col-sm-2 col-form-label"
                          >
                            Skills
                          </label>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              className="form-control"
                              id="inputSkills"
                              placeholder="Skills"
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="offset-sm-2 col-sm-10">
                            <div className="checkbox">
                              <label>
                                <input type="checkbox" /> I agree to the{" "}
                                <a href="#">terms and conditions</a>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="offset-sm-2 col-sm-10">
                            <button type="submit" className="btn btn-danger">
                              Submit
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </UserLayout>
  );
}
