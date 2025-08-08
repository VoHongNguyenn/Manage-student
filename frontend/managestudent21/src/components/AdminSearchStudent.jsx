import React from "react";

const AdminSearchStudent = ({
  searchByName,
  handleSetSearchByName,
  departments,
  handleSearchStudentByName,
  resetStudentList,
  handleSearchStudentByDepartment,
}) => {
  return (
    <div class="container mb-2">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <form onSubmit={(e) => handleSearchStudentByName(e)}>
            <div class="input-group mb-3">
              <select
                class="form-select"
                style={{ maxWidth: "200px" }}
                onChange={(e) =>
                  handleSearchStudentByDepartment(e.target.value)
                }
              >
                <option value="department">Department</option>
                {departments.map((department) => {
                  return <option value={department}>{department}</option>;
                })}
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
              <button class="btn btn-danger" onClick={resetStudentList}>
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSearchStudent;
