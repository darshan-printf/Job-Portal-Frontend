import React from 'react'
import UserLayout from '../../../components/UserLayout'
import ContentHeader from '../../../components/ContentHeader'
export default function SchedulingList() {
  return (
    <UserLayout ac4="active" >
        <ContentHeader title="Interview Schedule" breadcrumbs={[{ label: 'Dashboard', to: '/admin/userdashboard' }, { label: 'Interview Schedule' }]} />


    </UserLayout>
  )
}
