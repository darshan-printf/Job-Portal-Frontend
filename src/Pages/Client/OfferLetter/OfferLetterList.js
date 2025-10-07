import React from "react";
import UserLayout from "../../../components/UserLayout";
import ContentHeader from "../../../components/ContentHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddCompanys() {
  return (
    <UserLayout ac5="active">
      <ContentHeader
        title="Offer Letter List"
        breadcrumbs={[
          { label: "Dashboard", to: "/admin/userdashboard" },
          { label: "Offer Letter List" },   
        ]}
      />
      <ToastContainer  style={{ width: "auto" }} />
    </UserLayout>
  );
}
