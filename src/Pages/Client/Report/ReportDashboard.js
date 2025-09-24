import React from 'react'
import UserLayout from '../../../components/UserLayout'
import ContentHeader from '../../../components/ContentHeader'

export default function ReportDashboard() {
  return (
    <UserLayout ac7="active" >
        <ContentHeader title="Report Dashboard" breadcrumbs={[{ label: 'Dashboard', to: '/admin/userdashboard' }, { label: 'Report Dashboard' }]} />


    </UserLayout>
  )
}
