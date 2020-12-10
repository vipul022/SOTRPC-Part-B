import React from "react";
import { render, screen } from "@testing-library/react";
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
    // const useGlobalState = jest.fn();
    render(
      <StateContext.Provider value={{ store }}>
        <NewClass />
      </StateContext.Provider>
    );
  });
  test("should render NewClass component without crashing", () => {
    screen.debug();
  });
});
