import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SignIn from "./SignIn";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter, Route } from "react-router-dom";
import { StateContext } from "../../config/globalState";

describe("SignIn component render as expected", () => {
  beforeEach(() => {
    const { getByText } = render(
      <StateContext.Provider value={""}>
        <SignIn />
      </StateContext.Provider>
    );
  });
  test.only("should render 'Email' label", () => {
    screen.getByText(/email/i).toBeInTheDocument;
  });
});
