const request = require("supertest");
const app = require("../../server");
const List = require("../../models/listModel");
const e = require("express");

jest.mock("../../models/listModel");

describe("DELETE /api/lists/delete/:id", () => {
  it("should delete a list", async () => {
    const list = { _id: "674c8bf4775876a4b5ac4bb7", name: "List 1" };
    List.findOneAndDelete.mockImplementation(() => list);

    const response = await request(app).delete(
      "/api/lists/delete/674c8bf4775876a4b5ac4bb7"
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      list: list,
      message: "List deleted successfully",
    });
    expect(List.findOneAndDelete).toHaveBeenCalledWith({
      _id: "674c8bf4775876a4b5ac4bb7",
    });
  });

  it("should fail because the list does not exist", async () => {
    List.findOneAndDelete.mockImplementation(() => null);

    const response = await request(app).delete(
      "/api/lists/delete/999c8bf4775876a4b5ac4bb9"
    );

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      error: "No such list exists in the database",
    });
  });
});
