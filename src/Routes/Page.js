import React from 'react'
import { Routes, Route } from "react-router-dom";
//  for public pages
import Login from "../components/Login"
import Error from '../components/Error';
// dashboard
import Dashboard from '../Pages/Dashboard';


export default function Page() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/*" element={<Error />} />
      <Route path="/dashboard" element={<Dashboard />} />
     
    </Routes>
  )
}
