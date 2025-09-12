import React from "react";
import Layout from "../../components/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import City from "./City/List";
import Country from "./Country/List";
import States from "./States/List";

export default function Dashboard() {
  return (
    <Layout ac4="active">
      <Country />
      <section className="content">
        <div className="row">
          <div className="col-6">
            <States />
          </div>
          <div className="col-6">
            <City />
          </div>
        </div>
      </section>
      <ToastContainer position="top-center" style={{ width: "auto" }} />
    </Layout>
  );
}
