import React from 'react'
import UserLayout from '../../../components/UserLayout'
import ContentHeader from '../../../components/ContentHeader'
export default function Add() {
  return (
    <UserLayout ac2="active" >
        <ContentHeader title="Add Job" breadcrumbs={[{ label: 'Dashboard', to: '/admin/userdashboard' },  { label: 'Job List', to: '/admin/joblist' },{ label: 'Add Job' }]} />


    </UserLayout>
  )
}