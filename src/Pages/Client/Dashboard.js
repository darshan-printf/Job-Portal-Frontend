import React, { useEffect, useState } from "react";
import UserLayout from "../../components/UserLayout";
import { Link } from "react-router-dom";
import ContentHeader from "../../components/ContentHeader";
import CountUp from "react-countup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Dashboard() {
  const [count, setCount] = useState({
    Jobs: 0,
    Candidates: 0,
    Interview: 0,
    offerLetter: 0,
  });

  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!localStorage.getItem("alertShown")) {
      toast.success("Login successfully");
      localStorage.setItem("alertShown", "true");
    }
    fetchCount();
    // eslint-disable-next-line
  }, []);
  const fetchCount = async () => {
    try {
      const response = await axios.get(`${apiUrl}reports/getCountAdmin`, {
        headers: {
          Authorization: token,
          "Cache-Control": "no-cache",
        },
      });
      const data = response.data;
      setCount({
        Jobs: data.totalJobs || 0,
        Candidates: data.totalCandidates || 0,
        Interview: data.totalPendingCandidates || 0,
        offerLetter: data.totalCompletedCandidates || 0,
      });
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
  const stats = [
    {
      count: count.Jobs,
      label: "Job Posting",
      icon: "fas fa-briefcase",
      bg: "bg-secondary",
      to: "/admin/jobpostlist",
    },
    {
      count: count.Candidates,
      label: "Candidate List",
      icon: "fas fa-user",
      bg: "bg-primary",
      to: "/admin/candidatelist",
    },
    {
      count: count.Interview,
      label: "Interview Schedule",
      icon: "fas fa-calendar-alt",
      bg: "bg-info",
      to: "/admin/schedulinglist",
    },
    {
      count: count.offerLetter,
      label: "offer Letter",
      icon: "fas fa-file-signature",
      bg: "bg-success",
      to: "/admin/offerletterlist",
    },
  ];
  return (
    <UserLayout ac1="active">
      <ContentHeader
        title="Dashboard"
        breadcrumbs={[{ label: "Admin Dashboard" }]}
      />
      <section className="content mb-4">
        <div className="row">
          {stats.map((item, i) => (
            <div key={i} className="col-lg-3 col-6">
              <Link to={item.to} className="text-dark">
                <div className={`small-box ${item.bg}`}>
                  <div className="inner">
                    <h3>
                      {" "}
                      <CountUp end={item.count} duration={2} />
                    </h3>
                    <p>{item.label}</p>
                  </div>
                  <div className="icon">
                    <i className={item.icon}></i>
                  </div>
                  <Link to={item.to} className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right"></i>
                  </Link>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
      <ToastContainer style={{ width: "auto" }} />
    </UserLayout>
  );
}
