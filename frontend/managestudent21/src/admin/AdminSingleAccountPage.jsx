import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaBackward } from "react-icons/fa";
import ApiService from "../service/ApiService";

const AdminSingleAccountPage = () => {
  const [account, setAccount] = useState({
    id: 0,
    name: "",
    userName: "",
    email: "",
    avatar: "",
    role: "",
  });
  const { id } = useParams();

  const loadStudentById = async (id) => {
    try {
      const result = await ApiService.getAccountById(id);
      if (result.statusCode === 200) {
        setAccount(result.account);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadStudentById(id);
  }, [id]);

  return (
    <section>
      {/* style={{ backgroundColor: "#eee" }} */}
      <h3 style={{ fontSize: "25px" }}>Account profile</h3>
      <Link
        to="/admin/accounts"
        className="btn btn-success d-flex justify-content-center align-items-center"
        style={{ width: "150px", fontSize: "18px" }}
      >
        <FaBackward />
        <span className="mx-2">Back</span>
      </Link>
      <div class="container py-5">
        <div class="row">
          <div class="col-lg-4">
            <div class="card mb-4">
              <div class="card-body text-center">
                <img
                  src={`${
                    account.avatar
                      ? `../../public/images/${account.avatar}`
                      : ""
                  }`}
                  alt="avatar"
                  class="rounded-circle img-fluid"
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
                <h5 class="my-3">{account.name}</h5>
                <p class="text-muted mb-1">Full Stack Developer</p>
                <p class="text-muted mb-4">Bay Area, San Francisco, CA</p>
                <div class="d-flex justify-content-center mb-2">
                  <Link
                    to="/admin/accounts"
                    type="button"
                    data-mdb-button-init
                    data-mdb-ripple-init
                    class="btn btn-primary"
                    style={{ width: "100px", fontSize: "15px" }}
                  >
                    Back
                  </Link>
                  <Link
                    to={`/admin/updateAccount/${id}`}
                    type="button"
                    data-mdb-button-init
                    data-mdb-ripple-init
                    class="btn btn-warning ms-1"
                    style={{ width: "100px", fontSize: "15px" }}
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
            {/* <div class="card mb-4 mb-lg-0">
              <div class="card-body p-0">
                <ul class="list-group list-group-flush rounded-3">
                  <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i class="fas fa-globe fa-lg text-warning"></i>
                    <p class="mb-0">https://mdbootstrap.com</p>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i class="fab fa-github fa-lg text-body"></i>
                    <p class="mb-0">mdbootstrap</p>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i
                      class="fab fa-twitter fa-lg"
                      style={{ color: "#55acee" }}
                    ></i>
                    <p class="mb-0">@mdbootstrap</p>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i
                      class="fab fa-instagram fa-lg"
                      style={{ color: "#ac2bac" }}
                    ></i>
                    <p class="mb-0">mdbootstrap</p>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i
                      class="fab fa-facebook-f fa-lg"
                      style={{ color: "#3b5998" }}
                    ></i>
                    <p class="mb-0">mdbootstrap</p>
                  </li>
                </ul>
              </div>
            </div> */}
          </div>
          <div class="col-lg-8">
            <div class="card mb-4">
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-3">
                    <p class="mb-0">ID</p>
                  </div>
                  <div class="col-sm-9">
                    <p class="text-muted mb-0">{account.id}</p>
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <p class="mb-0">Họ tên</p>
                  </div>
                  <div class="col-sm-9">
                    <p class="text-muted mb-0">{account.name}</p>
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <p class="mb-0">Email</p>
                  </div>
                  <div class="col-sm-9">
                    <p class="text-muted mb-0">{account.email}</p>
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <p class="mb-0">UserName</p>
                  </div>
                  <div class="col-sm-9">
                    <p class="text-muted mb-0">{account.userName}</p>
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <p class="mb-0">Role</p>
                  </div>
                  <div class="col-sm-9">
                    <p class="text-muted mb-0">{account.role}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* <div class="row">
              <div class="col-md-6">
                <div class="card mb-4 mb-md-0">
                  <div class="card-body">
                    <p class="mb-4">
                      <span class="text-primary font-italic me-1">
                        assigment
                      </span>{" "}
                      Project Status
                    </p>
                    <p class="mb-1" style={{ fontSize: ".77rem" }}>
                      Web Design
                    </p>
                    <div class="progress rounded" style={{ height: "5px" }}>
                      <div
                        class="progress-bar"
                        role="progressbar"
                        style={{ width: "80%" }}
                        aria-valuenow="80"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <p class="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                      Website Markup
                    </p>
                    <div class="progress rounded" style={{ height: "5px" }}>
                      <div
                        class="progress-bar"
                        role="progressbar"
                        style={{ width: "72%" }}
                        aria-valuenow="72"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <p class="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                      One Page
                    </p>
                    <div class="progress rounded" style={{ height: "5px" }}>
                      <div
                        class="progress-bar"
                        role="progressbar"
                        style={{ width: "89%" }}
                        aria-valuenow="89"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <p class="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                      Mobile Template
                    </p>
                    <div class="progress rounded" style={{ height: "5px" }}>
                      <div
                        class="progress-bar"
                        role="progressbar"
                        style={{ width: "55%" }}
                        aria-valuenow="55"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <p class="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                      Backend API
                    </p>
                    <div
                      class="progress rounded mb-2"
                      style={{ height: "5px" }}
                    >
                      <div
                        class="progress-bar"
                        role="progressbar"
                        style={{ width: "66%" }}
                        aria-valuenow="66"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="card mb-4 mb-md-0">
                  <div class="card-body">
                    <p class="mb-4">
                      <span class="text-primary font-italic me-1">
                        assigment
                      </span>{" "}
                      Project Status
                    </p>
                    <p class="mb-1" style={{ fontSize: ".77rem" }}>
                      Web Design
                    </p>
                    <div class="progress rounded" style={{ height: "5px" }}>
                      <div
                        class="progress-bar"
                        role="progressbar"
                        style={{ width: "80%" }}
                        aria-valuenow="80"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <p class="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                      Website Markup
                    </p>
                    <div class="progress rounded" style={{ height: "5px" }}>
                      <div
                        class="progress-bar"
                        role="progressbar"
                        style={{ width: "72%" }}
                        aria-valuenow="72"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <p class="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                      One Page
                    </p>
                    <div class="progress rounded" style={{ height: "5px" }}>
                      <div
                        class="progress-bar"
                        role="progressbar"
                        style={{ width: "89%" }}
                        aria-valuenow="89"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <p class="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                      Mobile Template
                    </p>
                    <div class="progress rounded" style={{ height: "5px" }}>
                      <div
                        class="progress-bar"
                        role="progressbar"
                        style={{ width: "55%" }}
                        aria-valuenow="55"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <p class="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                      Backend API
                    </p>
                    <div
                      class="progress rounded mb-2"
                      style={{ height: "5px" }}
                    >
                      <div
                        class="progress-bar"
                        role="progressbar"
                        style={{ width: "66%" }}
                        aria-valuenow="66"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminSingleAccountPage;
