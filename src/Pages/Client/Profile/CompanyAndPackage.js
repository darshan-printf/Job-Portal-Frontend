import React, { useState, useEffect } from "react";
import axios from "axios";
import UserLayout from "../../../components/UserLayout";
import ContentHeader from "../../../components/ContentHeader";

import { Link } from "react-router-dom";
import CountUp from "react-countup";

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
        headers: {
          Authorization: token,
          "Cache-Control": "no-cache",
          // (for older browsers / proxies)
        },
      });
      setCompanyData(response.data.data);
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  };

  const stats = [
    {
      label: "Silver Package",
      info: [
        { label: "Up to 25,000 to 100,000", status: true },
        { label: "offer Letter", status: true },
        { label: "Professional Development", status: true },
        { label: "Experience Letter", status: true },
        { label: "Wellness Programs", status: true },
        { label: "Bonus", status: false },
        { label: "Health Insurance", status: false },
        { label: "Paid Time Off", status: false },
        { label: "Retirement Plans", status: false },
        { label: "Remote Work Options", status: false },
        { label: "flexible hours", status: false },
        { label: "Employee Assistance Programs", status: false },
      ],
      icon: "fas fa-briefcase",
      bg: "bg-dark",
      
    },
    {
      label: "Gold Package",
     info: [
        { label: "Up to 1,00,000 to 5,00,000", status: true },
        { label: "offer Letter", status: true },
        { label: "Experience Letter", status: true },
        { label: "Bonus", status: true },
        { label: "Health Insurance", status: true },
        { label: "Paid Time Off", status: true },
        { label: "Professional Development", status: true },
        { label: "Wellness Programs", status: true },
        { label: "flexible hours", status: false },
        { label: "Retirement Plans", status: false },
        { label: "Remote Work Options", status: false },
        { label: "Employee Assistance Programs", status: false },
      ],
      icon: "fas fa-briefcase",
      bg: "bg-dark",
      
    },
    {
      label: "Platinum Package",
      info: [
        { label: "Up to 5,00,000 to 25,00,000", status: true },
        { label: "flexible hours", status: true },
        { label: "offer Letter", status: true },
        { label: "Experience Letter", status: true },
        { label: "Bonus", status: true },
        { label: "Health Insurance", status: true },
        { label: "Paid Time Off", status: true },
        { label: "Retirement Plans", status: true },
        { label: "Remote Work Options", status: true },
        { label: "Professional Development", status: true },
        { label: "Employee Assistance Programs", status: true },
        { label: "Wellness Programs", status: true },
      ],
      icon: "fas fa-briefcase",
      bg: "bg-dark",
    
    },
  ];
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
                  <p className="text-muted text-center">
                    {companyData.name} {companyData.type}
                  </p>
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
                  <p className="text-muted">{companyData.email}</p>
                  <hr />
                  <strong>
                    <i className="fas fa-globe mr-1"></i>Website
                  </strong>
                  <p className="text-muted">
                    <Link>{companyData.website}</Link>
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

                  <p className="text-muted">{companyData.phone}</p>
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
                        Company Info
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="#timeline"
                        data-toggle="tab"
                      >
                        Package
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
                            <Link>{companyData.name}</Link>
                            <Link className="float-right btn-tool">
                              <i className="fas fa-times"></i>
                            </Link>
                          </span>
                          <span className="description">
                            Sent you a message
                          </span>
                        </div>
                        <p>
                          {companyData.name} {companyData.type} is to inform you
                          that our company has officially started using TalentOS
                          software for the hiring and recruitment process. We
                          kindly request you to carefully add and update all
                          candidate details in TalentOS so that the recruitment
                          process remains smooth, accurate, and well-documented.
                          Your cooperation will help us maintain better
                          efficiency and transparency in our hiring system. For
                          any queries or issues while using TalentOS, please
                          reach out to the HR department.
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
                            <Link>Adam Jones</Link>
                            <Link className="float-right btn-tool">
                              <i className="fas fa-times"></i>
                            </Link>
                          </span>
                          <span className="description">Information Post</span>
                        </div>

                        <div className="row mb-3">
                          <div className="col-sm-6">
                            <img
                              className="img-fluid"
                              src="/Admin/img/info2.png"
                              alt="info1"
                            />
                          </div>

                          <div className="col-sm-6">
                            <div className="row">
                              <div className="col-sm-6">
                                <img
                                  className="img-fluid mb-3"
                                  src="/Admin/img/info2.png"
                                  alt="info"
                                />
                                <img
                                  className="img-fluid"
                                  src="/Admin/img/info2.png"
                                  alt="info"
                                />
                              </div>

                              <div className="col-sm-6">
                                <img
                                  className="img-fluid mb-3"
                                  src="/Admin/img/info1.png"
                                  alt="info"
                                />
                                <img
                                  className="img-fluid"
                                  src="/Admin/img/info1.png"
                                  alt="info"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="tab-pane" id="timeline">
                      <div className=" timeline-inverse ">
                        <div className="row">
                          {stats.map((item, i) => (
                            <div key={i} className="col-lg-4 col-4">
                              <Link  className="text-dark">
                                <div className={`small-box ${item.bg}`}>
                                  <div className="inner">
                                    <h4> {item.label}</h4>
                                    <hr/>
                                    <p>
                                      {item.info.map((infoItem, idx) => (
                                        <li key={idx}>
                                         {infoItem.status ? <i className="fas fa-check text-success"></i> : <i className="fas fa-times text-danger"></i>}  {infoItem.label} 
                                        </li>
                                      ))}
                                    </p>
                                  </div>
                                  <div className="icon">
                                    <i className={item.icon}></i>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
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
