import React from 'react'
import UserLayout from '../../../components/UserLayout'
import ContentHeader from '../../../components/ContentHeader'
export default function AdminProfile() {
  return (
    <UserLayout ac9="active" >
        <ContentHeader title="Profile" breadcrumbs={[{ label: 'Dashboard', to: '/admin/userdashboard' }, { label: 'Profile' }]} />


    </UserLayout>
  )
}
