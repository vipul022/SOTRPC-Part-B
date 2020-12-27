// !reference taken from https://kentcdodds.com/blog/stop-mocking-fetch#then-i-discovered-msw
import { rest } from "msw";
import * as users from "./src/services/authServices";

console.log("hello handler");
const handlers = [
  rest.post("/users", async (req, res, ctx) => {
    console.log("req=>", req);
    const response = await users.registerUser(req.body);
    console.log("response=>", response);
    return res(ctx.json({ response }));
  }),
];

export { handlers };
