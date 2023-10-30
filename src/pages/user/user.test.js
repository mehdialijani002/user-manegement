import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import UserManagement from "./index";

test("UserManagement component renders table and button", () => {
  const { getByText } = render(
    <BrowserRouter>
      <UserManagement />
    </BrowserRouter>
  );
  expect(getByText("نام")).toBeInTheDocument();
  expect(getByText("نام خانوادگی")).toBeInTheDocument();
  expect(getByText("ایمیل")).toBeInTheDocument();
  expect(getByText("رمز عبور")).toBeInTheDocument();
  expect(getByText("ویرایش و حذف")).toBeInTheDocument();
  expect(getByText("افزودن کاربر")).toBeInTheDocument();
});
