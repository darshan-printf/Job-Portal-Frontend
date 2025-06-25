import React, { useEffect, useState } from 'react';
import Layout from "../components/Layout";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdWorkHistory } from "react-icons/md";
import { TbWorldCog, TbBuildingEstate } from "react-icons/tb";
import { FaCity, FaUsersGear } from "react-icons/fa6";
import ContentHeader from '../components/ContentHeader';
import CountUp from 'react-countup';
import axios from 'axios';


export default function Dashboard() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');
  const [count, setCount] = useState({
    country: 0,
    states: 0,
    city: 0,
    users: 0,
    job: 0,
    resume: 0
  });
  const links = [
    { to: "/countrylist", text: "Manage Country", icon: <TbWorldCog />, bg: "bg-primary", count: `${count.country}` },
    { to: "/stateslist", text: "Manage States", icon: <TbBuildingEstate />, bg: "bg-secondary", count: `${count.states}` },
    { to: "/panchayatdashboard", text: "Manage City", icon: <FaCity />, bg: "bg-success", count: `${count.city}` },
    { to: "/listorganization", text: "Manage Users", icon: <FaUsersGear />, bg: "bg-danger", count: `${count.users}` },
    { to: "/listcommittee", text: "Manage Job", icon: <i className="fas fa-users"></i>, bg: "bg-warning", count: `${count.job}` },
    { to: "/listcommittee", text: "Manage Resume", icon: <MdWorkHistory />, bg: "bg-info", count: 1400 },
  ];


  useEffect(() => {
    if (!localStorage.getItem('alertShown')) {
      toast.success("Login successfully");
      localStorage.setItem('alertShown', 'true');
    }
  }, []);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await axios.get(`${apiUrl}reports/getCount`, {
          headers: {
            Authorization: token,
          },
        });
        const data = response.data;
        setCount({
          country: data.totalCountries || 0,
          states: data.totalStates || 0,
          city: data.totalCities || 0,
          users: data.totalUsers || 0,
          job: data.totalJobs || 0
        });
      } catch (error) {
        console.error('Error fetching report count:', error);
      }
    };
    fetchCount();
  }, []);
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
                      <span className="info-box-number">Total:  <CountUp end={count} /></span>
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
