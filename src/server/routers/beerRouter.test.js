const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const app = require("..");
const connectDB = require("../../db");
const { groupOfBeer } = require("../../mocks/beerMocks");
const { singleUser } = require("../../mocks/userMocks");
const User = require("../../db/models/user");
const Beer = require("../../db/models/beer");

let mongoServer;
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await connectDB(mongoServer.getUri());
});

beforeEach(async () => {
  await Beer.create(groupOfBeer[0]);
  await Beer.create(groupOfBeer[1]);
  await request(app).post("/user/register").send(singleUser).expect(201);
});

afterEach(async () => {
  await Beer.deleteMany({});
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given a GET to the beer/ endpoint", () => {
  describe("When invoked with a routing request", () => {
    test("Then it should respond the res.status 200 with json with a list of beers", async () => {
      jest.spyOn(jsonwebtoken, "verify").mockReturnValue({ id: "1234" });
      jest.spyOn(bcrypt, "compare").mockReturnValue(true);
      jest.spyOn(jsonwebtoken, "sign").mockReturnValue("mockToken");
      const expectedLengthBeers = 2;

      const {
        body: { token },
      } = await request(app)
        .post("/user/login")
        .send({
          username: singleUser.username,
          password: singleUser.password,
        })
        .expect(200);

      const { body } = await request(app)
        .get(`/beer/page/${0}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      await expect(body.beersOnPage).toHaveLength(expectedLengthBeers);
    });
  });
});
