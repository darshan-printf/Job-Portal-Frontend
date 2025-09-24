import React from 'react'
import UserLayout from '../../../components/UserLayout'
import ContentHeader from '../../../components/ContentHeader'
export default function OfferLetterList() {
  return (
    <UserLayout ac5="active" >
        <ContentHeader title="Offer Letter List" breadcrumbs={[{ label: 'Dashboard', to: '/admin/userdashboard' }, { label: 'Offer Letter List' }]} />


    </UserLayout>
  )
}
