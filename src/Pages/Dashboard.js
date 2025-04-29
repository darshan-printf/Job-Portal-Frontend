import React, { useEffect } from 'react'
import Layout from "../components/Layout"
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import { TbWorldCog } from "react-icons/tb";
import { FaCity } from "react-icons/fa6";

import { TbBuildingEstate } from "react-icons/tb";
import { FaUsersGear } from "react-icons/fa6";


export default function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('alertShown')) {
      toast.success("Login successfully");
      localStorage.setItem('alertShown', 'true');
    }
  }, []);

  // this is for page security checking
  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {  // Simplified condition
      navigate("/");
    }
  }, [navigate]);

  return (
    <Layout ac1="active">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h4 className="m-0 text-dark">Dashboard</h4>
            </div>
          </div>
        </div>
      </div>
      <section className="content mb-4">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-sm-6 col-md-3">
              <Link to={"/countrylist"} className="text-dark">
                <div className="info-box mb-3">
                  <span className="info-box-icon bg-primary elevation-1"><TbWorldCog /></span>
                  <div className="info-box-content">
                    <span className="info-box-text pb-1">Manage Country</span>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
              <Link to={"/stateslist"} className="text-dark">
                <div className="info-box mb-3">
                  <span className="info-box-icon bg-secondary elevation-1"><TbBuildingEstate /></span>
                  <div className="info-box-content">
                    <span className="info-box-text pb-1">Manage States</span>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
              <Link to={"/panchayatdashboard"} className="text-dark">
                <div className="info-box mb-3">
                  <span className="info-box-icon bg-success elevation-1"><FaCity /></span>
                  <div className="info-box-content">
                    <span className="info-box-text pb-1">Manage City</span>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
              <Link to={"/listorganization"} className="text-dark">
                <div className="info-box mb-3">
                  <span className="info-box-icon bg-danger elevation-1"><FaUsersGear /></span>
                  <div className="info-box-content">
                    <span className="info-box-text pb-1">Manage Users</span>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-12 col-sm-6 col-md-3">
              <Link to={"/listcommittee"} className="text-dark">
                <div className="info-box mb-3">
                  <span className="info-box-icon bg-warning elevation-1"><i className="fas fa-users"></i></span>
                  <div className="info-box-content">
                    <span className="info-box-text pb-1">Committee</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </Layout>
  )
}
