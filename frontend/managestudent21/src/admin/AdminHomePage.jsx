import React from "react";
import { AdminSidebar, AdminTopbar } from "../components";
import { Outlet } from "react-router-dom";

const AdminHomePage = () => {
  return (
    <div className="wrapper d-flex" style={{ minHeight: "100vh" }}>
      <AdminSidebar />
      <div className="flex-grow-1" style={{ minHeight: "100vh" }}>
        <AdminTopbar />
        <div
          style={{
            padding: "20px",
            overflowY: "auto",
            maxHeight: "calc(100vh - 55px)",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
