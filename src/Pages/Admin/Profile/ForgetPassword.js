import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout";
import ContentHeader from "../../../components/ContentHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function ForgetPassWord() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [updating, setUpdating] = useState(false);

  const Env = process.env;
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  // change password API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `${Env.REACT_APP_API_URL}admin/changepassword`,
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          id: id,
          oldPassword: oldPassword,
          newPassword: newPassword,
        }),
      };

      const response = await axios.request(config);
      toast.success(response.data.message || "Password updated successfully");
      setOldPassword("");
      setNewPassword("");
      setUpdating(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update password"
      );
      setUpdating(false);
    }
  };

  return (
    <Layout ac1="active">
      <ContentHeader
        title="Manage Password"
        breadcrumbs={[
          { label: "Dashboard", to: "/admin/dashboard" },
          { label: "Manage Password" },
        ]}
      />

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            {/* Profile Image */}
            <div className="col-md-3">
              <div className="card card-primary card-outline">
                <div className="card-body box-profile">
                  <div className="text-center">
                    <img
                      src={
                        "https://cdn-icons-png.freepik.com/512/12795/12795700.png"
                      }
                      alt="User profile"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <h3 className="profile-username text-center mb-4 pb-2">
                    {Env.REACT_APP_PROJECT_NAME}
                  </h3>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="col-md-9">
              <div className="card card-primary card-outline">
                <div className="card-body ">
                  <div className="tab-content">
                    <div className="tab-pane active" id="settings">
                      <form className="form-horizontal" onSubmit={handleSubmit}>
                        {/* Old Password */}
                        <div className="form-group row">
                          <label
                            htmlFor="oldPassword"
                            className="col-sm-2 col-form-label"
                          >
                            Old Password
                          </label>
                          <div className="col-sm-10 d-flex">
                            <input
                              type={showOldPassword ? "text" : "password"}
                              className="form-control"
                              id="oldPassword"
                              placeholder="Enter Old Password"
                              value={oldPassword}
                              onChange={(e) => setOldPassword(e.target.value)}
                              required
                            />
                            <button
                              type="button"
                              className="btn btn-outline-secondary ml-2"
                              onClick={() =>
                                setShowOldPassword(!showOldPassword)
                              }
                            >
                              {showOldPassword ? "🙈" : "👁️"}
                            </button>
                          </div>
                        </div>

                        {/* New Password */}
                        <div className="form-group row">
                          <label
                            htmlFor="newPassword"
                            className="col-sm-2 col-form-label"
                          >
                            New Password
                          </label>
                          <div className="col-sm-10 d-flex">
                            <input
                              type={showNewPassword ? "text" : "password"}
                              className="form-control"
                              id="newPassword"
                              placeholder="Enter New Password"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              required
                            />
                            <button
                              type="button"
                              className="btn btn-outline-secondary ml-2"
                              onClick={() =>
                                setShowNewPassword(!showNewPassword)
                              }
                            >
                              {showNewPassword ? "🙈" : "👁️"}
                            </button>
                          </div>
                        </div>

                        {/* Submit */}
                        <div className="form-group row">
                          <div className="offset-sm-2 col-sm-10">
                            <button
                              type="submit"
                              className="btn btn-danger mb-0"
                              disabled={updating}
                            >
                              {updating ? (
                                <>
                                  <span
                                    className="spinner-border spinner-border-sm "
                                    role="status"
                                    aria-hidden="true"
                                  ></span>
                                </>
                              ) : (
                                "Update Password"
                              )}
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ToastContainer style={{ width: "auto" }} />
    </Layout>
  );
}
