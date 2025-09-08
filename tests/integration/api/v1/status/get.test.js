test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  expect(responseBody.postgres_version).toBeDefined();
  expect(typeof responseBody.postgres_version).toBe("string");

  expect(responseBody.active_connections).toBeDefined();
  expect(typeof responseBody.active_connections).toBe("number");

  expect(responseBody.opened_connections).toBeDefined();
  expect(typeof responseBody.opened_connections).toBe("number");

  expect(responseBody.max_connections).toBeDefined();
  expect(typeof responseBody.max_connections).toBe("number");
});
