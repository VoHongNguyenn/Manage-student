import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
import { IoMdAddCircle } from "react-icons/io";
import ApiService from "../service/ApiService";
import { AdminSearchAccount } from "../components";

const AdminAccountsPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [searchByName, setSearchByName] = useState("");
  const [currentAccount, setCurrentAccount] = useState({
    id: 0,
    role: "",
    name: "",
    email: "",
    userName: "",
    avatar: "",
  });

  const loadAccounts = async () => {
    try {
      const result = await ApiService.getAllAccount();
      if (result.statusCode === 200) {
        setAccounts(result.accountList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadLoggedInAccount = async () => {
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
    loadAccounts();
    loadLoggedInAccount();
  }, []);

  const deleteAccountById = async (id) => {
    try {
      if (id === currentAccount.id) {
        toast.error("Không thế xoá tài khoản đang đăng nhập");
      } else {
        const result = await ApiService.deleteAccountById(id);
        if (result.statusCode === 200) {
          loadAccounts();
          toast.success("Deleted success");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Deleted error");
    }
  };

  const handleSetSearchByName = (e) => {
    const data = e.target.value;
    setSearchByName(data);
  };

  const handleSearchAccountByName = async (e) => {
    e.preventDefault();
    try {
      const result = await ApiService.findAccountByName(searchByName);
      if (result.statusCode === 200) {
        setAccounts(result.accountList);
      }
    } catch (error) {
      console.log(error);
      toast.error("No account found");
    }
  };

  const resetAccountList = () => {
    loadAccounts();
    setSearchByName("");
  };

  const handleSearchAccountByRole = async (role) => {
    try {
      if (role === "role") {
        loadAccounts();
      } else {
        const result = await ApiService.findAccountByRole(role);
        if (result.statusCode === 200) {
          setAccounts(result.accountList);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("No account found");
    }
  };

  return (
    <div>
      {/* <h3 style={{ fontSize: "25px" }}>Account page</h3> */}
      <Link
        to="/admin/addAccount"
        className="btn btn-success mb-5 mt-2 d-flex align-items-center"
        style={{ width: "150px" }}
      >
        <IoMdAddCircle style={{ fontSize: "20px", marginRight: "5px" }} />
        <span>Add account</span>
      </Link>
      <AdminSearchAccount
        searchByName={searchByName}
        handleSetSearchByName={handleSetSearchByName}
        handleSearchAccountByName={handleSearchAccountByName}
        resetAccountList={resetAccountList}
        handleSearchAccountByRole={handleSearchAccountByRole}
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
          {accounts.map((account, index) => {
            return (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{account.id}</td>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src={`/images/${account.avatar}`}
                      alt="Avatar"
                      className="rounded-circle me-2"
                      style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "cover",
                      }}
                    />
                    {account.name}
                  </div>
                </td>

                <td>{account.userName}</td>
                <td>{account.email}</td>
                <td className="mx-2">
                  <Link
                    to={`/admin/accounts/${account.id}`}
                    className="btn btn-info"
                  >
                    <FaEye />
                  </Link>
                </td>
                <td className="mx-2">
                  <Link
                    to={
                      account.id === currentAccount.id
                        ? "/admin/editProfile"
                        : `/admin/updateAccount/${account.id}`
                    }
                    className="btn btn-warning"
                  >
                    <FaEdit />
                  </Link>
                </td>
                <td className="mx-2">
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteAccountById(account.id)}
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

export default AdminAccountsPage;
