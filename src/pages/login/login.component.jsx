import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ReCAPTCHA from "react-google-recaptcha";
import mockData from "../../api/mock/mock.component";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ onLogin }) => {
  const [recaptchaCompleted, setRecaptchaCompleted] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    text: Yup.string().required("نام خانوادگی الزامی است"),
    password: Yup.string().required("رمز عبور الزامی است"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    if (!recaptchaCompleted) {
      toast.error("   reCAPTCHA را کامل کنید.");
      setSubmitting(false);
      return;
    }

    const matchingUser = mockData.find(
      (user) =>
        user.lastname === values.text && user.password === values.password
    );

    if (matchingUser) {
      onLogin();
      navigate("/home", { replace: true });
      console.log("User can go to the home page.");
    } else {
      toast.error("اطلاعات وارد شده صحیح نمیباشد");
      console.log("User entered incorrect data.");
    }
    setSubmitting(false);
  };

  const recaptchaCallback = (value) => {
    setRecaptchaCompleted(true);
  };

  return (
    <div className="login-container">
      <h1>ورود</h1>
      <ToastContainer />
      <Formik
        initialValues={{
          text: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid, isSubmitting, handleSubmit, touched }) => (
          <Form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="text" className="form-label">
                نام خانوادگی:
              </label>
              <Field
                type="text"
                className={`form-control ${
                  touched.text && !isValid ? "is-invalid" : ""
                }`}
                id="text"
                name="text"
                required
              />
              <div className="invalid-feedback">
                <ErrorMessage name="text" />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                رمز عبور:
              </label>
              <Field
                type="password"
                className={`form-control ${
                  touched.password && !isValid ? "is-invalid" : ""
                }`}
                id="password"
                name="password"
                required
              />
              <div className="invalid-feedback">
                <ErrorMessage name="password" />
              </div>
            </div>
            <div className="mb-3">
              <Link to={"/register"} className="login-link">
                ثبت نام
              </Link>
            </div>
            <div className="mb-3">
              <ReCAPTCHA
                sitekey="6LfzJ4QoAAAAAJMLDdY4f1b-JzvRlr9dfhnRpL8N"
                onChange={recaptchaCallback}
              />
            </div>
            <div className="login-button">
              <button
                type="submit"
                className="login-btn"
                disabled={isSubmitting}
              >
                ورود
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
