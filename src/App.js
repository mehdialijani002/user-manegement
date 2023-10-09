import React, { useState, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./asset/styles/App.css";
import PrivateRoute from "./component/private/private.component";
import ErrorBoundary from "./component/errorBoundary/error.component";
import PageNotFound from "./pages/pagenotfound/pageNotFound.componet";
const Home = lazy(() => import("./pages/home/home.component"));
const User = lazy(() => import("./pages/user/user.component"));
const Login = lazy(() => import("./pages/login/login.component"));
const Register = lazy(() => import("./pages/register/register.component"));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route
            path="/register"
            element={
              isAuthenticated ? (
                <Navigate to="/home" replace />
              ) : (
                <Suspense
                  fallback={
                    <div className="lazy-loading">در حال بارگزاری...</div>
                  }
                >
                  <Register onLogin={() => setIsAuthenticated(true)} />
                </Suspense>
              )
            }
          />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/home" replace />
              ) : (
                <Suspense
                  fallback={
                    <div className="lazy-loading">در حال بارگزاری...</div>
                  }
                >
                  <Login onLogin={() => setIsAuthenticated(true)} />
                </Suspense>
              )
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute
                element={
                  <Suspense
                    fallback={
                      <div className="lazy-loading">در حال بارگزاری...</div>
                    }
                  >
                    <Home />
                  </Suspense>
                }
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/user"
            element={
              <PrivateRoute
                element={
                  <Suspense
                    fallback={
                      <div className="lazy-loading">در حال بارگزاری...</div>
                    }
                  >
                    <User />
                  </Suspense>
                }
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
