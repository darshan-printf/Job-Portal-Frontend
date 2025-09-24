import React from 'react'
import UserLayout from '../../../components/UserLayout'
import ContentHeader from '../../../components/ContentHeader'
export default function CompanyAndPackage() {
  return (
    <UserLayout ac8="active" >
        <ContentHeader title="Company & Package" breadcrumbs={[{ label: 'Dashboard', to: '/admin/userdashboard' }, { label: 'Company & Package' }]} />


    </UserLayout>
  )
}
