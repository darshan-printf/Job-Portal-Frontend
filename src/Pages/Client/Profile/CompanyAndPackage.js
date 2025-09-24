import React from 'react'
import UserLayout from '../../../components/UserLayout'
import ContentHeader from '../../../components/ContentHeader'
export default function CompanyAndPackage() {
  return (
    <UserLayout ac8="active" >
        <ContentHeader title="Job Posting" breadcrumbs={[{ label: 'Dashboard', to: '/admin/userdashboard' }, { label: 'Job List' }]} />


    </UserLayout>
  )
}
