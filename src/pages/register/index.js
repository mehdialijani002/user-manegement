import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import mockData from "../../api/mock/mock";

const Register = () => {
  const [recaptchaValue, setRecaptchaValue] = useState("");
  const [users, setUsers] = useState(mockData);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("نام الزامی است"),
    lastName: Yup.string().required("نام خانوادگی الزامی است"),
    email: Yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
    password: Yup.string()
      .min(4, "رمز عبور باید حداقل 4 کاراکتر باشد")
      .required("رمز عبور الزامی است"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    if (!recaptchaValue) {
      setSubmitting(false);
      toast.error("  را کامل کنید reCAPTCHA.");
      return;
    }

    const newUser = {
      id: users.length + 1,
      name: values.firstName,
      lastname: values.lastName,
      email: values.email,
      password: values.password,
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setSubmitting(false);

    toast.success("Registration successful!");
    console.log("New user added to mock data:", newUser);
  };

  return (
    <div className="register-container">
      <h1 className="mb-4">فرم ثبت نام</h1>
      <ToastContainer />
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid, isSubmitting, handleSubmit, touched }) => (
          <Form onSubmit={handleSubmit}>
            <div className="mb-3">
              <Field
                type="text"
                name="firstName"
                placeholder="نام"
                className={`form-control ${
                  touched.firstName && !isValid ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                <ErrorMessage name="firstName" />
              </div>
            </div>
            <div className="mb-3">
              <Field
                type="text"
                name="lastName"
                placeholder="نام خانوادگی"
                className={`form-control ${
                  touched.lastName && !isValid ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                <ErrorMessage name="lastName" />
              </div>
            </div>
            <div className="mb-3">
              <Field
                type="email"
                name="email"
                placeholder="ایمیل"
                className={`form-control ${
                  touched.email && !isValid ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                <ErrorMessage name="email" />
              </div>
            </div>
            <div className="mb-3">
              <Field
                type="password"
                name="password"
                placeholder="رمز عبور"
                className={`form-control ${
                  touched.password && !isValid ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                <ErrorMessage name="password" />
              </div>
              <Link to="/" className="login-link">
                حساب دارم
              </Link>
            </div>
            <div className="mb-3 d-flex justify-content-center">
              <ReCAPTCHA
                sitekey="6LfzJ4QoAAAAAJMLDdY4f1b-JzvRlr9dfhnRpL8N"
                onChange={(value) => {
                  setRecaptchaValue(value);
                }}
              />
              {touched.recaptcha && (
                <div className="text-danger">
                  <ErrorMessage name="recaptcha" />
                </div>
              )}
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary ">
                ثبت نام
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
