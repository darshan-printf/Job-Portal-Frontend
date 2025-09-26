import React from "react";
import Layout from "../../../components/Layout";
import ContentHeader from "../../../components/ContentHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddCompanys() {
  return (
    <Layout ac6="active">
      <ContentHeader title="Reports "breadcrumbs={[{ label: "Dashboard", to: "/admin/dashboard" }, { label: "Reports " },]}/>
      <section className="content mb-1">Page is under development</section>
      <ToastContainer  style={{ width: "auto" }} />
    </Layout>
  );
}
