import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  AboutPage,
  AddStudentPage,
  EditLoggedInProfile,
  EditStudentPage,
  HomePage,
  ProfileLoggedInAccount,
  SingleStudentPage,
  StudentsPage,
} from "./pages";
import {
  AdminHomePage,
  AdminDashboard,
  AdminAccountsPage,
  AdminStudentsPage,
  AdminSingleAccountPage,
  AdminAddAccountPage,
  AdminUpdateAccountPage,
  AdminSingleStudentPage,
  AdminAddStudentPage,
  AdminUpdateStudentPage,
  AdminProfilePage,
  AdminEditProfilePage,
} from "./admin";
import { LoginPage, RegisterPage } from "./auth";
import { AdminRoute, UserRoute } from "./service/guard";

const router = createBrowserRouter([
  {
    path: "/user",
    element: <UserRoute element={<HomePage />} />,
    children: [
      {
        index: true,
        element: <AboutPage />,
      },
      {
        path: "students",
        element: <StudentsPage />,
      },
      {
        path: "students/:id",
        element: <SingleStudentPage />,
      },
      {
        path: "addStudent",
        element: <AddStudentPage />,
      },
      {
        path: "updateStudent/:id",
        element: <EditStudentPage />,
      },
      {
        path: "profileLoggedInAccount",
        element: <ProfileLoggedInAccount />,
      },
      {
        path: "editLoggedInProfile",
        element: <EditLoggedInProfile />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminRoute element={<AdminHomePage />} />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "accounts",
        element: <AdminAccountsPage />,
      },
      {
        path: "students",
        element: <AdminStudentsPage />,
      },
      {
        path: "accounts/:id",
        element: <AdminSingleAccountPage />,
      },
      {
        path: "addAccount",
        element: <AdminAddAccountPage />,
      },
      {
        path: "updateAccount/:id",
        element: <AdminUpdateAccountPage />,
      },
      {
        path: "students/:id",
        element: <AdminSingleStudentPage />,
      },
      {
        path: "addStudent",
        element: <AdminAddStudentPage />,
      },
      {
        path: "updateStudent/:id",
        element: <AdminUpdateStudentPage />,
      },
      {
        path: "profile",
        element: <AdminProfilePage />,
      },
      {
        path: "editProfile",
        element: <AdminEditProfilePage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
