import React, { useEffect, useState } from "react";
import ApiService from "../service/ApiService";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const AdminTopbar = () => {
  const [loggedInAccount, setLoggedInAccount] = useState({
    id: 0,
    name: "",
    role: "ADMIN",
    email: "",
    userName: "",
    avatar: "",
  });
  const navigate = useNavigate();

  const handleLogout = () => {
    ApiService.logout();
    navigate("/login");
  };

  const loadLoggedInAccountNotPass = async () => {
    try {
      const result = await ApiService.getLoggedInAccountNotPassword();
      if (result.statusCode === 200) {
        console.log(result.account);

        setLoggedInAccount(result.account);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadLoggedInAccountNotPass();
  }, []);

  return (
    <div
      className="flex-grow-1 d-flex align-items-center justify-content-between p-3"
      style={{ height: "55px", backgroundColor: "#2E323B", color: "#fff" }}
    >
      {/* <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
        Admin Dashboard
      </span> */}
      <form
        className="input-group d-flex align-items-center"
        style={{ width: "400px" }}
      >
        <input
          type="search"
          className="form-control"
          placeholder="Search..."
          aria-label="Search"
          style={{
            height: "30px",
            fontSize: "0.9rem",
            borderRadius: "5px 0 0 5px",
            borderRight: "2px solid",
          }}
        />
        <button
          className="btn btn-light d-flex align-items-center justify-content-center"
          type="button"
          style={{
            padding: "0.45rem 1.5rem",
            height: "30px",
            borderRadius: "0 5px 5px 0",
          }}
        >
          <FaSearch style={{ fontSize: "1rem" }} />
        </button>
      </form>

      {/* Dropdown */}
      <div className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle d-flex align-items-center"
          id="navbarDropdownMenuLink"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{ cursor: "pointer" }}
        >
          <img
            src={`../../public/images/${loggedInAccount.avatar}`}
            className="rounded-circle"
            height="35"
            width="35"
            alt="Avatar"
            style={{ objectFit: "cover", marginRight: "10px" }}
            loading="lazy"
          />
          <span style={{ fontSize: "1rem", fontWeight: "500" }}>
            {loggedInAccount.name}
          </span>
        </a>
        <ul
          className="dropdown-menu dropdown-menu-end shadow"
          aria-labelledby="navbarDropdownMenuLink"
          style={{
            minWidth: "200px",
            borderRadius: "8px",
            overflow: "hidden",
            padding: "0",
          }}
        >
          <li>
            <Link
              className="dropdown-item d-flex align-items-center p-3"
              to="/admin/profile"
              style={{ fontSize: "0.9rem", color: "#333" }}
            >
              <i
                className="bi bi-person-circle me-2"
                style={{ fontSize: "1.2rem" }}
              ></i>
              My Profile
            </Link>
          </li>
          <li>
            <a
              className="dropdown-item d-flex align-items-center p-3"
              href="#"
              style={{ fontSize: "0.9rem", color: "#333" }}
            >
              <i className="bi bi-gear me-2" style={{ fontSize: "1.2rem" }}></i>
              Settings
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a
              className="dropdown-item d-flex align-items-center p-3"
              href="#"
              style={{ fontSize: "0.9rem", color: "#ff4d4d" }}
              onClick={handleLogout}
            >
              <i
                className="bi bi-box-arrow-right me-2"
                style={{ fontSize: "1.2rem" }}
              ></i>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminTopbar;
