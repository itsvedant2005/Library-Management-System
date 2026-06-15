import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Landing from "./pages/Landing";
import StudentLogin from "./pages/StudentLogin";
import StudentRegister from "./pages/StudentRegister";
import AdminLogin from "./pages/AdminLogin";

import Dashboard from "./admin/Dashboard";
import Books from "./admin/Books";

import StudentDashboard
from "./student/Dashboard";

import StudentBooks
from "./student/Books";

import Requests from "./admin/Requests";

import MyBooks from "./student/MyBooks";

import Students from "./admin/Students";

import ProtectedRoute from "./components/ProtectedRoute";

import Fines from "./student/Fines";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Landing />}
        />

        <Route
          path="/student-login"
          element={<StudentLogin />}
        />

        <Route
          path="/student-register"
          element={<StudentRegister />}
        />

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        <Route
  path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/books"
          element={
            <ProtectedRoute role="admin">
              <Books />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/requests"
          element={
            <ProtectedRoute role="admin">
              <Requests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/books"
          element={
            <ProtectedRoute role="student">
              <StudentBooks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/my-books"
          element={
            <ProtectedRoute role="student">
              <MyBooks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/fines"
          element={
            <ProtectedRoute role="student">
              <Fines />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/students"
          element={
            <ProtectedRoute role="admin">
              <Students />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;