import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
import ApiService from "../service/ApiService";
import { SearchStudent } from "../components";

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [searchByName, setSearchByName] = useState("");
  const [departments, setDepartments] = useState([]);

  const loadStudents = async () => {
    try {
      const result = await ApiService.getAllStudent();
      setStudents(result.studentList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadStudents();
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
    setSearchByName(e.target.value);
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

  const loadDistinctDepartment = async () => {
    try {
      const result = await ApiService.getDistinctDepartment();
      setDepartments(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadDistinctDepartment();
  }, []);

  const handleSearchStudentByDepartment = async (department) => {
    try {
      if (department === "Department") {
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
      <SearchStudent
        searchByName={searchByName}
        handleSetSearchByName={handleSetSearchByName}
        handleSearchStudentByName={handleSearchStudentByName}
        resetStudentList={resetStudentList}
        departments={departments}
        handleSearchStudentByDepartment={handleSearchStudentByDepartment}
      />
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">STT</th>
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
                    to={`/user/students/${student.id}`}
                    className="btn btn-info"
                  >
                    <FaEye />
                  </Link>
                </td>
                <td className="mx-2">
                  <Link
                    to={`/user/updateStudent/${student.id}`}
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

export default StudentsPage;
