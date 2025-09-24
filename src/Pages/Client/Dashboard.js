import React from 'react'
import UserLayout from "../../components/UserLayout"
import { Link } from 'react-router-dom'
import ContentHeader from '../../components/ContentHeader'
import CountUp from "react-countup";
export default function Dashboard() {
  const stats = [
    { count: 150, label: "Job Posting", icon: "fas fa-briefcase", bg: "bg-secondary" ,to:'/admin/jobpostlist'},
    { count: 400, label: "Candidate List", icon: "fas fa-user", bg: "bg-primary" ,to:'/admin/candidatelist'},
    { count: 44, label: "Interview Schedule", icon: "fas fa-calendar-alt", bg: "bg-info" ,to:'/admin/schedulinglist'},
    { count: 65, label: "offer Letter", icon: "fas fa-file-signature", bg: "bg-success" ,to:'/admin/offerletterlist'},
  ];
  return (
    <UserLayout ac1="active">
      <ContentHeader title="Dashboard" breadcrumbs={[{ label: 'Admin Dashboard' }]} />
      <section className="content mb-4">
        <div className="row">
          {stats.map((item, i) => (
            <div key={i} className="col-lg-3 col-6">
              <Link to={item.to} className="text-dark">
              <div className={`small-box ${item.bg}`}>
                <div className="inner">
                  <h3> <CountUp end={item.count} duration={2} /></h3>
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

    </UserLayout>
  )
}
