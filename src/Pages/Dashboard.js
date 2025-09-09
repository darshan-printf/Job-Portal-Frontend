import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContentHeader from "../components/ContentHeader";
import CountUp from "react-countup";
import axios from "axios";

export default function Dashboard() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");
  const [count, setCount] = useState({
    country: 0,
    states: 0,
    city: 0,
    users: 0,
    job: 0,
    resume: 0,
  });
  const links = [
    {
      to: "/admin/",
      text: "Manage Company",
      icon: <i className="fas fa-building"></i>,
      bg: "bg-secondary",
      count: `${count.job}`,
    },
    {
      to: "/admin/userlist",
      text: "Manage Users",
      icon: <i className="fas fa-users"></i>,
      bg: "bg-primary",
      count: `${count.users}`,
    },
    
    {
      to: "/admin/",
      text: "Manage Locations",
      icon: <i className="fas fa-map-marker-alt"></i>,
      bg: "bg-info",
      count: 1400,
    },
    {
      to: "/admin/",
      text: "Manage jobs",
      icon: <i className="fas fa-briefcase"></i>,
      bg: "bg-success",
      count: 1400,
    },
  ];

  useEffect(() => {
    if (!localStorage.getItem("alertShown")) {
      toast.success("Login successfully");
      localStorage.setItem("alertShown", "true");
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
          job: data.totalJobs || 0,
        });
      } catch (error) {
        console.error("Error fetching report count:", error);
      }
    };
    fetchCount();
  }, []);
  return (
    <Layout ac1="active">
      <ContentHeader
        title="Dashboard"
        breadcrumbs={[{ label: "Admin Dashboard" }]}
      />
      <section className="content mb-4">
        <div className="container-fluid">
          <div className="row">
            {links.map(({ to, text, icon, bg, count }, idx) => (
              <div key={idx} className="col-lg-3 col-6">
                <Link to={to} className="text-dark">
                  <div className={`small-box ${bg}`}>
                    <div className="inner">
                      <h3>
                        <CountUp end={count} />
                      </h3>
                      <p>{text}</p>
                    </div>
                    <div className="icon">{icon}</div>
                    <span className="small-box-footer">
                      More info <i className="fas fa-arrow-circle-right"></i>
                    </span>
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
