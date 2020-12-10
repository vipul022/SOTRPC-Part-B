import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewClass from "./NewClass";
import { StateContext } from "../../config/globalState";
import { useGlobalState } from "../../config/globalState";

const store = {
  classes: [
    {
      details:
        "This is a beginners course. We make pots, bowls, vases and various glazes using wheel",
      maxNumber: 8,
      name: "Weekly Beginners Class",
      teacher: "Cindy",
      time: "12/12/20 at 07:00pm",
      _id: 1,
    },
  ],
  members: [],
  loggedInUser: null,
};
describe("NewClass component renders as expected", () => {
  // !beforeEach render the app before every test
  beforeEach(() => {
    // !passing value as store with StateContext.Provider as it is passed in app.js
    render(
      <StateContext.Provider value={{ store }}>
        <NewClass />
      </StateContext.Provider>
    );
  });
  test("should render NewClass component without crashing", () => {
    // screen.debug();
  });
  test("should render 'Add New Class' heading", () => {
    screen.getByRole("heading", { name: /add new class/i }).toBeInTheDocument;
  });
  test("should render 'Name' label", () => {
    screen.getByText(/name/i);
  });
  test("should select input element by placeholder text", () => {
    screen.getAllByPlaceholderText("Enter class name...");
  });

  test("should render 'Details' label", () => {
    screen.getByText(/details/i);
  });
  test("should select input element by placeholder text", () => {
    screen.getAllByPlaceholderText("Enter details...");
  });
  test("should render 'Time' label", () => {
    screen.getByText(/time/i);
  });
  test("should select input element by placeholder text", () => {
    screen.getAllByPlaceholderText("Enter class timings...");
  });
  test("should render 'Max number' label", () => {
    screen.getByText(/max number/i);
  });
  test("should render 'Teacher' label", () => {
    screen.getByText(/teacher/i);
  });
  test("should select input element by placeholder text", () => {
    screen.getAllByPlaceholderText("Enter teacher's name...");
  });
  // ! all methods starting with query does not throw error but it is very useful for checking negative outcome using expect with it as it returns null for such cases
  test("should not find the role 'whatever' in the component", () => {
    expect(screen.queryByRole("whatever")).toBeNull();
  });
  // ! Incase the following test does not pass and returns an array of text-boxes instead of html elements, we can test that using array method as it's done below

  test("should select input elements by it's role", () => {
    screen.getAllByRole("textbox");
    expect(screen.getAllByRole("textbox").length).toEqual(4);
    // screen.getByRole("text-area");
    // expect(screen.getByRole("textarea").length).toEqual(1);
    screen.getByRole("button", { name: /back/i });
    screen.getByRole("button", { name: /create class/i });
  });
  test("text box should display the correct user input ", () => {
    // userEvent.type(screen.getByTestId("name", "Vipul"));
    // expect((screen.getByTestId("name").value).toBe("Vipul"));
    const input = screen.getByTestId("name");
    userEvent.type(input, "vipul");
    expect(input.value).toBe("vipul");
    // console.log("name=>", input);
  });
});
