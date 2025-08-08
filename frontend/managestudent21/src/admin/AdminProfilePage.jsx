import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ApiService from "../service/ApiService";

const AdminProfilePage = () => {
  const [currentAccount, setCurrentAccount] = useState({
    id: 0,
    role: "ADMIN",
    name: "",
    email: "",
    userName: "",
    avatar: "",
  });

  const loadInforCurrentAccount = async () => {
    try {
      const result = await ApiService.getLoggedInAccountNotPassword();
      setCurrentAccount(result.account);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadInforCurrentAccount();
  }, []);

  return (
    <section className="shadow" style={{ backgroundColor: "whitesmoke" }}>
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-3">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img
                  src={
                    currentAccount.avatar
                      ? `/images/${currentAccount.avatar}`
                      : "/images/imageUser.jpg"
                  }
                  alt={currentAccount.name}
                  className="img-fluid rounded-circle"
                  style={{
                    width: "210px",
                    height: "210px",
                    objectFit: "cover",
                  }}
                />
                <h5 className="my-3">{`${currentAccount.name}`}</h5>
                <div className="d-flex justify-content-center mb-2">
                  <Link
                    type="button"
                    className="btn btn-outline-primary"
                    to={"/admin/editProfile"}
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    className="btn btn-outline-warning ms-1"
                  >
                    Message
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-9">
            <div className="card mb-4">
              <div className="card-body">
                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <h5 className="mb-0">ID</h5>
                  </div>

                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{currentAccount.id}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h5 className="mb-0">Role</h5>
                  </div>

                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{currentAccount.role}</p>
                  </div>
                </div>

                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h5 className="mb-0">Name</h5>
                  </div>

                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{currentAccount.name}</p>
                  </div>
                </div>

                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h5 className="mb-0">Username</h5>
                  </div>

                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{currentAccount.userName}</p>
                  </div>
                </div>

                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <h5 className="mb-0">Email</h5>
                  </div>

                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{currentAccount.email}</p>
                  </div>
                </div>
                <hr />

                {/* <div className="row">
                  <div className="col-sm-3">
                    <h5 className="mb-0">Department</h5>
                  </div>

                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{student.department}</p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminProfilePage;
