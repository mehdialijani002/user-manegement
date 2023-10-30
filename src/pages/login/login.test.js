import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./index";
import { BrowserRouter } from "react-router-dom";

test("Login component should render the login form", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  expect(screen.getByLabelText("نام خانوادگی:")).toBeInTheDocument();
  expect(screen.getByLabelText("رمز عبور:")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "ورود" })).toBeInTheDocument();
});

test("Login component should show validation error messages when submitting an empty form", async () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  const loginButton = screen.getByRole("button", { name: "ورود" });

  fireEvent.click(loginButton);

  expect(
    await screen.findByText("نام خانوادگی الزامی است")
  ).toBeInTheDocument();
  expect(await screen.findByText("رمز عبور الزامی است")).toBeInTheDocument();
});
