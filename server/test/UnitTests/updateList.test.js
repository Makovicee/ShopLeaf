const request = require("supertest");
const app = require("../../server");
const List = require("../../models/listModel");

jest.mock("../../models/listModel");

describe("PATCH /api/lists/update/:id", () => {
  it("should update a list", async () => {
    const list = { _id: "674c8bf4775876a4b5ac4bb7", name: "List 1" };

    // Mock the return value of findOneAndUpdate
    List.findOneAndUpdate.mockResolvedValue(list);

    const response = await request(app)
      .patch("/api/lists/update/674c8bf4775876a4b5ac4bb7")
      .send({ name: "new List name" });

    // Check the response
    expect(response.status).toBe(200);
    expect(response.body).toEqual(list); // Adjust to match the actual return value from your handler

    // Check if findOneAndUpdate was called with the correct parameters
    expect(List.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: "674c8bf4775876a4b5ac4bb7" },
      { name: "new List name" },
      { new: true }
    );
  });

  it("should fail because wrong format of the id", async () => {
    // Mock the return value of findOneAndUpdate
    List.findOneAndUpdate.mockResolvedValue(null);

    const response = await request(app)
      .patch("/api/lists/update/123")
      .send({ name: "new List name" });

    // Check the response
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "invalidId",
      details: [
        '"id" with value "123" fails to match the required pattern: /^[0-9a-fA-F]{24}$/',
      ],
    });

    // Check if findOneAndUpdate was called with the correct parameters
  });
});
