import { Server } from "http";
import request from "supertest";
import { ExpressApi } from "../api/api";

let server: Server;

beforeAll((done) => {
  const api = new ExpressApi("/");
  server = api.createServer();
  server.listen(3000, done);
});

afterAll((done) => {
  server.close(done);
});

describe("Express API Endpoint", () => {
  it("should return 200 OK on GET /getAll", async () => {
    const response = await request(server).get("/persona/getAll");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ result: [] });
  });
});
