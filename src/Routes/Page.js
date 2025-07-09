// App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store";
import "../App.css";

// Layouts
import AdminLayout from "../components/AdminRouteLayout";
import WebLayout from "../components/WebsiteRouteLayout";

// Public pages
import Login from "../components/Login";
import Error from "../components/Error";

// Admin Pages
import Dashboard from "../Pages/Dashboard";
import CountryAdd from "../Pages/Country/Add";
import CountryEdit from "../Pages/Country/Edit";
import CountryList from "../Pages/Country/List";
import StatesAdd from "../Pages/States/Add";
import StatesEdit from "../Pages/States/Edit";
import StatesList from "../Pages/States/List";
import CityAdd from "../Pages/City/Add";
import CityEdit from "../Pages/City/Edit";
import CityList from "../Pages/City/List";
import UserAdd from "../Pages/User/Add";
import UserEdit from "../Pages/User/Edit";
import UserList from "../Pages/User/List";



// Utility
import ProtectedRoute from "../utils/ProtectedRoute";
import Home from "../Pages/Web/Home";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}

          {/* Admin layout and routes */}
          <Route path="/admin" element={<AdminLayout />}>
          
            <Route path="login" element={<Login />} />
            <Route path="dashboard" element={<ProtectedRoute element={<Dashboard />} allowedRoles={['admin']} />} />
            <Route path="countryadd" element={ <ProtectedRoute element={<CountryAdd />} allowedRoles={['admin']} /> } />
            <Route path="countryedit" element={ <ProtectedRoute element={<CountryEdit />} allowedRoles={['admin']} />} />
            <Route path="countrylist" element={ <ProtectedRoute element={<CountryList />} allowedRoles={['admin']} /> }  />
            <Route path="statesadd" element={ <ProtectedRoute element={<StatesAdd />} allowedRoles={['admin']} />  } />
            <Route path="statesedit" element={  <ProtectedRoute element={<StatesEdit />} allowedRoles={['admin']} /> } />
            <Route path="stateslist" element={<ProtectedRoute element={<StatesList />} allowedRoles={['admin']} /> }  />
            <Route path="cityadd" element={<ProtectedRoute element={<CityAdd />} allowedRoles={['admin']} /> }/>
            <Route path="cityedit" element={<ProtectedRoute element={<CityEdit />} allowedRoles={['admin']} /> }/>
            <Route path="citylist"  element={<ProtectedRoute element={<CityList />} allowedRoles={['admin']} /> }/>
            <Route path="useradd" element={<ProtectedRoute element={<UserAdd />} allowedRoles={['admin']} /> }/>
            <Route path="useredit" element={<ProtectedRoute element={<UserEdit />} allowedRoles={['admin']} /> }/>
            <Route path="userlist" element={<ProtectedRoute element={<UserList />} allowedRoles={['admin']} /> }/>

            <Route path="*" element={<Error />} />
          </Route>

          {/* Client layout and routes */}
          <Route path="/" element={<WebLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
