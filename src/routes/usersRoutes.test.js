const app = require("../../app");
const mongoose = require("mongoose");
const supertest = require("supertest");
//Schema

beforeEach((done) => {
  const MONGODB_TEST = `mongodb+srv://${process.env.MONGO_TEST_USER}:${process.env.MONGO_TEST_PASSWORD}@cluster0.2hvwk.mongodb.net/${process.env.MONGO_TEST_DB}?retryWrites=true&w=majority`
  mongoose.connect(MONGODB_TEST,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done());
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  });
});

test("POST /users", async () => {
  const user = { name: "Martin", job: "SWE"}
  const response = await supertest(app).post("/users").send(user)
  expect(response.status).toEqual(201)
  expect(response.body).toBeTruthy();
  // Check data
  expect(response.body.name).toBe(user.name);
  expect(response.body.job).toBe(user.job);
});

test("POST /users negative", async () => {
  const user = { job: 'Musician' }
  const response = await supertest(app).post("/users").send(user)
  expect(response.status).toEqual(500)
  expect(response.error).toBeTruthy();
});