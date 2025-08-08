import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ApiService from "../service/ApiService";

const Navbar = () => {
  const [currentAccount, setCurrentAccount] = useState({
    id: 0,
    role: "ADMIN",
    name: "",
    email: "",
    userName: "",
    avatar: "",
  });
  const navigate = useNavigate();

  const loadCurrentAccount = async () => {
    try {
      const result = await ApiService.getLoggedInAccountNotPassword();
      if (result.statusCode === 200) {
        setCurrentAccount(result.account);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCurrentAccount();
  }, []);

  const handleLogout = () => {
    ApiService.logout();
    navigate("/login");
  };

  return (
    <nav
      class="navbar navbar-expand-lg mb-5 py-2 h-100 px-3"
      style={{ backgroundColor: "#0a1d3e" }}
    >
      <Link class="navbar-brand text-light" to="/user">
        <img
          src="../../public/logo.jpg"
          alt="Logo"
          class="navbar-brand"
          style={{ height: "55px", width: "100px" }}
        />
      </Link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <NavLink
              className={({ isActive }) =>
                `nav-link ${isActive ? "text-warning" : "text-light"}`
              }
              to="/user"
              end
              style={{ padding: "5px 20px", fontSize: "18px" }}
            >
              About
            </NavLink>
          </li>
          <li class="nav-item">
            <NavLink
              className={({ isActive }) =>
                `nav-link ${isActive ? "text-warning" : "text-light"}`
              }
              to="/user/students"
              style={{ padding: "5px 20px", fontSize: "18px" }}
            >
              Student
            </NavLink>
          </li>
          <li class="nav-item">
            <NavLink
              className={({ isActive }) =>
                `nav-link ${isActive ? "text-warning" : "text-light"}`
              }
              to="/user/addStudent"
              style={{ padding: "5px 20px", fontSize: "18px" }}
            >
              Add student
            </NavLink>
          </li>
        </ul>
      </div>
      {/* Logo và Dropdown Menu của Tài Khoản */}
      <div className="dropdown">
        <a
          className="nav-link dropdown-toggle text-light d-flex align-items-center"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{ cursor: "pointer" }}
        >
          <img
            src={`../../public/images/${currentAccount.avatar}`}
            className="rounded-circle"
            height="35"
            width="35"
            alt="Avatar"
            style={{ objectFit: "cover", marginRight: "10px" }}
            loading="lazy"
          />
          {/* <span style={{ fontSize: "18px" }}>{currentAccount.userName}</span> */}
        </a>
        <ul
          className="dropdown-menu dropdown-menu-end shadow"
          aria-labelledby="navbarDropdown"
          style={{
            minWidth: "150px",
            borderRadius: "8px",
            overflow: "hidden",
            padding: "0",
          }}
        >
          <li>
            <Link
              className="dropdown-item d-flex align-items-center p-2"
              to="/user/profileLoggedInAccount"
              style={{ fontSize: "16px", color: "#333" }}
            >
              <i
                className="bi bi-person-circle me-2"
                style={{ fontSize: "1rem" }}
              ></i>
              Profile
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a
              className="dropdown-item d-flex align-items-center p-2"
              onClick={handleLogout}
              style={{ fontSize: "16px", color: "#ff4d4d" }}
            >
              <i
                className="bi bi-box-arrow-right me-2"
                style={{ fontSize: "1rem" }}
              ></i>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
