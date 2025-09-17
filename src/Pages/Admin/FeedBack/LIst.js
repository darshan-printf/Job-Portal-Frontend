import React from "react";
import Layout from "../../../components/Layout";
import ContentHeader from "../../../components/ContentHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddCompanys() {
  return (
    <Layout ac8="active">
      <ContentHeader title="FeedBack  "breadcrumbs={[{ label: "Dashboard", to: "/admin/dashboard" }, { label: "FeedBack " },]}/>
      <section className="content mb-1">Page is under development</section>
      <ToastContainer position="top-center" style={{ width: "auto" }} />
    </Layout>
  );
}
