import React, { useState, useEffect } from "react";
import UserLayout from "../../../components/UserLayout";
import ContentHeader from "../../../components/ContentHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
export default function AdminProfile() {
  const [adminData, setAdminData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    instituteName: "",
    role: "",
    profileImage: "",
    logo: "",
    isActive: true,
  });
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [updating, setUpdating] = useState(false);
  const Env = process.env;
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  useEffect(() => {
    fetchAdminData();
    // eslint-disable-next-line
  }, []);

  const fetchAdminData = async () => {
    try {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${Env.REACT_APP_API_URL}admin/get/${id}`,
        headers: {
          authorization: token,
          "Cache-Control": "no-cache",
        },
      };
      const response = await axios.request(config);
      setAdminData(response.data);
    } catch (error) {
      toast.error("Failed to load admin profile");
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setAdminData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setAdminData((prevData) => ({
          ...prevData,
          profileImage: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("firstName", adminData.firstName);
      formData.append("lastName", adminData.lastName);
      formData.append("username", adminData.username);
      formData.append("email", adminData.email);
      formData.append("instituteName", adminData.instituteName);
      if (profileImageFile) {
        formData.append("profileImage", profileImageFile);
      }
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${Env.REACT_APP_API_URL}admin/updateProfile`,
        headers: {
          authorization: token,
          "Cache-Control": "no-cache",
        },
        data: formData,
      };
      const response = await axios.request(config);
      toast.success(response.data.message);
      localStorage.setItem("firstName", response.data.firstName);
      localStorage.setItem("lastName", response.data.lastName);
      localStorage.setItem("profileImage", response.data.profileImage);
      setUpdating(false);
      fetchAdminData();
    } catch (error) {
      toast.error("Failed to update profile");
      setUpdating(false);
    }
  };
  return (
    <UserLayout ac9="active">
      <ContentHeader
        title="Profile"
        breadcrumbs={[
          { label: "Dashboard", to: "/admin/userdashboard" },
          { label: "Profile" },
        ]}
      />
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <div className="card card-primary card-outline">
                <div className="card-body box-profile">
                  <div className="text-center">
                    <img
                      className={`profile-user-img img-fluid img-circle  ${
                        adminData.isActive ? "border-success" : "border-danger"
                      }`}
                      src={
                        adminData.profileImage ||
                        process.env.REACT_APP_PROJECT_ICON
                      }
                      alt="User profile"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="mt-2">
                      <label
                        htmlFor="profileImageUpload"
                        className="btn btn-sm btn-primary mb-0"
                      >
                        Change Photo
                      </label>
                      <input
                        type="file"
                        id="profileImageUpload"
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>

                  <h3 className="profile-username text-center">
                    {adminData.instituteName}
                  </h3>
                  <ul className="list-group list-group-unbordered mb-5">
                    <li className="list-group-item">
                      <b>Username</b>
                      <span className="float-right text-primary">
                        {adminData.username}
                      </span>
                    </li>
                    <li className="list-group-item">
                      <b>Email</b>
                      <span className="float-right text-info">
                        {adminData.email}
                      </span>
                    </li>
                    <li className="list-group-item">
                      <b>Status</b>
                      <span className="float-right text-success">
                        {adminData.isActive ? "Active" : "Inactive"}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-9">
              <div className="card card-primary card-outline">
                <div className="card-body ">
                  <div className="tab-content">
                    <div className="tab-pane active" id="settings">
                      <form className="form-horizontal" onSubmit={handleSubmit}>
                        <div className="form-group row">
                          <label
                            htmlFor="firstName"
                            className="col-sm-2 col-form-label"
                          >
                            First Name
                          </label>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              className="form-control"
                              id="firstName"
                              placeholder="First Name"
                              value={adminData.firstName}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="form-group row">
                          <label
                            htmlFor="lastName"
                            className="col-sm-2 col-form-label"
                          >
                            Last Name
                          </label>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              className="form-control"
                              id="lastName"
                              placeholder="Last Name"
                              value={adminData.lastName}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="form-group row">
                          <label
                            htmlFor="email"
                            className="col-sm-2 col-form-label"
                          >
                            Email
                          </label>
                          <div className="col-sm-10">
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              placeholder="Email"
                              value={adminData.email}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="form-group row">
                          <label
                            htmlFor="username"
                            className="col-sm-2 col-form-label"
                          >
                            Username
                          </label>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              className="form-control"
                              id="username"
                              placeholder="Username"
                              value={adminData.username}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="form-group row">
                          <label
                            htmlFor="instituteName"
                            className="col-sm-2 col-form-label"
                          >
                            Institute Name
                          </label>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              className="form-control"
                              id="instituteName"
                              placeholder="Institute Name"
                              value={adminData.instituteName}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="form-group row">
                          <label
                            htmlFor="role"
                            className="col-sm-2 col-form-label"
                          >
                            Role
                          </label>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              className="form-control"
                              id="role"
                              placeholder="Role"
                              value={adminData.role}
                              onChange={handleInputChange}
                              disabled
                            />
                          </div>
                        </div>

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
                                    className="spinner-border spinner-border-sm mr-2"
                                    role="status"
                                    aria-hidden="true"
                                  ></span>
                                </>
                              ) : (
                                "Update Profile"
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
    </UserLayout>
  );
}
