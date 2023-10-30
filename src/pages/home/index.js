import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../component/navbar/index";

function Home() {
  return (
    <Fragment>
      <Navbar />
      <div className="home-body">
        <h1>به سایت ما خوش امدید</h1>
        <p>کاربر محترم به وبسایت ما خوش امدید</p>
        <Link to="/user" className="btn btn-warning">
          مدیریت کاربران
        </Link>
      </div>
    </Fragment>
  );
}

export default Home;
