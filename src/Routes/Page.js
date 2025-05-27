import React from 'react'
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from '../utils/ProtectedRoute';

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
      {/* element={<ProtectedRoute element={} allowedRoles={['admin']} />} */}
      <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} allowedRoles={['admin']} />} />
      {/* Country Routes */}
      <Route path="/countryadd" element={<ProtectedRoute element={<CountryAdd />} allowedRoles={['admin']} />} />
      <Route path="/countryedit" element={<ProtectedRoute element={<CountryEdit />} allowedRoles={['admin']} />} />
      <Route path="/countrylist" element={<ProtectedRoute element={<CountryList />} allowedRoles={['admin']} />} />
      {/* States Routes */}
      <Route path="/statesadd" element={<ProtectedRoute element={<StatesAdd />} allowedRoles={['admin']} />} />
      <Route path="/statesedit" element={<ProtectedRoute element={<StatesEdit />} allowedRoles={['admin']} />} />
      <Route path="/stateslist" element={<ProtectedRoute element={<StatesList />} allowedRoles={['admin']} />} />

    </Routes>
  )
}
