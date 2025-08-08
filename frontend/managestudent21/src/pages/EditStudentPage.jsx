import { useEffect, useState } from "react";
import ApiService from "../service/ApiService";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditStudentPage = () => {
  const [student, setStudent] = useState({
    id: 0,
    name: "",
    avatar: "",
    email: "",
    userName: "",
    password: "",
    department: "",
  });
  const [previewImage, setPreviewImage] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const loadStudentById = async (id) => {
    try {
      const result = await ApiService.getStudentById(id);
      setStudent(result.student);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadStudentById(id);
  }, [id]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setStudent({ ...student, avatar: file.name });
    }
  };

  const updateStudent = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name: student.name,
        avatar: student.avatar,
        email: student.email,
        userName: student.userName,
        password: student.password,
        department: student.department,
      };
      const result = await ApiService.updateStudent(data, student.id);
      if (result.statusCode === 200) {
        navigate("/user/students");
        toast.success("Updated success");
      }
    } catch (error) {
      console.log(error);
      toast.error("Updated error");
    }
  };

  return (
    <div className="container">
      <div className=" text-center mt-5 ">
        <h1>Update student form</h1>
      </div>

      <div className="row">
        <div className="col-lg-7 mx-auto">
          <div className="card mt-2 mx-auto p-4 bg-light">
            <div className="card-body bg-light">
              <div className="container">
                <form id="contact-form" role="form" onSubmit={updateStudent}>
                  <div className="controls">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="form_name">Họ tên</label>
                          <input
                            id="form_name"
                            type="text"
                            name="name"
                            value={student.name}
                            className="form-control my-2"
                            required="required"
                            data-error="Firstname is required."
                            onChange={handleInput}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="form_lastname">UserName</label>
                          <input
                            id="form_username"
                            type="text"
                            name="userName"
                            value={student.userName}
                            className="form-control my-2"
                            required="required"
                            data-error="Lastname is required."
                            onChange={handleInput}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="form_email">Email</label>
                          <input
                            id="form_email"
                            type="email"
                            name="email"
                            value={student.email}
                            className="form-control my-2"
                            required="required"
                            data-error="Valid email is required."
                            onChange={handleInput}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="form_need">Password</label>
                          <input
                            id="form_password"
                            type="text"
                            name="password"
                            value={student.password}
                            className="form-control my-2"
                            required="required"
                            data-error="Valid email is required."
                            onChange={handleInput}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="form_need">Department</label>
                          {/* <select
                        id="form_need"
                        name="need"
                        className="form-control"
                        required="required"
                        data-error="Please specify your need."
                      >
                        <option value="" selected disabled>
                          --Select Your Issue--
                        </option>
                        <option>Request Invoice for order</option>
                        <option>Request order status</option>
                        <option>Haven't received cashback yet</option>
                        <option>Other</option>
                      </select> */}
                          <input
                            id="form_department"
                            type="text"
                            name="department"
                            value={student.department}
                            className="form-control my-2"
                            required="required"
                            data-error="Valid email is required."
                            onChange={handleInput}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="form_avatar">Avatar</label>
                          <input
                            id="form_avatar"
                            type="file"
                            name="avatar"
                            className="form-control my-2"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </div>
                      </div>
                      {student.avatar && (
                        <div className="col-md-12 text-center">
                          <img
                            src={`/images/${student.avatar}`}
                            alt="Preview"
                            className="img-fluid mt-3"
                            style={{
                              maxHeight: "200px",
                              maxWidth: "200px",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      )}
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <input
                          type="submit"
                          className="btn btn-success btn-send pt-2 btn-block"
                          value="Submit"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStudentPage;
