import React from "react";
import Layout from "../../components/Layout";
import ContentHeader from "../../components/ContentHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddCompanys() {
  return (
    <Layout ac2="active">
      <ContentHeader
        title="Add New Company "
        breadcrumbs={[
          { label: "Dashboard", to: "/admin/dashboard" },
          { label: "Add New Company " },
        ]}
      />
      <ToastContainer  style={{ width: "auto" }} />
    </Layout>
  );
}
