const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const app = require("..");
const connectDB = require("../../db");
const User = require("../../db/models/user");
const { groupUsers } = require("../../mocks/userMocks");

let mongoServer;
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await connectDB(mongoServer.getUri());
});

beforeEach(async () => {
  await User.create(groupUsers[0]);
  await User.create(groupUsers[1]);
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given a POST to the user/register endpoint", () => {
  describe("When invoked with a routing request", () => {
    test("Then it should respond the res.status 201 with json with message 'User created'", async () => {
      const expectJson = { msg: "User created" };
      const { body } = await request(app)
        .post("/user/register")
        .send({
          username: groupUsers[2].username,
          password: groupUsers[2].password,
          email: groupUsers[2].email,
          name: groupUsers[2].name,
        })
        .expect(201);

      expect(body).toEqual(expectJson);
    });
  });
});

describe("Given a POST to the user/login endpoint", () => {
  describe("When invoked with a routing request", () => {
    test("Then it should respond the res.status 200 with a token", async () => {
      const { body } = await request(app)
        .post("/user/login")
        .send({
          username: groupUsers[1].username,
          password: groupUsers[1].password,
        })
        .expect(200);

      expect(body).toHaveProperty("token");
    });
  });
});
