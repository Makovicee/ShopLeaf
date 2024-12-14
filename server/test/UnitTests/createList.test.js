const request = require("supertest");
const app = require("../../server");
const List = require("../../models/listModel");

jest.mock("../../models/listModel");

describe("POST /api/lists/create", () => {
  it("should create a new list", async () => {
    const list = { name: "List 1", items: [], status: "active", members: [] };
    List.create.mockImplementation(() => list);

    const response = await request(app).post("/api/lists/create").send(list);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(list);
    expect(List.create).toHaveBeenCalledWith(list);
  });

  it("should fail if there are invalid attributes", async () => {
    const list = {
      name: "List 1",
      items: [],
      status: "active",
      members: [],
      wrongAttribute: "Gondor",
    };
    List.create.mockImplementation(() => list);

    const response = await request(app).post("/api/lists/create").send(list);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("invalidDtoIn");
    expect(response.body.details).toEqual(['"wrongAttribute" is not allowed']);
    expect(List.create).toHaveBeenCalledWith({
      name: "List 1",
      items: [],
      status: "active",
      members: [],
    });
  });
});
