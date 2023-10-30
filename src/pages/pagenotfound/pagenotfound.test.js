import React from "react";
import { render, screen } from "@testing-library/react";
import PageNotFound from "./index";
import { BrowserRouter } from "react-router-dom";

test("PageNotFound displays the correct link", () => {
  render(
    <BrowserRouter>
      <PageNotFound />
    </BrowserRouter>
  );
  const backButton = screen.getByText("بازگشت");
  expect(backButton).toBeInTheDocument();
});
