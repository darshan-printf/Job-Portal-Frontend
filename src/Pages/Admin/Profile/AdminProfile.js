import React from "react";
import Layout from "../../../components/Layout";
import ContentHeader from "../../../components/ContentHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminProfile() {
  const Env = process.env;
  return (
    <Layout ac1="active">
      <ContentHeader title="Manage Profile" breadcrumbs={[{ label: "Dashboard", to: "/admin/dashboard" },{ label: "Manage Profile " }, ]}/>
       <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <div className="card card-primary card-outline">
              <div className="card-body box-profile">
                <div className="text-center">
                  <img className="profile-user-img img-fluid img-circle" 
                  src={Env.REACT_APP_PROJECT_ICON}
                  alt="User profile"  
                  />
                </div>

                <h3 className="profile-username text-center">{Env.REACT_APP_PROJECT_NAME}</h3>

                <p className="text-muted text-center">Software Engineer</p>

                <ul className="list-group list-group-unbordered mb-3">
                  <li className="list-group-item">
                    <b>UserName</b> <a className="float-right">1,322</a>
                  </li>
                  <li className="list-group-item">
                    <b>Password</b> <a className="float-right">543</a>
                  </li>
                  <li className="list-group-item">
                    <b>Email</b> <a className="float-right">13,287</a>
                  </li>
                </ul>

                <a href="#" className="btn btn-primary btn-block"><b>Follow</b></a>
              </div>
              
            </div>
          </div>
         
          <div className="col-md-9">
            <div className="card">
              <div className="card-body">
                  <div className="tab-pane" id="settings">
                    <form className="form-horizontal">
                      <div className="form-group row">
                        <label for="inputName" className="col-sm-2 col-form-label">First Name</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" id="firstName" placeholder="First Name"/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label for="inputEmail" className="col-sm-2 col-form-label">Last Name</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" id="lastName" placeholder="Last Name"/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label for="inputName2" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                          <input type="email" className="form-control" id="email" placeholder="Email"/>
                        </div>
                      </div>

                       <div className="form-group row">
                        <label for="inputName2" className="col-sm-2 col-form-label">User Name</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" id="userName" placeholder="User Name"/>
                        </div>
                      </div>
                        <div className="form-group row">
                        <label for="inputName2" className="col-sm-2 col-form-label">Institute Name</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" id="instituteName" placeholder="Institute Name"/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label for="inputName2" className="col-sm-2 col-form-label">Role</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" id="role" placeholder="Role"/>
                        </div>
                      </div>

                      
                      <div className="form-group row">
                        <div className="offset-sm-2 col-sm-10">
                          <button type="submit" className="btn btn-danger">Submit</button>
                        </div>
                      </div>
                    </form>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
      <ToastContainer position="top-center" style={{ width: "auto" }} />
    </Layout>
  );
}
