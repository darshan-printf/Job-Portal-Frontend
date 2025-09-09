import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { KeyRound, UserLock } from "lucide-react";


export default function Login() {
  const apiUrl = process.env.REACT_APP_API_URL; // Get the API URL from the .env file
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false); // Button loading effect state
  const Env = process.env;

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");

    if (isLogin === "true") {
      console.log("User is logged in, clearing localStorage...");
      localStorage.clear();
    }
  }, []);

  // Function to handle form submission
  const handleSubmit = (e) => {
    setLoaded(true);
    e.preventDefault(); // Prevent default form submission

    // Prepare data for login request
    const data = JSON.stringify({
      username: email, // Assuming 'userName' is the same as email
      password: password,
    });

    // Axios configuration for login request
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiUrl}auth/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    // Make the API request
    axios
      .request(config)
      .then((response) => {
        setLoaded(false);
        if (response?.data) {
          console.log(response.data, "resposn");
          // Save tokens and user info to localStorage
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("role", response.data.role);
          localStorage.setItem("isLogin", true);
          const duration = 1500000;

          setTimeout(() => {
            localStorage.setItem("isLogin", false);
          }, duration);

          if (response.data.role == "admin") {
            navigate("/admin/dashboard");
          } else if (response.data.role == "user") {
            navigate("/admin/userdashboard");
          } else {
            navigate("/");
          }
        } else {
          setLoaded(false);
          toast.error("Invalid email or password");
        }
      })
      .catch((error) => {
        setLoaded(false);
        if (error.response) {
          toast.error(error.response?.data?.message);
        } else if (error.request) {
          toast.error(
            "Server is temporarily unavailable. Please try again later."
          );
        } else {
          toast.error("An error occurred. Please try again.");
        }
      });
  };

  return (
    <>
      <div className="star-field">
        <div className="layer"></div>
        <div className="layer"></div>
        <div className="layer"></div>

        <div className="login-page-bg bg" id="page-bg">
          <div className="login-box">
            <div className="card card-outline card-primary pb-4">
              <div class="text-center mt-2">
                <img
                  class="profile-user-img-com img-fluid border border-0"
                  src={Env.REACT_APP_PROJECT_ICON}
                  alt="User profile picture"
                />

                <h3 className="mt-2">{Env.REACT_APP_PROJECT_NAME}</h3>
              </div>
              <div className="card-body pt-0 ">
                <p className="login-box-msg">
                  {Env.REACT_APP_PROJECT_NAME} Sign In
                </p>
                <form onSubmit={handleSubmit}>
                     <UserLock /> <label>Username</label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Your Username"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} // Update email state
                      required
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-user"></span>
                      </div>
                    </div>
                  </div>
                   <KeyRound /> <label>Password</label>
                  <div className="input-group mb-3">
                    <input
                      type={showPassword ? "text" : "password"} // Toggle input type
                      className="form-control"
                      placeholder="Enter Your Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} // Update password state
                      required
                    />
                    <div className="input-group-append">
                      <button
                        type="button"
                        className="input-group-text"
                        onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                        style={{ cursor: "pointer" }}
                      >
                        <span
                          className={
                            showPassword ? "fas fa-eye-slash" : "fas fa-eye"
                          }
                        ></span>
                      </button>
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-12">
                      <button
                        className="btn btn-primary btn-block"
                        disabled={loaded}
                      >
                        {loaded ? (
                          <>
                            {" "}
                            <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>{" "}
                            Please wait...
                          </>
                        ) : (
                          <>Login</>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="text-center mt-3">
                <p className="text-center mb-1">
                  New Registration <Link to={"/admin/registration"}>Click</Link>
                </p>
                <p className="text-center mb-0">
                  Designed by <Link>{Env.REACT_APP_DEVLOPER_NAME}</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
