import React from 'react'
import UserLayout from '../../../components/UserLayout'
import ContentHeader from '../../../components/ContentHeader'
export default function CandidateList() {
  return (
    <UserLayout ac3="active" >
        <ContentHeader title="Candidate List" breadcrumbs={[{ label: 'Dashboard', to: '/admin/userdashboard' }, { label: 'Candidate List' }]} />


    </UserLayout>
  )
}
