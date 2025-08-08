import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ApiService from "../service/ApiService";

const AdminSingleStudentPage = () => {
  const [student, setStudent] = useState({
    id: 0,
    name: "",
    avatar: "",
    email: "",
    userName: "",
    department: "",
    password: "",
  });
  const { id } = useParams();

  const loadStudent = async (id) => {
    try {
      const result = await ApiService.getStudentById(id);
      if (result.statusCode === 200) {
        setStudent(result.student);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadStudent(id);
  }, [id]);

  return (
    <div class="container">
      <div
        class="card shadow-sm"
        style={{ maxWidth: "540px", margin: "0 auto" }}
      >
        <div class="row g-0">
          <div class="col-md-4 p-3 text-center">
            <img
              src={
                student.avatar
                  ? `/images/${student.avatar}`
                  : "/images/user.jpg"
              }
              class="rounded-circle img-thumbnail"
              alt="Profile Picture"
            />
            <div class="mt-2">
              <span class="badge bg-success">Student</span>
            </div>
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title d-flex justify-content-between align-items-center">
                {student.name}
                {/* <button class="btn btn-sm btn-warning">
              <i class="fas fa-edit"></i> Edit
            </button> */}
              </h5>
              <p class="card-text text-muted">
                ID:{" "}
                <span style={{ fontWeight: "500", marginLeft: "7px" }}>
                  {student.id}
                </span>
              </p>
              <p class="card-text">
                Gmail:{" "}
                <span style={{ fontWeight: "500", marginLeft: "7px" }}>
                  {student.email}
                </span>
              </p>
              <p class="card-text">
                UserName:{" "}
                <span style={{ fontWeight: "500", marginLeft: "7px" }}>
                  {student.userName}
                </span>
              </p>
              <p class="card-text">
                Password:{" "}
                <span style={{ fontWeight: "500", marginLeft: "7px" }}>
                  {student.password}
                </span>
              </p>
              <p class="card-text">
                Department:{" "}
                <span style={{ fontWeight: "500", marginLeft: "7px" }}>
                  {student.department}
                </span>
              </p>
              {/* <div class="border-top pt-2">
            <div class="row text-center">
              <div class="col">
                <h6>Projects</h6>
                <strong>25</strong>
              </div>
              <div class="col border-start">
                <h6>Following</h6>
                <strong>142</strong>
              </div>
              <div class="col border-start">
                <h6>Followers</h6>
                <strong>289</strong>
              </div>
            </div>
          </div> */}
            </div>
          </div>
        </div>
        <div class="card-footer bg-white">
          <div class="d-flex justify-content-around">
            <Link
              to="/admin/students"
              class="btn btn-link text-decoration-none"
            >
              Back
            </Link>
            <Link
              to={`/admin/updateStudent/${student.id}`}
              class="btn btn-link text-decoration-none"
            >
              Edit
            </Link>
            <Link
              to="/admin/addStudent"
              class="btn btn-link text-decoration-none"
            >
              Add student
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSingleStudentPage;
