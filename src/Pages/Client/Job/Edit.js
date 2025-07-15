import React from 'react'
import UserLayout from '../../../components/UserLayout'
import ContentHeader from '../../../components/ContentHeader'
export default function Edit() {
  return (
    <UserLayout ac2="active" >
        <ContentHeader title="Edit job" breadcrumbs={[{ label: 'Dashboard', to: '/admin/userdashboard' }, { label: 'Job List', to: '/admin/joblist' }, { label: 'Edit Job' }]} />


    </UserLayout>
  )
}