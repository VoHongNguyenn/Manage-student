import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
import { IoMdAddCircle } from "react-icons/io";
import ApiService from "../service/ApiService";
import { AdminSearchStudent } from "../components";

const AdminStudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [searchByName, setSearchByName] = useState("");
  const [departments, setDepartments] = useState([]);

  const loadStudents = async () => {
    try {
      const result = await ApiService.getAllStudent();
      if (result.statusCode === 200) {
        setStudents(result.studentList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadDistinctDepartment = async () => {
    try {
      const result = await ApiService.getDistinctDepartment();
      setDepartments(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadStudents();
    loadDistinctDepartment();
  }, []);

  const deleteStudentById = async (id) => {
    try {
      const result = await ApiService.deleteStudentById(id);
      if (result.statusCode === 200) {
        loadStudents();
        toast.success("Deleted success");
      }
    } catch (error) {
      console.log(error);
      toast.error("Delete error");
    }
  };

  const handleSetSearchByName = (e) => {
    const data = e.target.value;
    setSearchByName(data);
  };

  const handleSearchStudentByName = async (e) => {
    e.preventDefault();
    try {
      const result = await ApiService.searchStudentByName(searchByName);
      if (result.statusCode === 200) {
        setStudents(result.studentList);
      }
    } catch (error) {
      console.log(error);
      toast.error("No student found");
    }
  };

  const resetStudentList = () => {
    loadStudents();
    setSearchByName("");
  };

  const handleSearchStudentByDepartment = async (department) => {
    try {
      if (department === "department") {
        loadStudents();
      } else {
        const result = await ApiService.findStudentByDepartment(department);
        if (result.statusCode === 200) {
          setStudents(result.studentList);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("No student found");
    }
  };

  return (
    <div>
      {/* <h3 style={{ fontSize: "25px" }}>Student page</h3> */}
      <Link
        to="/admin/addStudent"
        className="btn btn-success mb-5 mt-2 d-flex align-items-center"
        style={{ width: "150px" }}
      >
        <IoMdAddCircle style={{ fontSize: "20px", marginRight: "5px" }} />
        <span>Add student</span>
      </Link>
      {/* <AdminSearchAccount
        searchByName={searchByName}
        handleSetSearchByName={handleSetSearchByName}
        handleSearchAccountByName={handleSearchAccountByName}
        resetAccountList={resetAccountList}
        handleSearchAccountByRole={handleSearchAccountByRole}
      /> */}
      <AdminSearchStudent
        searchByName={searchByName}
        departments={departments}
        handleSetSearchByName={handleSetSearchByName}
        handleSearchStudentByName={handleSearchStudentByName}
        resetStudentList={resetStudentList}
        handleSearchStudentByDepartment={handleSearchStudentByDepartment}
      />
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">ID</th>
            <th scope="col">Họ tên</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th colSpan="3">Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => {
            return (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{student.id}</td>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src={`/images/${student.avatar}`}
                      alt="Avatar"
                      className="rounded-circle me-2"
                      style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "cover",
                      }}
                    />
                    {student.name}
                  </div>
                </td>
                <td>{student.userName}</td>
                <td>{student.email}</td>
                <td className="mx-2">
                  <Link
                    to={`/admin/students/${student.id}`}
                    className="btn btn-info"
                  >
                    <FaEye />
                  </Link>
                </td>
                <td className="mx-2">
                  <Link
                    to={`/admin/updateStudent/${student.id}`}
                    className="btn btn-warning"
                  >
                    <FaEdit />
                  </Link>
                </td>
                <td className="mx-2">
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteStudentById(student.id)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminStudentsPage;
