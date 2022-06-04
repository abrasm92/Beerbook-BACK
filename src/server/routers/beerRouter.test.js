const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const app = require("..");
const connectDB = require("../../db");
const Beer = require("../../db/models/beer");
const { groupOfBeer } = require("../../mocks/beerMocks");

let mongoServer;
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await connectDB(mongoServer.getUri());
});

beforeEach(async () => {
  await Beer.create(groupOfBeer[0]);
  await Beer.create(groupOfBeer[1]);
});

afterEach(async () => {
  await Beer.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given a GET to the beer/ endpoint", () => {
  describe("When invoked with a routing request", () => {
    test("Then it should respond the res.status 200 with json with a list of beers", async () => {
      const token =
        "Bearer 47D86353BDEBE34CA8856D5A96496CE0BC5EC64F19D9B22E3C72FBC5040CAB56";
      const expectedLengthBeers = 2;
      const { body } = await request(app)
        .get("/beer/")
        .set("Authorization", token)
        .expect(200);

      expect(body.beers).toHaveLength(expectedLengthBeers);
    });
  });
});
