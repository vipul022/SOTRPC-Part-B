import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Register from "./Register";
import { StateContext } from "../../config/globalState";
import userEvent from "@testing-library/user-event";
// import { mocked } from "ts-jest/utils";
import { rest } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom/extend-expect";
import { registerUser } from "../../services/authServices";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "../Home/Home";

const fakeData = { name: "vipul" };

const server = setupServer(
  rest.post("/users", (req, res, ctx) => {
    return res(ctx.json(fakeData));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
describe("Register component renders as expected", () => {
  // !beforeEach render the app before every test
  beforeEach(() => {
    // !passing value as store with StateContext.Provider as it is passed in app.js
    render(
      <StateContext.Provider value={""}>
        <Register />
      </StateContext.Provider>
    );
  });
  test("Should render 'Create Account' heading ", () => {
    screen.getByRole("heading", { name: /create account/i }).toBeInTheDocument;
  });
  test("should render 'Name' label", () => {
    screen.getByText(/name/i).toBeInTheDocument;
  });
  test("should select input element by placeholder text", () => {
    screen.getByPlaceholderText("Enter your full name...").toBeInTheDocument;
  });
  test("should render 'Address' label", () => {
    screen.getByText(/address/i).toBeInTheDocument;
  });
  test("should select input element by placeholder text", () => {
    screen.getByPlaceholderText("Enter your address...").toBeInTheDocument;
  });
  test("should render 'Email' label", () => {
    screen.getByText(/email/i).toBeInTheDocument;
  });
  test("should select input element by placeholder text", () => {
    screen.getByPlaceholderText("Enter your email...").toBeInTheDocument;
  });
  test("should render 'Password' label", () => {
    screen.getByText(/password/i).toBeInTheDocument;
  });
  test("should select input element by placeholder text", () => {
    screen.getByPlaceholderText("Enter password...").toBeInTheDocument;
  });
  // ! all methods starting with query does not throw error but it is very useful for checking negative outcome using expect with it as it returns null in such cases
  test('should not find the role "whatever" in our component', () => {
    expect(screen.queryByRole("whatever")).toBeNull();
  });
  test("should select input elements by their role", () => {
    expect(screen.getAllByRole("textbox").length).toEqual(4);
    // expect(screen.getAllByRole("textbox")).toBeRequired();
  });
  test("all text boxes should have required attribute", () => {
    expect(screen.getAllByRole("textbox")).toBeRequired;
  });
  test("should render input box for email", () => {
    screen.getByTestId("email").toBeInTheDocument;
    // expect(screen.getByTestId("email")).toBeRequired();
  });
  test("email field should be required", () => {
    expect(screen.getByTestId("email")).toBeRequired;
  });
  test("should select 'back' button by it's role", () => {
    screen.getByRole("button", { name: /back/i });
  });
  test("should select 'create account' button by it's role", () => {
    screen.getByRole("button", { name: /create account/i });
  });
});
describe("Register component creates a user as expected", () => {
  test("on click 'Create Account' button, Register component should create a new user and redirect to home page ", async () => {
    const { container } = render(
      <StateContext.Provider value={""}>
        <BrowserRouter>
          <Register />

          <Route exact path="/" component={Home} />
        </BrowserRouter>
      </StateContext.Provider>
    );
    //! fill out the form
    fireEvent.change(screen.getByTestId("name"), {
      target: { value: "vipul" },
    });
    fireEvent.change(screen.getByTestId("address"), {
      target: { value: "123 fake street, Melbourne" },
    });
    fireEvent.change(screen.getByTestId("phone"), {
      target: { value: "0999999999" },
    });
    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "vipul@test.com" },
    });
    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "123456" },
    });

    const button = screen.getByRole("button", { name: /create account/i });
    fireEvent.click(button);
    // screen.debug();
    expect(container).toHaveTextContent(/Home/);
    // console.log("container=>", container);
    // expect(container).toHaveTextContent(/Welcome vipul/);
    // await waitFor(() => screen.getByRole("heading"));
    // expect(screen.getByRole("heading")).toHaveTextContent("Welcome vipul");
  });
});
