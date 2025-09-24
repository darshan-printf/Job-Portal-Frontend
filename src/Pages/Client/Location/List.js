import React from 'react'
import UserLayout from '../../../components/UserLayout'
import ContentHeader from '../../../components/ContentHeader'
export default function LocationList() {
  return (
    <UserLayout ac3="active" >
        <ContentHeader title="Location List" breadcrumbs={[{ label: 'Dashboard', to: '/admin/userdashboard' }, { label: 'Location List' }]} />


    </UserLayout>
  )
}
