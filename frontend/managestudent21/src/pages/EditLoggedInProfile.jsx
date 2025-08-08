import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiService from "../service/ApiService";
import { toast } from "react-toastify";

const EditLoggedInProfile = () => {
  const [currentAccount, setCurrentAccount] = useState({
    id: 0,
    role: "",
    name: "",
    email: "",
    userName: "",
    avatar: "",
  });
  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentAccount((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormDataChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCurrentAccount((prev) => {
        return { ...prev, avatar: file.name };
      });
    }
  };

  const updateInfo = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name: currentAccount.name,
        userName: currentAccount.userName,
        avatar: currentAccount.avatar,
        email: currentAccount.email,
        role: currentAccount.role,
      };
      const result = await ApiService.updateAccount(currentAccount.id, data);
      if (result.statusCode === 200) {
        toast.success("Upedted success");
      }
    } catch (error) {
      console.log(error);
      toast.error("Update error");
    }
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    try {
      if (formData.newPassword !== formData.confirmPassword) {
        toast.error("Xác thực mật khẩu không khớp");
      } else {
        const changePasswordRequest = {
          currentPassword: formData.password,
          newPassword: formData.newPassword,
        };
        const result = await ApiService.updatePasswordLoggedInAccount(
          currentAccount.id,
          changePasswordRequest
        );
        if (result.statusCode === 200) {
          toast.success("Updated success");
        }
        if (result.statusCode === 401) {
          toast.error("Mật khảu không đúng");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Update password error");
    }
  };

  return (
    <div className="container rounded bg-white mt-5">
      <form className="row" onSubmit={(e) => updateInfo(e)}>
        <div className="col-md-4 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img
              className="rounded-circle mt-2"
              src={
                `${currentAccount.avatar}`
                  ? `/images/${currentAccount.avatar}`
                  : "images/imageUser.jpg"
              }
              style={{ objectFit: "cover", width: "220px", height: "220px" }}
            />
            <input
              type="file"
              className="form-control mt-2"
              id="avatar"
              onChange={handleAvatarChange}
              accept="image/*"
            />
          </div>
        </div>
        <div className="col-md-8">
          <div className="p-3 py-5">
            <div className="row mt-2">
              <div className="col-md-6">
                <label className="labels">ID</label>
                <label
                  className="form-control"
                  style={{ backgroundColor: "#e9ecef", cursor: "not-allowed" }}
                >
                  {currentAccount.id}
                </label>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-6">
                <label className="labels">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  id="name"
                  required
                  value={currentAccount.name}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="userName"
                  id="userName"
                  required
                  value={currentAccount.userName}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <label className="labels">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  required
                  value={currentAccount.email}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Role</label>
                <input
                  type="text"
                  readOnly
                  className="form-control"
                  name="role"
                  id="role"
                  required
                  value={currentAccount.role}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>
            <div className="row mb-5 mt-5">
              <div className="col-sm-2">
                <button
                  type="submit"
                  className="btn btn-outline-success btn-lg"
                >
                  Save
                </button>
              </div>

              <div className="col-sm-4">
                <Link
                  to={"/admin/accounts"}
                  type="button"
                  className="btn btn-warning btn-lg"
                >
                  Go back
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
      <form className="row" onSubmit={(e) => updatePassword(e)}>
        <div className="col-md-4 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5"></div>
        </div>
        <div className="col-md-8">
          <div className="p-3 py-5">
            <div className="row mt-2">
              <div className="col-md-6">
                <label className="labels">Current password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  required
                  value={formData.password}
                  onChange={(e) => handleFormDataChange(e)}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <label className="labels">New password</label>
                <input
                  type="password"
                  className="form-control"
                  name="newPassword"
                  id="newPassword"
                  required
                  value={formData.newPassword}
                  onChange={(e) => handleFormDataChange(e)}
                />
              </div>
              <div className="col-md-6">
                <label className="labels mb-1">Confirm password</label>
                <input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  id="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => handleFormDataChange(e)}
                />
              </div>
            </div>
            <div className="row mb-5 mt-5">
              <div className="col-sm-2">
                <button
                  type="submit"
                  className="btn btn-outline-success btn-lg"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditLoggedInProfile;
