import React, { useEffect } from 'react';
import Layout from "../components/Layout";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdWorkHistory } from "react-icons/md";
import { TbWorldCog, TbBuildingEstate } from "react-icons/tb";
import { FaCity, FaUsersGear } from "react-icons/fa6";
import ContentHeader from '../components/ContentHeader';

const links = [
  { to: "/countrylist", text: "Manage Country", icon: <TbWorldCog />, bg: "bg-primary", count: 1 },
  { to: "/stateslist", text: "Manage States", icon: <TbBuildingEstate />, bg: "bg-secondary", count: 1 },
  { to: "/panchayatdashboard", text: "Manage City", icon: <FaCity />, bg: "bg-success", count: 1 },
  { to: "/listorganization", text: "Manage Users", icon: <FaUsersGear />, bg: "bg-danger", count: 1 },
  { to: "/listcommittee", text: "Manage Job", icon: <i className="fas fa-users"></i>, bg: "bg-warning", count: 1 },
  { to: "/listcommittee", text: "Manage Resume", icon: <MdWorkHistory />, bg: "bg-info", count: 1 },
];

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('alertShown')) {
      toast.success("Login successfully");
      localStorage.setItem('alertShown', 'true');
    }
  }, []);

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') navigate("/");
  }, [navigate]);

  return (
    <Layout ac1="active">
      <ContentHeader title="Dashboard" breadcrumbs={[{ label: 'Admin Dashboard' }]} />
      <section className="content mb-4">
        <div className="container-fluid">
          <div className="row">
            {links.map(({ to, text, icon, bg, count }, idx) => (
              <div key={idx} className="col-12 col-sm-6 col-md-3">
                <Link to={to} className="text-dark">
                  <div className="info-box mb-3">
                    <span className={`info-box-icon ${bg} elevation-1`}>{icon}</span>
                    <div className="info-box-content">
                      <span className="info-box-text pb-1">{text}</span>
                      <span className="info-box-number">Total: {count}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ToastContainer />
    </Layout>
  );
}
