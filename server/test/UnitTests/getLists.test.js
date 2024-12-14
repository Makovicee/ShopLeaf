const request = require("supertest");
const app = require("../../server");
const List = require("../../models/listModel");

jest.mock("../../models/listModel");

describe("GET /api/lists", () => {
  it("should return a list of lists", async () => {
    const lists = [
      { _id: "1", name: "List 1" },
      { _id: "2", name: "List 2" },
    ];
    List.find.mockImplementation(() => ({
      sort: jest.fn().mockResolvedValue(lists),
    }));

    const response = await request(app).get("/api/lists");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(lists);
    expect(List.find).toHaveBeenCalledWith({});
  });
});
