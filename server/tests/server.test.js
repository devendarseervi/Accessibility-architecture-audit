const { test } = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const app = require("../server");

test("GET /api/health returns a successful response", async () => {
  const response = await request(app).get("/api/health");

  assert.equal(response.status, 200);

  assert.deepEqual(response.body, {
    status: "success",
    message: "Backend server is running",
  });
});