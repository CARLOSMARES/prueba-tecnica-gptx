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
  it("should return 200 OK on GET /health", async () => {
    const response = await request(server).get("/health");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "OK" });
  });
  it("should return 200 OK on GET /health", async () => {
    const response = await request(server).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Welcome to the API!");
  });
});
