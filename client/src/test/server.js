import { rest } from "msw";
import { setupServer } from "msw/node";
import { handlers } from "../../server-handlers";

// !setting up mock server
console.log("handlers inside server.js=>", handlers);
const server = setupServer(...handlers);
console.log("server inside server.js=>", server);

export { server, rest };
