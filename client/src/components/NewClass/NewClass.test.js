import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewClass from "./NewClass";
import { StateContext } from "../../config/globalState";
import { BrowserRouter, Route } from "react-router-dom";
import Classes from "../PotteryClasses/Classes";

const store = {
  classes: [
    {
      description:
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
  test("should render 'Title' label", () => {
    screen.getByText(/title/i);
  });
  test("should select input element by placeholder text", () => {
    screen.getAllByPlaceholderText("Enter class name...");
  });

  test("should render 'Description' label", () => {
    screen.getByText(/description/i);
  });
  test("should select input element by placeholder text", () => {
    screen.getAllByPlaceholderText("Enter description...");
  });
  test("should render 'Time' label", () => {
    screen.getByText(/time/i);
  });
  test("should select input element by placeholder text", () => {
    screen.getAllByPlaceholderText("Enter class timings...");
  });
  test("should render 'Max Number' label", () => {
    screen.getByText(/max Number/i);
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
    // !as there are multiple text boxes, therefore  getByTestId id used to target a specific textbox
    // userEvent.type(screen.getByTestId("name", "Vipul"));
    // expect((screen.getByTestId("name").value).toBe("Vipul"));
    const input = screen.getByTestId("title");
    // !"vipul" is passed a value to the text box
    userEvent.type(input, "vipul");
    expect(input.value).toBe("vipul");
    // console.log("name=>", input);
  });
});

// describe("On clicking 'create class' button, component should create a new class and redirect to 'Classes' component", () => {
//   beforeEach(() => {
//     render(
//       <StateContext.Provider value={{ store }}>
//         <BrowserRouter>
//           <NewClass />

//           <Route exact path="/classes" component={Classes} />
//         </BrowserRouter>
//       </StateContext.Provider>
//     );
//   });
//   test.only("On clicking 'Create Class' button, component should create a new class and redirect to 'Classes' component", async () => {
//     // ! Fill the form
//     userEvent.type(screen.getByTestId("title"), "This is a new class");
//     userEvent.type(
//       screen.getByTestId("description"),
//       "This is the description of new class"
//     );
//     userEvent.type(screen.getByTestId("time"), "Every Monday, 06:00 pm");
//     userEvent.type(screen.getByTestId("maxNumber"), "8");
//     userEvent.type(screen.getByTestId("teacher"), "Jane");
//     // const button = screen.getByRole("button", { name: /create class/i });
//     const button = screen.getAllByRole("button")[1];
//     // console.log("button=>", button);
//     // fireEvent.click(button);
//     userEvent.click(button);
//     expect(await screen.getByRole("heading", { name: /classes/i }));
//     // expect(await screen.getByRole("heading", { name: /home/i }));
//   });
// });
