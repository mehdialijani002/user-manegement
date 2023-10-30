import React, { lazy, Suspense, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./asset/styles/App.css";
import PrivateRoute from "./component/private";
import ErrorBoundary from "./component/errorBoundary";
import PageNotFound from "./pages/pagenotfound/index";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import NavbarContainer from "./component/navbar";
import { ToastContainer } from "react-toastify";
const Home = lazy(() => import("./pages/home/index"));
const User = lazy(() => import("./pages/user/index"));
const Login = lazy(() => import("./pages/login/index"));
const Register = lazy(() => import("./pages/register/index"));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <ToastContainer />
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
              <Suspense
                fallback={
                  <div className="lazy-loading">در حال بارگزاری...</div>
                }
              >
                <Provider store={store}>
                  <PersistGate loading={null} persistor={persistor}>
                    <User isAuthenticated={isAuthenticated} />
                  </PersistGate>
                </Provider>
              </Suspense>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
