import React from "react";
import { Link, NavLink } from "react-router-dom";
import { PiStudentBold } from "react-icons/pi";
import { BiSolidUserAccount } from "react-icons/bi";
import { MdDashboard } from "react-icons/md";

const AdminSidebar = () => {
  return (
    <aside
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
      style={{ width: "18%", height: "100vh" }}
    >
      <Link
        to={"/admin"}
        className="d-flex flex-column align-items-center justify-content-center text-white text-decoration-none"
      >
        {/* <svg className="bi me-2" width="40" height="32">
          <use xlinkHref="#bootstrap"></use>
        </svg> */}
        <img
          src="../../public/logoAdmin2.jpg"
          alt=""
          width="180"
          height="60"
          className="me-2"
          style={{ objectFit: "cover" }}
        />
        <span className="fs-4">DailyCode</span>
      </Link>
      <hr className="bg-white" />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item my-2">
          <NavLink
            to="/admin"
            className="nav-link text-white d-flex align-items-center"
            aria-current="page"
            end
          >
            <MdDashboard style={{ fontSize: "1.5rem", marginRight: "15px" }} />
            <span style={{ fontSize: "1.2rem" }}>Dashboard</span>
          </NavLink>
        </li>
        <li className="nav-item my-2">
          <NavLink
            to="/admin/accounts"
            className="nav-link text-white d-flex align-items-center"
            // aria-current="page"
          >
            <BiSolidUserAccount
              style={{ fontSize: "1.5rem", marginRight: "15px" }}
            />
            <span style={{ fontSize: "1.2rem" }}>Account</span>
          </NavLink>
        </li>
        <li className="nav-item my-2">
          <NavLink
            to="/admin/students"
            className="nav-link text-white d-flex align-items-center"
          >
            <PiStudentBold
              style={{ fontSize: "1.5rem", marginRight: "15px" }}
            />
            <span style={{ fontSize: "1.2rem" }}>Student</span>
          </NavLink>
        </li>
      </ul>
      <hr className="bg-white" />
    </aside>
  );
};

export default AdminSidebar;
