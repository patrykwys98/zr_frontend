import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import ProfilePage from "./pages/ProfilePage";
import ConfirmPage from "./pages/ConfirmPage";
import RegisterPage from "./pages/RegisterPage";
import CreateProjectPage from "./pages/CreateProjectPage";
import ProjectPage from "./pages/ProjectPage";
import UpdateProjectPage from "./pages/UpdateProjectPage";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Header />
          <Container>
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <HomePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/confirm"
                element={
                  <PrivateRoute>
                    <ConfirmPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/createProject"
                element={
                  <PrivateRoute>
                    <CreateProjectPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/getProject/:id"
                element={
                  <PrivateRoute>
                    <ProjectPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/updateProject"
                element={
                  <PrivateRoute>
                    <UpdateProjectPage />
                  </PrivateRoute>
                }
              />
              <Route element={<RegisterPage />} path="/register" />
              <Route element={<LoginPage />} path="/login" />
            </Routes>
          </Container>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
