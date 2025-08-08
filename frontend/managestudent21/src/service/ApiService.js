import axios from "axios";

export default class ApiService {
  static BASE_URL = "http://localhost:8080/api";

  static getHeader() {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }

  // ==================== STUDENT ====================

  static async getAllStudent() {
    const response = await axios.get(`${this.BASE_URL}/students`);
    return response.data;
  }

  static async getStudentById(id) {
    const response = await axios.get(`${this.BASE_URL}/students/${id}`);
    return response.data;
  }

  static async addStudent(student) {
    const response = await axios.post(
      `${this.BASE_URL}/students/addStudent`,
      student
    );
    return response.data;
  }

  static async updateStudent(student, studentId) {
    const response = await axios.put(
      `${this.BASE_URL}/students/updateStudent/${studentId}`,
      student
    );
    return response.data;
  }

  static async searchStudentByName(name) {
    const response = await axios.get(
      `${this.BASE_URL}/students/findByName?name=${name}`
    );
    return response.data;
  }

  static async getDistinctDepartment() {
    const response = await axios.get(
      `${this.BASE_URL}/students/getDistinctDepartment`
    );
    return response.data;
  }

  static async findStudentByDepartment(department) {
    const response = await axios.get(
      `${this.BASE_URL}/students/findByDepartment?department=${department}`
    );
    return response.data;
  }

  static async deleteStudentById(id) {
    const response = await axios.delete(
      `${this.BASE_URL}/students/deleteStudentById/${id}`
    );
    return response.data;
  }

  // ==================== ACCOUNT ====================

  static async getAllAccount() {
    const response = await axios.get(`${this.BASE_URL}/accounts`);
    return response.data;
  }

  static async getAccountById(id) {
    const response = await axios.get(`${this.BASE_URL}/accounts/${id}`);
    return response.data;
  }

  static async addAccount(account) {
    const response = await axios.post(
      `${this.BASE_URL}/accounts/addAccount`,
      account
    );
    return response.data;
  }

  static async updateAccount(accountId, account) {
    const response = await axios.put(
      `${this.BASE_URL}/accounts/updateAccount/${accountId}`,
      account
    );
    return response.data;
  }

  static async deleteAccountById(id) {
    const response = await axios.delete(
      `${this.BASE_URL}/accounts/deleteAccountById/${id}`
    );
    return response.data;
  }

  static async findAccountByName(name) {
    const response = await axios.get(
      `${this.BASE_URL}/accounts/findByName?name=${name}`
    );
    return response.data;
  }

  static async findAccountByRole(role) {
    const response = await axios.get(
      `${this.BASE_URL}/accounts/findByRole?role=${role}`
    );
    return response.data;
  }

  static async getLoggedInAccountNotPassword() {
    const response = await axios.get(
      `${this.BASE_URL}/accounts/getLoggedInAccountNotPassword`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static async updatePasswordLoggedInAccount(accountId, changePasswordRequest) {
    const response = await axios.put(
      `${this.BASE_URL}/accounts/updatePasswordLoggedInAccount/${accountId}`,
      changePasswordRequest
    );
    return response.data;
  }

  // ==================== AUTHENTICATION CHECKER ====================

  static logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  static isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token;
  }

  static isAdmin() {
    const role = localStorage.getItem("role");
    return role === "ADMIN";
  }

  static isUser() {
    const role = localStorage.getItem("role");
    return role === "USER";
  }

  // ==================== AUTH ====================

  static async login(loginDetail) {
    const response = await axios.post(
      `${this.BASE_URL}/auth/login`,
      loginDetail
    );
    return response.data;
  }
}
