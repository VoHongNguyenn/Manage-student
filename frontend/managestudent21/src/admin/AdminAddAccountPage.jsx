import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ApiService from "../service/ApiService";

const AdminAddAccountPage = () => {
  const [account, setAccount] = useState({
    name: "",
    email: "",
    userName: "",
    role: "",
    avatar: "",
    password: "",
  });
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccount((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setAccount({ ...account, avatar: file.name });
    }
  };

  const addAccount = async (e) => {
    e.preventDefault();
    try {
      const result = await ApiService.addAccount(account);
      if (result.statusCode === 200) {
        navigate("/admin/accounts");
        toast.success("Added success");
      }
    } catch (error) {
      console.log(error);
      toast.error("Add error");
    }
  };

  return (
    <section class="vh-100 gradient-custom">
      <div class="container py-5 h-100">
        <div class="row justify-content-center align-items-center h-100">
          <div class="col-12 col-lg-9 col-xl-7">
            <div
              class="card shadow-2-strong card-registration"
              style={{ borderRadius: "15px" }}
            >
              <div class="card-body p-4 p-md-5">
                <h3 class="mb-4 pb-2 pb-md-0 mb-md-5">Thêm tài khoản</h3>
                <form onSubmit={(e) => addAccount(e)}>
                  <div class="row">
                    <div class="col-md-6 mb-4">
                      <div data-mdb-input-init class="form-outline">
                        <label class="form-label" for="name">
                          Họ tên
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={account.name}
                          onChange={handleInputChange}
                          class="form-control form-control-lg"
                        />
                      </div>
                    </div>
                    <div class="col-md-6 mb-4">
                      <div data-mdb-input-init class="form-outline">
                        <label class="form-label" for="userName">
                          Username
                        </label>
                        <input
                          type="text"
                          id="userName"
                          name="userName"
                          value={account.userName}
                          onChange={handleInputChange}
                          class="form-control form-control-lg"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6 mb-4 pb-2">
                      <div data-mdb-input-init class="form-outline">
                        <label class="form-label" for="email">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={account.email}
                          onChange={handleInputChange}
                          class="form-control form-control-lg"
                        />
                      </div>
                    </div>
                    <div class="col-md-6 mb-4 d-flex align-items-center">
                      <div
                        data-mdb-input-init
                        class="form-outline datepicker w-100"
                      >
                        <label for="birthdayDate" class="form-label">
                          Mật khẩu
                        </label>
                        <input
                          type="password"
                          name="password"
                          value={account.password}
                          onChange={handleInputChange}
                          class="form-control form-control-lg"
                          id="birthdayDate"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div className="col-md-6 mb-4 pb-2">
                      <div className="form-outline">
                        <label htmlFor="role" className="form-label">
                          Role
                        </label>
                        <select
                          id="role"
                          name="role"
                          className="form-select form-control-lg"
                          onChange={handleInputChange}
                        >
                          <option value="ADMIN">ADMIN</option>
                          <option value="USER">USER</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-6 mb-4 pb-2">
                      <div data-mdb-input-init class="form-outline">
                        <label class="form-label" for="avatar">
                          Avatar
                        </label>
                        <input
                          id="avatar"
                          type="file"
                          name="avatar"
                          className="form-control my-2"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    {previewImage && (
                      <div className="col-md-12 text-center">
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="img-fluid mt-3"
                          style={{
                            height: "200px",
                            width: "200px",
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <div class="mt-4 pt-2">
                    <input
                      data-mdb-ripple-init
                      class="btn btn-primary btn-lg"
                      type="submit"
                      value="Submit"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminAddAccountPage;
