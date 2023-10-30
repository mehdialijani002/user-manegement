import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import logo from "../../asset/images/crown.svg";
import home from "../../asset/images/home.png";
import login from "../../asset/images/enter.png";
import { Link } from "react-router-dom";

function NavbarContainer() {
  const handleLogout = () => {
    localStorage.removeItem("authToken");

    console.log("Logout clicked");

    window.location.reload();
  };

  return (
    <Navbar
      expand="lg"
      className="navbar-container bg-dark py-4"
      variant="dark"
    >
      <Container>
        <Navbar.Brand href="#home">
          <img src={logo} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link active href="#home">
              <Link className="nav-headers" to={"/home"}>
                خانه
              </Link>{" "}
              <img className="nav-img" src={home} alt="Home" />
            </Nav.Link>
            <Nav.Link active className="mx-3">
              <Link onClick={handleLogout} className="nav-headers" to={"/"}>
                خروج
              </Link>
              <img className="nav-img" src={login} alt="Logout" />
            </Nav.Link>
            <NavDropdown active title="خدمات کاربران" id="basic-nav-dropdown">
              <NavDropdown.Item className="navbar-link" href="#action/3.1">
                <Link className="navbar-link" to="/user">
                  {" "}
                  اطلاعات کاربران
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item className="navbar-link" href="#action/3.2">
                <Link className="navbar-link" to="/user">
                  {" "}
                  حذف اطلاعات
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item className="navbar-link" href="#action/3.3">
                <Link className="navbar-link" to="/user">
                  {" "}
                  ویرایش اطلاعات
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarContainer;
