import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "./index";

test("renders Home component", () => {
  const { getByText } = render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

  const welcomeText = getByText("به سایت ما خوش امدید");
  expect(welcomeText).toBeInTheDocument();
  const userManagementLink = getByText("مدیریت کاربران");
  expect(userManagementLink).toBeInTheDocument();
});
