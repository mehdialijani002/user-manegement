import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Register from "./index";

test("Register component renders correctly and submits the form", () => {
  const { container } = render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );

  expect(screen.getByText("فرم ثبت نام")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("نام")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("نام خانوادگی")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("ایمیل")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("رمز عبور")).toBeInTheDocument();

  fireEvent.change(screen.getByPlaceholderText("نام"), {
    target: { value: "John" },
  });
  fireEvent.change(screen.getByPlaceholderText("نام خانوادگی"), {
    target: { value: "Doe" },
  });
  fireEvent.change(screen.getByPlaceholderText("ایمیل"), {
    target: { value: "johndoe@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText("رمز عبور"), {
    target: { value: "password123" },
  });

  fireEvent.click(screen.getByText("ثبت نام"));
});
