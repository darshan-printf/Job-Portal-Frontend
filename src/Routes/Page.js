// App.js
import React from "react";
import {  Routes, Route } from "react-router-dom";
import "../App.css";
import ProtectedRoute from "../utils/ProtectedRoute"; // Utility 

// Layouts
import AdminLayout from "../components/AdminRouteLayout";
import WebLayout from "../components/WebsiteRouteLayout";

// Public pages
import Login from "../components/Login";
import Registration from "../components/Registration";
import Error from "../components/Error";

//  Super Admin Pages
import Dashboard from "../Pages/Admin/Dashboard";
import CountryAdd from "../Pages/Admin/Country/Add";
import CountryEdit from "../Pages/Admin/Country/Edit";
import CountryList from "../Pages/Admin/Country/List";
import StatesAdd from "../Pages/Admin/States/Add";
import StatesEdit from "../Pages/Admin/States/Edit";
import StatesList from "../Pages/Admin/States/List";
import CityAdd from "../Pages/Admin/City/Add";
import CityEdit from "../Pages/Admin/City/Edit";
import CityList from "../Pages/Admin/City/List";
import UserAdd from "../Pages/Admin/User/Add";
import UserEdit from "../Pages/Admin/User/Edit";
import UserList from "../Pages/Admin/User/List";
import Location from "../Pages/Admin/Location";
import AddCompanys from "../Pages/Admin/Companys/Add";
import EditCompany from "../Pages/Admin/Companys/Edit";
import ListCompany from "../Pages/Admin/Companys/LIst";
import JobList from "../Pages/Admin/Job/List";
import AddJob from "../Pages/Admin/Job/Add";
import EditJob from "../Pages/Admin/Job/Edit";
import Report from "../Pages/Admin/Reports/GrafPage";
import FeedBackLIst  from "../Pages/Admin/FeedBack/LIst";
import Mails from "../Pages/Admin/Mails/Inbox";
import Profile from "../Pages/Admin/Profile/AdminProfile";
import ForgetPassWord from "../Pages/Admin/Profile/ForgetPassword";
import TeamAdd from "../Pages/Admin/Team/Add";
import TeamEdit from "../Pages/Admin/Team/Edit";
import TeamList from "../Pages/Admin/Team/List";


// Admin Pages
import ClientDashboard from "../Pages/Client/Dashboard";

// Public Pages
import Home from "../Pages/Web/Home";
import About from "../Pages/Web/About/About";
import Services from "../Pages/Web/Services/Services";
import Team from "../Pages/Web/Team/Team";
import Contact from "../Pages/Web/Contact/Contact";
import FeedBack from "../Pages/Web/FeedBack/FeedBack";
import JobBoard from "../Pages/Web/JobBoard/JobBoard";

export default function App() {
  return (

        <Routes>
          {/* Admin layout and routes */}
          <Route     path="/admin"             element={<AdminLayout />}>

            {/* Public routes */}
            <Route   path="login"              element={<Login />} />
            <Route   path="registration"       element={<Registration/>} />
            <Route   path="*"                  element={<Error />} />

            {/* Admin protected routes */}
            <Route   path="dashboard"          element={<ProtectedRoute        element={<Dashboard />}         allowedRoles={['admin']}   />} />
            <Route   path="location"           element={<ProtectedRoute        element={<Location />}          allowedRoles={['admin']}   />} />
            <Route   path="countryadd"         element={<ProtectedRoute        element={<CountryAdd />}        allowedRoles={['admin']}   />} />
            <Route   path="countryedit"        element={<ProtectedRoute        element={<CountryEdit />}       allowedRoles={['admin']}   />} />
            <Route   path="countrylist"        element={<ProtectedRoute        element={<CountryList />}       allowedRoles={['admin']}   />} />
            <Route   path="statesadd"          element={<ProtectedRoute        element={<StatesAdd />}         allowedRoles={['admin']}   />} />
            <Route   path="statesedit"         element={<ProtectedRoute        element={<StatesEdit />}        allowedRoles={['admin']}   />} />
            <Route   path="stateslist"         element={<ProtectedRoute        element={<StatesList />}        allowedRoles={['admin']}   />} />
            <Route   path="cityadd"            element={<ProtectedRoute        element={<CityAdd />}           allowedRoles={['admin']}   />} />
            <Route   path="cityedit"           element={<ProtectedRoute        element={<CityEdit />}          allowedRoles={['admin']}   />} />
            <Route   path="citylist"           element={<ProtectedRoute        element={<CityList />}          allowedRoles={['admin']}   />} />
            <Route   path="useradd"            element={<ProtectedRoute        element={<UserAdd />}           allowedRoles={['admin']}   />} />
            <Route   path="useredit"           element={<ProtectedRoute        element={<UserEdit />}          allowedRoles={['admin']}   />} />
            <Route   path="userlist"           element={<ProtectedRoute        element={<UserList />}          allowedRoles={['admin']}   />} />
            <Route   path="companys/add"       element={<ProtectedRoute        element={<AddCompanys />}       allowedRoles={['admin']}   />} />
            <Route   path="companys/edit"      element={<ProtectedRoute        element={<EditCompany />}       allowedRoles={['admin']}   />} />
            <Route   path="companys/list"      element={<ProtectedRoute        element={<ListCompany />}       allowedRoles={['admin']}   />} />
            <Route   path="joblist"            element={<ProtectedRoute        element={<JobList />}           allowedRoles={['admin']}   />} />
            <Route   path="jobadd"             element={<ProtectedRoute        element={<AddJob />}            allowedRoles={['admin']}   />} />
            <Route   path="jobedit"            element={<ProtectedRoute        element={<EditJob />}           allowedRoles={['admin']}   />} />
            <Route   path="report"             element={<ProtectedRoute        element={<Report />}            allowedRoles={['admin']}   />} />
            <Route   path="feedbacklist"       element={<ProtectedRoute        element={<FeedBackLIst />}      allowedRoles={['admin']}   />} />
            <Route   path="mails"              element={<ProtectedRoute        element={<Mails />}             allowedRoles={['admin']}   />} />
            <Route   path="profile"            element={<ProtectedRoute        element={<Profile />}           allowedRoles={['admin']}   />} />
            <Route   path="forgetpassword"     element={<ProtectedRoute        element={<ForgetPassWord />}    allowedRoles={['admin']}   />} />
            <Route   path="team/add"           element={<ProtectedRoute        element={<TeamAdd />}           allowedRoles={['admin']}   />} />
            <Route   path="team/edit"          element={<ProtectedRoute        element={<TeamEdit />}          allowedRoles={['admin']}   />} />
            <Route   path="team/list"          element={<ProtectedRoute        element={<TeamList />}          allowedRoles={['admin']}   />} />
            
            {/* User protected routes */}
            <Route   path="userdashboard"      element={<ProtectedRoute        element={<ClientDashboard />}   allowedRoles={['user']}    />} />
            
          </Route>
          
          {/* Web layout and routes */}
           <Route    path="/"                   element={<WebLayout />}>
            <Route   path="/"                   element={<Home />} />
            <Route   path="about"               element={<About />} />
            <Route   path="services"            element={<Services />} />
            <Route   path="team"                element={<Team />} />
            <Route   path="contact"             element={<Contact />} />
            <Route   path="feedback"            element={<FeedBack />} />
            <Route   path="jobboard"            element={<JobBoard />} />
          </Route>
        </Routes>
     
   
  );
}
