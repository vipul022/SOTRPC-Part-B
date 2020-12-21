import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Register from "./Register";
import { StateContext } from "../../config/globalState";

import "@testing-library/jest-dom/extend-expect";

import { BrowserRouter, Route } from "react-router-dom";
import Home from "../Home/Home";
import App from "../../App";

// ! // import API mocking utilities from Mock Service Worker.
import { rest } from "msw";
import { setupServer } from "msw/node";

// const store = { loggedInUser: "vipul" };
// const fakeData = { name: "vipul" };

// //  !declare which API requests to mock
// const server = setupServer(
//   // !capture "POST /users request"
// rest.post("/users", (req, res, ctx) => {
//     // ! getting back response using mocked json body
// return res(ctx.json(fakeData));
// })
// );

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
//  ! reference taken from: https://www.npmjs.com/package/@testing-library/react
describe("Register component creates a user as expected", () => {
  //! establish API mocking before all tests
  // beforeAll(() => server.listen());
  // //! reset any request handlers that are declared as a part of our tests
  // afterEach(() => server.resetHandlers());
  // //! clean up once the tests are done
  // afterAll(() => server.close());

  test.only("on click 'Create Account' button, Register component should create a new user and redirect to home page ", async () => {
    const { container, getByTestId } = render(
      <StateContext.Provider value="">
        <BrowserRouter>
          <Register />

          {/* user is redirected to home page after successfully creating the user, therefore home component is passed below  */}
          <Route exact path="/" component={Home} />
        </BrowserRouter>
      </StateContext.Provider>
    );

    // const { getByTestId, container } = render(<App />);
    // const signUpLink = getByTestId("register");
    // fireEvent.click(signUpLink);
    //! fill out the form for testing
    fireEvent.change(getByTestId("name"), {
      target: { value: "vipul" },
    });
    fireEvent.change(getByTestId("address"), {
      target: { value: "123 fake street, Melbourne" },
    });
    fireEvent.change(getByTestId("phone"), {
      target: { value: "0999999999" },
    });
    fireEvent.change(getByTestId("email"), {
      target: { value: "vipul@test.com" },
    });
    fireEvent.change(getByTestId("password"), {
      target: { value: "123456" },
    });

    const button = screen.getByRole("button", { name: /create account/i });
    fireEvent.click(button);

    // !if user is redirected to home page, that implies that user has been successfully created

    expect(container).toHaveTextContent(/Home/);
    // expect(heading).toHaveTextContent(/welcome/i);

    // ctonsole.log("container=>", container);
    // expect(container).toHaveTextContent(/Welcome vipul/);
    // await waitFor(() => screen.getByRole("heading"));
    // expect(screen.getByRole("heading")).toHaveTextContent("Welcome vipul");
    // });
    // test("should handle server error", async () => {
    // server.use(
    //   rest.post("/users", (req, res, ctx) => {
    //     return res(
    //       ctx.status(409),
    //       ctx.json({
    //         error: "Authentication failed, please check user name and password",
    //       })
    //     );
    //   })
    // );
    // const { container } = render(
    //   <StateContext.Provider value="">
    //     <Register />
    //   </StateContext.Provider>
    // );

    // fireEvent.click(signUpLink);
    // //! fill out the form for testing
    // fireEvent.change(screen.getByTestId("name"), {
    //   target: { value: "vipul" },
    // });
    // fireEvent.change(screen.getByTestId("address"), {
    //   target: { value: "123 fake street, Melbourne" },
    // });
    // fireEvent.change(screen.getByTestId("phone"), {
    //   target: { value: "0999999999" },
    // });
    // fireEvent.change(screen.getByTestId("email"), {
    //   target: { value: "vipul@test.com" },
    // });
    // fireEvent.change(screen.getByTestId("password"), {
    //   target: { value: "123456" },
    // });

    // // const button = screen.getByRole("button", { name: /create account/i });
    // fireEvent.click(button);
    // const error = await screen.getByText("error");
    // expect(error).toHaveTextContent(
    //   /Authentication failed, please check user name and password/i
    // );
    // expect(container).toHaveTextContent(
    //   /Authentication failed, please check user name and password/i
    // );
  });
});
// expect(container).toHaveTextContent(/Home/);

// describe("new test", () => {
//   // const fakeData = { user: { name: "vipul" } };

//   // //  !declare which API requests to mock
//   const server = setupServer(
//     // !capture "POST /users request"
//     rest.post("/users", (req, res, ctx) => {
//       // ! getting back response using mocked json body
//       // return res(ctx.json(fakeData));
//       return res(
//         ctx.status(500),
//         ctx.json({ errorMessage: "Not authenticated" })
//       );
//     })
//   );
//   //! establish API mocking before all tests
//   beforeAll(() => server.listen());
//   // //! reset any request handlers that are declared as a part of our tests
//   afterEach(() => server.resetHandlers());
//   // //! clean up once the tests are done
//   afterAll(() => server.close());

//   test.only("negative ", async () => {
//     const { container, getByTestId, queryByTestId } = render(
//       <StateContext.Provider value="">
//         {/* <BrowserRouter> */}
//         <Register />

//         {/* user is redirected to home page after successfully creating the user, therefore home component is passed below  */}
//         {/* <Route exact path="/" component={Home} /> */}
//         {/* </BrowserRouter> */}
//       </StateContext.Provider>
//     );
//     // ! jest.mock is used to mock the result of any api call,
//     // jest.mock("../../");

//     const handleSubmit = jest.fn();
//     // registerUser = jest.fn;
//     // const { getByTestId, container } = render(<App />);
//     // const signUpLink = getByTestId("register");
//     // fireEvent.click(signUpLink);
//     //! fill out the form for testing
//     fireEvent.change(getByTestId("name"), {
//       target: { value: "vipul" },
//     });
//     fireEvent.change(getByTestId("address"), {
//       target: { value: "123 fake street, Melbourne" },
//     });
//     fireEvent.change(getByTestId("phone"), {
//       target: { value: "0999999999" },
//     });
//     fireEvent.change(getByTestId("email"), {
//       target: { value: "vipul@test.com" },
//     });
//     fireEvent.change(getByTestId("password"), {
//       target: { value: "123456" },
//     });

//     const button = screen.getByRole("button", { name: /create account/i });
//     // console.log("button=>", button);
//     fireEvent.click(button);
//     // await waitFor(() => screen.getByTestId("errorMessage"));
//     expect(handleSubmit()).toHaveBeenCalledTimes(1);
//     const errorMessage = await queryByTestId("errorMessage");
//     console.log("errormessage=>", errorMessage);
//     // await expect(queryByTestId("errorMessage")).value.toEqual(
//     // "Not authenticated"
//     // );
//     // await expect(screen.getByText(/"Not authenticated"/i));
//     // await expect(registerUser()).rejects.toThrow("400");
//     // await waitFor(() => expect(registerUser()).rejects.toThrow());
//     // expect(window.fetch).toHaveBeenCalledTimes(1)
//     // screen.debug();
//     // const heading = await screen.getByRole("heading");
//     // !if user is redirected to home page, that implies that user has been successfully created
//     // screen.getByText(
//     //   /authentication failed, please check user name and password/i
//     // );
//     // expect(container).toHaveTextContent(/Home/);
//     // expect(heading).toHaveTextContent(/welcome/i);

//     // ctonsole.log("container=>", container);
//     // expect(container).toHaveTextContent(/Welcome vipul/);
//     // await waitFor(() => screen.getByRole("heading"));
//     // expect(screen.getByRole("heading")).toHaveTextContent("Welcome vipul");
//     // });
//     // test("should handle server error", async () => {
//     // server.use(
//     //   rest.post("/users", (req, res, ctx) => {
//     //     return res(
//     //       ctx.status(409),
//     //       ctx.json({
//     //         error: "Authentication failed, please check user name and password",
//     //       })
//     //     );
//     //   })
//     // );
//     // const { container } = render(
//     //   <StateContext.Provider value="">
//     //     <Register />
//     //   </StateContext.Provider>
//     // );

//     // fireEvent.click(signUpLink);
//     // //! fill out the form for testing
//     // fireEvent.change(screen.getByTestId("name"), {
//     //   target: { value: "vipul" },
//     // });
//     // fireEvent.change(screen.getByTestId("address"), {
//     //   target: { value: "123 fake street, Melbourne" },
//     // });
//     // fireEvent.change(screen.getByTestId("phone"), {
//     //   target: { value: "0999999999" },
//     // });
//     // fireEvent.change(screen.getByTestId("email"), {
//     //   target: { value: "vipul@test.com" },
//     // });
//     // fireEvent.change(screen.getByTestId("password"), {
//     //   target: { value: "123456" },
//     // });

//     // const button = screen.getByRole("button", { name: /create account/i });
//     // fireEvent.click(button);
//     // const error = await screen.getByText("error");
//     // expect(error).toHaveTextContent(
//     //   /Authentication failed, please check user name and password/i
//     // );
//     // expect(container).toHaveTextContent(
//     //   /Authentication failed, please check user name and password/i
//     // );
//   });
// });
// expect(container).toHaveTextContent(/Home/);
