import React, { useState, useEffect } from "react";
import axios from "axios";
import UserLayout from "../../../components/UserLayout";
import ContentHeader from "../../../components/ContentHeader";
import { Link } from "react-router-dom";
import { Shield, Star, Crown, Gem } from "lucide-react";

export default function CompanyAndPackage() {
  const [companyData, setCompanyData] = useState({});
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");
  const Env = process.env;

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
                  <div className="text-center ">
                    <img
                      className="profile-user-img img-fluid border-0 "
                      src={companyData.logo || Env.REACT_APP_PROJECT_ICON}
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
            

          </div>

          <div class="row">
          <div class="col-md-4">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">
                  <Star className="mr-1"/>
                  Silver
                </h3>
              </div>
              <div class="card-body">
                <ul class="list-unstyled">
                  <li>
                    <ul>
                      <li>Phasellus iaculis neque</li>
                     
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">
                  <Crown className="mr-1"/>
                  Gold
                </h3>
              </div>
              <div class="card-body">
                <ul class="list-unstyled">
                  <li>
                    <ul>
                      <li>Phasellus iaculis neque</li>
                     
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">
                  <Gem className="mr-1"/>
                  Paletiniyam
                </h3>
              </div>
              <div class="card-body">
                <ul class="list-unstyled">
                  <li>
                    <ul>
                      <li>Phasellus iaculis neque</li>
                     
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>
      
    </UserLayout>
  );
}
