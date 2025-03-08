import React from 'react'
import { Routes, Route } from "react-router-dom";
//  for public pages
import Login from "../components/Login"
import Error from '../components/Error';

// dashboard
import Dashboard from '../Pages/Dashboard';

// Country Routes
import CountryAdd from '../Pages/Country/Add';
import CountryEdit from '../Pages/Country/Edit';
import CountryList from '../Pages/Country/List'
// States Routes
import StatesAdd from '../Pages/States/Add';
import StatesEdit from '../Pages/States/Edit';
import StatesList from '../Pages/States/List'
 

export default function Page() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/*" element={<Error />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* Country Routes */}
      <Route path="/countryadd" element={< CountryAdd/>} />
      <Route path="/countryedit" element={< CountryEdit/>} />
      <Route path="/countrylist" element={< CountryList/>} />
      {/* States Routes */}
      <Route path="/statesadd" element={< StatesAdd/>} />
      <Route path="/statesedit" element={< StatesEdit/>} />
      <Route path="/stateslist" element={< StatesList/>} />
     
    </Routes>
  )
}
