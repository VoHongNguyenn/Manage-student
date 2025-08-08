import React from "react";
import { CiSearch } from "react-icons/ci";

const SearchStudent = ({
  searchByName,
  handleSetSearchByName,
  handleSearchStudentByName,
  resetStudentList,
  departments,
  handleSearchStudentByDepartment,
}) => {
  return (
    <div class="container mb-4">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <form class="d-flex" onSubmit={(e) => handleSearchStudentByName(e)}>
            <div class="input-group mx-3 d-flex align-items-center">
              <label htmlFor="searchInput" className="me-2 fw-bold">
                Name
              </label>
              <input
                class="form-control form-control-lg"
                type="search"
                placeholder="Search by name"
                aria-label="Search"
                value={searchByName}
                onChange={(e) => handleSetSearchByName(e)}
              />
              <button class="btn btn-success px-4 mx-2 " type="submit">
                {/* <CiSearch /> */}
                Search
              </button>
              <button
                class="btn btn-danger px-4 mx-2"
                onClick={resetStudentList}
              >
                Reset
              </button>
            </div>
            {/* <div class="input-group mx-3 d-flex align-items-center">
              <label htmlFor="searchInput" className="me-2 fw-bold">
                Department
              </label>
              <input
                class="form-control form-control-lg"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-primary px-4" type="submit">
                <CiSearch />
              </button>
            </div> */}
          </form>
          {/* <form class="d-flex">
            <div class="input-group mx-3 d-flex align-items-center">
              <label htmlFor="searchInput" className="me-2 fw-bold">
                Department
              </label>
              <input
                class="form-control form-control-lg"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-primary px-4" type="submit">
                <CiSearch />
              </button>
            </div>
          </form> */}
          <select
            class="form-select mt-3"
            aria-label="Default select example"
            onChange={(e) => handleSearchStudentByDepartment(e.target.value)}
          >
            <option value="Department" selected>
              Department
            </option>
            {departments.map((department) => {
              return <option value={department}>{department}</option>;
            })}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchStudent;
