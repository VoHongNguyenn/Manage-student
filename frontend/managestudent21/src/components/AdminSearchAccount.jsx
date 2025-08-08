import React from "react";

const AdminSearchAccount = ({
  searchByName,
  handleSetSearchByName,
  handleSearchAccountByName,
  resetAccountList,
  handleSearchAccountByRole,
}) => {
  return (
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <form onSubmit={(e) => handleSearchAccountByName(e)}>
            <div class="input-group mb-3">
              <select
                class="form-select"
                style={{ maxWidth: "150px" }}
                onChange={(e) => handleSearchAccountByRole(e.target.value)}
              >
                <option value="role">Role</option>
                <option value="ADMIN">ADMIN</option>
                <option value="USER">USER</option>
              </select>
              <input
                type="text"
                class="form-control"
                placeholder="Search by name"
                value={searchByName}
                onChange={handleSetSearchByName}
              />
              <button class="btn btn-primary" type="submit">
                Search
              </button>
              <button class="btn btn-danger" onClick={resetAccountList}>
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSearchAccount;
