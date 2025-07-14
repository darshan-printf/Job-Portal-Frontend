import React from 'react'
import UserLayout from "../../components/UserLayout"
import { Link } from 'react-router-dom'
import ContentHeader from '../../components/ContentHeader'
export default function Dashboard() {
  return (
    <UserLayout ac1="active">
      <ContentHeader title="Dashboard" breadcrumbs={[{ label: 'Admin Dashboard' }]} />
      <section className="content mb-4">
        <div className="row">
          <div className="col-lg-3 col-6">

            <div className="small-box bg-info">
              <div className="inner">
                <h3>150</h3>

                <p>New Orders</p>
              </div>
              <div className="icon">
                <i className="fas fa-shopping-cart"></i>
              </div>
              <Link className="small-box-footer">
                More info <i className="fas fa-arrow-circle-right"></i>
              </Link>
            </div>
          </div>

          <div className="col-lg-3 col-6">

            <div className="small-box bg-success">
              <div className="inner">
                <h3>53<sup style={{ fontSize: "20px" }}>%</sup></h3>

                <p>Bounce Rate</p>
              </div>
              <div className="icon">
                <i className="fas fa-user-plus"></i>
              </div>
              <Link className="small-box-footer">
                More info <i className="fas fa-arrow-circle-right"></i>
              </Link>
            </div>
          </div>

          <div className="col-lg-3 col-6">

            <div className="small-box bg-warning">
              <div className="inner">
                <h3>44</h3>

                <p>User Registrations</p>
              </div>
              <div className="icon">
                <i className="fas fa-user-plus"></i>
              </div>
              <Link className="small-box-footer">
                More info <i className="fas fa-arrow-circle-right"></i>
              </Link>
            </div>
          </div>

          <div className="col-lg-3 col-6">

            <div className="small-box bg-danger">
              <div className="inner">
                <h3>65</h3>

                <p>Unique Visitors</p>
              </div>
              <div className="icon">
                <i className="fas fa-chart-pie"></i>
              </div>
              <Link className="small-box-footer">
                More info <i className="fas fa-arrow-circle-right"></i>
              </Link>
            </div>
          </div>

        </div>
      </section>

    </UserLayout>
  )
}
