import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SignIn from "./SignIn";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter, Route } from "react-router-dom";
import { StateContext } from "../../config/globalState";
import { Home } from "../Home/Home";

describe("SignIn component render as expected", () => {
  beforeEach(() => {
    render(
      <StateContext.Provider value={""}>
        <SignIn />
      </StateContext.Provider>
    );
  });
  test("should render 'Email' label", () => {
    screen.getByText(/email/i).toBeInTheDocument;
  });
  test("should render placeholder text from email ", () => {
    screen.getByPlaceholderText(/enter your email.../i).toBeInTheDocument;
  });
  test("should render 'Password' label", () => {
    screen.getByText(/password/i).toBeInTheDocument;
  });
  test("should render placeholder text from password ", () => {
    screen.getByPlaceholderText(/enter your password/i);
  });
  // !testing negative scenario
  test('should not find the role "whatever" in our component', () => {
    expect(screen.queryByRole("whatever")).toBeNull();
  });
  test("all text boxes should have required attribute", () => {
    expect(screen.getAllByRole("textbox")).toBeRequired;
  });
  test("should select input elements by their role", () => {
    expect(screen.getAllByRole("textbox").length).toEqual(1);
  });
  test("should fender login button", () => {
    expect(screen.getByRole("button", { name: /log in/i }));
  });
});
// describe("should successfully login the user with correct credentials and redirect to home page", () => {
//   const { container, getByTestId } = render(
//     <StateContext.Provider value="">
//       <BrowserRouter>
//         <SignIn />

//         {/* user is redirected to home page after successfully logging in, therefore home component is passed below  */}
//         <Route exact path="/" component={Home} />
//       </BrowserRouter>
//     </StateContext.Provider>
//   );
//   fireEvent.change(getByTestId("email"), {
//     target: { value: "v@v.com" },
//   });
//   fireEvent.change(getByTestId("password"), {
//     target: { value: "v" },
//   });
//   const button = screen.getByRole("button", { name: /log in/i });
//   console.log("button=>", button);
//   fireEvent.click(button);
//   expect(container).toHaveTextContent(/Home/);
// });
